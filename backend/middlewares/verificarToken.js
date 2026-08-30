const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }
  const separaBearerToken = authHeader.split(" ");

  try {
    const tokenAuth = jwt.verify(separaBearerToken[1], process.env.JWT_SECRET);
    req.usuario = tokenAuth;
    console.log(tokenAuth);
    next();
  } catch (erro) {
    res.status(401).json({ message: "Token Inválido" });
    return;
  }
}

module.exports = verificarToken;
