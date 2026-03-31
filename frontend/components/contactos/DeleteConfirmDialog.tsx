"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteConfirmDialogProps = {
  open: boolean;
  contactoNombre: string;
  contactoApellido: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
};

export function DeleteConfirmDialog({
  open,
  contactoNombre,
  contactoApellido,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel()}>
      <AlertDialogContent className="rounded-2xl border border-border bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-foreground">
            ¿Eliminar contacto?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-foreground/85">
            ¿Estás seguro de que quieres eliminar a {contactoNombre} {contactoApellido}? Esta acción
            no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="bg-transparent">
          <AlertDialogCancel
            disabled={isLoading}
            className="h-10 border-border bg-muted text-foreground hover:bg-accent"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              void onConfirm();
            }}
            disabled={isLoading}
            variant="destructive"
            className="h-10"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
