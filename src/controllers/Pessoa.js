const openDB = require('../database/configDB');


const criarTabelaPessoa = async () =>{
    const criarTabelaPessoa = await openDB();
    await criarTabelaPessoa.run(`
        CREATE TABLE IF NOT EXISTS Pessoa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            idade INTEGER NOT NULL
        )
    `);
}

const inserirPessoa =  async(req, res) =>{
    const inserirPessoaDB = await openDB();
    await inserirPessoaDB.run(`
        INSERT INTO Pessoa (nome, idade) VALUES (?, ?)
    `, [req.nome, req.idade], (err) =>{
        if(err){
            return res.status(400).json({
                error: err.message
            });
        }
        res.status(201).json({
            message: "Usuário inserido com sucesso"
        });
    });
}


module.exports = {criarTabelaPessoa, inserirPessoa};