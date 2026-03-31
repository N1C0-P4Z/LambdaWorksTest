import type { Contacto } from "@/lib/types";

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

export function normalizePuesto(puesto?: string | null) {
  return puesto?.trim() || "Sin puesto";
}

export function normalizeEmpresa(empresa?: string | null) {
  return empresa?.trim() || "Sin empresa";
}

export function matchContacto(contacto: Contacto, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const haystack = [
    contacto.nombre,
    contacto.email,
    contacto.telefono ?? "",
    contacto.empresa ?? "",
    contacto.puesto ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}
