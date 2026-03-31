/*
  Warnings:

  - You are about to alter the column `nombre` on the `Contacto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `Contacto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `telefono` on the `Contacto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `apellido` on the `Contacto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "public"."Contacto" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "apellido" SET DATA TYPE VARCHAR(50);

-- RenameIndex
ALTER INDEX "public"."nombre_apellido_unique" RENAME TO "Contacto_nombre_apellido_key";
