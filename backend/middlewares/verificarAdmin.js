function verificarAdmin(req, res, next) {
  if (req.usuario.role !== "admin") {
    res.status(403).json({ message: "Você não possui autorização" });
    return;
  }
  next();
}

module.exports = verificarAdmin;
