import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/Sidebar";
import { Sparkles, Calendar, Droplets, Eye, Sun, Activity, Target, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import VirtualAssistant from "@/components/VirtualAssistant";

export default function Report() {
  const [, setLocation] = useLocation();

  const analysisResults = [
    {
      icon: Droplets,
      title: "Idratazione",
      score: 85,
      status: "Buona",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "La tua pelle mostra un buon livello di idratazione. Mantieni l'uso di sieri a base di acido ialuronico per preservare questo equilibrio."
    },
    {
      icon: Eye,
      title: "Occhiaie",
      score: 65,
      status: "Moderata",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Sono presenti occhiaie di media intensità. Consigliamo un contorno occhi con caffeina e vitamina K per ridurre il gonfiore e schiarire la zona."
    },
    {
      icon: Sun,
      title: "Macchie",
      score: 72,
      status: "Lieve",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Rilevate lievi discromie. L'uso quotidiano di vitamina C e protezione solare SPF 50+ aiuterà a prevenire e ridurre le macchie."
    },
    {
      icon: Activity,
      title: "Rughe",
      score: 80,
      status: "Minime",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      description: "Le linee sottili sono minime. Continua con retinolo e peptidi per mantenere l'elasticità e prevenire i segni dell'età."
    },
    {
      icon: Target,
      title: "Pori",
      score: 70,
      status: "Normali",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "I pori sono di dimensione normale. Un'esfoliazione regolare con acidi BHA (salicilico) aiuterà a mantenerli puliti e minimizzati."
    }
  ];

  const colorPalette = [
    { hex: "#D1A78C", name: "Nude Pesca" },
    { hex: "#B78A72", name: "Terracotta" },
    { hex: "#E8D9C5", name: "Beige Chiaro" },
    { hex: "#C4A088", name: "Caramello" },
    { hex: "#9B7563", name: "Marrone Caldo" }
  ];

  const morningRoutine = [
    { step: 1, product: "Detergente delicato", description: "Gel o mousse schiumogena per pelli miste" },
    { step: 2, product: "Tonico equilibrante", description: "Senza alcol, con acido ialuronico" },
    { step: 3, product: "Siero vitamina C", description: "10-20% per luminosità e antiossidante" },
    { step: 4, product: "Crema idratante leggera", description: "Texture gel-crema non comedogenica" },
    { step: 5, product: "Protezione solare SPF 50+", description: "Fondamentale ogni giorno, anche in inverno" }
  ];

  const eveningRoutine = [
    { step: 1, product: "Struccante bifasico", description: "Se usi make-up, rimuovi prima con olio" },
    { step: 2, product: "Detergente delicato", description: "Secondo lavaggio per pulizia profonda" },
    { step: 3, product: "Tonico", description: "Riequilibra il pH della pelle" },
    { step: 4, product: "Siero notte con niacinamide", description: "5-10% per uniformare il tono" },
    { step: 5, product: "Crema notte nutriente", description: "Più ricca della versione giorno" }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/dashboard")}
              className="mb-4 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna alla Dashboard
            </Button>
            
            <div className="eyebrow-text mb-4">Il tuo report SkinAI</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Analisi del 6 Dicembre 2024
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Pelle Mista
              </span>
              <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                6 Dicembre 2024
              </span>
            </div>
          </div>

          {/* Foto Caricate */}
          <Card className="rounded-3xl shadow-soft mb-8">
            <CardHeader>
              <CardTitle>Le tue foto</CardTitle>
              <CardDescription>Immagini utilizzate per l'analisi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {["Frontale", "Lato Sinistro", "Lato Destro"].map((label, idx) => (
                  <div key={idx}>
                    <div 
                      className="aspect-square bg-muted rounded-2xl mb-2 overflow-hidden"
                      style={{
                        backgroundImage: "url(/analysis-skin.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <p className="text-sm text-center text-muted-foreground font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profilo Pelle */}
          <Card className="rounded-3xl shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Profilo Pelle</CardTitle>
              <CardDescription>Caratteristiche principali rilevate dall'analisi AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Tipo pelle rilevato</p>
                <p className="font-bold text-2xl text-primary">Pelle Mista</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Tratti secondari</p>
                <p className="leading-relaxed">Tendenza a lucidità nella zona T (fronte, naso, mento), guance normali o leggermente secche. Pori visibili nella zona centrale.</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Preoccupazioni principali</p>
                <div className="flex flex-wrap gap-2">
                  {["Pori dilatati", "Idratazione non uniforme", "Texture irregolare"].map((item, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analisi Visiva - 5 Metriche */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Analisi Visiva Dettagliata</h2>
            <div className="space-y-6">
              {analysisResults.map((result, idx) => {
                const Icon = result.icon;
                return (
                  <Card key={idx} className="rounded-3xl shadow-soft hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className={`w-20 h-20 rounded-2xl ${result.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`h-10 w-10 ${result.color}`} strokeWidth={1.5} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{result.title}</h3>
                              <p className="text-sm text-muted-foreground">{result.status}</p>
                            </div>
                            <div className={`text-3xl font-bold ${result.color}`}>
                              {result.score}
                            </div>
                          </div>
                          
                          <Progress value={result.score} className="h-3 mb-4" />
                          
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Armocromia */}
          <Card className="rounded-3xl shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Armocromia & Make-up</CardTitle>
              <CardDescription>I colori che valorizzano la tua pelle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Sottotono rilevato</p>
                <p className="font-bold text-xl text-primary">Caldo (dorato)</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-4">Palette colori consigliata</p>
                <div className="flex gap-4 mb-4">
                  {colorPalette.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-16 h-16 rounded-full shadow-lg border-2 border-white"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs text-center font-medium">{color.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I toni caldi e dorati come pesca, terracotta e caramello esaltano il tuo sottotono. 
                  Evita colori troppo freddi o argentati che potrebbero spegnere la luminosità naturale della tua pelle.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Routine Skincare */}
          <Card className="rounded-3xl shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Routine Skincare Personalizzata</CardTitle>
              <CardDescription>Step quotidiani per prenderti cura della tua pelle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  Routine Mattutina
                </h3>
                <div className="space-y-4">
                  {morningRoutine.map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.product}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Routine Serale
                </h3>
                <div className="space-y-4">
                  {eveningRoutine.map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.product}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sezione Assistente */}
          <Card className="rounded-3xl shadow-glow mb-8 glass-card border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Hai domande sui tuoi risultati?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Il nostro assistente virtuale è qui per aiutarti a comprendere meglio la tua analisi, 
                i prodotti consigliati e come applicare la routine. Clicca sul pulsante in basso a destra per iniziare!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 rounded-full bg-muted text-sm">💡 Come usare i prodotti</span>
                <span className="px-4 py-2 rounded-full bg-muted text-sm">🎨 Consigli make-up</span>
                <span className="px-4 py-2 rounded-full bg-muted text-sm">📊 Interpretare i punteggi</span>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="space-y-4">
            <Card className="rounded-3xl border-amber-200 bg-amber-50/50">
              <CardContent className="pt-6">
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>Nota importante:</strong> Questo report è generato da intelligenza artificiale e ha finalità cosmetica e informativa. 
                  I risultati sono basati sull'analisi delle immagini fornite e sul questionario compilato.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-emerald-200 bg-emerald-50/50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-900 leading-relaxed">
                  <strong>Consulta sempre un dermatologo:</strong> Per problemi cutanei specifici, condizioni mediche o dubbi sulla tua pelle, 
                  rivolgiti a un medico specialista. SkinAI non sostituisce il parere medico professionale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <VirtualAssistant />
    </div>
  );
}
