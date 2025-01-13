import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img
            src="/lovable-uploads/169b4edb-9156-4731-84ee-a0ae1a0b8de7.png"
            alt="Logo"
            className="h-20 w-auto mb-6"
          />
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card p-8 rounded-lg shadow-lg">
          <Auth
            supabaseClient={supabase}
            view="sign_up"
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2B5BA7',
                    brandAccent: '#1A1F2C',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_up: {
                  email_label: "Correo electrónico",
                  password_label: "Contraseña",
                  button_label: "Registrarse",
                  loading_button_label: "Registrando...",
                  social_provider_text: "Registrarse con {{provider}}",
                  link_text: "¿No tienes una cuenta? Regístrate",
                },
              },
            }}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Medicans. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Register;