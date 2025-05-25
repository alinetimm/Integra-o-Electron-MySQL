
-- Cria o banco de dados se ele não existir
CREATE DATABASE IF NOT EXISTS electron_auth_db_simple;

-- Seleciona o banco de dados para uso
USE electron_auth_db_simple;

-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- Em SQL, VARCHAR(n) define uma string de caracteres de tamanho variável, onde n representa o número máximo de caracteres que podem ser armazenados naquela coluna.
);

-- Opcional: Inserir um usuário de teste (para facilitar o login sem precisar cadastrar primeiro)
INSERT IGNORE INTO users (username, password) VALUES ('teste', '123');