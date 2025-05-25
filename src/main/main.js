const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const dbPool = require('./database'); // Importa o pool de conexões do nosso database.js
const bcrypt = require('bcrypt'); // bcrypt é importado AQUI
const saltRounds = 10;

let registerWindow;
let loginWindow;
let successWindow;
let currentUserId = null;

function createRegisterWindow() {
    registerWindow = new BrowserWindow({
        width: 450,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    registerWindow.loadFile(path.join(__dirname, '../renderer/register.html'));
    // registerWindow.webContents.openDevTools(); // Opcional: para debug
    registerWindow.on('closed', () => { registerWindow = null; });
}

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    loginWindow.loadFile(path.join(__dirname, '../renderer/login.html'));
    // loginWindow.webContents.openDevTools(); // Opcional: para debug
    loginWindow.on('closed', () => { loginWindow = null; });
}

function createSuccessWindow() {
    successWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'), // Mantém o preload, mesmo que não use APIs
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    successWindow.loadFile(path.join(__dirname, '../renderer/success.html'));
    // successWindow.webContents.openDevTools(); // Opcional: para debug
    successWindow.on('closed', () => {
        successWindow = null;
        app.quit(); // Fecha o app quando a janela de sucesso é fechada
    });
}

// Quando o Electron estiver pronto, cria a janela de cadastro
app.whenReady().then(() => {
    createRegisterWindow();

    app.on('activate', () => {
        // Recria a janela se o app estiver ativo e não houver janelas abertas
        if (BrowserWindow.getAllWindows().length === 0) createRegisterWindow();
    });
});

// Fecha o app quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// --- Handlers IPC ---

// Handler para o registro de usuário COM BCRYPT
ipcMain.handle('register-user', async (event, userData) => {
    const { username, password } = userData; // password aqui é a senha em texto plano
    let connection;
    try {
        connection = await dbPool.getConnection();

        // 1. Verificar se o usuário já existe
        const [existingUsers] = await connection.execute(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existingUsers.length > 0) {
            return { success: false, message: "Nome de usuário já existe." };
        }

        // 2. GERAR O HASH DA SENHA
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. Inserir novo usuário com a SENHA HASHEADA
        await connection.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword] // Salva o HASHED password
        );

        return { success: true };
    } catch (error) {
        console.error('Erro no handler register-user:', error.message);
        return { success: false, message: "Erro interno no cadastro." };
    } finally {
        if (connection) connection.release();
    }
});

// Handler para o login de usuário COM BCRYPT
ipcMain.handle('login-user', async (event, credentials) => {
    const { username, password } = credentials; // password aqui é a senha em texto plano
    let connection;
    try {
        connection = await dbPool.getConnection();

        // 1. Buscar o usuário pelo username para obter o hash da senha
        const [rows] = await connection.execute(
            // Seleciona a coluna 'password' que agora contém o HASH
            'SELECT id, username, password FROM users WHERE username = ?',
            [username]
        );

        if (rows.length > 0) {
            const user = rows[0]; // user.password aqui é o HASH do banco

            // 2. Comparar a senha fornecida com o hash armazenado
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Senha correta
                console.log(`Usuário ${user.username} (ID: ${user.id}) logado com sucesso (com bcrypt).`);
                currentUserId = user.id; // Não se esqueça de definir currentUserId se você o usa

                // Fecha a janela de login e abre a de sucesso
                if (loginWindow) loginWindow.close(); // Certifique-se que loginWindow está acessível
                createSuccessWindow(); // Certifique-se que createSuccessWindow está acessível

                return { success: true, userId: user.id };
            } else {
                // Senha incorreta
                return { success: false, message: "Usuário ou senha inválidos." };
            }
        } else {
            // Usuário não encontrado
            return { success: false, message: "Usuário ou senha inválidos." };
        }
    } catch (error) {
        console.error('Erro no handler login-user:', error.message);
        return { success: false, message: "Erro interno no login." };
    } finally {
        if (connection) connection.release();
    }
});