import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserDashboardProps {
  email: string | null;
  name: string | null;
}

export const UserDashboard = ({ email, name }: UserDashboardProps) => {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">Mi Perfil</CardTitle>
          <p className="text-muted-foreground">{name || "Sin nombre"}</p>
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