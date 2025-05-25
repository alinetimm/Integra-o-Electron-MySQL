// src/renderer/register.js
const registerForm = document.getElementById('registerForm');
const messageBox = document.getElementById('messageBox');

function showMessage(message, isSuccess = true) {
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    messageBox.classList.remove('success', 'error'); // Remove classes antigas
    messageBox.classList.add(isSuccess ? 'success' : 'error'); // Adiciona classe correta
}

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    messageBox.style.display = 'none';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (password.length < 1) { // Exemplo de validação simples, pode ser mais robusto
        showMessage("Senha muito curta, hacker! Tente algo mais forte.", false);
        return;
    }

    const result = await window.electronAPI.registerUser({ username, password });

    if (result.success) {
        showMessage(">> DADOS INSERIDOS NA DATABASE! << gora faz login ai vai nunca te pedi nada", true); // Nova mensagem
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000); // Aumentei o tempo para dar pra ler
    } else {
        showMessage("Falha na conexão neural: " + (result.message || "Sistema instável. Tente de novo."), false); // Nova mensagem
    }
});