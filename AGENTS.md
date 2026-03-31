## 1) Purpose / Alcance

Este repositorio contiene un **technical test** para una app de contactos con **backend + frontend**.

Objetivo actual:
- Implementar y mantener backend CRUD de contactos con **Node.js + Express + Prisma + PostgreSQL**.
- Implementar y mantener frontend con **Next.js (App Router) + Tailwind + shadcn/ui**.
- Soportar ejecución local y deploy en Render/Vercel.

Fuera de alcance (por ahora):
- No agregar autenticación OAuth ni features extra no pedidas.

---

## 2) Quickstart

### 2.1 Levantar base de datos local (desde la raíz del repo)

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

### 2.4 Verificar salud backend

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/health/db
```

### 2.5 Levantar frontend en desarrollo

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev -- --port 3001
```

Frontend:
- Dashboard: `http://localhost:3001/`
- Búsqueda: `http://localhost:3001/busqueda`
- Contactos: `http://localhost:3001/contactos`

---

## 3) Environment variables

### Backend

- Archivo real: `backend/.env`
- Ejemplo: `backend/.env.example`
- **Nunca** commitear `backend/.env`

Ejemplo:

```env
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
```

### Frontend

- Archivo real: `frontend/.env.local`
- Ejemplo: `frontend/.env.local.example`

Ejemplo local:

```env
BACKEND_API_URL=http://localhost:3000/api
```

Ejemplo deploy:

```env
BACKEND_API_URL=https://<tu-backend-publico>/api
```

---

## 4) Prisma workflow

Comandos principales (desde `backend/`):

```bash
npx prisma migrate dev --name <nombre_cambio>
npx prisma generate
npx prisma studio
```

Flujo correcto para agregar un campo al modelo:
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

---

## 5) Project structure

```text
.
├── docker-compose.yml
├── AGENTS.md
├── README.md
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── index.js
│       ├── lib/prisma.js
│       ├── routes/contactos.routes.js
│       ├── controllers/contactos.controller.js
│       ├── middlewares/error.middleware.js
│       └── utils/validators.js
└── frontend/
    ├── app/
    │   ├── api/contactos/route.ts
    │   ├── api/contactos/[id]/route.ts
    │   ├── page.tsx
    │   ├── busqueda/page.tsx
    │   ├── contactos/page.tsx
    │   ├── contactos/nuevo/page.tsx
    │   └── contactos/[id]/page.tsx
    ├── components/
    │   ├── contactos/
    │   │   ├── ContactCard.tsx
    │   │   ├── ContactTable.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── DashboardPanel.tsx
    │   │   ├── ContactForm.tsx
    │   │   └── DeleteConfirmDialog.tsx
    │   └── ui/
    ├── hooks/
    │   ├── useContactos.ts
    │   └── useSearch.ts
    └── lib/
        ├── api.ts
        ├── types.ts
        └── contact-helpers.ts
```

---

## 6) Rules for AI agents

1. **No modificar `docker-compose.yml` sin permiso explícito.**
2. **No commitear `.env` ni secretos.**
3. Mantener estables estos endpoints backend:
   - `POST /api/contactos`
   - `GET /api/contactos`
   - `GET /api/contactos/:id`
   - `PUT /api/contactos/:id`
   - `DELETE /api/contactos/:id`
4. Mantener modelo `Contacto` compatible:
   - `id`, `nombre`, `email` (único), `telefono?`, `createdAt`, `updatedAt`.
5. Preferir cambios pequeños, puntuales y verificables.
6. Antes de cambiar algo importante, explicar brevemente por qué.
7. Siempre incluir verificación después de cambios:
   - health checks
   - pruebas con `curl`
   - revisión de logs
8. En frontend, mantener rutas:
   - `/`
   - `/busqueda`
   - `/contactos`
   - `/contactos/nuevo`
   - `/contactos/[id]`
9. Mantener `BACKEND_API_URL` configurable por entorno (sin hardcodear URLs).
10. No reinstalar `shadcn` como dependencia runtime; usar CLI con `npx shadcn@latest ...`.

---

## 7) Common troubleshooting

### 7.1 `port 5432 already in use`

```bash
sudo ss -ltnp | grep 5432
```

### 7.2 Docker daemon not running

```bash
sudo systemctl start docker
sudo systemctl status docker
```

### 7.3 Prisma no conecta a la DB (local)

Checklist:
1. Verificar contenedor:

```bash
docker compose ps
```

2. Verificar `DATABASE_URL`.
3. Probar Postgres:

```bash
docker exec -it test-postgres pg_isready -U test -d test
```

4. Migraciones:

```bash
cd backend
npx prisma migrate dev
```

### 7.4 Frontend devuelve 503 en `/api/contactos`

Síntoma:
- Browser muestra `503` y mensaje `No se pudo conectar con el backend de contactos`.

Checklist:
1. Backend público responde:
   - `https://<backend>/health`
   - `https://<backend>/api/contactos`
2. Frontend tiene variable correcta:
   - `BACKEND_API_URL=https://<backend>/api`
3. Guardar variable y redeploy del frontend.
4. Revisar logs del frontend service.

### 7.5 Vercel: `Could not identify Next.js version`

Causa habitual:
- Root Directory incorrecto en monorepo.

Fix:
- Setear `Root Directory = frontend`.
- Confirmar `next` en `frontend/package.json`.

### 7.6 Build error: `Can't resolve 'shadcn/tailwind.css'`

Causa:
- Se removió paquete `shadcn` pero quedó import en `frontend/app/globals.css`.

Fix:
- Eliminar `@import "shadcn/tailwind.css";`.
- Mantener:
  - `@import "tailwindcss";`
  - `@import "tw-animate-css";`

### 7.7 NPM warning `node-domexception@1.0.0`

Causa:
- Dependencia transitiva de `shadcn` package.

Fix:

```bash
cd frontend
npm uninstall shadcn
```

### 7.8 Render backend: errores Prisma frecuentes

- `P1013 invalid port number`: `DATABASE_URL` mal formada.
- `P1001 Can't reach database`: DB inexistente o URL/host incorrecto.

Buenas prácticas en Render backend:
- Root Directory: `backend`
- Build Command:

```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

- Start Command:

```bash
npm run start
```

- Env:
  - `DATABASE_URL=<url_real_de_postgres>`

### 7.9 Render env vars duplicadas

Si aparece `Duplicate keys are not allowed`, dejar solo una clave por nombre (ej. una sola `DATABASE_URL`).

### 7.10 Render Free: servicio "dormido"

En plan free puede dormir por inactividad. Primer request puede tardar mientras despierta.
No es bug de código.
