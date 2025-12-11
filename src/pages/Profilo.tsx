import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { User } from "lucide-react";
import { useState, useEffect } from "react";

export default function Profilo() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("skinai_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-4xl">
          <Card className="rounded-3xl shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <User className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Profilo</CardTitle>
              </div>
              <CardDescription>
                Le tue informazioni account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{user?.email || "Non disponibile"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nome</p>
                  <p className="font-medium">{user?.name || "Non impostato"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Analisi Totali</p>
                  <p className="font-medium">0</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Membro dal</p>
                  <p className="font-medium">{new Date().toLocaleDateString("it-IT")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
