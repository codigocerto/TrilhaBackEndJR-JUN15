[NODEJS__BADGE]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express

<h1 align="center" style="font-weight: bold;">Trilha Inicial BackEnd Jr 💻</h1>

![nodejs][NODEJS__BADGE]
![typescript][TYPESCRIPT__BADGE]
![express][EXPRESS__BADGE]

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
| <kbd>POST /users/login</kbd> | log a user into the api [response details](#post-login)
| <kbd>PUT /users/:id</kbd> | update user by id [response details](#put-user)
| <kbd>DELETE /users/:id</kbd> | delete the user by id [response details](#delete-user)

<h3 id="post-user">POST /users</h3>

All fields are mandatory and the password must have at least 8 characters, including 1 uppercase letter, 1 lowercase letter and 1 special character.

**REQUEST**

```json
{
  "name": "Sicrano",
  "email": "sicrano@email.com",
  "password": "Sicrano1#"
}
```

**RESPONSE (201 Created)**

```json
{
  "id": "a6d0ccee-cfdb-4270-9df6-b0221811c81a",
  "name": "Sicrano",
  "email": "sicrano@email.com"
}
```

If there is already an user registered with the same email, the API will return the error:

**RESPONSE (400 Bad Request)**

```json
{
  "error": "User with this email already exists"
}
```

<h3 id="post-login">POST /users/login</h3>

**REQUEST**

```json
{
  "email": "sicrano@email.com",
  "password": "Sicrano1#"
}
```

**RESPONSE (200 Ok)**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2ZDBjY2VlLWNmZGItNDI3MC05ZGY2LWIwMjIxODExYzgxYSIsImlhdCI6MTcxOTM0NjExNCwiZXhwIjoxNzE5MzQ5NzE0fQ.3B-AaWD7hEwv61yNbrFiZH6bleqQB51ubuD3xES6Mp8",
  "userId": "a6d0ccee-cfdb-4270-9df6-b0221811c81a"
}
```

If the email or password is incorrect, the API will return the error:

**RESPONSE (400 Bad Request)**

```json
{
  "error": "Invalid email or password"
}
```

<h3 id="put-user">PUT /users/a6d0ccee-cfdb-4270-9df6-b0221811c81a</h3>

You can update the following data for a user: name, email or password. It is possible to update just one piece of data at a time or all of a user's data. To update your password, you must submit your old and new password. The new password must also have at least 8 characters, including 1 uppercase letter, 1 lowercase letter and 1 special character.

**REQUEST**

```json
{
  "name": "Sicrano Atualizado"
}
```

Or

```json
{
  "email": "sicrano.atualizado@email.com"
}
```

Or

```json
{
  "oldPassword": "Sicrano1#",
  "newPassword": "Sicrano2#"
}
```

**RESPONSE (200 Ok)**

```json
{
  "id": "a6d0ccee-cfdb-4270-9df6-b0221811c81a",
  "name": "Sicrano Atualizado",
  "email": "sicrano.atualizado@email.com"
}
```

If the user is not found in the database, the API will return the error:

**RESPONSE (404 Not Found)**

```json
{
  "error": "User not found"
}
```

If the user is not logged in, the API will return the error:

**RESPONSE (401 Unauthorized)**

```json
{
  "error": "Unauthorized: Invalid token"
}
```

If the user tries to update another user, the API will return the error:

**RESPONSE (401 Unauthorized)**

```json
{
  "error": "Unauthorized"
}
```

<h3 id="delete-user">DELETE /users/a6d0ccee-cfdb-4270-9df6-b0221811c81a</h3>

**RESPONSE (204 No Content)**

```json

  No body returned for response

```

If the user is not found in the database, the API will return the error:

**RESPONSE (404 Not Found)**

```json
{
  "error": "User not found"
}
```

If the user is not logged in, the API will return the error:

**RESPONSE (401 Unauthorized)**

```json
{
  "error": "Unauthorized: Invalid token"
}
```

If the user tries to delete another user, the API will return the error:

**RESPONSE (401 Unauthorized)**

```json
{
  "error": "Unauthorized"
}
```

<h3 id="products_routes">Products Routes</h3>

​
| route | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /products</kbd> | register an product in the database [post details](#post-product)
| <kbd>GET /products</kbd> | list registered products [response details](#get-products)
| <kbd>GET /products/:id</kbd> | returns the product by id [response details](#get-product-id)
| <kbd>PATCH /products/:id</kbd> | update the product by id [patch details](#patch-product)
| <kbd>DELETE /products/:id</kbd> | delete the product by id [response details](#delete-product)

<h3 id="post-product">POST /products</h3>

**REQUEST**

```json
{
  "name": "Chocolate Cake",
  "description": "Traditional cocoa dough.",
  "ingredients": [
    { "ingredientId": "663fe21776042a97733486c7", "amount": 2 },
    { "ingredientId": "663fe29f76042a97733486cf", "amount": 2 },
    { "ingredientId": "663fe2de76042a97733486d5", "amount": 2 },
    { "ingredientId": "663fe32976042a97733486db", "amount": 2 }
  ]
}
```

**RESPONSE**

```json
{
  "message": "Product registered successfully."
}
```

If there is already an product registered with the same name in the database, the API will return the error:

```json
{
  "message": "There is already a product registered with that name."
}
```

<h3 id="get-products">GET /products</h3>

**RESPONSE**

```json
[
  {
    "_id": "6643d83675c8e4f5f7543e1a",
    "name": "Chocolate Cake",
    "description": "Traditional cocoa dough.",
    "ingredients": [
      {
        "ingredientId": "663fe21776042a97733486c7",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d79"
      },
      {
        "ingredientId": "663fe29f76042a97733486cf",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d7a"
      },
      {
        "ingredientId": "663fe2de76042a97733486d5",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d7b"
      },
      {
        "ingredientId": "663fe32976042a97733486db",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d7c"
      }
    ],
    "cost": 77.72,
    "createdAt": "2024-05-20T14:11:11.077Z",
    "__v": 0
  },
  {
    "_id": "6643dfb05bdf22de8c852bcc",
    "name": "Coconut cake",
    "description": "Cake with creamy coconut filling.",
    "ingredients": [
      {
        "ingredientId": "663fe21776042a97733486c7",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d79"
      },
      {
        "ingredientId": "663fe29f76042a97733486cf",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d7a"
      },
      {
        "ingredientId": "663fe2de76042a97733486d5",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d7b"
      },
      {
        "ingredientId": "663fe32976042a97733486db",
        "amount": 2,
        "_id": "664b59ffa5f9f4fc1eb21d7c"
      }
    ],
    "cost": 38.86,
    "createdAt": "2024-05-20T14:11:11.077Z",
    "__v": 0
  }
]
```

<h3 id="get-product-id">GET /products/6643dfb05bdf22de8c852bcc</h3>

**RESPONSE**

```json
{
  "_id": "6643dfb05bdf22de8c852bcc",
  "name": "Coconut cake",
  "description": "Cake with creamy coconut filling.",
  "ingredients": [
    {
      "ingredientId": "663fe21776042a97733486c7",
      "amount": 2,
      "_id": "664b59ffa5f9f4fc1eb21d79"
    },
    {
      "ingredientId": "663fe29f76042a97733486cf",
      "amount": 2,
      "_id": "664b59ffa5f9f4fc1eb21d7a"
    },
    {
      "ingredientId": "663fe2de76042a97733486d5",
      "amount": 2,
      "_id": "664b59ffa5f9f4fc1eb21d7b"
    },
    {
      "ingredientId": "663fe32976042a97733486db",
      "amount": 2,
      "_id": "664b59ffa5f9f4fc1eb21d7c"
    }
  ],
  "cost": 38.86,
  "createdAt": "2024-05-20T14:11:11.077Z",
  "__v": 0
}
```

If the product with the specified ID is not found, the API will return the error:

```json
{
  "status": 404,
  "message": "Product not found."
}
```

<h3 id="patch-product">PATCH /products/6643dfb05bdf22de8c852bcc</h3>

**REQUEST**

You can update the following data in an product: `name`, `description` and `ingredients`.
It's possible to update just one piece of data at a time or all of the data for an product.

```json
{
  "name": "Creamy Coconut Cake"
}
```

Or

```json
{
  "ingredients": [
    {
      "ingredientId": "663fe21776042a97733486c7",
      "amount": 1.5,
      "_id": "664b59ffa5f9f4fc1eb21d79"
    },
    {
      "ingredientId": "663fe29f76042a97733486cf",
      "amount": 2.5,
      "_id": "664b59ffa5f9f4fc1eb21d7a"
    },
    {
      "ingredientId": "663fe2de76042a97733486d5",
      "amount": 1,
      "_id": "664b59ffa5f9f4fc1eb21d7b"
    },
    {
      "ingredientId": "663fe32976042a97733486db",
      "amount": 0.5,
      "_id": "664b59ffa5f9f4fc1eb21d7c"
    }
  ]
}
```

**RESPONSE**

```json
{
  "message": "Product updated successfully."
}
```

If the request is to update the product name, it cannot be the same as one previously registered. If it already exists in the database, the API will return the error:

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

If the product with the specified ID is not found, the API will return the error:

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
