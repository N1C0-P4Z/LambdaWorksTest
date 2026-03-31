"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createContacto,
  deleteContacto,
  getContactoById,
  getContactoFormById,
  getContactos,
  updateContacto,
} from "@/lib/api";
import type { Contacto, ContactoFormData } from "@/lib/types";

type UseContactosOptions = {
  search?: string;
  autoFetch?: boolean;
};

export function useContactos(options: UseContactosOptions = {}) {
  const { search, autoFetch = true } = options;

  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);

  const [mutating, setMutating] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const cargarContactos = useCallback(async (term?: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getContactos(term);
      setContactos(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar contactos";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cargarContacto = useCallback(async (id: string) => {
    setSingleLoading(true);
    setSingleError(null);

    try {
      return await getContactoById(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar el contacto";
      setSingleError(message);
      throw err;
    } finally {
      setSingleLoading(false);
    }
  }, []);

  const cargarFormularioContacto = useCallback(async (id: string) => {
    setSingleLoading(true);
    setSingleError(null);

    try {
      return await getContactoFormById(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar datos del formulario";
      setSingleError(message);
      throw err;
    } finally {
      setSingleLoading(false);
    }
  }, []);

  const crear = useCallback(async (data: ContactoFormData) => {
    setMutating(true);
    setMutationError(null);

    try {
      return await createContacto(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al crear contacto";
      setMutationError(message);
      throw err;
    } finally {
      setMutating(false);
    }
  }, []);

  const actualizar = useCallback(async (id: string, data: ContactoFormData) => {
    setMutating(true);
    setMutationError(null);

    try {
      return await updateContacto(id, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al actualizar contacto";
      setMutationError(message);
      throw err;
    } finally {
      setMutating(false);
    }
  }, []);

  const eliminar = useCallback(async (id: string) => {
    setMutating(true);
    setMutationError(null);

    try {
      return await deleteContacto(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al eliminar contacto";
      setMutationError(message);
      throw err;
    } finally {
      setMutating(false);
    }
  }, []);

  useEffect(() => {
    if (!autoFetch) return;

    void cargarContactos(search);
  }, [autoFetch, cargarContactos, search]);

  return {
    contactos,
    loading,
    error,
    recargar: () => cargarContactos(search),
    cargarContacto,
    cargarFormularioContacto,
    crear,
    actualizar,
    eliminar,
    singleLoading,
    singleError,
    mutating,
    mutationError,
  };
}
