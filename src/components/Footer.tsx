import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-medicans-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Medicans</h3>
            <p className="text-sm">
              Hospital Veterinario comprometido con la salud y el bienestar de tus mascotas.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+34 123 456 789</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@medicans.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Calle Principal 123, Madrid</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <p className="mb-2">Lunes a Viernes: 9:00 - 20:00</p>
            <p className="mb-2">Sábados: 10:00 - 15:00</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p>&copy; {new Date().getFullYear()} Medicans. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}