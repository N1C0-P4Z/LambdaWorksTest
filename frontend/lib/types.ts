export type Contacto = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ContactoFormData = {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
};

export type ApiErrorPayload = {
  error?: string;
  message?: string;
};
