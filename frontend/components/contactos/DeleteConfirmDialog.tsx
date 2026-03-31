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
      <AlertDialogContent className="rounded-2xl border border-[#E0E0E0] bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-[#333333]">
            ¿Eliminar contacto?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#333333]/85">
            ¿Estás seguro de que quieres eliminar a {contactoNombre} {contactoApellido}? Esta acción
            no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="bg-transparent">
          <AlertDialogCancel
            disabled={isLoading}
            className="h-10 border-[#E0E0E0] bg-[#F5F5F5] text-[#333333] hover:bg-[#EDEDED]"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              void onConfirm();
            }}
            disabled={isLoading}
            className="h-10 bg-[#FF3333] text-white hover:bg-[#FF3333]/90"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
