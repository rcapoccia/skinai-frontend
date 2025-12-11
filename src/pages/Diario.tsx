import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/Sidebar";
import { BookOpen, Plus, Smile, Meh, Frown, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import VirtualAssistant from "@/components/VirtualAssistant";

export default function Diario() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const [entries] = useState([
    {
      date: "2024-12-05",
      note: "Iniziato nuovo siero alla vitamina C. La pelle sembra più luminosa dopo solo 3 giorni di utilizzo!",
      moodType: "happy"
    },
    {
      date: "2024-12-01",
      note: "Completata prima analisi AI. Punteggio complessivo 78/100. Contenta dei risultati, continuo con la routine consigliata.",
      moodType: "neutral"
    },
    {
      date: "2024-11-28",
      note: "Oggi la pelle è un po' secca, probabilmente a causa del riscaldamento acceso. Aumentato l'uso del siero idratante.",
      moodType: "neutral"
    }
  ]);

  const moodOptions = [
    { Icon: Smile, label: "Ottima", value: "happy", color: "text-green-500", bg: "bg-green-50", hoverBg: "hover:bg-green-100" },
    { Icon: Meh, label: "Normale", value: "neutral", color: "text-yellow-500", bg: "bg-yellow-50", hoverBg: "hover:bg-yellow-100" },
    { Icon: Frown, label: "Non bene", value: "sad", color: "text-red-500", bg: "bg-red-50", hoverBg: "hover:bg-red-100" }
  ];

  const getMoodIcon = (moodType: string) => {
    const mood = moodOptions.find(m => m.value === moodType) || moodOptions[1];
    return mood;
  };

  const handleAddEntry = () => {
    if (!newNote.trim()) {
      toast.error("Scrivi qualcosa prima di salvare");
      return;
    }
    if (!selectedMood) {
      toast.error("Seleziona come si sente la tua pelle");
      return;
    }
    toast.success("Nota salvata nel diario!");
    setNewNote("");
    setSelectedMood(null);
    setShowNewEntry(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="eyebrow-text mb-2">Traccia i tuoi progressi</div>
              <h1 className="text-3xl md:text-4xl font-bold">Diario della Pelle</h1>
              <p className="text-muted-foreground mt-2">Annota i cambiamenti e monitora l'evoluzione della tua skincare routine</p>
            </div>
            <Button 
              onClick={() => setShowNewEntry(!showNewEntry)}
              className="rounded-full gap-2 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Nuova Nota
            </Button>
          </div>

          {/* Statistiche */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="rounded-3xl shadow-soft">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{entries.length}</div>
                <p className="text-sm text-muted-foreground">Note totali</p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl shadow-soft">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">Analisi completate</p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl shadow-soft">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <p className="text-sm text-muted-foreground">Giorni di utilizzo</p>
              </CardContent>
            </Card>
          </div>

          {/* Form Nuova Nota */}
          {showNewEntry && (
            <Card className="rounded-3xl shadow-soft mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Nuova Annotazione</CardTitle>
                <CardDescription>Come si sente la tua pelle oggi?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="note" className="text-base">Le tue note</Label>
                  <Textarea
                    id="note"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Es: Oggi la pelle è più idratata dopo aver usato il nuovo siero..."
                    rows={5}
                    className="bg-background resize-none rounded-2xl text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Annota cambiamenti, nuovi prodotti, reazioni o semplicemente come ti senti
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Come si sente la tua pelle?</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {moodOptions.map((mood) => {
                      const MoodIcon = mood.Icon;
                      const isSelected = selectedMood === mood.value;
                      return (
                        <button
                          key={mood.value}
                          onClick={() => setSelectedMood(mood.value)}
                          className={`p-6 rounded-2xl border-2 transition-all ${
                            isSelected 
                              ? `${mood.bg} border-current ${mood.color}` 
                              : `border-border ${mood.hoverBg}`
                          }`}
                        >
                          <MoodIcon className={`h-10 w-10 mx-auto mb-3 ${mood.color}`} strokeWidth={1.5} />
                          <p className="font-semibold text-sm">{mood.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowNewEntry(false);
                      setNewNote("");
                      setSelectedMood(null);
                    }} 
                    className="rounded-full"
                  >
                    Annulla
                  </Button>
                  <Button 
                    onClick={handleAddEntry} 
                    className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                  >
                    Salva Nota
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline Note */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Cronologia
            </h2>
            
            {entries.length === 0 ? (
              <Card className="rounded-3xl shadow-soft">
                <CardContent className="py-16 text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                  <p className="text-lg text-muted-foreground mb-2">Nessuna nota ancora</p>
                  <p className="text-sm text-muted-foreground">
                    Inizia a tracciare i progressi della tua pelle
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {entries.map((entry, idx) => {
                  const mood = getMoodIcon(entry.moodType);
                  const MoodIcon = mood.Icon;
                  
                  return (
                    <Card key={idx} className="rounded-3xl shadow-soft hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-2xl ${mood.bg} flex items-center justify-center flex-shrink-0`}>
                            <MoodIcon className={`h-7 w-7 ${mood.color}`} strokeWidth={1.5} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-bold text-lg mb-1">
                                  {new Date(entry.date).toLocaleDateString("it-IT", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                  })}
                                </p>
                                <p className="text-xs text-muted-foreground">Pelle {mood.label.toLowerCase()}</p>
                              </div>
                            </div>
                            
                            <p className="text-base leading-relaxed text-muted-foreground">
                              {entry.note}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <VirtualAssistant />
    </div>
  );
}
