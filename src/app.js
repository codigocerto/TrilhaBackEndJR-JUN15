const express = require("express");
require("dotenv").config();
const {criarTabelaPessoa, inserirPessoa} = require("./controllers/Pessoa");
const app = express();

app.use(express.json());

criarTabelaPessoa();

app.get("/", (req, res) => {
    res.send("ola mundo");
    }
);

app.post("/usuario", (req, res) => {
    inserirPessoa(req.body);
    res.status(201).json({
        message: "Usuário inserido com sucesso"
    });
});


app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORTA}`);
    }
);


