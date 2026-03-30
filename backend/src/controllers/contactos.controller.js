const prisma = require("../lib/prisma");
const { normalizeString, isValidEmail } = require("../utils/validators");

function parseId(raw) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

exports.crearContacto = async (req, res, next) => {
  try {
    const nombre = normalizeString(req.body.nombre);
    const email = normalizeString(req.body.email).toLowerCase();
    const telefono = req.body.telefono ? normalizeString(req.body.telefono) : null;

    if (!nombre) return res.status(400).json({ error: "nombre es requerido" });
    if (!email || !isValidEmail(email)) return res.status(400).json({ error: "email inválido" });

    const creado = await prisma.contacto.create({
      data: { nombre, email, telefono },
    });

    return res.status(201).json(creado);
  } catch (err) {
    return next(err);
  }
};

exports.listarContactos = async (req, res, next) => {
  try {
    const nombre = normalizeString(req.query.nombre);
    const where = nombre ? { nombre: { contains: nombre, mode: "insensitive" } } : {};

    const contactos = await prisma.contacto.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(contactos);
  } catch (err) {
    return next(err);
  }
};

exports.obtenerContactoPorId = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });

    const contacto = await prisma.contacto.findUnique({ where: { id } });
    if (!contacto) return res.status(404).json({ error: "contacto no encontrado" });

    return res.status(200).json(contacto);
  } catch (err) {
    return next(err);
  }
};

exports.actualizarContacto = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });

    const data = {};

    if (req.body.nombre !== undefined) {
      const nombre = normalizeString(req.body.nombre);
      if (!nombre) return res.status(400).json({ error: "nombre no puede estar vacío" });
      data.nombre = nombre;
    }

    if (req.body.email !== undefined) {
      const email = normalizeString(req.body.email).toLowerCase();
      if (!isValidEmail(email)) return res.status(400).json({ error: "email inválido" });
      data.email = email;
    }

    if (req.body.telefono !== undefined) {
      data.telefono = req.body.telefono ? normalizeString(req.body.telefono) : null;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "no hay campos para actualizar" });
    }

    const existe = await prisma.contacto.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ error: "contacto no encontrado" });

    const actualizado = await prisma.contacto.update({
      where: { id },
      data,
    });

    return res.status(200).json(actualizado);
  } catch (err) {
    return next(err);
  }
};

exports.eliminarContacto = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });

    const existe = await prisma.contacto.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ error: "contacto no encontrado" });

    await prisma.contacto.delete({ where: { id } });

    return res.status(200).json({ message: "contacto eliminado" });
  } catch (err) {
    return next(err);
  }
};
