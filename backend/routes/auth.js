const express = require("express");
const db = require("../database");
const argon2 = require("argon2");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await argon2.hash(senha);

  try {
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
  } catch (erro) {
    console.error(erro);
    res.status(409).json({
      erro: "Dados incorretos!",
      campo: "email",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = db
    .prepare(
      `
    SELECT * FROM usuarios WHERE email = ?`,
    )
    .get(email);
  if (!usuario) {
    res.status(401).json({ message: "Credenciais incorretas!" });
    return;
  }
  const verificacaoSenha = await argon2.verify(usuario.senha, senha);
  if (!verificacaoSenha) {
    res.status(401).json({ message: "Credenciais Inválidas" });
    return;
  }
  const token = jwt.sign(
    { id: usuario.id, role: usuario.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  res.status(200).json({ token });
});

module.exports = router;
