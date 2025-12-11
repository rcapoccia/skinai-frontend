import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulazione login/registrazione
    localStorage.setItem("skinai_user", JSON.stringify({ username: formData.username }));
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/questionnaire-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3
        }}
      />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="SkinAI" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-foreground">
            Benvenuto in SkinAI
          </h1>
          <p className="text-muted-foreground mt-2">
            La tua analisi della pelle personalizzata
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isLogin ? "Accedi" : "Registrati"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Inserisci le tue credenziali per accedere" 
                : "Crea un nuovo account per iniziare"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nome utente</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Il tuo nome utente"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tua@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLogin ? "Accedi" : "Registrati"}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline"
                >
                  {isLogin 
                    ? "Non hai un account? Registrati" 
                    : "Hai già un account? Accedi"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
