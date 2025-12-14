// AI Assistant
class AIAssistant {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }
  
  init() {
    this.createWidget();
    this.attachEventListeners();
    this.addWelcomeMessage();
  }
  
  createWidget() {
    const widget = document.createElement('div');
    widget.className = 'ai-assistant';
    widget.innerHTML = `
      <button class="ai-chat-button" id="ai-chat-toggle">
        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        <span class="ai-pulse"></span>
      </button>
      
      <div class="ai-chat-window" id="ai-chat-window">
        <div class="ai-chat-header">
          <div class="ai-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="ai-header-info">
            <h3>Assistente SkinAI</h3>
            <p>Sempre qui per aiutarti</p>
          </div>
        </div>
        
        <div class="ai-chat-messages" id="ai-messages"></div>
        
        <div class="ai-chat-input">
          <input 
            type="text" 
            class="ai-input-field" 
            id="ai-input" 
            placeholder="Scrivi la tua domanda..."
            autocomplete="off"
          >
          <button class="ai-send-button" id="ai-send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(widget);
  }
  
  attachEventListeners() {
    const toggleBtn = document.getElementById('ai-chat-toggle');
    const sendBtn = document.getElementById('ai-send');
    const input = document.getElementById('ai-input');
    
    toggleBtn.addEventListener('click', () => this.toggle());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('ai-chat-window');
    const toggleBtn = document.getElementById('ai-chat-toggle');
    
    if (this.isOpen) {
      chatWindow.classList.add('active');
      toggleBtn.classList.add('active');
      document.getElementById('ai-input').focus();
    } else {
      chatWindow.classList.remove('active');
      toggleBtn.classList.remove('active');
    }
  }
  
  addWelcomeMessage() {
    const welcomeMsg = {
      type: 'ai',
      text: 'Ciao! 👋 Sono il tuo assistente personale SkinAI. Posso aiutarti con domande su:\n\n• Come usare l\'app\n• Spiegazioni dei risultati\n• Consigli skincare\n• Ingredienti e prodotti\n\nCosa vorresti sapere?',
      quickQuestions: [
        'Come funziona l\'analisi?',
        'Cosa significa il mio punteggio?',
        'Quali prodotti usare?',
        'Come leggere il report?'
      ]
    };
    
    this.messages.push(welcomeMsg);
    this.renderMessages();
  }
  
  sendMessage() {
    const input = document.getElementById('ai-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    // Add user message
    this.messages.push({ type: 'user', text });
    this.renderMessages();
    
    input.value = '';
    
    // Show typing indicator
    this.showTyping();
    
    // Simulate AI response (TODO: integrate with real AI backend)
    setTimeout(() => {
      this.hideTyping();
      const response = this.getAIResponse(text);
      this.messages.push({ type: 'ai', text: response });
      this.renderMessages();
    }, 1500);
  }
  
  getAIResponse(question) {
    const lowerQ = question.toLowerCase();
    
    // Simple keyword-based responses (TODO: replace with real AI)
    if (lowerQ.includes('analisi') || lowerQ.includes('funziona')) {
      return 'L\'analisi SkinAI utilizza intelligenza artificiale avanzata per esaminare le tue foto e identificare caratteristiche come idratazione, macchie, rughe, pori e occhiaie. Carica 3 foto (frontale e laterali) e riceverai un report completo in pochi secondi! 📸';
    }
    
    if (lowerQ.includes('punteggio') || lowerQ.includes('percentuale')) {
      return 'I punteggi nel report rappresentano l\'intensità di ogni caratteristica:\n\n• 0-30%: Bassa (ottimo!)\n• 31-60%: Media (normale)\n• 61-100%: Alta (da migliorare)\n\nPiù alto il punteggio di idratazione, meglio è. Per gli altri (rughe, macchie, ecc.), più basso è meglio! ✨';
    }
    
    if (lowerQ.includes('prodott') || lowerQ.includes('routine')) {
      return 'La tua routine personalizzata è basata sulla tua analisi! Segui questi step:\n\n🌅 Mattina: Detergente → Tonico → Vitamina C → Crema → SPF\n🌙 Sera: Struccante → Detergente → Esfoliante (2-3x/settimana) → Retinolo → Crema notte\n\nConsistenza è la chiave! 💪';
    }
    
    if (lowerQ.includes('report') || lowerQ.includes('leggere')) {
      return 'Il tuo report è diviso in 3 sezioni:\n\n1️⃣ Analisi Pelle: 5 metriche principali con punteggi\n2️⃣ Armocromia: Palette colori make-up personalizzata\n3️⃣ Routine: Step mattina e sera con prodotti consigliati\n\nPuoi scaricare il PDF o salvarlo nella dashboard! 📄';
    }
    
    if (lowerQ.includes('armocromia') || lowerQ.includes('colori')) {
      return 'L\'armocromia identifica i colori che valorizzano il tuo incarnato naturale. Basandoci sul tuo sottotono (caldo/freddo) e caratteristiche, ti suggeriamo tonalità di fondotinta, blush, rossetto e ombretto perfette per te! 💄✨';
    }
    
    if (lowerQ.includes('foto') || lowerQ.includes('immagini')) {
      return 'Per foto ottimali:\n\n✓ Luce naturale (vicino a finestra)\n✓ Viso pulito, senza trucco\n✓ Espressione neutra\n✓ Capelli raccolti\n✓ Niente ombre sul viso\n\nEvita flash diretto e luci artificiali forti! 📸';
    }
    
    if (lowerQ.includes('diario')) {
      return 'Il Diario della Pelle ti aiuta a tracciare i progressi! Annota ogni giorno:\n\n• Come si sente la pelle (mood)\n• Prodotti usati\n• Cambiamenti notati\n• Reazioni a nuovi prodotti\n\nCosì puoi vedere cosa funziona meglio per te! 📔';
    }
    
    if (lowerQ.includes('grazie') || lowerQ.includes('ok')) {
      return 'Figurati! Sono sempre qui se hai altre domande. Buona giornata! 😊';
    }
    
    // Default response
    return 'Interessante domanda! Al momento posso aiutarti con:\n\n• Spiegazioni sull\'analisi AI\n• Interpretazione dei risultati\n• Consigli sulla routine skincare\n• Info su armocromia e colori\n• Come usare il diario\n\nPreferiresti approfondire uno di questi argomenti? 🤔';
  }
  
  showTyping() {
    const messagesDiv = document.getElementById('ai-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message';
    typingDiv.id = 'ai-typing';
    typingDiv.innerHTML = `
      <div class="ai-message-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="ai-message-content">
        <div class="ai-typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  hideTyping() {
    const typingDiv = document.getElementById('ai-typing');
    if (typingDiv) typingDiv.remove();
  }
  
  renderMessages() {
    const messagesDiv = document.getElementById('ai-messages');
    messagesDiv.innerHTML = '';
    
    this.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `ai-message ${msg.type}`;
      
      const avatarIcon = msg.type === 'ai' 
        ? '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
        : '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>';
      
      messageDiv.innerHTML = `
        <div class="ai-message-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${avatarIcon}
          </svg>
        </div>
        <div class="ai-message-content">
          <p class="ai-message-text">${msg.text.replace(/\n/g, '<br>')}</p>
          ${msg.quickQuestions ? this.renderQuickQuestions(msg.quickQuestions) : ''}
        </div>
      `;
      
      messagesDiv.appendChild(messageDiv);
    });
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  renderQuickQuestions(questions) {
    const buttons = questions.map(q => 
      `<button class="ai-quick-btn" onclick="aiAssistant.askQuestion('${q}')">${q}</button>`
    ).join('');
    
    return `<div class="ai-quick-questions">${buttons}</div>`;
  }
  
  askQuestion(question) {
    document.getElementById('ai-input').value = question;
    this.sendMessage();
  }
}

// Initialize AI Assistant when DOM is ready
let aiAssistant;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    aiAssistant = new AIAssistant();
  });
} else {
  aiAssistant = new AIAssistant();
}
