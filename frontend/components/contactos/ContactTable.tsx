import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  getFullName,
  getInitials,
  normalizePhone,
} from "@/lib/contact-helpers";

// Robot triste con ojos en X para estado vacío
function SadRobot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Antena */}
      <circle cx="32" cy="8" r="4" fill="currentColor" opacity="0.6" />
      <rect x="30" y="10" width="4" height="8" fill="currentColor" opacity="0.6" />

      {/* Cabeza */}
      <rect x="12" y="18" width="40" height="32" rx="4" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" />

      {/* Ojo izquierdo (X) */}
      <line x1="20" y1="28" x2="28" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="28" x2="20" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Ojo derecho (X) */}
      <line x1="36" y1="28" x2="44" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="44" y1="28" x2="36" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Boca triste */}
      <path d="M24 44 Q32 40 40 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Cuerpo */}
      <rect x="18" y="52" width="28" height="10" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

type ContactTableProps = {
  contactos: Contacto[];
  loading: boolean;
  error: string | null;
  onEdit: (id: number) => void;
  onDelete: (id: number, nombre: string, apellido: string) => void;
};

function TableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-10 w-full bg-muted" />
      <Skeleton className="h-20 w-full bg-muted" />
      <Skeleton className="h-20 w-full bg-muted" />
      <Skeleton className="h-20 w-full bg-muted" />
    </div>
  );
}

export function ContactTable({ contactos, loading, error, onEdit, onDelete }: ContactTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card">
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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
        <SadRobot className="mb-3 h-20 w-20 text-foreground/50" />
        <span className="text-foreground/70">Sin resultados</span>
      </div>
    );
  }

  return (
    <>
      {/* 📱 VIEW: Mobile Cards (hidden on md and up) */}
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background shadow-[0_0_25px_rgba(212,175,55,0.15)] md:hidden">
        {contactos.map((contacto, index) => (
          <div key={contacto.id} className="flex items-center justify-between gap-3 p-4">
            {/* Avatar */}
            <div className="flex shrink-0 items-center justify-center">
              <Avatar className="size-11" style={{ backgroundColor: getAvatarColor(index) }}>
                <AvatarFallback className="bg-transparent font-semibold text-white">
                  {getInitials(contacto)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info Container */}
            <div className="flex flex-1 flex-col gap-2 overflow-hidden">
              <p className="truncate text-base font-semibold text-foreground">{getFullName(contacto)}</p>

              <div className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="size-4 shrink-0 text-[#1E90FF]" />
                <span className="truncate">{normalizePhone(contacto.telefono)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground">
                <Mail className="size-4 shrink-0 text-[#2ECC71]" />
                <span className="truncate">{contacto.email}</span>
              </div>
            </div>

            {/* Actions Container */}
            <div className="flex shrink-0 flex-col gap-2">
              <Button
                type="button"
                onClick={() => onEdit(contacto.id)}
                className="h-8 bg-[#d4af37] px-3 py-0 text-xs text-black hover:bg-[#b5952f]"
              >
                Editar
              </Button>
              <Button
                type="button"
                onClick={() => onDelete(contacto.id, contacto.nombre, contacto.apellido)}
                className="h-8 bg-destructive px-3 py-0 text-xs text-white hover:bg-destructive/90"
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 VIEW: Desktop Table (hidden on mobile) */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-background shadow-[0_0_30px_rgba(212,175,55,0.15)] md:block">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-border hover:bg-muted">
              <TableHead className="px-4 py-3 text-sm font-semibold text-foreground">Contacto</TableHead>
              <TableHead className="px-4 py-3 text-sm font-semibold text-foreground">Teléfono</TableHead>
              <TableHead className="px-4 py-3 text-sm font-semibold text-foreground">Email</TableHead>
              <TableHead className="px-4 py-3 text-right text-sm font-semibold text-foreground">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contactos.map((contacto, index) => (
              <TableRow
                key={contacto.id}
                onClick={() => onEdit(contacto.id)}
                className="cursor-pointer border-border bg-background hover:bg-muted"
              >
                <TableCell className="px-4 py-4 align-top">
                  <div className="flex min-w-[260px] items-start gap-3">
                    <Avatar className="size-11" style={{ backgroundColor: getAvatarColor(index) }}>
                      <AvatarFallback className="bg-transparent font-semibold text-white">
                        {getInitials(contacto)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-0.5">
                      <p className="text-base font-semibold text-foreground">{getFullName(contacto)}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="min-w-[170px] px-4 py-4 text-sm text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="size-4 text-[#1E90FF]" />
                    {normalizePhone(contacto.telefono)}
                  </span>
                </TableCell>

                <TableCell className="min-w-[220px] px-4 py-4 text-sm text-foreground">
                  <span className="inline-flex items-center gap-2 break-all">
                    <Mail className="size-4 text-[#2ECC71]" />
                    {contacto.email}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit(contacto.id);
                      }}
                      className="h-9 bg-[#d4af37] px-3 text-black hover:bg-[#b5952f]"
                    >
                      Editar
                    </Button>
                    <Button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(contacto.id, contacto.nombre, contacto.apellido);
                      }}
                      className="h-9 bg-destructive px-3 text-white hover:bg-destructive/90"
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
