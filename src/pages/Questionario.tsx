import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/Sidebar";
import VirtualAssistant from "@/components/VirtualAssistant";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Questionario() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState({
    // Step 1
    nome: "",
    eta: "",
    genere: "",
    localita: "",
    clima: "",
    // Step 2
    tipoPelle: "",
    // Step 3
    preoccupazioni: [] as string[],
    obiettivo: "",
    // Step 4
    sottotono: "",
    // Step 5
    frequenzaMakeup: "",
    // Step 6
    allergie: ""
  });

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      toast.success("Questionario completato!");
      setLocation("/upload");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const togglePreoccupazione = (item: string) => {
    const current = formData.preoccupazioni;
    if (current.includes(item)) {
      updateFormData("preoccupazioni", current.filter(p => p !== item));
    } else {
      updateFormData("preoccupazioni", [...current, item]);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-3xl">
          <Card className="rounded-3xl shadow-soft">
            <CardHeader>
              <div className="eyebrow-text mb-2">Questionario personalizzato</div>
              <CardTitle className="text-2xl md:text-3xl">
                Step {currentStep} di {totalSteps}
              </CardTitle>
              <CardDescription>
                Aiutaci a conoscerti meglio per creare la tua routine ideale
              </CardDescription>
              <div className="pt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% completato</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* STEP 1 - Dati Base */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Dati Base</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Iniziamo con alcune informazioni di base
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome (opzionale)</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => updateFormData("nome", e.target.value)}
                      placeholder="Come ti chiami?"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eta">Età *</Label>
                    <Input
                      id="eta"
                      type="number"
                      min="18"
                      max="120"
                      value={formData.eta}
                      onChange={(e) => updateFormData("eta", e.target.value)}
                      placeholder="La tua età"
                      className="rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      L'età ci aiuta a calibrare meglio la routine
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Genere</Label>
                    <RadioGroup value={formData.genere} onValueChange={(v) => updateFormData("genere", v)}>
                      {["Maschile", "Femminile", "Altro", "Preferisco non dirlo"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`genere-${option}`} />
                          <Label htmlFor={`genere-${option}`} className="font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localita">Località</Label>
                    <Input
                      id="localita"
                      value={formData.localita}
                      onChange={(e) => updateFormData("localita", e.target.value)}
                      placeholder="Città o regione"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Clima della tua zona</Label>
                    <RadioGroup value={formData.clima} onValueChange={(v) => updateFormData("clima", v)}>
                      {["Secco", "Umido", "Misto", "Non lo so"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`clima-${option}`} />
                          <Label htmlFor={`clima-${option}`} className="font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* STEP 2 - Tipo di Pelle */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Tipo di Pelle</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Descrivici le caratteristiche della tua pelle
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Come descriveresti la tua pelle?</Label>
                    <RadioGroup value={formData.tipoPelle} onValueChange={(v) => updateFormData("tipoPelle", v)}>
                      {[
                        { value: "Secca", desc: "Tende a tirare, desquamarsi" },
                        { value: "Normale", desc: "Equilibrata, pochi problemi" },
                        { value: "Grassa", desc: "Lucida, pori visibili" },
                        { value: "Mista", desc: "Zona T grassa, guance normali/secche" },
                        { value: "Sensibile", desc: "Si arrossa facilmente, reattiva" }
                      ].map((option) => (
                        <div key={option.value} className="flex items-start space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={option.value} id={`tipo-${option.value}`} className="mt-1" />
                          <Label htmlFor={`tipo-${option.value}`} className="font-normal cursor-pointer flex-1">
                            <div className="font-medium">{option.value}</div>
                            <div className="text-xs text-muted-foreground">{option.desc}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* STEP 3 - Problematiche */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Problematiche</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Seleziona tutte le tue preoccupazioni (anche più di una)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Cosa vuoi migliorare?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Acne/imperfezioni",
                        "Punti neri",
                        "Pori dilatati",
                        "Rughe/linee sottili",
                        "Macchie/discromie",
                        "Pelle opaca",
                        "Rossori/couperose",
                        "Occhiaie",
                        "Texture irregolare"
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => togglePreoccupazione(item)}
                          className={`p-3 rounded-full border text-sm transition-all ${
                            formData.preoccupazioni.includes(item)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-primary/30 text-foreground hover:bg-primary/5"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="obiettivo">Obiettivo principale</Label>
                    <Input
                      id="obiettivo"
                      value={formData.obiettivo}
                      onChange={(e) => updateFormData("obiettivo", e.target.value)}
                      placeholder="Es: ridurre le rughe, uniformare il tono..."
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4 - Armocromia */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Armocromia</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Aiutaci a capire i tuoi colori ideali
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Come percepisci il tuo sottotono?</Label>
                    <RadioGroup value={formData.sottotono} onValueChange={(v) => updateFormData("sottotono", v)}>
                      {[
                        "Caldo (giallastro/dorato)",
                        "Freddo (rosato/bluastro)",
                        "Neutro",
                        "Non lo so"
                      ].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`sottotono-${option}`} />
                          <Label htmlFor={`sottotono-${option}`} className="font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* STEP 5 - Make-up */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Make-up</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Parliamo delle tue abitudini make-up
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Quanto spesso usi il make-up?</Label>
                    <RadioGroup value={formData.frequenzaMakeup} onValueChange={(v) => updateFormData("frequenzaMakeup", v)}>
                      {[
                        "Ogni giorno",
                        "Qualche volta a settimana",
                        "Solo occasioni speciali",
                        "Mai o quasi mai"
                      ].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`makeup-${option}`} />
                          <Label htmlFor={`makeup-${option}`} className="font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* STEP 6 - Allergie e Preferenze */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Allergie e Preferenze</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Ultime informazioni per personalizzare al meglio
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Hai allergie o intolleranze cutanee?</Label>
                    <RadioGroup value={formData.allergie} onValueChange={(v) => updateFormData("allergie", v)}>
                      {[
                        "Nessuna",
                        "Alcune (specifica sotto)",
                        "Non lo so"
                      ].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`allergie-${option}`} />
                          <Label htmlFor={`allergie-${option}`} className="font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="rounded-full gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Indietro
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="ml-auto rounded-full gap-2 bg-primary hover:bg-primary/90"
                >
                  {currentStep === totalSteps ? "Continua con le foto" : "Avanti"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <VirtualAssistant />
    </div>
  );
}
