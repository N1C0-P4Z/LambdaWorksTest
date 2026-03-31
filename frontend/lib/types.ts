export type Contacto = {
  id: number;
  nombre: string;
  email: string;
  telefono?: string | null;
  puesto?: string | null;
  empresa?: string | null;
  categoria?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiErrorPayload = {
  error?: string;
  message?: string;
};
