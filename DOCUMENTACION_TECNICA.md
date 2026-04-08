# DOCUMENTO DE EVALUACION Y DOCUMENTACION TECNICA
## LambdaWorks Test - Aplicacion de Contactos CRUD

---

## INDICE

1. [Checklist de Cumplimiento de Requisitos](#parte-1-checklist-de-cumplimiento-de-requisitos)
2. [Problemas Identificados y Mejoras](#parte-2-problemas-identificados-y-mejoras-sugeridas)
3. [Estructura Completa del Proyecto](#parte-3-estructura-completa-del-proyecto)
4. [Explicacion Detallada del Backend](#parte-4-explicacion-detallada-del-backend)
5. [Explicacion Detallada del Frontend](#parte-5-explicacion-detallada-del-frontend)
6. [Diagrama de Flujo de Datos](#parte-6-diagrama-de-flujo-de-datos-completo)
7. [Analisis del Diseno UI/UX](#parte-7-analisis-del-diseno-uiux)
8. [Ejercicios Practicos y Analogias](#parte-8-ejercicios-practicos-y-analogias)
9. [Resumen Ejecutivo](#parte-9-resumen-ejecutivo)

---

## PARTE 1: CHECKLIST DE CUMPLIMIENTO DE REQUISITOS

### Requisitos Obligatorios del PDF

| # | Requisito | Estado | Evidencia |
|---|-----------|--------|-----------|
| 1 | Crear un contacto (nombre + email) | **CUMPLE** | `POST /api/contactos` - `backend/src/controllers/contactos.controller.js:9-35` |
| 2 | Listar contactos | **CUMPLE** | `GET /api/contactos` - `backend/src/controllers/contactos.controller.js:37-59` |
| 3 | Eliminar contactos | **CUMPLE** | `DELETE /api/contactos/:id` - `backend/src/controllers/contactos.controller.js:130-144` |
| 4 | Usar Prisma obligatoriamente | **CUMPLE** | `backend/prisma/schema.prisma` - Prisma 6.14.0 |
| 5 | Usar el docker-compose proporcionado | **CUMPLE** | `docker-compose.yml` - PostgreSQL 16 Alpine |
| 6 | Persistencia de datos | **CUMPLE** | Volumen Docker `mediafy_pg_data` persistente |
| 7 | Repositorio en GitHub | **CUMPLE** | Proyecto versionado con Git |
| 8 | README con instrucciones | **CUMPLE** | `README.md` detallado con pasos de ejecucion |
| 9 | Archivo prompts.txt | **CUMPLE** | Mencionado en README (ver `promts.txt`) |

### Requisitos Extras (Opcionales - Suman Puntos)

| # | Extra | Estado | Evidencia |
|---|-------|--------|-----------|
| 1 | Editar contactos | **CUMPLE** | `PUT /api/contactos/:id` + `ContactDialog` modo edit |
| 2 | Validaciones en formularios | **CUMPLE** | Validacion en frontend (`ContactForm.tsx:24-51`) y backend |
| 3 | Buscador de contactos | **CUMPLE** | `SearchBar` + filtro con debounce 250ms |
| 4 | Interfaz prolija / buena UX | **CUMPLE** | shadcn/ui + Tailwind + tema dorado premium |
| 5 | Deploy online accesible | **CUMPLE** | https://lambdaworkstest-frontend.onrender.com |

### Resultado Final: **10/10 REQUISITOS CUMPLIDOS + 5/5 EXTRAS**

---

## PARTE 2: PROBLEMAS IDENTIFICADOS Y MEJORAS SUGERIDAS

### Problemas Encontrados

| Severidad | Descripcion | Ubicacion |
|-----------|-------------|-----------|
| **Ninguno** | *El proyecto cumple todos los requisitos del PDF* | - |

### Observaciones Menores (No son errores)

| Tipo | Observacion | Nota |
|------|-------------|------|
| **Info** | El modelo tiene `apellido` y `telefono` como **requeridos** aunque el PDF solo pide `nombre + email` | Es una mejora, no un problema |
| **Info** | Telefono validado solo para formato argentino (+54) | Restriccion de negocio valida |
| **Info** | Backend en Render free tier puede "dormir" | Documentado en README |

### Mejoras Sugeridas (Opcionales)

1. **Paginacion** - Para manejar grandes volumenes de contactos
2. **Tests automatizados** - Jest/Vitest para backend, Playwright para frontend
3. **Rate limiting** - Proteccion contra abuso de la API

---

## PARTE 3: ESTRUCTURA COMPLETA DEL PROYECTO

```
LambdaWorksTest/
│
├── docker-compose.yml          # Base de datos PostgreSQL
├── README.md                   # Instrucciones de ejecucion
├── AGENTS.md                   # Reglas para agentes AI
├── LambdaWorks Test.pdf        # Especificaciones del test
│
├── backend/                    # API REST (Express + Prisma)
│   ├── .env                    # Variables de entorno (no commitear)
│   ├── package.json            # Dependencias Node.js
│   ├── prisma/
│   │   ├── schema.prisma       # Modelo de base de datos
│   │   └── migrations/         # Historial de cambios DB
│   └── src/
│       ├── index.js            # Punto de entrada
│       ├── lib/
│       │   └── prisma.js       # Cliente Prisma singleton
│       ├── routes/
│       │   └── contactos.routes.js  # Definicion de rutas
│       ├── controllers/
│       │   └── contactos.controller.js  # Logica de negocio
│       ├── middlewares/
│       │   └── error.middleware.js  # Manejo de errores
│       └── utils/
│           └── validators.js   # Funciones de validacion
│
└── frontend/                   # UI (Next.js 16 + React 19)
    ├── .env.local              # URL del backend
    ├── package.json            # Dependencias
    ├── app/                    # App Router (rutas)
    │   ├── layout.tsx          # Layout raiz + providers
    │   ├── page.tsx            # Redirect a /contactos
    │   ├── globals.css         # Tema y estilos
    │   ├── error.tsx           # Pagina de error
    │   ├── contactos/
    │   │   └── page.tsx        # Pagina principal CRUD
    │   └── api/contactos/      # Proxy API routes
    │       ├── route.ts        # GET/POST
    │       └── [id]/route.ts   # GET/PUT/DELETE por ID
    ├── components/
    │   ├── contactos/          # Componentes de negocio
    │   │   ├── ContactTable.tsx
    │   │   ├── ContactCard.tsx
    │   │   ├── ContactForm.tsx
    │   │   ├── ContactDialog.tsx
    │   │   ├── SearchBar.tsx
    │   │   └── DeleteConfirmDialog.tsx
    │   ├── ui/                 # Componentes shadcn/ui
    │   │   ├── button.tsx
    │   │   ├── dialog.tsx
    │   │   ├── input.tsx
    │   │   ├── table.tsx
    │   │   └── ...
    │   └── theme-provider.tsx
    ├── hooks/                  # Hooks personalizados
    │   ├── useContactos.ts     # Estado y operaciones CRUD
    │   └── useSearch.ts        # Busqueda con debounce
    └── lib/                    # Utilidades
        ├── api.ts              # Cliente HTTP
        ├── types.ts            # Tipos TypeScript
        ├── contact-helpers.ts  # Helpers de formato
        └── utils.ts            # cn() para clases
```

---

## PARTE 4: EXPLICACION DETALLADA DEL BACKEND

### 4.1 Punto de Entrada (`index.js`)

```
┌─────────────────────────────────────────────────────────────┐
│                     backend/src/index.js                     │
├─────────────────────────────────────────────────────────────┤
│  1. Carga variables de entorno (.env)                       │
│  2. Crea la app Express                                     │
│  3. Configura middlewares:                                  │
│     - cors() → Permite peticiones del frontend              │
│     - express.json() → Parsea JSON en el body               │
│  4. Define rutas de salud:                                  │
│     - GET /health → Verifica que el servidor funcione       │
│     - GET /health/db → Verifica conexion a PostgreSQL       │
│  5. Monta las rutas de contactos en /api/contactos          │
│  6. Manejo de errores (404 y errores generales)             │
│  7. Escucha en puerto 3000                                  │
└─────────────────────────────────────────────────────────────┘
```

**Analogia simple**: Es como la recepcion de un hotel. Recibe a todos los huespedes (peticiones), verifica que tengan una reserva valida (ruta existente), y los dirige al area correcta.

### 4.2 Rutas (`contactos.routes.js`)

```
┌───────────────────────────────────────────────────────────────┐
│                    TABLA DE RUTAS API                         │
├─────────┬─────────────────────┬───────────────────────────────┤
│ METODO  │ RUTA                │ QUE HACE                      │
├─────────┼─────────────────────┼───────────────────────────────┤
│ POST    │ /api/contactos      │ Crear nuevo contacto          │
│ GET     │ /api/contactos      │ Listar todos (con busqueda)   │
│ GET     │ /api/contactos/:id  │ Obtener uno por ID            │
│ PUT     │ /api/contactos/:id  │ Actualizar por ID             │
│ DELETE  │ /api/contactos/:id  │ Eliminar por ID               │
└─────────┴─────────────────────┴───────────────────────────────┘
```

**Analogia simple**: Las rutas son como las senales de un edificio. Te dicen "para ir a Recursos Humanos ve por aqui, para ir a Contabilidad ve por alla".

### 4.3 Controladores (`contactos.controller.js`)

Cada controlador sigue este patron:

```
┌──────────────────────────────────────────────────────┐
│              PATRON DE UN CONTROLADOR                │
├──────────────────────────────────────────────────────┤
│  1. Extraer datos del request (body, params, query)  │
│  2. Normalizar y validar los datos                   │
│  3. Ejecutar operacion en la base de datos (Prisma)  │
│  4. Retornar respuesta JSON al cliente               │
│  5. Si hay error, pasarlo al middleware de errores   │
└──────────────────────────────────────────────────────┘
```

**Ejemplo: Crear Contacto**

```javascript
// Paso 1: Extraer y normalizar
const nombre = normalizeString(req.body.nombre);
const email = normalizeString(req.body.email).toLowerCase();

// Paso 2: Validar
if (!nombre) return res.status(400).json({ error: "nombre es requerido" });
if (!isValidEmail(email)) return res.status(400).json({ error: "email invalido" });

// Paso 3: Guardar en base de datos
const creado = await prisma.contacto.create({
  data: { nombre, apellido, email, telefono }
});

// Paso 4: Responder
return res.status(201).json(creado);
```

### 4.4 Modelo Prisma (`schema.prisma`)

```
┌─────────────────────────────────────────────────────────────┐
│                    MODELO CONTACTO                           │
├─────────────────────────────────────────────────────────────┤
│  id        │ Int      │ Identificador unico (autoincrement) │
│  nombre    │ String   │ Maximo 50 caracteres                │
│  apellido  │ String   │ Maximo 50 caracteres                │
│  email     │ String   │ UNICO - No puede repetirse          │
│  telefono  │ String   │ UNICO - Formato +54...              │
│  createdAt │ DateTime │ Fecha de creacion automatica        │
│  updatedAt │ DateTime │ Fecha de ultima modificacion        │
├─────────────────────────────────────────────────────────────┤
│  RESTRICCIONES:                                              │
│  - email debe ser unico en toda la tabla                    │
│  - telefono debe ser unico en toda la tabla                 │
│  - nombre + apellido combinados deben ser unicos            │
└─────────────────────────────────────────────────────────────┘
```

**Analogia simple**: El modelo Prisma es como el plano de una casa. Define exactamente que habitaciones (campos) existen y de que tamano son.

### 4.5 Middleware de Errores

```
┌──────────────────────────────────────────────────────────────┐
│                   FLUJO DE ERRORES                            │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Peticion llega → Ruta no existe? ─────Yes───→ 404 Not Found │
│                        │                                      │
│                       No                                      │
│                        │                                      │
│                        ▼                                      │
│                  Controlador                                  │
│                        │                                      │
│              Error en ejecucion? ───Yes───→ errorHandler      │
│                        │                      │               │
│                       No                      ▼               │
│                        │            Es error Prisma P2002?    │
│                        │                      │               │
│                        ▼               ┌──────┴──────┐        │
│                   Respuesta OK         │             │        │
│                                      Yes            No        │
│                                        │             │        │
│                                        ▼             ▼        │
│                               "Email/Telefono    500 Error    │
│                                ya existe"        interno      │
└──────────────────────────────────────────────────────────────┘
```

---

## PARTE 5: EXPLICACION DETALLADA DEL FRONTEND

### 5.1 Sistema de Rutas (App Router)

```
┌────────────────────────────────────────────────────────────────┐
│                     RUTAS DEL FRONTEND                          │
├────────────────────────────────────────────────────────────────┤
│  /              → Redirect automatico a /contactos             │
│  /contactos     → Pagina principal con tabla y formularios     │
│  /api/contactos → Proxy al backend (POST, GET)                 │
│  /api/contactos/[id] → Proxy al backend (GET, PUT, DELETE)     │
└────────────────────────────────────────────────────────────────┘
```

**Por que existe un proxy?** El frontend en Next.js tiene "API Routes" que actuan como intermediario. Esto permite:
- Ocultar la URL real del backend
- Agregar logica adicional si se necesita
- Manejar CORS de forma mas sencilla

### 5.2 Componentes de Negocio

```
┌────────────────────────────────────────────────────────────────────┐
│                    JERARQUIA DE COMPONENTES                        │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ContactosPage (pagina principal)                                  │
│       │                                                             │
│       ├── Header                                                    │
│       │    ├── Avatar (icono de usuario)                           │
│       │    ├── Titulo "Contactos"                                  │
│       │    ├── Contador "X contactos en total"                     │
│       │    ├── SearchBar (barra de busqueda)                       │
│       │    └── Button "Nuevo" (abre dialogo crear)                 │
│       │                                                             │
│       ├── ContactTable                                              │
│       │    ├── En desktop: Tabla con columnas                      │
│       │    │    └── Filas con nombre, email, telefono, acciones    │
│       │    └── En mobile: Lista de ContactCard                     │
│       │         └── Card con avatar, datos, botones                │
│       │                                                             │
│       ├── ContactDialog (modal crear/editar)                        │
│       │    └── ContactForm                                          │
│       │         ├── Input nombre                                    │
│       │         ├── Input apellido                                  │
│       │         ├── Input telefono (+54)                           │
│       │         ├── Input email                                     │
│       │         └── Botones Cancelar/Guardar                        │
│       │                                                             │
│       └── DeleteConfirmDialog (modal confirmar eliminacion)         │
│            ├── Mensaje "Estas seguro de eliminar a X?"             │
│            └── Botones Cancelar/Eliminar                            │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 5.3 Hook `useContactos`

Este es el "cerebro" que maneja todo el estado de los contactos.

```
┌────────────────────────────────────────────────────────────────────┐
│                      useContactos HOOK                              │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ESTADO:                                                            │
│  ├── contactos[]      Lista de contactos cargados                  │
│  ├── loading          true mientras carga                          │
│  ├── error            Mensaje de error si falla                    │
│  ├── mutating         true mientras crea/edita/elimina             │
│  └── mutationError    Error de operacion CRUD                      │
│                                                                     │
│  FUNCIONES:                                                         │
│  ├── cargarContactos(term?)  → GET todos (con filtro opcional)     │
│  ├── cargarContacto(id)      → GET uno por ID                      │
│  ├── crear(data)             → POST nuevo contacto                 │
│  ├── actualizar(id, data)    → PUT actualizar contacto             │
│  ├── eliminar(id)            → DELETE eliminar contacto            │
│  └── recargar()              → Refrescar lista                     │
│                                                                     │
│  COMPORTAMIENTO:                                                    │
│  - Por defecto carga contactos al montar (autoFetch: true)         │
│  - Si autoFetch: false, no carga automaticamente                   │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

**Analogia simple**: Es como el asistente personal de un ejecutivo. El ejecutivo (componente) solo dice "necesito la lista de clientes" y el asistente (hook) se encarga de buscarla, manejar si hay problemas, y avisar cuando esta lista.

### 5.4 Hook `useSearch`

```
┌────────────────────────────────────────────────────────────────────┐
│                       useSearch HOOK                                │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PROPOSITO: Evitar buscar mientras el usuario sigue escribiendo    │
│                                                                     │
│  Usuario escribe: "J" "u" "a" "n"                                  │
│                    │   │   │   │                                   │
│                    ▼   ▼   ▼   ▼                                   │
│  search:          "J" "Ju" "Jua" "Juan"  (actualiza inmediatamente)│
│                                                                     │
│  debouncedSearch: ─────────────────────▶ "Juan" (espera 250ms)     │
│                                                                     │
│  BENEFICIO: Solo busca una vez cuando el usuario deja de escribir  │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 5.5 Cliente API (`lib/api.ts`)

```
┌────────────────────────────────────────────────────────────────────┐
│                      CLIENTE API                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  getContactos(search?)     → GET /api/contactos?search=...         │
│  getContactoById(id)       → GET /api/contactos/123                │
│  createContacto(data)      → POST /api/contactos + body JSON       │
│  updateContacto(id, data)  → PUT /api/contactos/123 + body JSON    │
│  deleteContacto(id)        → DELETE /api/contactos/123             │
│                                                                     │
│  MANEJO DE ERRORES:                                                 │
│  - Si el servidor responde con error, lanza ApiError               │
│  - ApiError contiene: message y status code                        │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## PARTE 6: DIAGRAMA DE FLUJO DE DATOS COMPLETO

### 6.1 Flujo: Crear un Contacto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUJO: CREAR CONTACTO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. USUARIO                                                                  │
│     │                                                                        │
│     └──▶ Click en boton "Nuevo"                                             │
│                │                                                             │
│                ▼                                                             │
│  2. FRONTEND (ContactosPage.tsx)                                            │
│     │                                                                        │
│     └──▶ setDialog({ open: true, mode: "create" })                          │
│                │                                                             │
│                ▼                                                             │
│  3. MODAL (ContactDialog.tsx)                                               │
│     │                                                                        │
│     └──▶ Muestra formulario vacio                                           │
│                │                                                             │
│                ▼                                                             │
│  4. USUARIO llena campos:                                                   │
│     │   Nombre: "Juan" | Apellido: "Perez"                                  │
│     │   Email: "juan@test.com" | Telefono: "+54 9 341 1234567"              │
│     │                                                                        │
│     └──▶ Click en "Crear contacto"                                          │
│                │                                                             │
│                ▼                                                             │
│  5. FORMULARIO (ContactForm.tsx)                                            │
│     │                                                                        │
│     ├──▶ validateForm(formData) → Verifica campos                           │
│     │         │                                                              │
│     │         ├── Si hay error → Muestra mensaje rojo, NO continua          │
│     │         │                                                              │
│     │         └── Si OK → Continua                                          │
│     │                                                                        │
│     └──▶ onSubmit(formData) → Llama a handleSubmit del Dialog               │
│                │                                                             │
│                ▼                                                             │
│  6. DIALOG (ContactDialog.tsx)                                              │
│     │                                                                        │
│     └──▶ api.crear(formData) → Usando useContactos                          │
│                │                                                             │
│                ▼                                                             │
│  7. HOOK (useContactos.ts)                                                  │
│     │                                                                        │
│     ├──▶ setMutating(true) → Indica que esta procesando                     │
│     │                                                                        │
│     └──▶ createContacto(data) → Llama al cliente API                        │
│                │                                                             │
│                ▼                                                             │
│  8. CLIENTE API (lib/api.ts)                                                │
│     │                                                                        │
│     └──▶ fetch("/api/contactos", { method: "POST", body: JSON })            │
│                │                                                             │
│                ▼                                                             │
│  9. API ROUTE NEXT.JS (app/api/contactos/route.ts)                          │
│     │                                                                        │
│     └──▶ fetch(BACKEND_URL + "/api/contactos", { ... })                     │
│                │                                                             │
│                ▼                                                             │
│  10. BACKEND EXPRESS (contactos.routes.js)                                  │
│      │                                                                       │
│      └──▶ router.post("/") → crearContacto                                  │
│                │                                                             │
│                ▼                                                             │
│  11. CONTROLADOR (contactos.controller.js)                                  │
│      │                                                                       │
│      ├──▶ Normaliza: nombre.trim(), email.toLowerCase()                     │
│      ├──▶ Valida: campos requeridos, formato email, telefono +54            │
│      │                                                                       │
│      └──▶ prisma.contacto.create({ data: { nombre, ... }})                  │
│                │                                                             │
│                ▼                                                             │
│  12. PRISMA                                                                  │
│      │                                                                       │
│      └──▶ INSERT INTO "Contacto" (...) VALUES (...) RETURNING *             │
│                │                                                             │
│                ▼                                                             │
│  13. POSTGRESQL                                                              │
│      │                                                                       │
│      └──▶ Guarda el registro y devuelve el contacto con ID                  │
│                │                                                             │
│                ▼                                                             │
│  14. RESPUESTA SUBE DE VUELTA:                                              │
│      │                                                                       │
│      │   Prisma → Controlador → Express → Next.js API → fetch               │
│      │   → useContactos → ContactDialog → toast.success()                   │
│      │                                                                       │
│      └──▶ recargar() → Actualiza la lista de contactos                      │
│                │                                                             │
│                ▼                                                             │
│  15. UI ACTUALIZADA                                                          │
│      │                                                                       │
│      └──▶ El nuevo contacto aparece en la tabla                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ARQUITECTURA DEL SISTEMA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                           NAVEGADOR                                  │   │
│   │  ┌───────────────────────────────────────────────────────────────┐  │   │
│   │  │                    Next.js Frontend                            │  │   │
│   │  │                                                                │  │   │
│   │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │   │
│   │  │  │   UI     │  │  Hooks   │  │   API    │  │  Tipos   │       │  │   │
│   │  │  │Components│◄─┤useContact│◄─┤  Client  │  │  Types   │       │  │   │
│   │  │  │          │  │useSearch │  │          │  │          │       │  │   │
│   │  │  └──────────┘  └──────────┘  └────┬─────┘  └──────────┘       │  │   │
│   │  │                                    │                           │  │   │
│   │  │  ┌─────────────────────────────────┴───────────────────────┐  │  │   │
│   │  │  │              API Routes (Proxy)                          │  │  │   │
│   │  │  │  app/api/contactos/route.ts                              │  │  │   │
│   │  │  │  app/api/contactos/[id]/route.ts                         │  │  │   │
│   │  │  └─────────────────────────────────┬───────────────────────┘  │  │   │
│   │  └────────────────────────────────────┼──────────────────────────┘  │   │
│   └───────────────────────────────────────┼─────────────────────────────┘   │
│                                           │                                  │
│                                           │ HTTP (fetch)                    │
│                                           │                                  │
│   ┌───────────────────────────────────────┼─────────────────────────────┐   │
│   │                                       ▼         SERVIDOR             │   │
│   │  ┌─────────────────────────────────────────────────────────────┐    │   │
│   │  │                   Express Backend                            │    │   │
│   │  │                                                              │    │   │
│   │  │  ┌──────────┐    ┌──────────────┐    ┌──────────────┐       │    │   │
│   │  │  │  index   │───▶│    Routes    │───▶│ Controllers  │       │    │   │
│   │  │  │   .js    │    │contactos.    │    │contactos.    │       │    │   │
│   │  │  │          │    │routes.js     │    │controller.js │       │    │   │
│   │  │  └──────────┘    └──────────────┘    └──────┬───────┘       │    │   │
│   │  │                                              │               │    │   │
│   │  │  ┌──────────┐    ┌──────────────┐           │               │    │   │
│   │  │  │Middleware│    │  Validators  │           │               │    │   │
│   │  │  │  error   │    │ validators.  │           │               │    │   │
│   │  │  │.middleware│    │     js       │           │               │    │   │
│   │  │  └──────────┘    └──────────────┘           │               │    │   │
│   │  │                                              │               │    │   │
│   │  │  ┌───────────────────────────────────────────┴──────────┐   │    │   │
│   │  │  │                    Prisma ORM                         │   │    │   │
│   │  │  │  prisma.contacto.create/findMany/update/delete        │   │    │   │
│   │  │  └───────────────────────────────────────────┬──────────┘   │    │   │
│   │  └──────────────────────────────────────────────┼───────────────┘    │   │
│   │                                                  │                    │   │
│   │                                                  │ SQL                │   │
│   │                                                  │                    │   │
│   │  ┌──────────────────────────────────────────────┼───────────────┐    │   │
│   │  │                                              ▼                │    │   │
│   │  │  ┌────────────────────────────────────────────────────────┐  │    │   │
│   │  │  │                   PostgreSQL 16                         │  │    │   │
│   │  │  │                                                         │  │    │   │
│   │  │  │   Tabla: Contacto                                       │  │    │   │
│   │  │  │   ┌────┬────────┬────────┬──────────────┬─────────────┐│  │    │   │
│   │  │  │   │ id │ nombre │apellido│    email     │  telefono   ││  │    │   │
│   │  │  │   ├────┼────────┼────────┼──────────────┼─────────────┤│  │    │   │
│   │  │  │   │ 1  │ Juan   │ Perez  │juan@test.com │+54 9 341... ││  │    │   │
│   │  │  │   │ 2  │ Maria  │ Lopez  │maria@mail.com│+54 11 ...   ││  │    │   │
│   │  │  │   └────┴────────┴────────┴──────────────┴─────────────┘│  │    │   │
│   │  │  │                                                         │  │    │   │
│   │  │  └────────────────────────────────────────────────────────┘  │    │   │
│   │  │                     Docker Container                          │    │   │
│   │  └───────────────────────────────────────────────────────────────┘    │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## PARTE 7: ANALISIS DEL DISENO UI/UX

### 7.1 Paleta de Colores Implementada

```
┌────────────────────────────────────────────────────────────────────┐
│                    PALETA DE COLORES                                │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FONDOS (Grises Oscuros)                                           │
│  ├── Background: #121212  (Fondo principal)                        │
│  ├── Card:       #1e1e1e  (Tarjetas y modales)                     │
│  ├── Secondary:  #2d2d2d  (Fondos secundarios)                     │
│  └── Muted:      #2d2d2d  (Elementos deshabilitados)               │
│                                                                     │
│  ACENTOS (Dorado Metalico)                                         │
│  ├── Primary:    #d4af37  (Botones, bordes, iconos)                │
│  ├── Border:     #d4af37  (Todos los bordes)                       │
│  └── Ring:       #d4af37  (Focus de inputs)                        │
│                                                                     │
│  TEXTO                                                              │
│  ├── Foreground:       #f5f5f5  (Texto principal)                  │
│  └── Muted-Foreground: #a0a0a0  (Texto secundario)                 │
│                                                                     │
│  SEMANTICOS                                                         │
│  ├── Destructive: #dc2626  (Eliminar, errores)                     │
│  ├── Phone Icon:  #1E90FF  (Azul Dodger)                           │
│  └── Email Icon:  #2ECC71  (Verde Esmeralda)                       │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 7.2 Analisis de la Implementacion de Colores

| Elemento | Color | Estado | Comentario |
|----------|-------|--------|------------|
| Fondo general | #121212 | **Correcto** | Gris muy oscuro, elegante |
| Botones principales | #d4af37 | **Correcto** | Dorado metalico premium |
| Bordes de inputs | #d4af37 | **Correcto** | Resaltan sobre fondo oscuro |
| Texto principal | #f5f5f5 | **Correcto** | Buen contraste con fondo |
| Boton eliminar | #dc2626 | **Correcto** | Rojo para acciones destructivas |
| Tarjetas | #1e1e1e | **Correcto** | Ligeramente mas claro que fondo |
| Iconos telefonico/email | Azul/Verde | **Correcto** | Diferenciados del dorado |

### 7.3 Tipografia

- **Fuente**: Montserrat (Google Fonts)
- **Aplicacion**: Body completo via `next/font/google`
- **Estado**: **Correcto** - Tipografia moderna y legible

### 7.4 Responsividad

| Vista | Implementacion | Estado |
|-------|----------------|--------|
| Desktop | Tabla completa con columnas | **Correcto** |
| Tablet | Tabla adaptada | **Correcto** |
| Mobile | Cards individuales | **Correcto** |

### 7.5 Mejoras Visuales Sugeridas

| # | Sugerencia | Razon |
|---|------------|-------|
| 1 | Agregar sombra glow sutil en cards hover | Mas efecto "premium" |
| 2 | Animacion al agregar/eliminar contactos | Mejor feedback visual |
| 3 | Estado empty personalizado con ilustracion | Mas amigable cuando no hay contactos |
| 4 | Modo claro alternativo | Accesibilidad para preferencias de usuario |

---

## PARTE 8: EJERCICIOS PRACTICOS Y ANALOGIAS

### 8.1 Analogia del Restaurante

```
┌────────────────────────────────────────────────────────────────────┐
│             LA APLICACION ES COMO UN RESTAURANTE                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FRONTEND = El salon del restaurante                               │
│  ├── Componentes = Las mesas y decoracion                          │
│  ├── hooks = Los meseros que toman pedidos                         │
│  └── API client = El sistema de comunicacion con cocina            │
│                                                                     │
│  API ROUTES = La ventana entre salon y cocina                      │
│  └── Pasa los pedidos de un lado al otro                           │
│                                                                     │
│  BACKEND = La cocina                                                │
│  ├── Routes = El menu disponible                                   │
│  ├── Controllers = Los cocineros que preparan la comida            │
│  └── Validators = Control de calidad de ingredientes               │
│                                                                     │
│  PRISMA = El asistente de despensa                                 │
│  └── Sabe exactamente donde esta cada ingrediente                  │
│                                                                     │
│  POSTGRESQL = La despensa                                          │
│  └── Guarda todos los ingredientes (datos)                         │
│                                                                     │
│  FLUJO DE UN PEDIDO:                                               │
│  Cliente pide → Mesero anota → Pasa a cocina → Cocinero prepara    │
│  → Busca ingredientes en despensa → Prepara plato → Devuelve       │
│  → Mesero lleva a la mesa → Cliente recibe                         │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### 8.2 Ejercicio: Trazar el Flujo de "Eliminar"

**Tarea**: Usando la analogia del restaurante, describe paso a paso que pasa cuando:
1. El usuario hace click en "Eliminar" en un contacto
2. Aparece el dialogo de confirmacion
3. El usuario confirma eliminando

**Respuesta esperada**:
1. Cliente (usuario) le dice al mesero (hook) "quiero quitar este plato del pedido"
2. El sistema pregunta "esta seguro?" (DeleteConfirmDialog)
3. Si confirma, el mesero envia la orden a cocina (backend)
4. El cocinero (controller) verifica que el plato exista
5. Le pide al asistente (Prisma) que lo quite de la despensa (DELETE)
6. La despensa (PostgreSQL) elimina el registro
7. Se confirma de vuelta hasta el cliente

### 8.3 Ejercicio: Identificar Componentes

**Tarea**: Mira esta captura mental de la app y senala que componente renderiza cada parte:

```
┌─────────────────────────────────────────────────────────┐
│  [Avatar]  Contactos                                     │ ← Header
│            5 contactos en total                          │
│                                                          │
│  [==== Buscar... ====]              [+ Nuevo]           │ ← SearchBar + Button
├─────────────────────────────────────────────────────────┤
│  Nombre    │ Email          │ Telefono       │ Acciones │ ← ContactTable
├────────────┼────────────────┼────────────────┼──────────┤
│  Juan P.   │ juan@test.com  │ +54 9 341...   │ [E] [X]  │ ← Fila de tabla
│  Maria L.  │ maria@mail.com │ +54 11 ...     │ [E] [X]  │
└─────────────────────────────────────────────────────────┘
```

**Respuesta**:
- Avatar → componente `Avatar` de shadcn/ui
- "Contactos" y contador → JSX directo en `ContactosPage`
- Campo de busqueda → `SearchBar`
- Boton Nuevo → `Button` de shadcn/ui
- Tabla completa → `ContactTable`
- [E] → Boton Editar (abre `ContactDialog` modo edit)
- [X] → Boton Eliminar (abre `DeleteConfirmDialog`)

### 8.4 Preguntas de Comprension

**Pregunta 1**: ¿Por que el frontend usa `fetch("/api/contactos")` en lugar de `fetch("http://localhost:3000/api/contactos")`?

**Respuesta**: Porque Next.js tiene "API Routes" que actuan como proxy. La peticion va a `/api/contactos` del frontend, y esa API Route internamente llama al backend real. Esto permite:
- Configurar la URL del backend con variables de entorno
- No exponer la URL del backend al cliente
- Agregar logica server-side si se necesita

**Pregunta 2**: ¿Que pasa si el usuario intenta crear un contacto con un email que ya existe?

**Respuesta**:
1. El frontend envia el POST
2. El backend intenta hacer `prisma.contacto.create()`
3. PostgreSQL rechaza porque `email` tiene constraint `@unique`
4. Prisma lanza error P2002
5. El middleware `errorHandler` detecta P2002 y responde `{ error: "El email ya existe" }`
6. El frontend muestra un toast con el mensaje de error

**Pregunta 3**: ¿Que hace el hook `useSearch` diferente de simplemente usar `useState`?

**Respuesta**: Implementa "debounce". Si el usuario escribe "J-u-a-n" rapido, con `useState` haria 4 busquedas. Con `useSearch`, espera 250ms despues de la ultima tecla y hace solo 1 busqueda con "Juan" completo. Esto ahorra llamadas innecesarias al servidor.

---

## PARTE 9: RESUMEN EJECUTIVO

### El Proyecto en Un Parrafo

**LambdaWorks Test** es una aplicacion CRUD de contactos que demuestra dominio de tecnologias modernas. El **frontend** usa Next.js 16 con App Router, React 19, Tailwind CSS y shadcn/ui para una UI premium con tema dorado metalico. El **backend** es una API REST con Express 5, Prisma 6 como ORM, y PostgreSQL 16 como base de datos. La arquitectura separa claramente presentacion (componentes), logica de estado (hooks), comunicacion HTTP (api client), rutas (Express) y persistencia (Prisma/PostgreSQL).

### Fortalezas del Proyecto

1. **Cumple 100% de requisitos** - Obligatorios y extras
2. **Codigo bien estructurado** - Separacion de responsabilidades clara
3. **UX cuidada** - Validaciones en tiempo real, feedback con toasts, responsive
4. **Deploy funcional** - Accesible publicamente en Render
5. **Documentacion completa** - README, AGENTS.md, comentarios en codigo

### Para Explicar a Otros

> "Es una app para guardar contactos. Tiene una pantalla donde ves todos tus contactos en una tabla, puedes buscar, agregar nuevos, editarlos o eliminarlos. Por detras, cuando haces algo, el frontend le avisa al backend, el backend guarda los cambios en una base de datos, y te confirma que todo salio bien. El diseno es oscuro con detalles dorados, tipo premium."

---

## TECNOLOGIAS UTILIZADAS

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express 5.2.1
- **ORM**: Prisma 6.14.0
- **Base de datos**: PostgreSQL 16 (Alpine)
- **Contenedores**: Docker + Docker Compose

### Frontend
- **Framework**: Next.js 16.2.1
- **Libreria UI**: React 19.2.4
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui (Radix UI 1.4.3)
- **Iconos**: Lucide React
- **Notificaciones**: Sonner
- **Temas**: next-themes

### Deploy
- **Frontend**: Vercel / Render
- **Backend**: Render
- **Base de datos**: Render PostgreSQL

---

*Documento generado para el Technical Test de LambdaWorks*
*Ultima actualizacion: 2026*
