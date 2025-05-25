
const mysql = require('mysql2/promise');
require('dotenv').config(); // Carrega as variáveis do arquivo .env para process.env

const dbConfig = {
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_DATABASE || 'electron_auth_db_simple',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool; // Variável para armazenar a instância do pool de conexões

/**
 * Retorna a instância do pool de conexões MySQL.
 * Cria o pool se ele ainda não existir (singleton).
 * @returns {mysql.Pool} A instância do pool de conexões.
 */
function getPool() {
    if (!pool) {
        pool = mysql.createPool(dbConfig);
        console.log('Pool de conexões com MySQL criado com sucesso!');

        // Teste opcional para verificar se o pool está funcionando
        pool.getConnection()
            .then(connection => {
                console.log('Conexão de teste do pool bem-sucedida.');
                connection.release(); // Libera a conexão de volta para o pool
            })
            .catch(err => {
                console.error('Erro ao obter conexão de teste do pool:', err.message);
            });
    }
    return pool;
}

// Exporta a instância do pool de conexões para que outros módulos possam usá-la
module.exports = getPool();