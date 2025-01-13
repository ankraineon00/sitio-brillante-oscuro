import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="medicans-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Index />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  !isAuthenticated ? (
                    <Register />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;