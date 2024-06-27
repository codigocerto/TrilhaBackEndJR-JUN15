[NODEJS__BADGE]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express

<h1 align="center" style="font-weight: bold;">Trilha Inicial BackEnd Jr 💻</h1>

<div align="center">

![nodejs][NODEJS__BADGE]
![typescript][TYPESCRIPT__BADGE]
![express][EXPRESS__BADGE]

</div>

<p align="center">
  <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
  <a href="#colab">Collaborators</a> •
  <a href="#contribute">Contribute</a>
</p>

<p align="center">
  <b>Project developed for the challenge proposed by Código Certo. A simple API for task management.</b>
</p>

<h2 id="started">🚀 Getting started</h2>

See below for instructions on how to run this project locally.

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project:

- [NodeJS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Git 2](https://git-scm.com/)

<h3>Cloning</h3>

How to clone this project

```bash
git clone https://github.com/emersonbbezerra/TrilhaBackEndJR-JUN15.git
```

<h3> Environment Variables</h2>

Use the code below as a reference to create your `.env` configuration file by adding your MongoDB URL.

```yaml
DATABASE_URL=file:./location_of_the_.db_file_on_your_machine
ACCESS_KEY_TOKEN="create_a_secret_key_for_the_jsonwebtoken"
```

<h3>Installing</h3>

How to install the dependencies of this project.

```bash
cd TrilhaBackEndJR-JUN15-main
npm install
```

<h3>Starting</h3>

How to start.

```bash
npm run dev
```

The api will start on port 3000.

<h2 id="routes">📍 API Endpoints</h2>

This api covers two route branches: `/users` and `/tasks`

<h3 id="users_routes">Users Routes</h3>

​
| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /users</kbd> | register an user in the database [post details](#post-user)
| <kbd>POST /users/login</kbd> | log a user into the api [login details](#post-login)
| <kbd>GET /users/tasks/:userId</kbd> | returns user tasks [get details](#get-tasks-user)
| <kbd>PUT /users/:id</kbd> | update user by id [update details](#put-user)
| <kbd>DELETE /users/:id</kbd> | delete the user by id [delete details](#delete-user)

<h3 id="post-user">POST <kbd>/users</kbd></h3>

All fields are mandatory and the password must have at least 8 characters, including 1 uppercase letter, 1 lowercase letter and 1 special character.

**REQUEST**

```json
{
  "name": "Sicrano",
  "email": "sicrano@email.com",
  "password": "Sicrano1#"
}
```

**RESPONSE: <kbd>201 Created</kbd>**

```json
{
  "id": "546d1f2d-68a5-49ec-966b-dc79447ef589",
  "name": "Sicrano",
  "email": "sicrano@email.com"
}
```

If there is already an user registered with the same email, the API returns the message:

**RESPONSE: <kbd>400 Bad Request</kbd>**

```json
{
  "error": "User with this email already exists"
}
```

<h3 id="post-login">POST <kbd>/users/login</kbd></h3>

**REQUEST**

```json
{
  "email": "sicrano@email.com",
  "password": "Sicrano1#"
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0NmQxZjJkLTY4YTUtNDllYy05NjZiLWRjNzk0NDdlZjU4OSIsImlhdCI6MTcxOTQ1MjE1NSwiZXhwIjoxNzE5NDU1NzU1fQ.-SyYWh3dz83l0TCfOLcHL83Q-xbA64XyLl0w9_PNfIA",
  "userId": "546d1f2d-68a5-49ec-966b-dc79447ef589",
  "userName": "Sicrano"
}
```

If the email or password is incorrect, the API returns the message:

**RESPONSE: <kbd>400 Bad Request</kbd>**

```json
{
  "error": "Invalid email or password"
}
```

<h3 id="get-tasks-user">GET <kbd>/users/tasks/546d1f2d-68a5-49ec-966b-dc79447ef589</kbd></h3>

**RESPONSE**

```json
[
  {
    "id": "375377e0-1d1a-487d-b89d-f36634c25faa",
    "title": "Tarefa de Sicrano",
    "description": "Tarefa criada por Sicrano",
    "completed": false,
    "userId": "546d1f2d-68a5-49ec-966b-dc79447ef589",
    "userName": "Sicrano"
  }
]
```

If there is no task registered for the user, the API returns the message:

**RESPONSE: <kbd>404 Not Found</kbd>**

```json
{
  "error": "No tasks found for this user"
}
```

If the user is not logged in, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "Unauthorized: Invalid token"
}
```

If the user tries to list another user's tasks, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "You are not authorized to view these tasks"
}
```

<h3 id="put-user">PUT <kbd>/users/546d1f2d-68a5-49ec-966b-dc79447ef589</kbd></h3>

You can update the following data for a user: name, email or password. It is possible to update just one piece of data at a time or all of a user's data. To update your password, you must submit your old and new password. The new password must also have at least 8 characters, including 1 uppercase letter, 1 lowercase letter and 1 special character.

**REQUEST**

```json
{
  "name": "Sicrano Atualizado"
}
```

<kbd>Or</kbd>

```json
{
  "email": "sicrano.atualizado@email.com"
}
```

<kbd>Or</kbd>

```json
{
  "oldPassword": "Sicrano1#",
  "newPassword": "Sicrano2#"
}
```

**RESPONSE: <kbd>200 Ok</kbd>**

```json
{
  "id": "546d1f2d-68a5-49ec-966b-dc79447ef589",
  "name": "Sicrano Atualizado",
  "email": "sicrano.atualizado@email.com"
}
```

If the user is not found in the database, the API returns the message:

**RESPONSE: <kbd>404 Not Found</kbd>**

```json
{
  "error": "User not found"
}
```

If the user is not logged in, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "Unauthorized: Invalid token"
}
```

If the user tries to update another user, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "Unauthorized"
}
```

<h3 id="delete-user">DELETE <kbd>/users/546d1f2d-68a5-49ec-966b-dc79447ef589</kbd></h3>

**RESPONSE: <kbd>204 No Content</kbd>**

```json

  No body returned for response

```

If the user is not found in the database, the API returns the message:

**RESPONSE: <kbd>404 Not Found</kbd>**

```json
{
  "error": "User not found"
}
```

If the user is not logged in, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "Unauthorized: Invalid token"
}
```

If the user tries to delete another user, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "Unauthorized"
}
```

<h3 id="tasks_routes">Tasks Routes</h3>

​
| routes | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /tasks</kbd> | register an task in the database [post details](#post-task)
| <kbd>GET /tasks/:taskId</kbd> | returns a task by id [response details](#get-task)
| <kbd>PUT /tasks/:taskId</kbd> | update a task by id [patch details](#put-task)
| <kbd>DELETE /tasks/:taskId</kbd> | delete the task by id [response details](#delete-task)

<h3 id="post-task">POST <kbd>/tasks</kbd></h3>

**REQUEST**

```json
{
  "title": "Tarefa de Sicrano",
  "description": "Tarefa criada por Sicrano",
  "userId": "546d1f2d-68a5-49ec-966b-dc79447ef589"
}
```

**RESPONSE: <kbd>201 Created</kbd>**

```json
{
  "id": "375377e0-1d1a-487d-b89d-f36634c25faa",
  "title": "Tarefa de Sicrano",
  "description": "Tarefa criada por Sicrano",
  "completed": false,
  "userId": "546d1f2d-68a5-49ec-966b-dc79447ef589",
  "userName": "Sicrano"
}
```

If a task already exists, registered in the database, with the same title and created by the same user, the API returns the message:

**RESPONSE: <kbd>400 Bad Request</kbd>**

```json
{
  "error": "Task with the same title already exists for this user"
}
```

If the user is not logged in, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "Unauthorized: Invalid token"
}
```

If a user tries to create a task on behalf of another user, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "You can only create tasks for your own account"
}
```

<h3 id="get-task">GET <kbd>/tasks/375377e0-1d1a-487d-b89d-f36634c25faa</kbd></h3>

**RESPONSE: <kbd>200 OK</kbd>**

```json
{
  "id": "375377e0-1d1a-487d-b89d-f36634c25faa",
  "title": "Tarefa de Sicrano",
  "description": "Tarefa criada por Sicrano",
  "completed": false,
  "userId": "546d1f2d-68a5-49ec-966b-dc79447ef589",
  "userName": "Sicrano"
}
```

If the task is not found in the database, the API returns the message:

**RESPONSE: <kbd>404 Not Found</kbd>**

```json
{
  "error": "Task not found"
}
```

If the user is not logged in, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "Unauthorized: Invalid token"
}
```

If the user tries to list another user's tasks, the API returns the message:

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "error": "You are not authorized to view this task"
}
```

<h3 id="put-task">PUT /tasks/375377e0-1d1a-487d-b89d-f36634c25faa</h3>

You can update the following data in an task: `title`, `description` and `completed`.
It's possible to update just one piece of data at a time or all of the data for an task.

**REQUEST**

```json
{
  "title": "Tarefa de Sicrano Atualizada",
  "description": "Atualizada por ele mesmo",
  "completed": true
}
```

**RESPONSE: <kbd>401 Unauthorized</kbd>**

```json
{
  "id": "375377e0-1d1a-487d-b89d-f36634c25faa",
  "title": "Tarefa de Sicrano Atualizada",
  "description": "Atualizada por ele mesmo",
  "completed": false,
  "userId": "546d1f2d-68a5-49ec-966b-dc79447ef589",
  "userName": "Sicrano"
}
```

If the request is to update the product name, it cannot be the same as one previously registered. If it already exists in the database, the API returns the message:

```json
{
  "status": 400,
  "message": "There is already a product registered with that name. His id is: (here it shows the id of the existing product)"
}
```

<h3 id="delete-product">DELETE /products/6643dfb05bdf22de8c852bcc</h3>

**RESPONSE**

```json
{
  "message": "Product deleted successfully."
}
```

If the product with the specified ID is not found, the API returns the message:

```json
{
  "status": 404,
  "message": "Product not found."
}
```

<h2 id="colab">🤝 Collaborators</h2>

Be part of this project and appear here in the hall of fame!

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/120873878?v=4" width="100px;" alt="Emerson Bezerra"/><br>
        <sub>
          <b>Emerson Bezerra (Creator)</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://t.ctcdn.com.br/n7eZ74KAcU3iYwnQ89-ul9txVxc=/400x400/smart/filters:format(webp)/i490769.jpeg" width="100px;" alt="Elon Musk Picture"/><br>
        <sub>
          <b>Elon Musk</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://miro.medium.com/max/360/0*1SkS3mSorArvY9kS.jpg" width="100px;" alt="Foto do Steve Jobs"/><br>
        <sub>
          <b>Steve Jobs</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h2 id="contribute">📫 Contribute</h2>

Thank you for considering contributing to CandyCost! To contribute, please follow these steps:

1. **Fork the repository**: Click on the 'Fork' button at the top right of this page to create a copy of the repository in your GitHub account.

2. **Clone the repository**: Clone your forked repository to your local machine using:

   ```bash
   git clone https://github.com/your-username/candycosts.git
   ```

3. **Create a new branch**: Create a new branch for your feature or bugfix using:

   ```bash
   git checkout -b feature-or-bugfix-name
   ```

4. **Make your changes**: Make the necessary changes to the codebase.

5. **Commit your changes**: Commit your changes with a descriptive commit message using:

   ```bash
   git commit -m "Description of the feature or bugfix"
   ```

6. **Push your changes**: Push your changes to your forked repository using:

   ```bash
   git push origin feature-or-bugfix-name
   ```

7. **Create a Pull Request**: Open a Pull Request to merge your changes into the main repository. Make sure to include a detailed description of your changes.

<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/emersonbbezerra/candycosts?tab=MIT-1-ov-file#readme) file for details.
