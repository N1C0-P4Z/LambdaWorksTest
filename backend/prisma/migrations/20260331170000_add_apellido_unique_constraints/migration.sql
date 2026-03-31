-- ============================================
-- Migración: Agregar apellido y constraints únicos
-- ============================================

-- 1. Agregar columna apellido (temporalmente nullable)
ALTER TABLE "Contacto" ADD COLUMN "apellido" TEXT;

-- 2. Extraer apellido del nombre existente
-- Si el nombre tiene espacios, toma todo después del primer espacio como apellido
-- Si no tiene espacios, usa "Sin apellido" como placeholder
UPDATE "Contacto"
SET "apellido" = CASE
    WHEN position(' ' IN "nombre") > 0
    THEN trim(substring("nombre" from position(' ' IN "nombre") + 1))
    ELSE 'Sin apellido'
END;

-- 3. Actualizar nombre para que solo contenga el primer nombre
UPDATE "Contacto"
SET "nombre" = CASE
    WHEN position(' ' IN "nombre") > 0
    THEN trim(substring("nombre" from 1 for position(' ' IN "nombre") - 1))
    ELSE "nombre"
END;

-- 4. Hacer apellido NOT NULL
ALTER TABLE "Contacto" ALTER COLUMN "apellido" SET NOT NULL;

-- 5. Hacer telefono NOT NULL (primero asegurar que no haya nulls)
UPDATE "Contacto" SET "telefono" = '+54 000 000 0000' WHERE "telefono" IS NULL;
ALTER TABLE "Contacto" ALTER COLUMN "telefono" SET NOT NULL;

-- 6. Agregar constraint único para telefono
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_telefono_key" UNIQUE ("telefono");

-- 7. Agregar constraint único compuesto para nombre + apellido
ALTER TABLE "Contacto" ADD CONSTRAINT "nombre_apellido_unique" UNIQUE ("nombre", "apellido");
