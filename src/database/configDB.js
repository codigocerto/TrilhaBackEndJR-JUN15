// Exporta a função openDB que abre a conexão com o banco de dados SQLite

const sqlite = require('sqlite3').verbose();
const { open } = require('sqlite');

async function openDB() {
    return open({
        filename: './src/database.sqlite',
        driver: sqlite.Database
    });
}

module.exports = openDB;

