const express = require("express");
const app = express();
const db = require("./database");
const chamadosRouter = require("./routes/chamados");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.use("/chamados", chamadosRouter);

app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
