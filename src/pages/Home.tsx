import { Sparkles, Heart, BookOpen, Sun, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-light to-primary opacity-40" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="SkinAI" className="h-16 w-auto" />
          </div>

          <div className="text-tertiary text-sm font-medium tracking-[0.22em] uppercase">
            SKINAI • SKINCARE INTELLIGENTE
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-dark font-serif">
            Scopri la routine perfetta<br />per la tua pelle
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Analisi AI personalizzata basata sulle tue foto e caratteristiche uniche
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => setLocation("/auth")}
              className="bg-gradient-to-r from-primary to-tertiary text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Inizia il test della pelle
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('funzionalita');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/80 backdrop-blur text-dark px-8 py-4 rounded-full text-lg font-medium border-2 border-primary hover:bg-white transition-colors"
            >
              Scopri come funziona
            </button>
          </div>

          <div className="pt-8 text-sm text-gray-600">
            <span className="font-semibold text-dark">+1.200 analisi</span> completate questo mese
          </div>

          <div className="pt-12">
            <img 
              src="/hero-dashboard.jpg" 
              alt="Analisi della pelle" 
              className="rounded-3xl shadow-2xl mx-auto max-w-full md:max-w-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funzionalita" className="py-20 px-4 bg-white/50 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-tertiary text-sm font-medium tracking-[0.22em] uppercase mb-4">
              FUNZIONALITÀ
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4 font-serif">
              Tutto quello che ti serve<br />per una pelle perfetta
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un'esperienza completa per prenderti cura della tua pelle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 font-serif">
                Analisi AI avanzata
              </h3>
              <p className="text-gray-600">
                Intelligenza artificiale che analizza la tua pelle in profondità
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 font-serif">
                Routine personalizzata
              </h3>
              <p className="text-gray-600">
                Suggerimenti su misura per le tue esigenze specifiche
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mb-6">
                <Sun className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 font-serif">
                Armocromia integrata
              </h3>
              <p className="text-gray-600">
                Scopri i colori make-up ideali per valorizzarti
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 font-serif">
                Diario della pelle
              </h3>
              <p className="text-gray-600">
                Traccia i tuoi progressi nel tempo con note personali
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="come-funziona" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-tertiary text-sm font-medium tracking-[0.22em] uppercase mb-4">
              PROCESSO
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4 font-serif">
              Come funziona SkinAI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tre semplici step per ottenere la tua analisi personalizzata
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold font-serif">
                01
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4 font-serif">
                Questionario
              </h3>
              <p className="text-gray-600">
                Rispondi a domande personalizzate sul tuo tipo di pelle, routine attuale e obiettivi
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold font-serif">
                02
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4 font-serif">
                Carica le foto
              </h3>
              <p className="text-gray-600">
                Scatta 3 foto del tuo viso (frontale e laterali) per l'analisi AI
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold font-serif">
                03
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4 font-serif">
                Ricevi il report
              </h3>
              <p className="text-gray-600">
                Ottieni analisi dettagliata, routine personalizzata e consigli armocromia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-br from-secondary via-light to-primary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-tertiary text-sm font-medium tracking-[0.22em] uppercase mb-4">
            INIZIA OGGI
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6 font-serif">
            Pronta per scoprire la tua pelle?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di persone che hanno già migliorato la loro routine skincare con SkinAI
          </p>
          <button 
            onClick={() => setLocation("/auth")}
            className="bg-white text-dark px-10 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-shadow"
          >
            Inizia gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <img src="/logo.png" alt="SkinAI" className="h-12 w-auto mx-auto mb-4 brightness-0 invert" />
            <p className="text-white/80">Analisi intelligente della pelle</p>
          </div>
          <div className="text-sm text-white/60">
            © 2024 SkinAI. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
