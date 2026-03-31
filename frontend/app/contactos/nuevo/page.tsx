import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NuevoContactoPendientePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#E0E0E0] bg-white p-8 text-[#333333] shadow-sm">
        <h1 className="text-3xl font-bold">Crear Nuevo Contacto</h1>
        <p className="mt-3 text-base text-[#333333]/80">
          Esta pantalla se implementará en la siguiente etapa (formulario de creación).
        </p>
        <div className="mt-6">
          <Button asChild className="h-10 bg-[#0066CC] px-4 text-white hover:bg-[#0066CC]/90">
            <Link href="/">Volver al Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
