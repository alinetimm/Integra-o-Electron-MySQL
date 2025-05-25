Este é um projeto de exemplo desenvolvido para demonstrar a integração de um aplicativo Electron com um banco de dados MySQL, incluindo cadastro de usuários com hashing de senha e funcionalidade de login.
Objetivos do Exemplo

* Demonstrar a configuração e uso do `mysql2` em um projeto Electron.
* Ilustrar um fluxo de autenticação completo (UI -> IPC -> Processo Principal -> Banco de Dados -> Processo Principal -> IPC -> UI).
* Mostrar como implementar cadastro de novos usuários com hashing de senhas (`bcrypt`).
* Apresentar a verificação de credenciais de login comparando com os dados (hashes) no banco.

Antes de começar, garanta que você tenha o seguinte instalado em sua máquina:

* [Node.js](https://nodejs.org/) (que inclui o npm)
* [Git](https://git-scm.com/)
* Um servidor MySQL em execução (como XAMPP, WAMP, Docker, ou uma instalação nativa).
* Uma ferramenta de gerenciamento de banco de dados (como DBeaver, MySQL Workbench, phpMyAdmin) é recomendada.

## Como Baixar e Usar este Repositório

Siga os passos abaixo para configurar e rodar este projeto em sua máquina local:
 1. Clone o Repositório

Abra seu terminal ou Git Bash e clone este repositório:

```bash
git clone https://github.com/alinetimm/Integra-o-Electron-MySQL.git

Navegue para a pasta do projeto clonado:

Bash

cd nome_da_pasta_aqui
2. Instale as Dependências
Dentro da pasta do projeto, instale todas as dependências listadas no package.json:

Bash

npm install
Isso instalará o Electron, mysql2, bcrypt, e outras dependências necessárias.

3. Configure o Banco de Dados
Crie o Banco de Dados e as Tabelas:

Este projeto inclui um arquivo setup.sql. Use sua ferramenta de gerenciamento de banco de dados para executar este script (conforme aula 3). Ele criará o banco de dados e as tabelas users necessárias.
Configure as Credenciais do Banco de Dados:

Este projeto utiliza um arquivo .env para armazenar as credenciais do banco de dados de forma segura.

Crie um arquivo chamado .env na raiz do projeto.

Adicione as seguintes variáveis ao seu arquivo .env, substituindo pelos seus dados de conexão MySQL:

Snippet de código

DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_DATABASE=nome_do_banco_de_dados_do_setup_sql
Exemplo com valores comuns para XAMPP/WAMP:
Snippet de código

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=electron_auth_db_simple
Lembre-se: O arquivo .env NÃO deve ser enviado para o seu repositório Git público. Certifique-se de que ele está listado no arquivo .gitignore.

4. Rode o Aplicativo
Após instalar as dependências e configurar o banco de dados, você pode iniciar o aplicativo:

Bash

npm start
Isso deve abrir a janela de cadastro ou login do aplicativo Electron.

5. Testando
Tente se cadastrar com um novo usuário.
Depois, tente fazer login com o usuário que você acabou de cadastrar.
Verifique no seu banco de dados se o usuário foi inserido corretamente e se a senha está armazenada como um hash (uma longa string de caracteres, não a senha original).
Sua Atividade: Criando seu Próprio Aplicativo
Este repositório serve como um exemplo funcional e um ponto de partida para você entender os conceitos de integração do Electron com o MySQL, cadastro e login.

IMPORTANTE: Seu trabalho NÃO deve ser uma cópia direta deste exemplo!
O objetivo é que você utilize o conhecimento adquirido para desenvolver seu próprio aplicativo com as funcionalidades solicitadas, aplicando os conceitos aprendidos.
