import { DashboardPanel } from "@/components/contactos/DashboardPanel";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-4 py-8 text-[#333333] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-[#333333]">Dashboard Principal</p>
          <h1 className="mt-2 text-4xl font-bold text-[#333333]">Panel de Contactos</h1>
          <p className="mt-2 text-lg text-[#333333]/80">
            Gestiona y organiza tus contactos profesionales
          </p>
        </header>

        <DashboardPanel />
      </div>
    </main>
  );
}
