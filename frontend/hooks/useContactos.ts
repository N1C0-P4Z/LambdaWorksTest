"use client";

import { useCallback, useEffect, useState } from "react";
import { getContactos } from "@/lib/api";
import type { Contacto } from "@/lib/types";

type UseContactosOptions = {
  search?: string;
};

export function useContactos(options: UseContactosOptions = {}) {
  const { search } = options;
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarContactos = useCallback(async (term?: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getContactos(term);
      setContactos(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar contactos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void cargarContactos(search);
  }, [cargarContactos, search]);

  return {
    contactos,
    loading,
    error,
    recargar: () => cargarContactos(search),
  };
}
