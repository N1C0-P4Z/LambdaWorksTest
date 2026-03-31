"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactTable } from "@/components/contactos/ContactTable";
import { ContactDialog } from "@/components/contactos/ContactDialog";
import { DeleteConfirmDialog } from "@/components/contactos/DeleteConfirmDialog";
import { SearchBar } from "@/components/contactos/SearchBar";
import { useContactos } from "@/hooks/useContactos";
import { useSearch } from "@/hooks/useSearch";
import { matchContacto, splitNombreCompleto } from "@/lib/contact-helpers";

// Estado del diálogo de crear/editar
type DialogState = {
  open: boolean;
  mode: "create" | "edit";
  contactId?: number;
};

// Estado del diálogo de eliminar
type DeleteState = {
  open: boolean;
  id?: number;
  nombreCompleto?: string;
};

export default function ContactosPage() {
  const { contactos, loading, error, recargar } = useContactos();
  const { eliminar, mutating } = useContactos({ autoFetch: false });
  const { search, setSearch, normalizedSearch } = useSearch("", 250);

  const [dialog, setDialog] = useState<DialogState>({ open: false, mode: "create" });
  const [deleteState, setDeleteState] = useState<DeleteState>({ open: false });

  // Notifica errores de carga
  useEffect(() => {
    if (error) toast.error(`Error al cargar contactos: ${error}`);
  }, [error]);

  // Filtro local por nombre, email o teléfono
  const contactosFiltrados = useMemo(
    () => contactos.filter((c) => matchContacto(c, normalizedSearch)),
    [contactos, normalizedSearch]
  );

  // --- Handlers de diálogo crear/editar ---
  function openCreate() {
    setDialog({ open: true, mode: "create" });
  }

  function openEdit(id: number) {
    setDialog({ open: true, mode: "edit", contactId: id });
  }

  function closeDialog() {
    setDialog((prev) => ({ ...prev, open: false }));
  }

  function handleDialogSuccess() {
    toast.success(dialog.mode === "create" ? "Contacto creado" : "Contacto actualizado");
    recargar();
  }

  // --- Handlers de eliminar ---
  function openDelete(id: number, nombreCompleto: string) {
    setDeleteState({ open: true, id, nombreCompleto });
  }

  function closeDelete() {
    setDeleteState({ open: false });
  }

  async function handleDelete() {
    if (!deleteState.id) return;
    try {
      await eliminar(String(deleteState.id));
      toast.success("Contacto eliminado");
      closeDelete();
      recargar();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "No se pudo eliminar";
      toast.error(msg);
    }
  }

  // Separa nombre y apellido para el diálogo de confirmación
  const parsedDeleteName = useMemo(() => {
    if (!deleteState.nombreCompleto) return { nombre: "", apellido: "" };
    return splitNombreCompleto(deleteState.nombreCompleto);
  }, [deleteState.nombreCompleto]);

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      {/* ── Header ────────────────────────────────────────────── */}
      <section className="bg-[#0066CC] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-5">
          {/* Título */}
          <div>
            <h1 className="text-3xl font-bold">Contactos</h1>
            <p className="mt-1 text-base text-white/80">
              {loading
                ? "Cargando..."
                : `${contactos.length} contacto${contactos.length !== 1 ? "s" : ""} en total`}
            </p>
          </div>

          {/* Buscador + botón Nuevo */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Buscar por nombre, email o teléfono..."
              />
            </div>
            <Button
              type="button"
              onClick={openCreate}
              className="h-11 shrink-0 bg-white px-5 font-semibold text-[#0066CC] hover:bg-[#F5F5F5] sm:w-auto"
            >
              <Plus className="mr-2 size-4" />
              Nuevo
            </Button>
          </div>
        </div>
      </section>

      {/* ── Tabla de contactos ────────────────────────────────── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <ContactTable
            contactos={contactosFiltrados}
            loading={loading}
            error={error}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        </div>
      </section>

      {/* ── Modal crear / editar ──────────────────────────────── */}
      <ContactDialog
        open={dialog.open}
        mode={dialog.mode}
        contactId={dialog.contactId}
        onSuccess={handleDialogSuccess}
        onClose={closeDialog}
      />

      {/* ── Modal confirmar eliminación ───────────────────────── */}
      <DeleteConfirmDialog
        open={deleteState.open}
        contactoNombre={parsedDeleteName.nombre}
        contactoApellido={parsedDeleteName.apellido}
        onConfirm={handleDelete}
        onCancel={closeDelete}
        isLoading={mutating}
      />
    </main>
  );
}
