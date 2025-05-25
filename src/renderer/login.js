// src/renderer/login.js
const loginForm = document.getElementById('loginForm');
const messageBox = document.getElementById('messageBox');

function showMessage(message, isSuccess = true) {
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    messageBox.classList.remove('success', 'error');
    messageBox.classList.add(isSuccess ? 'success' : 'error');
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    messageBox.style.display = 'none';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await window.electronAPI.loginUser({ username, password });

    if (result.success) {
        showMessage(">> CONEXÃO ESTABELECIDA! << Bem-vindo(a) de volta à Matrix, agente " + username + "!", true); // Nova mensagem
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 3000);
    } else {
        showMessage("Acesso Negado! " + (result.message || "Credenciais não batem com nossos registros. ICE detectado?"), false); // Nova mensagem
    }
});