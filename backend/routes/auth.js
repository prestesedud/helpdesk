const express = require("express");
const db = require("../database");
const argon2 = require("argon2");
const router = express.Router();

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await argon2.hash(senha);
  const usuarios = db.prepare(
    `
    INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)
    `,
  );
  const resultado = usuarios.run(nome, email, hash);
  res.status(201).json({
    id: resultado.lastInsertRowid,
    nome,
    email,
    role: "usuario",
  });
});

module.exports = router;
