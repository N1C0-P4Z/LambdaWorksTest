require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./lib/prisma");
const contactosRoutes = require("./routes/contactos.routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
