import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ActionCard = {
  title: string;
  description: string;
  href: string;
  background: string;
};

const actions: ActionCard[] = [
  {
    title: "👥 Todos los Contactos",
    description: "Ver y gestionar todos tus contactos",
    href: "/contactos",
    background: "#0066CC",
  },
  {
    title: "🔍 Buscar Contactos",
    description: "Encuentra contactos rápidamente",
    href: "/busqueda",
    background: "#00A9A9",
  },
  {
    title: "➕ Crear Nuevo",
    description: "Agregar un nuevo contacto",
    href: "/contactos/nuevo",
    background: "#1E90FF",
  },
];

export function DashboardPanel() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {actions.map((action) => (
        <Link key={action.title} href={action.href} className="block">
          <Card
            className="h-full cursor-pointer rounded-2xl border-0 py-0 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: action.background }}
          >
            <CardHeader className="space-y-2 pb-2">
              <CardTitle className="text-2xl font-bold leading-tight text-white">
                {action.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-6">
              <CardDescription className="text-base text-white/90">
                {action.description}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
