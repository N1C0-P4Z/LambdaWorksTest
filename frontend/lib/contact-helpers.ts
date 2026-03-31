import type { Contacto, ContactoFormData } from "@/lib/types";

const AVATAR_COLORS = ["#D4AF37"];

export function getInitials(contacto: Contacto) {
  const nombre = contacto.nombre?.trim() || "";
  const apellido = contacto.apellido?.trim() || "";

  if (!nombre && !apellido) return "??";

  const inicialNombre = nombre[0]?.toUpperCase() || "";
  const inicialApellido = apellido[0]?.toUpperCase() || "";

  return `${inicialNombre}${inicialApellido}` || "??";
}

export function getFullName(contacto: Contacto) {
  return `${contacto.nombre} ${contacto.apellido}`.trim();
}

export function getAvatarColor(index: number) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export function normalizePhone(telefono?: string | null) {
  return telefono?.trim() || "Sin teléfono";
}

export function matchContacto(contacto: Contacto, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const haystack = [
    contacto.nombre,
    contacto.apellido,
    contacto.email,
    contacto.telefono ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

export function contactoToFormData(contacto: Contacto): ContactoFormData {
  return {
    nombre: contacto.nombre || "",
    apellido: contacto.apellido || "",
    telefono: contacto.telefono || "",
    email: contacto.email || "",
  };
}
