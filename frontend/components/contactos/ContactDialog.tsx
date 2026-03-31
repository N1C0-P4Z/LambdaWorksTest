"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactForm } from "@/components/contactos/ContactForm";
import { useContactos } from "@/hooks/useContactos";
import type { ContactoFormData } from "@/lib/types";

type ContactDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  contactId?: number;
  onSuccess: () => void;
  onClose: () => void;
};

const FORM_ID = "contact-dialog-form";

export function ContactDialog({
  open,
  mode,
  contactId,
  onSuccess,
  onClose,
}: ContactDialogProps) {
  const { crear, actualizar, cargarFormularioContacto, mutating, singleLoading } =
    useContactos({ autoFetch: false });

  const [initialData, setInitialData] = useState<ContactoFormData | undefined>(undefined);

  // Carga datos del contacto cuando se abre el diálogo en modo edición
  useEffect(() => {
    if (open && mode === "edit" && contactId) {
      cargarFormularioContacto(String(contactId)).then(setInitialData).catch(() => {});
    }
    if (!open) {
      // Limpia al cerrar para que la próxima apertura empiece vacía
      setInitialData(undefined);
    }
  }, [open, mode, contactId, cargarFormularioContacto]);

  async function handleSubmit(data: ContactoFormData) {
    if (mode === "create") {
      await crear(data);
    } else {
      await actualizar(String(contactId!), data);
    }
    onSuccess();
    onClose();
  }

  const isLoadingData = mode === "edit" && (singleLoading || !initialData);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="rounded-2xl border border-border bg-card p-0 sm:max-w-2xl">
        <DialogHeader className="rounded-t-2xl bg-primary px-6 py-5">
          <DialogTitle className="text-xl font-bold text-white">
            {mode === "create" ? "Nuevo Contacto" : "Editar Contacto"}
          </DialogTitle>
          <DialogDescription className="text-sm text-white/80">
            {mode === "create"
              ? "Completá los datos del nuevo contacto"
              : "Modificá la información del contacto"}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-5">
          {isLoadingData ? (
            <div className="space-y-4">
              <Skeleton className="h-11 w-full bg-muted" />
              <Skeleton className="h-11 w-full bg-muted" />
              <Skeleton className="h-11 w-full bg-muted" />
              <Skeleton className="h-11 w-full bg-muted" />
            </div>
          ) : (
            <ContactForm
              initialData={mode === "edit" ? initialData : undefined}
              isEditing={mode === "edit"}
              onSubmit={handleSubmit}
              isLoading={mutating}
              onCancel={onClose}
              formId={FORM_ID}
              showActions
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
