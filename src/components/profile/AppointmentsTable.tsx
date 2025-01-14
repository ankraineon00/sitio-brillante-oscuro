import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

interface Appointment {
  id: string;
  pet_name: string;
  reason: string;
  appointment_date: string;
}

export const AppointmentsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: false });

      if (error) throw error;
      return data as Appointment[];
    },
  });

  const filteredAppointments = appointments?.filter(
    (appointment) =>
      appointment.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Citas</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar citas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mascota</TableHead>
                <TableHead>Razón</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : filteredAppointments?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No hay citas programadas
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments?.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.pet_name}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};