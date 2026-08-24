const express = require("express");
const app = express();
const chamadosRouter = require("./routes/chamados");

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.use("/chamados", chamadosRouter);

app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
