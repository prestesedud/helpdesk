const Database = require("better-sqlite3");
require("dotenv").config();
let nomeDoBanco;
if (process.env.NODE_ENV === "test") {
  nomeDoBanco = "helpdesk-test.db";
} else {
  nomeDoBanco = process.env.BANCO_DADOS || "helpdesk.db";
}
const db = new Database(nomeDoBanco);

console.log(
  `[Banco de dados] Conectado com sucesso ao arquivo: ${nomeDoBanco}`,
);

db.exec(`
  CREATE TABLE IF NOT EXISTS chamados (
    id INTEGER PRIMARY KEY,
    titulo TEXT,
    descricao TEXT,
    status TEXT DEFAULT 'Aberto'
    )`);

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT,
    role TEXT DEFAULT 'usuario'
  )`);

module.exports = db;
