# Como foi construir esse projeto?

Foi algo bem desafiador por eu não ter usado o express puro ainda, apenas tinha usado o fastify e nestJS(_que usa o express como base_). Mas por outro lado acabou sendo mais tranquilo por que esse tipo de aplicação eu ja vinha desenvolvendo para uma outra aplicação pessoal que venho trabalhando o [MeuPet](https://jefersonsann.com/projects/meupet/), um projeto pessoal feito em next.js que estou passando a logica de negocio para nestJS.

Uma das coisas que me fez perder bastante tempo era que usando o Express eu precisava passa o `app.use(json())` para o corpo da requisição ser recebida(_eu não sabia_), por usar framework e bibliotecas que ja vem com isso configurado.

E em algumas partes como no **service** eu resolvi usar classes ao invés de function ou arrow function por questão de organização.

Mas no fim foi muito gratificante e prazeroso realizar esse projeto.
Estou aberto para dicas e sugestões.

## 1 - Mapear tudo o que era pedido e saber se eu era capaz de realizar(mais é logico que sim!)

- [x] Criar uma API que permita CRUD (Create, Read, Update, Delete) de tarefas.

- [x] Implementar autenticação de usuários.

- [x] Utilizar um banco de dados SQLite para armazenar as tarefas.

- [ ] \(Optional) Documentar todo o processo e apresentar as conclusões.

> [!NOTE]
> Estou utilizando o SQLite junto com o Prisma ORM

## 2 - Requisitos Funcionais:

- [x] Criar Tarefa: Endpoint para criar uma nova tarefa.

```
/api/task
```

É obrigatório para criar uma task:

- [x] O usuário estar autenticado
- [x] Passa um titulo e uma descrição

```
# Exemplo:
{
  "title": "Task Title",
  "description": "Task Description"
}
```

- [x] Listar Tarefas: Endpoint para listar todas as tarefas.

```
/api/task
```

Rota para listar todos as tarefas(tasks)

- [x] Atualizar Tarefa: Endpoint para atualizar uma tarefa existente.

```
/api/task
```

É obrigatório para atualizar uma task:

- [x] O usuário estar autenticado
- [x] A task ter sido ele quem a criou
- [x] Passa um titulo ou uma nova descrição

```
# Exemplo:
{
  "title": "Task Title 2",
  "description": "Other Description"
}
```

- [x] Deletar Tarefa: Endpoint para deletar uma tarefa existente.

```
/api/task
```

É obrigatório para deletar uma task:

- [x] O usuário estar autenticado
- [x] O Id deve ser informado como parâmetro na url
- [x] O usuário autenticado ter criado a task

> [!NOTE]
>
> Em routes é o local onde especifico o caminho base para cada Endpoint
>
> **routes.use('/api/task', Tasks);** // é o caminho base para os endpoint de tasks
> Ja no controller de _src/tasks_ é onde eu indico o final de cada rota e os middleware caso necessário

## 3 - Autenticação de Usuários:

- [x] Registro de Usuário: Endpoint para registrar um novo usuário.
- [x] Login de Usuário: Endpoint para autenticar um usuário e gerar um token JWT.
- [x] Proteção de Rotas: Garantir que apenas usuários autenticados possam acessar os endpoints de tarefas.

## 4 - Banco de Dados:

- [x] Utilizar SQLite como banco de dados para armazenar informações de usuários e tarefas.

### Tabela "users" no banco de dados:

| column     | type      | more    |
| ---------- | --------- | ------- |
| id         | String    | cuid()  |
| name       | String    |
| email      | String    | @unique |
| password   | String    |
| tasks      | Task[]    |
| comments   | Comment[] |
| sessions   | Session[] |
| created_at | DateTime  |
| updated_at | DateTime  |

### Tabela "sessions" no banco de dados:

| column     | type     | more           |
| ---------- | -------- | -------------- |
| id         | String   | cuid()         |
| userId     | String   |
| token      | String   | @unique        |
| active     | Boolean  | @default(true) |
| created_at | DateTime |
| updated_at | DateTime |

> [!NOTE]
> Resolvi criar a autenticação em sessão separada, por achar ser mais fácil de controlar e implementar seguranças como refresh token, IP do usuário, seções em diversos aplicativos ou navegadores, ou seja, o que a aplicação pedir conforme ela se expandir.

### Tabela "tasks" no banco de dados:

| column      | type      | more    |
| ----------- | --------- | ------- |
| id          | String    | cuid()  |
| title       | String    |
| description | String    |
| slug        | String    | @unique |
| userId      | String    |
| comments    | Comment[] |
| created_at  | DateTime  |
| updated_at  | DateTime  |

# Como rodar esse projeto?

## 🚀 Configuração Inicial Local

#### 1. Clone o repositório:

```
git clone https://github.com/jefersonsann/TrilhaBackEndJR-JUN15.git
```

Ou fork

```
git clone https://github.com/<SEU_USERNAME>/TrilhaBackEndJR-JUN15.git
```

#### 2. Clone o arquivo .env de exemplo `.env.example`:

Ou use o comando abaixo

```
cp .env.example > .env
```

#### 3. Instale as dependências:

```
$ npm install
$ npx prisma generate
$ npx prisma migrate dev
```

#### 4. Iniciando a aplicação como dev:

```
$ npm run start:dev
```

#### 5. Fazendo deploy:

```
$ npm run build
```

Iniciando a aplicação após deploy

```
$ npm run start
```

A API estará disponível em <http://localhost:3333>.

## Author

- [Jeferson Santos](https://jefersonsann.com) | [GitHub](https://github.com/jefersonsann)
