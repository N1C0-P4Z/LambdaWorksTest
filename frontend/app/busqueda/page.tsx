"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { ContactCard } from "@/components/contactos/ContactCard";
import { SearchBar } from "@/components/contactos/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useContactos } from "@/hooks/useContactos";
import { useSearch } from "@/hooks/useSearch";

export default function BusquedaPage() {
  const { search, setSearch, debouncedSearch, normalizedSearch } = useSearch("", 400);
  const { contactos, loading, error } = useContactos({ search: debouncedSearch });

  useEffect(() => {
    if (error) {
      toast.error(`Error cargando búsqueda: ${error}`);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#333333]">
      <section className="bg-[#0077BE] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <h1 className="text-center text-3xl font-bold">Búsqueda de Contactos</h1>
          <h2 className="text-2xl font-semibold">Búsqueda Avanzada</h2>
          <p className="text-base text-white/90">
            Encuentra contactos por nombre, email o teléfono
          </p>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar contactos..."
            className="max-w-3xl"
          />
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="rounded-2xl bg-[#EAF2F8] p-4">
            <p className="text-xl font-semibold text-[#333333]">
              Se encontraron {loading ? "..." : contactos.length} resultados
            </p>
            <p className="text-base text-[#333333]/80">
              Búsqueda: &quot;{normalizedSearch || ""}&quot;
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-40 rounded-2xl bg-white" />
              <Skeleton className="h-40 rounded-2xl bg-white" />
            </div>
          ) : contactos.length === 0 ? (
            <div className="rounded-2xl border border-[#E0E0E0] bg-white p-8 text-center text-lg text-[#333333]/80">
              Sin resultados
            </div>
          ) : (
            <div className="space-y-4">
              {contactos.map((contacto, index) => (
                <ContactCard key={contacto.id} contacto={contacto} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
