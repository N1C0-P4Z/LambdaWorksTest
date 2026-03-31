const prisma = require("../lib/prisma");
const { normalizeString, isValidEmail, isValidPhoneAR } = require("../utils/validators");

function parseId(raw) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

exports.crearContacto = async (req, res, next) => {
  try {
    const nombre = normalizeString(req.body.nombre);
    const apellido = normalizeString(req.body.apellido);
    const email = normalizeString(req.body.email).toLowerCase();
    const telefono = normalizeString(req.body.telefono);

    if (!nombre) return res.status(400).json({ error: "nombre es requerido" });
    if (nombre.length > 50) return res.status(400).json({ error: "nombre no puede exceder 50 caracteres" });
    if (!apellido) return res.status(400).json({ error: "apellido es requerido" });
    if (apellido.length > 50) return res.status(400).json({ error: "apellido no puede exceder 50 caracteres" });
    if (!email || !isValidEmail(email)) return res.status(400).json({ error: "email inválido" });
    if (email.length > 50) return res.status(400).json({ error: "email no puede exceder 50 caracteres" });
    if (!telefono || !isValidPhoneAR(telefono)) {
      return res.status(400).json({ error: "teléfono inválido, debe comenzar con +54" });
    }
    if (telefono.length > 50) return res.status(400).json({ error: "teléfono no puede exceder 50 caracteres" });

    const creado = await prisma.contacto.create({
      data: { nombre, apellido, email, telefono },
    });

    return res.status(201).json(creado);
  } catch (err) {
    return next(err);
  }
};

exports.listarContactos = async (req, res, next) => {
  try {
    const busqueda = normalizeString(req.query.nombre || req.query.search);
    const where = busqueda
      ? {
          OR: [
            { nombre: { contains: busqueda, mode: "insensitive" } },
            { apellido: { contains: busqueda, mode: "insensitive" } },
            { email: { contains: busqueda, mode: "insensitive" } },
          ],
        }
      : {};

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
      if (nombre.length > 50) return res.status(400).json({ error: "nombre no puede exceder 50 caracteres" });
      data.nombre = nombre;
    }

    if (req.body.apellido !== undefined) {
      const apellido = normalizeString(req.body.apellido);
      if (!apellido) return res.status(400).json({ error: "apellido no puede estar vacío" });
      if (apellido.length > 50) return res.status(400).json({ error: "apellido no puede exceder 50 caracteres" });
      data.apellido = apellido;
    }

    if (req.body.email !== undefined) {
      const email = normalizeString(req.body.email).toLowerCase();
      if (!isValidEmail(email)) return res.status(400).json({ error: "email inválido" });
      if (email.length > 50) return res.status(400).json({ error: "email no puede exceder 50 caracteres" });
      data.email = email;
    }

    if (req.body.telefono !== undefined) {
      const telefono = normalizeString(req.body.telefono);
      if (!isValidPhoneAR(telefono)) {
        return res.status(400).json({ error: "teléfono inválido, debe comenzar con +54" });
      }
      if (telefono.length > 50) return res.status(400).json({ error: "teléfono no puede exceder 50 caracteres" });
      data.telefono = telefono;
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
