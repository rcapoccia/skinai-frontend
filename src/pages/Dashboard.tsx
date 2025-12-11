import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import VirtualAssistant from "@/components/VirtualAssistant";
import { Sparkles, ClipboardList, BookOpen, Droplets, Eye, Sun, Activity, Target, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("skinai_user");
    if (!storedUser) {
      setLocation("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [setLocation]);

  const userName = user?.name || "Utente";

  const mainActions = [
    {
      icon: ClipboardList,
      title: "Questionario",
      description: "Compila il questionario personalizzato",
      action: () => setLocation("/questionario"),
      color: "from-[#D1A78C] to-[#B78A72]"
    },
    {
      icon: Sparkles,
      title: "Analisi AI",
      description: "Carica le tue foto per l'analisi",
      action: () => setLocation("/upload"),
      color: "from-[#E8D9C5] to-[#D1A78C]"
    },
    {
      icon: BookOpen,
      title: "Diario",
      description: "Traccia i progressi della tua pelle",
      action: () => setLocation("/diario"),
      color: "from-[#B78A72] to-[#886349]"
    }
  ];

  const analysisAreas = [
    { icon: Droplets, title: "Idratazione", color: "bg-blue-50 text-blue-600" },
    { icon: Eye, title: "Occhiaie", color: "bg-purple-50 text-purple-600" },
    { icon: Sun, title: "Macchie", color: "bg-amber-50 text-amber-600" },
    { icon: Activity, title: "Rughe", color: "bg-rose-50 text-rose-600" },
    { icon: Target, title: "Pori", color: "bg-emerald-50 text-emerald-600" }
  ];

  const steps = [
    { number: 1, label: "Questionario", completed: false },
    { number: 2, label: "Analisi", completed: false },
    { number: 3, label: "Report", completed: false }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-7xl">
          {/* Hero Card con Badge */}
          <Card className="mb-8 rounded-3xl overflow-hidden border-none shadow-glow relative glass-card hover-lift">
            <div 
              className="gradient-dashboard p-8 md:p-12 relative"
              style={{
                backgroundImage: "url(/hero-dashboard.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-transparent" />
              
              <div className="relative max-w-3xl">
                <div className="eyebrow-text mb-4">Area personale</div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Ciao, {userName}! 👋
                </h1>
                <p className="text-lg text-muted-foreground mb-2">
                  Bentornata nella tua cabina skincare digitale
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Qui trovi tutte le tue analisi, i report personalizzati e il diario della pelle
                </p>
              </div>

              {/* Badge circolare desktop */}
              <div className="hidden md:flex absolute top-8 right-8 w-28 h-28 rounded-full bg-white shadow-glow items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">Analisi</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Bar 3-Step */}
          <Card className="mb-8 rounded-3xl shadow-soft glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps.map((step, idx) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                        step.completed 
                          ? "bg-primary text-primary-foreground shadow-glow" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step.number}
                      </div>
                      <span className="text-xs mt-2 font-medium">{step.label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="flex-1 h-1 mx-4 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${
                          step.completed ? "bg-primary w-full" : "bg-muted w-0"
                        }`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 3 Main Action Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {mainActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={idx}
                  className="rounded-3xl shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer group overflow-hidden glass-card hover-lift"
                  onClick={action.action}
                >
                  <div className={`h-2 bg-gradient-to-r ${action.color}`} />
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between group-hover:bg-primary/5 rounded-full"
                    >
                      Inizia
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Aree di Analisi */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Aree di Analisi</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {analysisAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <Card 
                    key={idx}
                    className="rounded-3xl shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer group glass-card hover-lift"
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-2xl ${area.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-sm">{area.title}</h3>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Bottom */}
          <Card className="rounded-3xl shadow-glow gradient-secondary border-primary/20 glass-card hover-lift">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Pronta per la tua prima analisi?</h3>
              <p className="text-muted-foreground mb-6">
                Inizia compilando il questionario personalizzato
              </p>
              <Button 
                size="lg"
                className="rounded-full px-8 gap-2 bg-primary hover:bg-primary/90"
                onClick={() => setLocation("/questionario")}
              >
                <Sparkles className="h-5 w-5" />
                Inizia ora
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <VirtualAssistant />
    </div>
  );
}
