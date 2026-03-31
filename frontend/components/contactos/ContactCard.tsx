import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import type { Contacto } from "@/lib/types";
import {
  getAvatarColor,
  getInitials,
  normalizePhone,
} from "@/lib/contact-helpers";

type ContactCardProps = {
  contacto: Contacto;
  index: number;
};

export function ContactCard({ contacto, index }: ContactCardProps) {
  return (
    <Card className="rounded-2xl border border-border bg-card py-0 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="size-14" style={{ backgroundColor: getAvatarColor(index) }}>
            <AvatarFallback className="bg-transparent text-lg font-semibold text-white">
              {getInitials(contacto.nombre)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="truncate text-xl font-semibold text-foreground">{contacto.nombre}</h3>


            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <p className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="size-4 text-primary" />
                {normalizePhone(contacto.telefono)}
              </p>
              <p className="flex items-center gap-2 break-all text-sm text-foreground">
                <Mail className="size-4 text-teal-500" />
                {contacto.email}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
