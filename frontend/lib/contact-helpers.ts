import type { Contacto, ContactoFormData } from "@/lib/types";

const AVATAR_COLORS = ["#0066CC", "#008B8B", "#1E90FF", "#0077BE"];

export function getInitials(nombre: string) {
  const trimmed = nombre.trim();
  if (!trimmed) return "??";

  const parts = trimmed.split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
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
    contacto.email,
    contacto.telefono ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

export function splitNombreCompleto(nombreCompleto: string) {
  const parts = nombreCompleto.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { nombre: "", apellido: "" };
  }

  if (parts.length === 1) {
    return { nombre: parts[0], apellido: "" };
  }

  return {
    nombre: parts[0],
    apellido: parts.slice(1).join(" "),
  };
}

export function buildNombreCompleto(nombre: string, apellido: string) {
  return `${nombre.trim()} ${apellido.trim()}`.trim();
}

export function contactoToFormData(contacto: Contacto): ContactoFormData {
  const { nombre, apellido } = splitNombreCompleto(contacto.nombre);

  return {
    nombre,
    apellido,
    telefono: contacto.telefono?.trim() || "",
    email: contacto.email,
  };
}
