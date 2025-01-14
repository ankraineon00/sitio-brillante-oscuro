import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserDashboardProps {
  email: string | null;
  name: string | null;
}

export const UserDashboard = ({ email, name: initialName }: UserDashboardProps) => {
  const [name, setName] = useState(initialName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleNameUpdate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: name })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Nombre actualizado exitosamente");
      setIsEditing(false);
    } catch (error: any) {
      toast.error("Error al actualizar el nombre: " + error.message);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast.success("Avatar actualizado exitosamente");
    } catch (error: any) {
      toast.error("Error al actualizar el avatar: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl || ""} />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <Input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleAvatarUpload}
            disabled={isUploading}
          />
        </div>
        <div className="flex-1">
          <CardTitle className="text-2xl font-bold">Mi Perfil</CardTitle>
          {isEditing ? (
            <div className="flex gap-2 mt-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-xs"
                placeholder="Tu nombre"
              />
              <Button onClick={handleNameUpdate}>Guardar</Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">{name || "Sin nombre"}</p>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Correo electrónico</p>
          <p className="font-medium">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
};