import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { Sparkles, Calendar } from "lucide-react";

export default function Analisi() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-6xl">
          <div className="mb-8">
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

          <Card className="rounded-3xl shadow-soft mb-8">
            <CardHeader>
              <CardTitle>Le tue foto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {["Frontale", "Lato Sinistro", "Lato Destro"].map((label, idx) => (
                  <div key={idx}>
                    <div className="aspect-square bg-muted rounded-xl mb-2 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground opacity-30" />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-soft">
            <CardHeader>
              <CardTitle>Routine Consigliata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Routine Mattutina</h3>
                <ul className="space-y-2">
                  {["Detergente delicato", "Tonico", "Siero idratante", "Crema viso", "SPF 50"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {idx + 1}
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
