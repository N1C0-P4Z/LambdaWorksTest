# LambdaWorks Test - Ejecucion local

Aplicacion de Contactos construida en Next.js, Prisma y PostgreSQL.

Deploy: https://lambdaworkstest-frontend.onrender.com 

La Aplicacion fue deployada en Render. Aveces el acceso puede demorar 1 minuto, ya que el backend se encuentra "durmiendo" luego de inactividad. Puede Pasar que el frontend cargue antes que el backend, por lo que inicialmente no mostrara ningun datos. Simplemente esperar y refrescar la pagina. 

## Requisitos

- Node.js LTS (recomendado 20+)
- npm
- Docker + Docker Compose

## 1) Levantar PostgreSQL con Docker

Desde la raiz del repositorio:

```bash
docker compose up -d
docker compose ps
```

El contenedor de la base se levanta como `test-postgres` en el puerto `5432`.

## 2) Configurar y correr backend

Ir a la carpeta backend e instalar dependencias:

```bash
cd backend
npm install
```

Crear el archivo de entorno `backend/.env` con este contenido:

```env
PORT=3000
DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=public"
```

Aplicar migraciones y correr la API:

```bash
npx prisma migrate dev
npm run dev
```

Verificaciones recomendadas del backend:

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/health/db
curl -i http://localhost:3000/api/contactos
```

## 3) Configurar y correr frontend

En otra terminal:

```bash
cd frontend
npm install
```

Opcional pero recomendado: crear `frontend/.env.local` para fijar la URL del backend:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3000/api
```

Levantar frontend en desarrollo:

```bash
npm run dev -- --port 3001
```

Abrir en navegador:

- http://localhost:3001/ (redirecciona a `/contactos`)
- http://localhost:3001/contactos

## 4) Scripts utiles

Backend (`backend/package.json`):

- `npm run dev`
- `npm run start`
- `npm run prisma:migrate`
- `npm run prisma:generate`
- `npm run prisma:studio`

Frontend (`frontend/package.json`):

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Prompts

Ver promts.txt para ver los prompts utilizados