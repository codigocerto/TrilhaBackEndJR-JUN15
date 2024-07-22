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
    await criarTabelaPessoa.close();
}

const buscarPessoas = async () =>{
    const buscarPessoasDB = await openDB();
    let pessoas = await buscarPessoasDB.all(`SELECT * FROM Pessoa`);
    return pessoas;
}

const inserirPessoa =  async(pessoa) =>{
    const inserirPessoaDB = await openDB();
    await inserirPessoaDB.run(`
        INSERT INTO Pessoa (nome, idade) VALUES (?, ?)
    `, [pessoa.nome, pessoa.idade], (err) =>{
        if(err){
            return res.status(400).json({
                error: err.message
            });
        }
        return res.status(201).json({
            message: "Usuário inserido com sucesso"
        });
    });
    await inserirPessoaDB.close();
}

const alterarPessoa =  async (pessoa, id) =>{
    const alterarPessoaDB = await openDB();
    
    await alterarPessoaDB.run(`
        UPDATE Pessoa SET nome = ?, idade = ? WHERE id = ?
    `, [pessoa.nome, pessoa.idade, id], (err) =>{
        if(err){
            return res.status(400).json({
                error: err.message
            });
        }
        return res.status(200).json({
            message: "Usuário alterado com sucesso"
        });
    });
    await alterarPessoaDB.close();
}

const deletarPessoa =  async (id) =>{
    const deletarPessoaDB = await openDB();
    await deletarPessoaDB.run(`
        DELETE FROM Pessoa WHERE id = ?
    `, [Number(id)], (err) =>{
        if(err){
            return res.status(400).json({
                error: err.message
            });
        }
        return res.status(200).json({
            message: "Usuário deletado com sucesso"
        });
    });
    await deletarPessoaDB.close();
}


module.exports = {criarTabelaPessoa,buscarPessoas, inserirPessoa, alterarPessoa, deletarPessoa};