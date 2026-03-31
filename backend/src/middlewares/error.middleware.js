function notFoundHandler(req, res, next) {
  if (res.headersSent) return next();
  return res.status(404).json({ error: "ruta no encontrada" });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  if (err && err.code === "P2002") {
    const target = err.meta?.target;

    if (target?.includes("email")) {
      return res.status(400).json({ error: "Ya existe un contacto con ese email" });
    }
    if (target?.includes("telefono")) {
      return res.status(400).json({ error: "Ya existe un contacto con ese teléfono" });
    }
    if (target?.includes("nombre_apellido_unique") || (target?.includes("nombre") && target?.includes("apellido"))) {
      return res.status(400).json({ error: "Ya existe un contacto con ese nombre y apellido" });
    }

    return res.status(400).json({ error: "Ya existe un registro con esos datos" });
  }

  console.error(err);
  return res.status(500).json({ error: "error interno del servidor" });
}

module.exports = { notFoundHandler, errorHandler };
