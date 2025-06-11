import { CHATBOT_CONFIG, HOTEL_INFO } from '../config/chatbot.js';

export class Chatbot {
  constructor() {
    this.isOpen = false;
    this.isLoading = false;
    this.conversationHistory = [];
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.initializeElements();
    if (this.areElementsReady()) {
      this.attachEventListeners();
    } else {
      console.error('Los elementos del chatbot no están disponibles en el DOM');
    }
  }

  initializeElements() {
    this.toggle = document.getElementById('chatbot-toggle');
    this.window = document.getElementById('chatbot-window');
    this.close = document.getElementById('chatbot-close');
    this.messages = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.send = document.getElementById('chatbot-send');
  }

  areElementsReady() {
    return this.toggle && this.window && this.close && 
           this.messages && this.input && this.send;
  }

  attachEventListeners() {
    this.toggle.addEventListener('click', () => this.toggleChat());
    this.close.addEventListener('click', () => this.closeChat());
    this.send.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.window.classList.toggle('active', this.isOpen);
    if (this.isOpen) {
      this.input.focus();
    }
  }

  closeChat() {
    this.isOpen = false;
    this.window.classList.remove('active');
  }

  async sendMessage() {
    const message = this.input.value.trim();
    if (!message || this.isLoading) return;

    this.addMessage(message, 'user');
    this.input.value = '';

    this.conversationHistory.push({
      role: 'user',
      content: message
    });

    this.showLoading();

    try {
      const response = await this.callGroqAPI(message);
      this.hideLoading();
      this.addMessage(response, 'bot');
      
      this.conversationHistory.push({
        role: 'assistant',
        content: response
      });
    } catch (error) {
      this.hideLoading();
      this.addMessage('Lo siento, hubo un error. Por favor intenta de nuevo.', 'bot');
      console.error('Error:', error);
    }
  }

  async callGroqAPI(message) {
    const systemPrompt = `Eres el asistente virtual del Hotel Tariquia, un hotel eco-turístico ubicado en Bermejo, Tarija, Bolivia. 

INFORMACIÓN DEL HOTEL:
- Nombre: Hotel Tariquia 
- Ubicación: Bermejo, Tarija
- Tipo: Hotel eco-turístico con enfoque en turismo sostenible
- Contacto: WhatsApp +591 78242429, Email: hotel.tariquia@gmail.com

HABITACIONES Y PRECIOS:

🏨 HABITACIÓN BAÑO COMPARTIDO:
• 1 persona por noche → 70 Bs
• 2 personas por noche → 80 Bs  
• 3 personas por noche → 120 Bs
• 4 personas por noche → 150 Bs
• Delegaciones → 35 Bs por persona/noche

⏱️ Por horas (solo parejas):
• 1 hora → 40 Bs
• 2 horas → 50 Bs  
• 3 horas → 60 Bs

🚿 HABITACIÓN BAÑO PRIVADO:
• 1 persona por noche → 100 Bs
• 2 personas por noche → 110 Bs
• 3 personas por noche → 150 Bs
• 4 personas por noche → 200 Bs
• Delegaciones → 45 Bs por persona/noche

⏱️ Por horas (solo parejas):
• 1 hora → 50 Bs
• 2 horas → 70 Bs
• 3 horas → 90 Bs

SERVICIOS INCLUIDOS (GRATUITOS):
✓ Estacionamiento privado
✓ Wi-Fi rápido en todo el hotel
✓ Zona natural rodeada de árboles
✓ Cancha para deportes o juegos
✓ Consejos turísticos y mapas gratuitos

SERVICIOS EXTRA:
• Aire acondicionado → +30 Bs
• Desayuno casero → +10 Bs
• Hielo → +5 Bs

INSTRUCCIONES IMPORTANTES:
- Responde SIEMPRE en español
- Usa emojis y símbolos simples (•, →, ✓) para mejor formato
- NO uses markdown (**texto**) ni HTML (<b>texto</b>)
- Usa espacios y saltos de línea para organizar la información
- Mantén respuestas concisas (máximo 120 palabras)
- Sé amigable, profesional y útil
- Para reservas, recomienda contactar por WhatsApp
- Si no tienes información específica, ofrece contactar al hotel
- Promociona el enfoque eco-turístico del hotel

FORMATO DE RESPUESTA PARA PRECIOS:
Cuando menciones precios, usa este formato:
• Descripción → Precio Bs

Ejemplo:
🏨 BAÑO COMPARTIDO:
• 2 personas por noche → 80 Bs
• 3 personas por noche → 120 Bs

🚿 BAÑO PRIVADO:  
• 2 personas por noche → 110 Bs
• 3 personas por noche → 150 Bs`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.conversationHistory.slice(-6), // Mantener contexto de últimas 6 interacciones
      { role: 'user', content: message }
    ];

    const response = await fetch(CHATBOT_CONFIG.GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHATBOT_CONFIG.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHATBOT_CONFIG.MODEL,
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    // Formatear el texto para mejor presentación
    const formattedText = this.formatMessage(text);
    messageDiv.textContent = formattedText;
    
    this.messages.appendChild(messageDiv);
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  formatMessage(text) {
    // Asegurar que los saltos de línea se mantengan
    // y que los símbolos se vean correctamente
    return text
      .replace(/\n+/g, '\n') // Normalizar saltos de línea múltiples
      .trim(); // Eliminar espacios extra al inicio y final
  }

  showLoading() {
    this.isLoading = true;
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-message loading';
    loadingDiv.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
    loadingDiv.id = 'loading-message';
    
    this.messages.appendChild(loadingDiv);
    this.messages.scrollTop = this.messages.scrollHeight;
    
    // Deshabilitar input y botón
    this.input.disabled = true;
    this.send.disabled = true;
  }

  hideLoading() {
    this.isLoading = false;
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
    }
    
    // Rehabilitar input y botón
    this.input.disabled = false;
    this.send.disabled = false;
  }
}

// Función para inicializar el chatbot
export function initChatbot() {
  return new Chatbot();
}