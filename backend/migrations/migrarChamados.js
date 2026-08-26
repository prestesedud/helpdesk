const db = require("../database");
const chamados = require("../data/chamados");

db.prepare("DELETE FROM chamados").run();

const inserir = db.prepare(
  "INSERT INTO chamados (id, titulo, descricao, status) VALUES (?, ?, ?, ?)",
);

for (const chamado of chamados) {
  inserir.run(chamado.id, chamado.titulo, chamado.descricao, chamado.status);
}

console.log("Chamados migrados com sucesso!");
