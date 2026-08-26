const db = require("../database");

db.exec("ALTER TABLE chamados ADD COLUMN prioridade TEXT DEFAULT 'Média'");

console.log("Coluna prioridade adicionada com sucesso!");
