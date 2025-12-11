import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Sidebar from "@/components/Sidebar";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "SkinAI sostituisce il parere del dermatologo?",
      answer: "No, SkinAI è uno strumento informativo e cosmetico. Non sostituisce mai il parere di un medico dermatologo."
    },
    {
      question: "Quante analisi posso fare con il mio account?",
      answer: "Puoi fare analisi illimitate gratuitamente."
    },
    {
      question: "Devo caricare sempre 3 foto?",
      answer: "Sì, per un'analisi completa sono necessarie 3 foto: frontale e i due lati del viso."
    },
    {
      question: "Come vengono utilizzati i miei dati e le mie foto?",
      answer: "I tuoi dati sono protetti e utilizzati solo per l'analisi AI. Non vengono condivisi con terze parti."
    },
    {
      question: "SkinAI vende direttamente prodotti cosmetici?",
      answer: "No, forniamo solo consigli personalizzati. Non vendiamo prodotti."
    },
    {
      question: "Come posso contattarvi per dubbi o supporto?",
      answer: "Puoi scriverci a info@skinai.app per qualsiasi domanda."
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="container py-8 max-w-4xl">
          <Card className="rounded-3xl shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Domande frequenti</CardTitle>
              </div>
              <CardDescription>
                Tutto quello che devi sapere su SkinAI
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
