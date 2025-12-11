import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Sidebar from "@/components/Sidebar";
import { Upload as UploadIcon, Check } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import VirtualAssistant from "@/components/VirtualAssistant";

export default function Upload() {
  const [, setLocation] = useLocation();
  const [photos, setPhotos] = useState<{[key: string]: File | null}>({
    frontale: null,
    sinistro: null,
    destro: null
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (position: string, file: File | null) => {
    setPhotos({ ...photos, [position]: file });
  };

  const handleSubmit = () => {
    if (!photos.frontale || !photos.sinistro || !photos.destro) {
      toast.error("Carica tutte e 3 le foto");
      return;
    }
    if (!privacyAccepted) {
      toast.error("Accetta l'informativa privacy");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      toast.success("Analisi creata con successo!");
      setLocation("/report");
    }, 2000);
  };

  const photoSlots = [
    { id: "frontale", label: "Frontale" },
    { id: "sinistro", label: "Lato Sinistro" },
    { id: "destro", label: "Lato Destro" }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-5xl">
          <Card className="rounded-3xl shadow-soft">
            <CardHeader>
              <div className="eyebrow-text mb-2">Upload foto</div>
              <CardTitle className="text-2xl md:text-3xl">
                Carica le tue foto
              </CardTitle>
              <CardDescription>
                Scatta 3 foto del tuo viso per l'analisi AI
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                {photoSlots.map((slot) => (
                  <Card key={slot.id} className="rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 text-center">{slot.label}</h3>
                      
                      <div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
                        {photos[slot.id] ? (
                          <img 
                            src={URL.createObjectURL(photos[slot.id]!)} 
                            alt={slot.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UploadIcon className="h-12 w-12 text-muted-foreground opacity-30" />
                          </div>
                        )}
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(slot.id, e.target.files?.[0] || null)}
                        className="hidden"
                        id={`upload-${slot.id}`}
                      />
                      <label htmlFor={`upload-${slot.id}`}>
                        <Button 
                          type="button"
                          variant={photos[slot.id] ? "outline" : "default"}
                          className="w-full rounded-full"
                          onClick={() => document.getElementById(`upload-${slot.id}`)?.click()}
                        >
                          {photos[slot.id] ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Foto caricata
                            </>
                          ) : (
                            "Scegli foto"
                          )}
                        </Button>
                      </label>

                      {photos[slot.id] && (
                        <p className="text-xs text-green-600 mt-2 text-center">
                          ✓ Foto caricata
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
                <Checkbox 
                  id="privacy" 
                  checked={privacyAccepted}
                  onCheckedChange={(checked: boolean) => setPrivacyAccepted(checked)}
                />
                <label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                  Accetto l'informativa privacy e autorizzo il trattamento delle mie foto per l'analisi AI
                </label>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!photos.frontale || !photos.sinistro || !photos.destro || !privacyAccepted || loading}
                className="w-full rounded-full py-6 text-base bg-primary hover:bg-primary/90"
              >
                {loading ? "Creazione in corso..." : "Crea la tua analisi"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <VirtualAssistant />
    </div>
  );
}
