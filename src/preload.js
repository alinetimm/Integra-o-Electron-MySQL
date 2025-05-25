// src/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Expõe a API de registro de usuário para o renderer
    registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
    // Expõe a API de login de usuário para o renderer
    loginUser: (credentials) => ipcRenderer.invoke('login-user', credentials),
});