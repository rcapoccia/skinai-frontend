import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Compila tutti i campi");
      return;
    }
    localStorage.setItem("skinai_user", JSON.stringify({ email: loginData.email }));
    toast.success("Accesso effettuato!");
    setLocation("/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.email || !registerData.password) {
      toast.error("Email e password sono obbligatori");
      return;
    }
    if (registerData.password.length < 6) {
      toast.error("La password deve essere di almeno 6 caratteri");
      return;
    }
    localStorage.setItem("skinai_user", JSON.stringify({ 
      email: registerData.email,
      name: registerData.name 
    }));
    toast.success("Registrazione completata!");
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      <Card className="w-full max-w-md bg-white/95 rounded-3xl shadow-soft">
        <CardHeader className="text-center">
          <img src="/logo.png" alt="SkinAI" className="h-16 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">SkinAI</CardTitle>
          <CardDescription className="text-base">
            Analisi della pelle con intelligenza artificiale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registrati</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tua@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-full py-6 text-base bg-primary hover:bg-primary/90"
                >
                  Accedi
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome (opzionale)</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Il tuo nome"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tua@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Minimo 6 caratteri"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="rounded-lg"
                  />
                  <p className="text-xs text-muted-foreground">Minimo 6 caratteri</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-full py-6 text-base bg-primary hover:bg-primary/90"
                >
                  Registrati
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
