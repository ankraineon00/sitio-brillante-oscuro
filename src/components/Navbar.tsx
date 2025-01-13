import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

export const Navbar = () => {
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al cerrar sesión",
        description: error.message,
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-medicans-dark border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/169b4edb-9156-4731-84ee-a0ae1a0b8de7.png"
              alt="Medicans"
              className="h-8"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/appointment">
              <Button variant="ghost">
                Agendar Cita
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};