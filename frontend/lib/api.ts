import { contactoToFormData } from "@/lib/contact-helpers";
import type { ApiErrorPayload, Contacto, ContactoFormData } from "@/lib/types";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Error HTTP ${response.status}`;

    try {
      const payload = (await response.json()) as ApiErrorPayload;
      message = payload.error || payload.message || message;
    } catch {
      // usamos mensaje por defecto
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function request<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const response = await fetch(endpoint, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
    ...init,
  });

  return handleResponse<T>(response);
}

function toBackendPayload(data: ContactoFormData) {
  return {
    nombre: data.nombre.trim(),
    apellido: data.apellido.trim(),
    telefono: data.telefono.trim(),
    email: data.email.trim().toLowerCase(),
  };
}

export async function getContactos(search?: string): Promise<Contacto[]> {
  const params = new URLSearchParams();
  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/api/contactos?${queryString}` : "/api/contactos";

  return request<Contacto[]>(endpoint, { method: "GET" });
}

export async function getContactoById(id: string): Promise<Contacto> {
  return request<Contacto>(`/api/contactos/${id}`, { method: "GET" });
}

export async function createContacto(data: ContactoFormData): Promise<Contacto> {
  return request<Contacto>("/api/contactos", {
    method: "POST",
    body: JSON.stringify(toBackendPayload(data)),
  });
}

export async function updateContacto(id: string, data: ContactoFormData): Promise<Contacto> {
  return request<Contacto>(`/api/contactos/${id}`, {
    method: "PUT",
    body: JSON.stringify(toBackendPayload(data)),
  });
}

export async function deleteContacto(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/contactos/${id}`, {
    method: "DELETE",
  });
}

export async function getContactoFormById(id: string): Promise<ContactoFormData> {
  const contacto = await getContactoById(id);
  return contactoToFormData(contacto);
}
