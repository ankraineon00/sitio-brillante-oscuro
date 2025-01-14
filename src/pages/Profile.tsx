import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { UserDashboard } from "@/components/profile/UserDashboard";
import { AppointmentsTable } from "@/components/profile/AppointmentsTable";
import { PasswordChange } from "@/components/profile/PasswordChange";
import { ProfileFooter } from "@/components/profile/ProfileFooter";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setUserEmail(user.email);
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      
      setUserName(profile?.full_name || null);
    };

    getUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <UserDashboard email={userEmail} name={userName} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <PasswordChange />
          <AppointmentsTable />
        </div>
      </main>
      <ProfileFooter />
    </div>
  );
};

export default Profile;