function notFoundHandler(req, res, next) {
  if (res.headersSent) return next();
  return res.status(404).json({ error: "ruta no encontrada" });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  if (err && err.code === "P2002") {
    return res.status(400).json({ error: "email ya existe" });
  }

  console.error(err);
  return res.status(500).json({ error: "error interno del servidor" });
}

module.exports = { notFoundHandler, errorHandler };
