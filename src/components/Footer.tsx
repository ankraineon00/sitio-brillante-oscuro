import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-medicans-dark text-white py-12">
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
                <span>(644)-412-9000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contacto@medicansvet.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Blvd. Ignacio Ramírez #198, Campestre</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="ml-6">Ciudad Obregón, Sonora. CP 85169</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <p className="mb-2">Lunes a Viernes: 8:00 - 19:30</p>
            <p className="mb-2">Sábados: 9:00 - 18:00</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center flex justify-between">
          <p>&copy; {new Date().getFullYear()} Medicans. Todos los derechos reservados.</p>
          <a href="https://www.jc-roman.com" target="_blank">
            <p>Designed by JC-Roman</p>
          </a>
        </div>
      </div>
    </footer>
  );
}