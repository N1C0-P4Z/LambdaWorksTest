"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-300 bg-card p-6 text-foreground shadow-sm">
        <h2 className="text-2xl font-bold text-red-700">Ocurrió un error</h2>
        <p className="mt-2 text-sm text-foreground/80">
          Algo falló al cargar la pantalla. Podés intentar nuevamente.
        </p>
        <Button onClick={reset} className="mt-4 h-10 bg-primary px-4 text-white hover:bg-primary/90">
          Reintentar
        </Button>
      </div>
    </main>
  );
}
