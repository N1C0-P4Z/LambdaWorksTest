"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContactoFormData } from "@/lib/types";

type FormErrors = Partial<Record<keyof ContactoFormData, string>>;

type ContactFormProps = {
  initialData?: ContactoFormData;
  isEditing: boolean;
  onSubmit: (data: ContactoFormData) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
  formId?: string;
  /** Muestra botones Cancelar/Guardar dentro del propio form (para usar dentro de un Dialog) */
  showActions?: boolean;
};

const PHONE_REGEX = /^\+54\s?[0-9\s()-]{8,20}$/;

function validateField(field: keyof ContactoFormData, value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Este campo es requerido";
  }

  if (trimmed.length > 50) {
    return "No puede exceder 50 caracteres";
  }

  if ((field === "nombre" || field === "apellido") && trimmed.length < 2) {
    return "Debe tener al menos 2 caracteres";
  }

  if (field === "telefono" && !PHONE_REGEX.test(trimmed)) {
    return "Debe comenzar con +54. Ej: +54 9 341 1234567";
  }

  if (
    field === "email" &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmed)
  ) {
    return "Email inválido";
  }

  return "";
}

function validateForm(data: ContactoFormData): FormErrors {
  return {
    nombre: validateField("nombre", data.nombre),
    apellido: validateField("apellido", data.apellido),
    telefono: validateField("telefono", data.telefono),
    email: validateField("email", data.email),
  };
}

export function ContactForm({
  initialData,
  isEditing,
  onSubmit,
  isLoading,
  onCancel,
  formId = "contact-form",
  showActions = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactoFormData>(
    initialData || {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const hasErrors = useMemo(
    () => Object.values(errors).some((value) => Boolean(value)),
    [errors]
  );

  function updateField(field: keyof ContactoFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateForm(formData);
    setErrors(validation);

    if (Object.values(validation).some(Boolean)) {
      return;
    }

    await onSubmit({
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      telefono: formData.telefono.trim(),
      email: formData.email.trim(),
    });
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6">
      <section className={showActions ? "" : "rounded-2xl border border-border bg-card p-6 shadow-sm"}>
        {!showActions && (
          <div className="mb-5 flex items-center gap-2 text-foreground">
            <Phone className="size-5 text-[#1E90FF]" />
            <h2 className="text-2xl font-semibold">Información Personal</h2>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-foreground">
              Nombre
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => updateField("nombre", e.target.value)}
                disabled={isLoading}
                placeholder="Juan"
                maxLength={50}
                className="h-11 border-border bg-muted pl-9 text-foreground"
              />
            </div>
            {errors.nombre ? <p className="mt-1 text-xs text-[#FF3333]">{errors.nombre}</p> : null}
          </div>

          <div>
            <label htmlFor="apellido" className="mb-1 block text-sm font-medium text-foreground">
              Apellido
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => updateField("apellido", e.target.value)}
                disabled={isLoading}
                placeholder="Pérez"
                maxLength={50}
                className="h-11 border-border bg-muted pl-9 text-foreground"
              />
            </div>
            {errors.apellido ? <p className="mt-1 text-xs text-[#FF3333]">{errors.apellido}</p> : null}
          </div>

          <div>
            <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-foreground">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => updateField("telefono", e.target.value)}
                disabled={isLoading}
                placeholder="+54 9 341 1234567"
                maxLength={50}
                className="h-11 border-border bg-muted pl-9 text-foreground"
              />
            </div>
            {errors.telefono ? <p className="mt-1 text-xs text-[#FF3333]">{errors.telefono}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                disabled={isLoading}
                placeholder="juan@email.com"
                maxLength={50}
                className="h-11 border-border bg-muted pl-9 text-foreground"
              />
            </div>
            {errors.email ? <p className="mt-1 text-xs text-[#FF3333]">{errors.email}</p> : null}
          </div>
        </div>
      </section>

      {/* Botones en mobile (sin dialog) */}
      {!showActions && (
        <div className="grid gap-3 md:hidden">
          <Button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="h-11 w-full bg-muted text-foreground hover:bg-muted/90"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading || hasErrors}
            className="h-11 w-full border border-primary bg-card text-primary hover:bg-muted"
          >
            {isLoading ? "Guardando..." : isEditing ? "Guardar" : "Crear"}
          </Button>
        </div>
      )}

      {/* Botones inline para uso dentro de Dialog */}
      {showActions && (
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="h-10 bg-muted text-foreground hover:bg-accent"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading || hasErrors}
            className="h-10 bg-primary text-white hover:bg-primary/90"
          >
            {isLoading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear contacto"}
          </Button>
        </div>
      )}
    </form>
  );
}
