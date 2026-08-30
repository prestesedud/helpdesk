const argon2 = require("argon2");
const db = require("../database");

async function criarAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const senha = process.env.ADMIN_SENHA;

  const hashSenha = await argon2.hash(senha);

  try {
    const userAdmin = db.prepare(`
    INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?) `);
    const nome = "Administrador";
    const resultado = userAdmin.run(nome, email, hashSenha, "admin");
    console.log({
      id: resultado.lastInsertRowid,
      nome,
      email,
      role: "admin",
    });
  } catch (erro) {
    console.error(erro);
  }
}

criarAdmin();
