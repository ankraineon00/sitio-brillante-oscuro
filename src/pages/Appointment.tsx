import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { es } from "date-fns/locale";

const Appointment = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [petName, setPetName] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !petName || !reason) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor completa todos los campos",
      });
      return;
    }

    // TODO: Implement appointment creation with Supabase
    toast({
      title: "Cita agendada",
      description: "Tu cita ha sido agendada exitosamente",
    });
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Agendar Cita</CardTitle>
          <CardDescription>
            Programa una cita con nuestros veterinarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha de la cita</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={es}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="petName">Nombre de la mascota</Label>
              <Input
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ingresa el nombre de tu mascota"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo de la consulta</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe el motivo de tu consulta"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">
              Agendar Cita
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;