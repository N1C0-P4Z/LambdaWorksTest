import type { ApiErrorPayload, Contacto } from "@/lib/types";

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
      // no-op: usamos el mensaje por defecto
    }

    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

export async function getContactos(search?: string): Promise<Contacto[]> {
  const params = new URLSearchParams();
  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/api/contactos?${queryString}` : "/api/contactos";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return handleResponse<Contacto[]>(response);
}
