# Backend Contactos

## Requisitos
- Node.js LTS
- Docker + Docker Compose

## 1) Levantar base de datos
Desde la raíz del proyecto:

```bash
docker compose up -d
docker compose ps
```

## 2) Configurar backend
```bash
cd backend
npm install
```

Crear `backend/.env`:

```env
PORT=3000
DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=public"
```

## 3) Migrar DB y correr API
```bash
npx prisma migrate dev --name init_contacto
npm run dev
```

## 4) Verificar
```bash
curl http://localhost:3000/health
curl http://localhost:3000/health/db
```
