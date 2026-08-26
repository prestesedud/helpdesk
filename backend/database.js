const Database = require("better-sqlite3");
const db = new Database("helpdesk.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS chamados (
    id INTEGER PRIMARY KEY,
    titulo TEXT,
    descricao TEXT,
    status TEXT DEFAULT 'Aberto'
    )`);

module.exports = db;
