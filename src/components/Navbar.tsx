import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-medicans-dark/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src="/lovable-uploads/169b4edb-9156-4731-84ee-a0ae1a0b8de7.png" alt="Medicans" className="h-12" />
          <div className="hidden md:flex space-x-6">
            <a href="#inicio" className="text-gray-600 dark:text-gray-200 hover:text-medicans-primary transition-colors">Inicio</a>
            <a href="#servicios" className="text-gray-600 dark:text-gray-200 hover:text-medicans-primary transition-colors">Servicios</a>
            <a href="#galeria" className="text-gray-600 dark:text-gray-200 hover:text-medicans-primary transition-colors">Galería</a>
            <a href="#contacto" className="text-gray-600 dark:text-gray-200 hover:text-medicans-primary transition-colors">Contacto</a>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}