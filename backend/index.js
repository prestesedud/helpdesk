const express = require("express");
const app = express();
const db = require("./database");
const chamadosRouter = require("./routes/chamados");
const authRouter = require("./routes/auth");
const verificarToken = require("./middlewares/verificarToken");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});
app.use("/chamados", verificarToken, chamadosRouter);
app.use("/auth", authRouter);
app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
