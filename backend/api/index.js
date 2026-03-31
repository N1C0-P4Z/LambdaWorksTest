require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("../src/lib/prisma");
const contactosRoutes = require("../src/routes/contactos.routes");
const { notFoundHandler, errorHandler } = require("../src/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.get("/health/db", async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({ status: "ok", db: "connected" });
  } catch (err) {
    return next(err);
  }
});

app.use("/api/contactos", contactosRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

// Para Vercel, exportamos la app sin listen()
module.exports = app;
