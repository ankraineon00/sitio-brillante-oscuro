import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { es } from "date-fns/locale";
import { Navbar } from "@/components/Navbar";
import { ProfileFooter } from "@/components/profile/ProfileFooter";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [petName, setPetName] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !petName || !reason) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor completa todos los campos",
      });
      return;
    }

    try {
      // Combine date and time
      const dateTime = new Date(date);
      const [hours, minutes] = time.split(":");
      dateTime.setHours(parseInt(hours), parseInt(minutes));

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("appointments")
        .insert({
          pet_name: petName,
          reason: reason,
          appointment_date: dateTime.toISOString(),
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Cita agendada",
        description: "Tu cita ha sido agendada exitosamente",
      });

      // Reset form and navigate to profile
      setDate(undefined);
      setTime("");
      setPetName("");
      setReason("");
      navigate("/profile");
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error al agendar la cita",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 my-5 pt-20 pb-8">
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
                  className="rounded-md border flex justify-center"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora de la cita</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  min="09:00"
                  max="18:00"
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
      <ProfileFooter />
    </div>
  );
};

export default Appointment;