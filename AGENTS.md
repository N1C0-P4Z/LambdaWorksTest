## 1) Purpose / Alcance

Este repositorio contiene un **technical test** para una app de contactos, empezando por el **backend**.

Objetivo actual:
- Implementar y mantener un backend CRUD de contactos con **Node.js + Express + Prisma + PostgreSQL**.
- Usar base de datos local con **Docker Compose**.

Fuera de alcance (por ahora):
- No tocar frontend React.
- No agregar autenticación OAuth ni features extra no pedidas.

---

## 2) Quickstart

### 2.1 Levantar base de datos (desde la raíz del repo)

```bash
docker compose up -d
docker compose ps
```

### 2.2 Instalar dependencias backend

```bash
cd backend
npm install
```

### 2.3 Correr backend en desarrollo

```bash
npm run dev
```

### 2.4 Verificar salud

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/health/db
```

---

## 3) Environment variables

- El archivo real va en: `backend/.env`
- El archivo de ejemplo va en: `backend/.env.example`
- **Nunca** commitear `backend/.env`

Ejemplo de `backend/.env.example`:

```env
PORT=3000
DATABASE_URL="postgresql://test:test@localhost:5432/test"
```

---

## 4) Prisma workflow

Comandos principales (desde `backend/`):

```bash
npx prisma migrate dev --name <nombre_cambio>
npx prisma generate
npx prisma studio
```

Flujo correcto para agregar un campo nuevo al modelo:
1. Editar `backend/prisma/schema.prisma`.
2. Crear migración:

```bash
npx prisma migrate dev --name add_<campo>
```

3. Generar cliente Prisma:

```bash
npx prisma generate
```

4. Probar endpoints afectados con `curl`.

Notas importantes:
- Usar migrations en desarrollo (`migrate dev`).
- Evitar comandos destructivos o de reseteo sin permiso explícito.

---

## 5) Project structure

Estructura esperada:

```text
.
├── docker-compose.yml
├── AGENTS.md
├── README.md
└── backend/
    ├── .env
    ├── .env.example
    ├── package.json
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    └── src/
        ├── index.js
        ├── lib/
        │   └── prisma.js
        ├── routes/
        │   └── contactos.routes.js
        ├── controllers/
        │   └── contactos.controller.js
        ├── middlewares/
        │   └── error.middleware.js
        └── utils/
            └── validators.js
```

---

## 6) Rules for AI agents

1. **No modificar `docker-compose.yml` sin permiso explícito.**
2. **No commitear `.env` ni secretos.**
3. Mantener estables estos endpoints:
   - `POST /api/contactos`
   - `GET /api/contactos`
   - `GET /api/contactos/:id`
   - `PUT /api/contactos/:id`
   - `DELETE /api/contactos/:id`
4. Mantener el modelo `Contacto` con campos:
   - `id`, `nombre`, `email` (único), `telefono?`, `createdAt`, `updatedAt`.
5. Preferir cambios pequeños, puntuales y verificables.
6. Antes de cambiar algo importante, explicar brevemente por qué.
7. Siempre incluir pasos de verificación después de cambios:
   - health checks
   - pruebas con `curl`
   - revisión de logs
8. No tocar frontend React en esta etapa.
9. Si se cambia schema Prisma, correr migración + generate y validar API.

---

## 7) Common troubleshooting

### 7.1 `port 5432 already in use`

Ver qué proceso usa el puerto:

```bash
sudo ss -ltnp | grep 5432
```

Opciones:
- Detener el proceso que ocupa 5432.
- O cambiar temporalmente el puerto publicado en `docker-compose.yml` (solo con permiso).

### 7.2 Docker daemon not running

```bash
sudo systemctl start docker
sudo systemctl status docker
```

En Fedora, si hay error de permisos del socket:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

### 7.3 Prisma no conecta a la DB

Checklist:
1. Verificar contenedor arriba:

```bash
docker compose ps
```

2. Verificar `.env` y `DATABASE_URL`.
3. Probar conexión de Postgres:

```bash
docker exec -it test-postgres pg_isready -U test -d test
```

4. Ejecutar migraciones pendientes:

```bash
cd backend
npx prisma migrate dev
```

### 7.4 Ver logs

Logs de base de datos:

```bash
docker compose logs -f
```

Logs backend:
- revisar terminal donde corre `npm run dev`.
