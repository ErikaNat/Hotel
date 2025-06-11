// src/config/chatbot.js
export const CHATBOT_CONFIG = {
  GROQ_API_KEY: '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',
  GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
  MODEL: 'llama3-8b-8192'
};

// Información del hotel para el chatbot
export const HOTEL_INFO = {
  nombre: "Hotel Tariquia",
  ubicacion: "Bermejo, Tarija, Bolivia",
  descripcion: "Hotel eco-turístico con enfoque en turismo sostenible",
  habitaciones: {
    bano_compartido: {
      precio_base: 80,
      precios: {
        individual: 70,
        matrimonial: 80,
        triple: 120,
        cuadruple: 150,
        delegacion: 35,
        horas: {
          una: 40,
          dos: 50,
          tres: 60
        }
      }
    },
    bano_privado: {
      precio_base: 110,
      precios: {
        individual: 100,
        matrimonial: 110,
        triple: 150,
        cuadruple: 200,
        delegacion: 45,
        horas: {
          una: 50,
          dos: 70,
          tres: 90
        }
      }
    }
  },
  servicios_incluidos: [
    "Estacionamiento privado gratuito",
    "Wi-Fi grátis en todo el hotel",
    "Zona natural rodeada de árboles",
    "Cancha para deportes o juegos",
    "Consejos turísticos y mapas gratuitos"
  ],
  servicios_extra: {
    aire_acondicionado: 30,
    desayuno_casero: 10,
    hielo: 5
  },
  contacto: {
    whatsapp: "59178242429",
    email: "hotel.tariquia@gmail.com",
    telefono: "+591 78242429"
  }
};
