const express = require("express");
const controller = require("../controllers/contactos.controller");

const router = express.Router();

router.post("/", controller.crearContacto);
router.get("/", controller.listarContactos);
router.get("/:id", controller.obtenerContactoPorId);
router.put("/:id", controller.actualizarContacto);
router.delete("/:id", controller.eliminarContacto);

module.exports = router;
