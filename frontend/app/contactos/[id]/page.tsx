"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactForm } from "@/components/contactos/ContactForm";
import { DeleteConfirmDialog } from "@/components/contactos/DeleteConfirmDialog";
import { useContactos } from "@/hooks/useContactos";
import { getInitials, splitNombreCompleto } from "@/lib/contact-helpers";
import type { ContactoFormData } from "@/lib/types";

const FORM_ID = "edit-contact-form";

export default function EditarContactoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { cargarFormularioContacto, actualizar, eliminar, singleLoading, mutating } = useContactos({
    autoFetch: false,
  });

  const [initialData, setInitialData] = useState<ContactoFormData | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function loadContacto() {
      try {
        const data = await cargarFormularioContacto(id);
        setInitialData(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : "No se pudo cargar el contacto";
        toast.error(message);
      }
    }

    void loadContacto();
  }, [cargarFormularioContacto, id]);

  const fullName = useMemo(() => {
    if (!initialData) return "";
    return `${initialData.nombre} ${initialData.apellido}`.trim();
  }, [initialData]);

  const parsedName = useMemo(() => splitNombreCompleto(fullName), [fullName]);

  async function handleUpdate(data: ContactoFormData) {
    try {
      await actualizar(id, data);
      toast.success("Contacto actualizado");
      router.push("/contactos");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo actualizar el contacto";
      toast.error(message);
    }
  }

  async function handleDelete() {
    try {
      await eliminar(id);
      toast.success("Contacto eliminado");
      setDialogOpen(false);
      router.push("/contactos");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo eliminar el contacto";
      toast.error(message);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-4 py-8 text-[#333333] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-2xl bg-[#0066CC] p-6 text-white shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold">Editar Contacto</h1>
                <p className="mt-1 text-base text-white/90">Modificar información del contacto</p>
              </div>

              {singleLoading || !initialData ? (
                <Skeleton className="h-12 w-52 bg-white/30" />
              ) : (
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 bg-[#1E90FF]">
                    <AvatarFallback className="bg-transparent text-lg font-semibold text-white">
                      {getInitials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold text-white">{fullName}</p>
                </div>
              )}
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3 md:w-auto md:grid-cols-3">
              <Button
                type="button"
                onClick={() => router.push("/contactos")}
                className="h-10 bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                form={FORM_ID}
                disabled={mutating || singleLoading}
                className="h-10 border border-[#0066CC] bg-white text-[#0066CC] hover:bg-[#F5F5F5]"
              >
                {mutating ? "Guardando..." : "Guardar"}
              </Button>
              <Button
                type="button"
                onClick={() => setDialogOpen(true)}
                disabled={mutating || singleLoading || !initialData}
                className="h-10 bg-[#FF3333] text-white hover:bg-[#FF3333]/90"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </section>

        {singleLoading || !initialData ? (
          <section className="space-y-3 rounded-2xl border border-[#E0E0E0] bg-white p-6 shadow-sm">
            <Skeleton className="h-12 w-full bg-[#F5F5F5]" />
            <Skeleton className="h-12 w-full bg-[#F5F5F5]" />
            <Skeleton className="h-12 w-full bg-[#F5F5F5]" />
            <Skeleton className="h-12 w-full bg-[#F5F5F5]" />
          </section>
        ) : (
          <ContactForm
            initialData={initialData}
            isEditing
            onSubmit={handleUpdate}
            isLoading={mutating}
            onCancel={() => router.push("/contactos")}
            formId={FORM_ID}
          />
        )}

        <DeleteConfirmDialog
          open={dialogOpen}
          contactoNombre={parsedName.nombre || initialData?.nombre || ""}
          contactoApellido={parsedName.apellido || initialData?.apellido || ""}
          onCancel={() => setDialogOpen(false)}
          onConfirm={handleDelete}
          isLoading={mutating}
        />
      </div>
    </main>
  );
}
