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

## Como Instalar e Usar a API

- Pode ser acessada pelo link do deploy:

```bash
https://trilhabackendjr.onrender.com/
```

- 1 Clone o repositório
```bash
git clone git@github.com:matheusgmello/TrilhaBackEndJR-JUN15.git
```
- 2 Instale as dependências
```bash
mvn clean install
```
- 3 Inicie o servidor
```bash
mvn spring-boot:run
```
- 4 API ficara disponivel na url
```bash
http://localhost:8080
```

### Rotas 

- Acesse a documentação dos Endpoints através do Swagger

   * Localmente `http://localhost:8080/swagger-ui/index.html#/`
   * Deploy `https://trilhabackendjr.onrender.com/swagger-ui/index.html#/`

```markdown

### Rotas de Autenticacao

POST /usuario/register - Registra um novo usuário

{
  "usuario": "string",
  "senha": "string"
}

POST /usuario/login - Realiza o Login do usuário, gerando um token de acesso

{
  "usuario": "string",
  "senha": "string"
}

### Rotas do usuário

**Necessita estar autenticado**

GET /usuario - Lista todos usuários registrados

PUT /usuario/{ID} - Atualiza o usuário com o ID fornecido

{
  "usuario": "string",
  "senha": "string"
}

DELETE /usuario/{ID} - Deleta o usuário com o ID fornecido

### Rotas de Tarefas

**Necessita estar autenticado**

POST /tarefa - Registra uma nova tarefa

{
  "tarefaId": 0,
  "descricao": "string",
  "status": "PENDENTE"
}

GET /tarefa - Lista todas as tarefas registradas

PUT /tarefa/{ID} - Altera a tarefa com o ID fornecido

{
  "tarefaId": 2,
  "descricao": "string",
  "status": "PENDENTE"
}

DELETE /tarefa/{ID} - Deleta a tarefa com o ID fornecido

```
## Conecte-se comigo
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/matheusgmello)
[![Reddit](https://img.shields.io/badge/Reddit-%23FF4500.svg?style=for-the-badge&logo=Reddit&logoColor=white)](https://www.reddit.com/user/math7zw)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/matheusgmello/)