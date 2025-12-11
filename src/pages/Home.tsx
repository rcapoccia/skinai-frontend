import { Button } from "@/components/ui/button";
import { Sparkles, Heart, BookOpen, Sun, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile First */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8D9C5] via-[#FAF3EB] to-[#D1A78C] opacity-40" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="SkinAI" className="h-16 w-auto" />
          </div>

          {/* Eyebrow */}
          <div className="text-[#B78A72] text-sm font-medium tracking-[0.22em] uppercase">
            SKINAI • SKINCARE INTELLIGENTE
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#886349]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Scopri la routine perfetta<br />per la tua pelle
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Analisi AI personalizzata basata sulle tue foto e caratteristiche uniche
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              onClick={() => setLocation("/auth")}
              className="bg-gradient-to-r from-[#D1A78C] to-[#B78A72] text-white px-8 py-6 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Inizia il test della pelle
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => {
                const el = document.getElementById('funzionalita');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/80 backdrop-blur text-[#886349] px-8 py-6 rounded-full text-lg font-medium border-2 border-[#D1A78C] hover:bg-white transition-colors"
            >
              Scopri come funziona
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 text-sm text-gray-600">
            <span className="font-semibold text-[#886349]">+1.200 analisi</span> completate questo mese
          </div>

          {/* Hero Image */}
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
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-[#B78A72] text-sm font-medium tracking-[0.22em] uppercase mb-4">
              FUNZIONALITÀ
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#886349] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Tutto quello che ti serve<br />per una pelle perfetta
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un'esperienza completa per prenderti cura della tua pelle
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D1A78C] to-[#B78A72] flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#886349] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Analisi AI avanzata
              </h3>
              <p className="text-gray-600">
                Intelligenza artificiale che analizza la tua pelle in profondità
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D1A78C] to-[#B78A72] flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#886349] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Routine personalizzata
              </h3>
              <p className="text-gray-600">
                Suggerimenti su misura per le tue esigenze specifiche
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D1A78C] to-[#B78A72] flex items-center justify-center mb-6">
                <Sun className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#886349] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Armocromia integrata
              </h3>
              <p className="text-gray-600">
                Scopri i colori make-up ideali per valorizzarti
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D1A78C] to-[#B78A72] flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#886349] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Diario della pelle
              </h3>
              <p className="text-gray-600">
                Traccia i tuoi progressi nel tempo con note personali
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="come-funziona" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-[#B78A72] text-sm font-medium tracking-[0.22em] uppercase mb-4">
              PROCESSO
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#886349] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Come funziona SkinAI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tre semplici step per ottenere la tua analisi personalizzata
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D1A78C] to-[#B78A72] flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                01
              </div>
              <h3 className="text-2xl font-bold text-[#886349] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Questionario
              </h3>
              <p className="text-gray-600">
                Rispondi a domande personalizzate sul tuo tipo di pelle, routine attuale e obiettivi
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D1A78C] to-[#B78A72] flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                02
              </div>
              <h3 className="text-2xl font-bold text-[#886349] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Carica le foto
              </h3>
              <p className="text-gray-600">
                Scatta 3 foto del tuo viso (frontale e laterali) per l'analisi AI
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D1A78C] to-[#B78A72] flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                03
              </div>
              <h3 className="text-2xl font-bold text-[#886349] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Ricevi il report
              </h3>
              <p className="text-gray-600">
                Ottieni analisi dettagliata, routine personalizzata e consigli armocromia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#E8D9C5] via-[#FAF3EB] to-[#D1A78C]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#B78A72] text-sm font-medium tracking-[0.22em] uppercase mb-4">
            INIZIA OGGI
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#886349] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Pronta per scoprire la tua pelle?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di persone che hanno già migliorato la loro routine skincare con SkinAI
          </p>
          <Button 
            onClick={() => setLocation("/auth")}
            className="bg-white text-[#886349] px-10 py-6 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-shadow"
          >
            Inizia gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#886349] text-white py-12 px-4">
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
