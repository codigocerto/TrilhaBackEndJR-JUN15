![Código Certo Coders](https://utfs.io/f/3b2340e8-5523-4aca-a549-0688fd07450e-j4edu.jfif)

# 📚 Trilha Inicial BackEnd Jr
Este projeto tem como objetivo desenvolver uma API RESTful para gerenciamento de tarefas, proporcionando funcionalidades de CRUD (Create, Read, Update, Delete) de tarefas, autenticação de usuários e armazenamento dos dados em um banco de dados.

## Objetivos:
- Criar uma API que permita CRUD (Create, Read, Update, Delete) de tarefas.
- Implementar autenticação de usuários.
- Utilizar um banco de dados SQLite para armazenar as tarefas.
- Documentar todo o processo e apresentar as conclusões.

## Requisitos Funcionais:
- Criar Tarefa: Endpoint para criar uma nova tarefa.
- Listar Tarefas: Endpoint para listar todas as tarefas.
- Atualizar Tarefa: Endpoint para atualizar uma tarefa existente.
- Deletar Tarefa: Endpoint para deletar uma tarefa existente.

## Autenticação de Usuários:
- Registro de Usuário: Endpoint para registrar um novo usuário.
- Login de Usuário: Endpoint para autenticar um usuário e gerar um token JWT.
- Proteção de Rotas: Garantir que apenas usuários autenticados possam acessar os endpoints de tarefas.

## Banco de Dados:
- Utilizar SQLite como banco de dados para armazenar informações de usuários e tarefas.

## Este repositório contém uma API desenvolvida com NestJS, TypeORM e SQLite. A API é um exemplo básico de CRUD utilizando um banco de dados SQLite.

## 💻 Instalação

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
Para configurar e executar este projeto localmente, siga os passos abaixo:


```bash
# Clone esse repositório
- $ git clone https://github.com/gabrielAnacletoo/TrilhaBackEndJR-JUN15.git

# Vá para o repositório Back-end
- $ cd trilhabackendjrjun15

# Instale as dependencias
- $ npm install
```
## 🔐 Configuração do banco de dados
Não é necessário configurar o banco, ele ja é instalado durante a instalação do projeto. Você consultar o site [SQLite](https://www.sqlite.org/).

## 👨‍💻 Entidades utilizadas no projeto
```bash
- # Auth
- $ cuida da autenticação da api.
- # Tasks
- $ Registra as tasks criadas pelo usuário.
- #  User
- $ E por último a entidade de user que é responsavel pelo usuário.
```

## 👨‍💻 Algumas Dependências Utilizadas

- [bcrypt](https://www.npmjs.com/package/bcrypt): 5.1.1
- [firebase](https://www.npmjs.com/package/firebase): 10.12.2
- [dotenv](https://www.npmjs.com/package/dotenv): 16.3.1
- [sqlite3](https://www.sqlite.org/): 5.1.7
- [jsonwebtoken](https://jwt.io/): 9.0.2
- [typeorm](https://www.npmjs.com/package/typeorm): 0.3.20

## 🚀 Executação do projeto
```bash
- $ npm run start:dev
```


## 🛣️ Rotas da API

### Auth 🔑
### 🟢 POST /auth
- **Descrição**: Faz o login e retornar um token.
- **Corpo da Requisição**:
```javascript
{
email: "fulano@ciclano.com.br",
password: "senha1234"
}
```


### Users 💁‍♂️

### 🟢 POST /users
- **Descrição**: Cadastra um usuário no sistema.
- **Corpo da Requisição**:
```javascript
{
	"userName": "Gabriel",
	"email": "gah@anacleto.com.br",
	"password": "senha1234"
}
```
- **Observação**:
- **Corpo da Requisição**:
```javascript
{
	"userName": "Gabriel",
	"email": "gah@anacleto.com.br",
	"password": "senha1234",
  "role" "admin"
}
```
- cria um usuário admin, necessário para deletar usuários.

### 🔵 GET /users/info/me
- **Descrição**: Retorna todas as informações do usuário logado, id, userName, tasks, etc... (**Precisa de autenticação**).
### 🔵 GET /users
- **Descrição**: Retorna todos os usuários cadastrados (**Precisa de autenticação, Precisa ser um usuário admin**).
### 🔵 GET /users/:id
- **Descrição**: Retorna o usuário com o id especificado (**Precisa de autenticação**).
- **Parâmetros**:
- `id`: Identificador único do usuário.

### 🟡 PATH user/:id
- **Descrição**: Atualiza o usuário, Precisa estar estar autenticado já que o id do usuário vem do token. (**Precisa de autenticação**).
- **Corpo da Requisição**:
- **Parâmetros**:
- `id`: Identificador único do usuário.
 ```javascript
{
name: "ciclano",
password: "senhanova123"
}
```

### 🔴 DELETE /user/:id
- **Descrição**: Remove um usuário correspondente ao id. (**Precisa de autenticação, Precisa ser um usuário admin**).
- **Parâmetros**:
- `id`: Identificador único do usuário.


### Tasks ✅

### 🟢 POST /tasks
- **Descrição**: Cadastra uma no task no sistema. (**Precisa de autenticação**).
- **Observação**:
- cada task é criada para o usuário logado.
- **Corpo da Requisição**:
```javascript
{
	"title": "First task",
	"description": "Creating first task."
}
```
- cria um usuário admin, necessário para deletar usuários.

### 🔵 GET /tasks
- **Descrição**: Retorna todas as tasks do sistema  (**Precisa de autenticação, Precisa ser um usuário admin**).
### 🔵 GET /tasks/:id
- **Descrição**: Retorna a task com o id especificado (**Precisa de autenticação**).
- **Parâmetros**:
- `id`: Identificador único da task.

### 🟡 PATH tasks/:id
- **Descrição**: Atualiza a task (**Precisa de autenticação**).
- **Corpo da Requisição**:
- **Parâmetros**:
- `id`: Identificador único da task.
 ```javascript
{
title: "task edit",
description: "edited task"
}
```

### 🔴 DELETE /tasks/:id
- **Descrição**: Remove uma task correspondente ao id. (**Precisa de autenticação, Precisa ser um usuário admin**).
- **Parâmetros**:
- `id`: Identificador único da task.

