import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ciao! Sono l'assistente virtuale di SkinAI. Come posso aiutarti oggi? 💫"
    }
  ]);

  const quickQuestions = [
    "Come funziona l'analisi AI?",
    "Quali prodotti mi consigli?",
    "Come interpreto i risultati?",
    "Posso fare più analisi?"
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    // Aggiungi messaggio utente
    const newMessages = [
      ...messages,
      { role: "user", content: message }
    ];

    // Simula risposta assistente
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Grazie per la tua domanda! Al momento sono in modalità demo. Presto sarò connessa all'AI per rispondere a tutte le tue domande sulla skincare! 🌟"
        }
      ]);
    }, 800);

    setMessages(newMessages);
    setMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary via-primary to-accent hover:scale-110 transition-all duration-300 z-50 group"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </Button>

      {/* Chat Overlay */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50 animate-in slide-in-from-bottom-4 duration-300">
          <Card className="rounded-3xl shadow-2xl border-2 border-primary/20 backdrop-blur-xl bg-background/95">
            <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Assistente SkinAI</CardTitle>
                  <p className="text-xs text-muted-foreground">Online • Risponde subito</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              {/* Messages */}
              <div className="h-80 overflow-y-auto space-y-3 pr-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-primary to-accent text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Domande frequenti:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q)}
                        className="text-xs p-2 rounded-xl bg-muted hover:bg-primary/10 transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Scrivi la tua domanda..."
                  className="rounded-full bg-muted border-none"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="rounded-full bg-gradient-to-br from-primary to-accent hover:scale-105 transition-transform"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
