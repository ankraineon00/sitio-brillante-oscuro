import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/169b4edb-9156-4731-84ee-a0ae1a0b8de7.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="font-semibold text-xl text-foreground">Medicans</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/">Inicio</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#galeria">Galería</a>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Cerrar sesión
            </Button>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/">Inicio</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#galeria">Galería</a>
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};