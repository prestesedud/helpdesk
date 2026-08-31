const express = require("express");
const db = require("../database");
const router = express.Router();
const verificarToken = require("../middlewares/verificarToken");
const verificarAdmin = require("../middlewares/verificarAdmin");

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
  const { titulo, descricao, prioridade } = req.body;
  const prioridadeFinal = prioridade || "Média";
  const prioridadesValidas = ["Alta", "Média", "Baixa"];

  if (!titulo) {
    res.status(400).json({
      message: "Por favor, insira um título!",
    });
    return;
  }

  if (!descricao) {
    res.status(400).json({
      message: "O campo descrição não pode estar vazio, favor, preenche-lo!",
    });
    return;
  }

  if (!prioridadesValidas.includes(prioridadeFinal)) {
    res.status(400).json({ message: "Prioridade inválida!" });
    return;
  }

  const chamado = db.prepare(
    "INSERT INTO chamados (titulo, descricao, prioridade) VALUES (?, ?, ?)",
  );
  const resultado = chamado.run(titulo, descricao, prioridadeFinal);
  const novoId = resultado.lastInsertRowid;
  const novoChamado = db
    .prepare("SELECT * FROM chamados WHERE id = ?")
    .get(novoId);
  res.status(201).json(novoChamado);
});

router.delete("/:id", verificarAdmin, (req, res) => {
  const chamadoId = parseInt(req.params.id);
  const chamado = db.prepare("DELETE FROM chamados WHERE id = ?");
  const resultado = chamado.run(chamadoId);
  if (resultado.changes > 0) {
    res.json({ message: "Chamado deletado com sucesso!" });
  } else {
    res.status(404).json({ message: "Chamado não encontrado!" });
  }
});

//PATCH só permite atualizar status e prioridade-
//título/descrição são imutáveis
router.patch("/:id", verificarAdmin, (req, res) => {
  const chamadoId = parseInt(req.params.id);
  const chamadoAtual = db
    .prepare("SELECT * FROM chamados WHERE id = ?")
    .get(chamadoId);

  if (!chamadoAtual) {
    return res.status(404).json({ message: "Chamado não encontrado!" });
  }
  const statusFinal = req.body.status || chamadoAtual.status;
  const statusValidos = ["Aberto", "Em atendimento", "Pausado", "Fechado"];
  if (!statusValidos.includes(statusFinal)) {
    res.status(400).json({
      message: "Status inválido",
    });
    return;
  }
  const prioridadeFinal = req.body.prioridade || chamadoAtual.prioridade;
  const prioridadesValidas = ["Alta", "Média", "Baixa"];
  if (!prioridadesValidas.includes(prioridadeFinal)) {
    res.status(400).json({
      message: "Prioridade inválida!",
    });
    return;
  }
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
