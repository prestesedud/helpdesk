const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  const chamados = db.prepare("SELECT * FROM chamados").all();
  res.json(chamados);
});

router.get("/:id", (req, res) => {
  const chamadoId = parseInt(req.params.id);
  const chamado = db
    .prepare("SELECT * FROM chamados WHERE id = ?")
    .get(chamadoId);
  if (chamado) {
    res.json(chamado);
  } else {
    res.status(404).json({ message: "Chamado não encontrado!" });
  }
});

router.post("/", (req, res) => {
  const { titulo, descricao } = req.body;
  const chamado = db.prepare(
    "INSERT INTO chamados (titulo, descricao) VALUES (?, ?)",
  );
  const resultado = chamado.run(titulo, descricao);
  const novoId = resultado.lastInsertRowid;
  const novoChamado = db
    .prepare("SELECT * FROM chamados WHERE id = ?")
    .get(novoId);
  res.status(201).json(novoChamado);
});

router.delete("/:id", (req, res) => {
  const chamadoId = parseInt(req.params.id);
  const chamado = db.prepare("DELETE FROM chamados WHERE id = ?");
  const resultado = chamado.run(chamadoId);
  if (resultado.changes > 0) {
    res.json({ message: "Chamado deletado com sucesso!" });
  } else {
    res.status(404).json({ message: "Chamado não encontrado!" });
  }
});

router.patch("/:id", (req, res) => {
  const chamadoId = parseInt(req.params.id);
  const chamadoAtual = db
    .prepare("SELECT * FROM chamados WHERE id = ?")
    .get(chamadoId);

  if (!chamadoAtual) {
    return res.status(404).json({ message: "Chamado não encontrado!" });
  }
  const statusFinal = req.body.status || chamadoAtual.status;
  const prioridadeFinal = req.body.prioridade || chamadoAtual.prioridade;
  db.prepare("UPDATE chamados SET status = ?, prioridade = ? WHERE id = ?").run(
    statusFinal,
    prioridadeFinal,
    chamadoId,
  );
  const chamadoAtualizado = db
    .prepare("SELECT * FROM chamados WHERE id = ?")
    .get(chamadoId);
  res.json(chamadoAtualizado);
});

module.exports = router;
