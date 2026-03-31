"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ContactForm } from "@/components/contactos/ContactForm";
import { Button } from "@/components/ui/button";
import { useContactos } from "@/hooks/useContactos";
import type { ContactoFormData } from "@/lib/types";

const FORM_ID = "create-contact-form";

export default function NuevoContactoPage() {
  const router = useRouter();
  const { crear, mutating } = useContactos({ autoFetch: false });

  async function handleCreate(data: ContactoFormData) {
    try {
      await crear(data);
      toast.success("Contacto creado");
      router.push("/contactos");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo crear el contacto";
      toast.error(message);
    }
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-2xl bg-primary p-6 text-white shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Crear Nuevo Contacto</h1>
              <p className="mt-1 text-base text-white/90">Agregar un nuevo contacto</p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 md:w-auto md:grid-cols-2">
              <Button
                type="button"
                onClick={() => router.push("/contactos")}
                className="h-10 bg-blue-600 text-white hover:bg-blue-600/90"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                form={FORM_ID}
                disabled={mutating}
                className="h-10 border border-primary bg-card text-primary hover:bg-muted"
              >
                {mutating ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </section>

        <ContactForm
          isEditing={false}
          onSubmit={handleCreate}
          isLoading={mutating}
          onCancel={() => router.push("/contactos")}
          formId={FORM_ID}
        />
      </div>
    </main>
  );
}
