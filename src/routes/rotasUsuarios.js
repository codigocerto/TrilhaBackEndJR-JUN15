const rotasUsuarios = require('express').Router();

const {criarTabelaPessoa,buscarPessoas, inserirPessoa, alterarPessoa, deletarPessoa} = require("../controllers/Pessoa");

criarTabelaPessoa();

//todos os usuarios
rotasUsuarios.get("/usuarios",  async (req, res) => {
    let pessoas = await buscarPessoas();
    return res.status(201).json(pessoas);
}
);

//usuario por id
rotasUsuarios.get("/usuario/:id", async (req, res) => {
    let pessoas = await buscarPessoas();
    let pessoa = pessoas.find(pessoa => pessoa.id === Number(req.params.id));
    return res.status(201).json(pessoa);
 }
);

//criar usuario
rotasUsuarios.post("/usuario", (req, res) => {
    inserirPessoa(req.body);
    res.status(201).json({
        message: "Usuário inserido com sucesso"
    });
});

//modificar usuario
rotasUsuarios.put("/usuario/:id", (req, res) => {
    let {id} = req.params;
    alterarPessoa(req.body, req.params.id);
    res.status(200).json({
        message: "Usuário alterado com sucesso"
    });
    }
);

//deletar usuario
rotasUsuarios.delete("/usuario/:id", (req, res) => {
    let {id} = req.params;
    deletarPessoa(id);
    res.status(200).json({
        message: "Usuário deletado com sucesso"
    });
    }
);

module.exports = rotasUsuarios;