# Frontend - App de Gestión de Contactos

Este frontend implementa la **Etapa 1** del proyecto con Next.js (App Router), Tailwind CSS y shadcn/ui.

Pantallas implementadas:
- Dashboard principal (`/`)
- Búsqueda de contactos (`/busqueda`)
- Tabla de contactos (`/contactos`)

## 1) Setup inicial paso a paso

### Crear proyecto (si empezás desde cero)

```bash
npx create-next-app@latest frontend --ts --tailwind --eslint --app --src-dir false
cd frontend
npx shadcn@latest init
npx shadcn@latest add card button input table avatar badge skeleton sonner
```

### Instalar dependencias (si ya existe el proyecto)

```bash
npm install
```

### Variables de entorno

Copiá el ejemplo y ajustá si tu backend usa otro host/puerto:

```bash
cp .env.local.example .env.local
```

`.env.local` esperado:

```env
BACKEND_API_URL=http://localhost:3000/api
```

### Cómo verificar que funciona

```bash
npm run dev -- --port 3001
```

Abrí `http://localhost:3001`.

Si el backend está arriba en `http://localhost:3000`, la app ya debería listar/buscar contactos.

## 2) Estructura de carpetas

```text
frontend/
├── app/
│   ├── api/contactos/route.ts
│   ├── busqueda/page.tsx
│   ├── contactos/page.tsx
│   ├── contactos/nuevo/page.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── contactos/
│   │   ├── ContactCard.tsx
│   │   ├── ContactTable.tsx
│   │   ├── DashboardPanel.tsx
│   │   └── SearchBar.tsx
│   ├── theme-provider.tsx
│   └── ui/
├── hooks/
│   ├── useContactos.ts
│   └── useSearch.ts
└── lib/
    ├── api.ts
    ├── contact-helpers.ts
    └── types.ts
```

### Cómo verificar que funciona

- Confirmá que existen esas rutas/componentes.
- Abrí `/`, `/busqueda` y `/contactos`.

## 3) Decisiones técnicas

- **TypeScript**: elegido para tipar contactos, errores de API y props; reduce bugs al crecer el CRUD.
- **Route Handler BFF (`app/api/contactos/route.ts`)**: evita CORS y mapea `search` (frontend) a `nombre` (backend actual).
- **Hooks reutilizables**:
  - `useContactos`: carga remota con loading/error
  - `useSearch`: estado + debounce para búsqueda

### Cómo verificar que funciona

- En `/busqueda`, escribir en el input debe disparar búsqueda remota.
- En `/contactos`, el filtro debe ser local (sin nueva request al backend).

## 4) Componentes principales implementados

- `SearchBar.tsx`: input con lupa reutilizable.
- `ContactCard.tsx`: tarjeta de resultado (avatar, puesto, empresa, teléfono, email).
- `ContactTable.tsx`: tabla responsive con loading/error/empty.
- `DashboardPanel.tsx`: 3 tarjetas de navegación.

### Cómo verificar que funciona

- El Dashboard navega a `/contactos` y `/busqueda`.
- Botón “Crear Nuevo” lleva a una pantalla placeholder de etapa 2 (`/contactos/nuevo`).

## 5) Colores y estilo (Tailwind/CSS)

Se aplicaron colores exactos solicitados:
- Azul principal: `#0066CC`
- Azul rey: `#0077BE`
- Teal: `#00A9A9`
- Azul claro: `#1E90FF`
- Gris oscuro: `#333333`
- Gris claro: `#F5F5F5`
- Gris borde: `#E0E0E0`

Fuente global:
- `Segoe UI, Arial, sans-serif`

### Cómo verificar que funciona

- Inspeccioná `app/globals.css` y clases `bg-[#...]` en páginas/componentes.

## 6) Testing y validación

### Desarrollo

```bash
npm run dev -- --port 3001
```

### Lint

```bash
npm run lint
```

### Build de producción

```bash
npm run build
```

### Checklist manual

- `/` muestra 3 tarjetas principales.
- `/busqueda`:
  - loading al buscar
  - resultados o “Sin resultados”
  - errores muestran toast + bloque visual
- `/contactos`:
  - carga lista completa
  - búsqueda filtra en tiempo real localmente
  - tabla con scroll horizontal en móvil

Si hay error de backend caído, debe verse mensaje claro y toast.
