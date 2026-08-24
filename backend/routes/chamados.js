const express = require("express");
const chamados = require("../data/chamados");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(chamados);
});

router.get("/:id", (req, res) => {
  const chamadoId = parseInt(req.params.id);
  const chamado = chamados.find((c) => c.id === chamadoId);
  if (chamado) {
    res.json(chamado);
  } else {
    res.status(404).json({ message: "Chamado não encontrado!" });
  }
});

router.post("/", (req, res) => {
  const { titulo, descricao } = req.body;
  const novoChamado = {
    id: chamados.length + 1,
    titulo,
    descricao,
    status: "Aberto",
  };
  chamados.push(novoChamado);
  res.status(201).json(novoChamado);
});

router.delete("/:id", (req, res) => {
  const chamadoId = parseInt(req.params.id);
  const indexChamado = chamados.findIndex((c) => c.id === chamadoId);
  if (indexChamado !== -1) {
    chamados.splice(indexChamado, 1);
    res.json({ message: "Chamado deletado com sucesso!" });
  } else {
    res.status(404).json({ message: "Chamado não encontrado!" });
  }
});

module.exports = router;
