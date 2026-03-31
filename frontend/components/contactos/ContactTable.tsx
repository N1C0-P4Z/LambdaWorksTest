import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Contacto } from "@/lib/types";
import {
  getAvatarColor,
  getInitials,
  normalizeEmpresa,
  normalizePhone,
  normalizePuesto,
} from "@/lib/contact-helpers";

type ContactTableProps = {
  contactos: Contacto[];
  loading: boolean;
  error: string | null;
};

function TableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-10 w-full bg-[#F5F5F5]" />
      <Skeleton className="h-20 w-full bg-[#F5F5F5]" />
      <Skeleton className="h-20 w-full bg-[#F5F5F5]" />
      <Skeleton className="h-20 w-full bg-[#F5F5F5]" />
    </div>
  );
}

export function ContactTable({ contactos, loading, error }: ContactTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-[#E0E0E0] bg-white">
        <TableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
        No se pudo cargar la tabla: {error}
      </div>
    );
  }

  if (contactos.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E0E0E0] bg-white p-8 text-center text-[#333333]/70">
        Sin resultados
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white">
      <Table>
        <TableHeader className="bg-[#F5F5F5]">
          <TableRow className="border-[#E0E0E0] hover:bg-[#F5F5F5]">
            <TableHead className="px-4 py-3 text-sm font-semibold text-[#333333]">Contacto</TableHead>
            <TableHead className="px-4 py-3 text-sm font-semibold text-[#333333]">Teléfono</TableHead>
            <TableHead className="px-4 py-3 text-sm font-semibold text-[#333333]">Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {contactos.map((contacto, index) => (
            <TableRow
              key={contacto.id}
              className="border-[#E0E0E0] odd:bg-white even:bg-[#F9F9F9] hover:bg-[#F5F5F5]"
            >
              <TableCell className="px-4 py-4 align-top">
                <div className="flex min-w-[260px] items-start gap-3">
                  <Avatar className="size-11" style={{ backgroundColor: getAvatarColor(index) }}>
                    <AvatarFallback className="bg-transparent font-semibold text-white">
                      {getInitials(contacto.nombre)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-[#333333]">{contacto.nombre}</p>
                    <p className="text-sm text-[#333333]/90">{normalizePuesto(contacto.puesto)}</p>
                    <p className="text-sm text-[#333333]/70">{normalizeEmpresa(contacto.empresa)}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="min-w-[170px] px-4 py-4 text-sm text-[#333333]">
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4 text-[#0066CC]" />
                  {normalizePhone(contacto.telefono)}
                </span>
              </TableCell>

              <TableCell className="min-w-[220px] px-4 py-4 text-sm text-[#333333]">
                <span className="inline-flex items-center gap-2 break-all">
                  <Mail className="size-4 text-[#00A9A9]" />
                  {contacto.email}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
