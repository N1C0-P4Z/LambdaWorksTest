"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ContactTable } from "@/components/contactos/ContactTable";
import { SearchBar } from "@/components/contactos/SearchBar";
import { Button } from "@/components/ui/button";
import { useContactos } from "@/hooks/useContactos";
import { useSearch } from "@/hooks/useSearch";
import { matchContacto } from "@/lib/contact-helpers";

export default function ContactosPage() {
  const router = useRouter();
  const { contactos, loading, error } = useContactos();
  const { search, setSearch, normalizedSearch } = useSearch("", 250);

  useEffect(() => {
    if (error) {
      toast.error(`Error al cargar contactos: ${error}`);
    }
  }, [error]);

  const contactosFiltrados = useMemo(
    () => contactos.filter((contacto) => matchContacto(contacto, normalizedSearch)),
    [contactos, normalizedSearch]
  );

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#333333]">
      <section className="bg-[#0066CC] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Lista de Contactos</h1>
              <p className="text-lg text-white/90">
                {loading ? "Cargando contactos..." : `${contactos.length} contactos totales`}
              </p>
            </div>

            <Button
              type="button"
              onClick={() => router.push("/contactos/nuevo")}
              className="h-10 w-full bg-white px-4 text-[#0066CC] hover:bg-[#F5F5F5] md:w-auto"
            >
              Crear Nuevo
            </Button>
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar contactos..."
            className="max-w-3xl"
          />
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <ContactTable
            contactos={contactosFiltrados}
            loading={loading}
            error={error}
            onEdit={(id) => router.push(`/contactos/${id}`)}
          />
        </div>
      </section>
    </main>
  );
}
