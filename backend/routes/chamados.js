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

module.exports = router;
