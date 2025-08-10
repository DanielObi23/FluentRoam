// Regional variant
export interface RegionalVariation {
  country: string;
  word: string;
  part_of_speech: string;
  meaning: string[];
  example: {
    sentence: string;
    translation: string;
  };
}

// Vocabulary entry
export interface VocabEntry {
  vocab: string;
  part_of_speech: string;
  meaning: string[];
  tone: 'Casual' | 'Neutral' | 'Formal' | string;
  regional_variations: RegionalVariation[];
  examples: {
    sentence: string;
    translation: string;
  }[];
  idioms: {
    phrase: string;
    meaning: string;
  }[];
  synonyms: string[];
  antonyms: string[];
}

// User session object
export interface UserSession {
  id: string;
  session_id: string;
  user_id: string;
  title: string;
  role_scenario: string;
  feedback: string;
  target_vocabulary: VocabEntry[];
  user_audio: string;
  created_at: string; // ISO-8601
}

// Root type: array of sessions
export type UserSessions = UserSession[];

export const userSessions = [
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    "session_id": "vapi_call_001_tapas_order",
    "user_id": "clerk_user_123",
    "title": "Ordering Tapas at a Busy Bar in Seville",
    "role_scenario": "I want to practice ordering several tapas dishes and asking for recommendations.",
    "feedback": "## 🍷 Ordering Tapas Feedback\n\n¡Buen trabajo con tu pedido! Vamos a refinarlo un poco:\n\n### Error highlighting:\n❌ *\"Quiero una tapa de jamón\"* suena demasiado directo en España.\n✅ **Corrección:** *\"¿Me pone una tapa de jamón, por favor?\"* \n\n❌ *\"Traeme otra cerveza\"* también es demasiado directo.\n✅ **Corrección:** *\"¿Me trae otra cerveza, por favor?\"* \n\n### Cultural Insights:\n- En España, generalmente **no pides la cuenta** hasta que has terminado. El camarero pasará con la cuenta cuando vea que has acabado.\n- Es común **compartir tapas** en grupo.\n- En muchos bares de Sevilla, las tapas vienen **gratis con la bebida** si pides en barra.\n\n### Pronunciation Tips:\n- *jamón* → /xaˈmon/ (el /j/ suena como el /h/ en inglés)\n- *cerveza* → /θerˈβesa/ (el /c/ suena como /θ/)\n\n### Suggestions for Improvement:\n- Usa **¿Me pone...?** o **¿Me trae...?** para sonar más amable.\n- Pregunta **¿Tienen algo para compartir?** para pedir tapas grupales.\n- Cuando termines, di **\"La cuenta, por favor\"**.\n\n### Conversation Flow:\n**Tú:** Buenos días, ¿me pone una tapa de jamón, por favor?\n**Camarero:** Claro, ¿algo más?\n**Tú:** Sí, ¿me recomienda algo del día?\n**Camarero:** Tenemos croquetas de jamón y salmorejo.\n**Tú:** Perfecto, ¿me pone croquetas también?\n**Camarero:** ¿Algo para beber?\n**Tú:** Sí, una caña de cerveza, por favor.\n**Camarero:** Muy bien, enseguida le traigo todo.\n\n¡Sigue practicando! Tu pronunciación mejorará con la práctica y recuerda siempre ser amable con el personal.",
    "target_vocabulary": [
      {
        "vocab": "pedir",
        "part_of_speech": "verb",
        "meaning": ["to ask for", "to order"],
        "tone": "Neutral",
        "regional_variations": [
          {
            "country": "Mexico",
            "word": "ordenar",
            "part_of_speech": "verb",
            "meaning": ["to order"],
            "example": {
              "sentence": "¿Ya ordenaste tus tacos?",
              "translation": "Did you already order your tacos?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "❌ Quiero una tapa de jamón. ✅ ¿Me pone una tapa de jamón, por favor?",
            "translation": "I'd like a tapa of ham."
          },
          {
            "sentence": "Voy a pedir una cerveza bien fría.",
            "translation": "I'm going to order an ice-cold beer."
          },
          {
            "sentence": "¿Me trae la cuenta, por favor?",
            "translation": "Could I have the bill, please?"
          }
        ],
        "idioms": [
          { "phrase": "pedir peras al olmo", "meaning": "to ask for the impossible" }
        ],
        "synonyms": ["solicitar", "encargar"],
        "antonyms": ["ofrecer", "dar"]
      },
      {
        "vocab": "tapa",
        "part_of_speech": "noun",
        "meaning": ["small plate", "appetizer"],
        "tone": "Casual",
        "regional_variations": [
          {
            "country": "Argentina",
            "word": "picada",
            "part_of_speech": "noun",
            "meaning": ["cold cuts platter"],
            "example": {
              "sentence": "Nos juntamos a compartir una picada.",
              "translation": "We got together to share a cold-cuts board."
            }
          }
        ],
        "examples": [
          {
            "sentence": "En Granada la tapa viene gratis con la bebida.",
            "translation": "In Granada the tapa comes free with the drink."
          },
          {
            "sentence": "¿Me pone tres tapas para compartir?",
            "translation": "Could I have three tapas to share?"
          }
        ],
        "idioms": [],
        "synonyms": ["ración", "aperitivo"],
        "antonyms": ["plato principal"]
      },
      {
        "vocab": "cerveza",
        "part_of_speech": "noun",
        "meaning": ["beer"],
        "tone": "Casual",
        "regional_variations": [
          {
            "country": "Colombia",
            "word": "chela",
            "part_of_speech": "noun",
            "meaning": ["beer"],
            "example": {
              "sentence": "¿Me pides una chela fría?",
              "translation": "Could you get me a cold beer?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "Me gustaría una cerveza bien fría.",
            "translation": "I'd like a very cold beer."
          },
          {
            "sentence": "¿Tenéis cerveza sin alcohol?",
            "translation": "Do you have non-alcoholic beer?"
          }
        ],
        "idioms": [
          { "phrase": "echar cerveza al cobre", "meaning": "to face the music" }
        ],
        "synonyms": ["cerveza artesanal", "cerveza ligera"],
        "antonyms": ["vino", "agua"]
      },
      {
        "vocab": "jamón",
        "part_of_speech": "noun",
        "meaning": ["ham"],
        "tone": "Neutral",
        "regional_variations": [
          {
            "country": "Mexico",
            "word": "jamón",
            "part_of_speech": "noun",
            "meaning": ["ham"],
            "example": {
              "sentence": "El jamón ibérico es muy caro aquí.",
              "translation": "Ibérico ham is very expensive here."
            }
          }
        ],
        "examples": [
          {
            "sentence": "El jamón serrano es más económico que el ibérico.",
            "translation": "Serrano ham is more affordable than Ibérico."
          },
          {
            "sentence": "¿Me pone una tapa de jamón, por favor?",
            "translation": "Could I have a tapa of ham, please?"
          }
        ],
        "idioms": [],
        "synonyms": ["jamonada"],
        "antonyms": ["pollo", "queso"]
      },
      {
        "vocab": "croquetas",
        "part_of_speech": "noun",
        "meaning": ["croquettes"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Las croquetas son caseras?",
            "translation": "Are the croquettes homemade?"
          },
          {
            "sentence": "Las croquetas de jamón son las más populares.",
            "translation": "Ham croquettes are the most popular."
          }
        ],
        "idioms": [],
        "synonyms": ["bocadillos"],
        "antonyms": []
      },
      {
        "vocab": "salmorejo",
        "part_of_speech": "noun",
        "meaning": ["cold tomato soup"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El salmorejo es típico de Andalucía.",
            "translation": "Salmorejo is typical of Andalusia."
          },
          {
            "sentence": "¿Me pone un plato de salmorejo?",
            "translation": "Could I have a plate of salmorejo?"
          }
        ],
        "idioms": [],
        "synonyms": ["gazpacho"],
        "antonyms": []
      },
      {
        "vocab": "caña",
        "part_of_speech": "noun",
        "meaning": ["small draft beer"],
        "tone": "Casual",
        "regional_variations": [
          {
            "country": "Latin America",
            "word": "cerveza",
            "part_of_speech": "noun",
            "meaning": ["beer"],
            "example": {
              "sentence": "Me gustaría una cerveza bien fría.",
              "translation": "I'd like a very cold beer."
            }
          }
        ],
        "examples": [
          {
            "sentence": "¿Me pone una caña de cerveza, por favor?",
            "translation": "Could I have a small draft beer, please?"
          },
          {
            "sentence": "En España, una caña es más pequeña que una jarra.",
            "translation": "In Spain, a caña is smaller than a jarra."
          }
        ],
        "idioms": [],
        "synonyms": ["cerveza pequeña"],
        "antonyms": ["jarra"]
      }
    ],
    "user_audio": "https://example.com/audio/pedir_practice.mp3",
    "created_at": "2025-08-10T12:34:56Z"
  },
  {
    "id": "b2c3d4e5-f6a7-8901-bcde-2345678901bc",
    "session_id": "vapi_call_002_taking_taxi",
    "user_id": "clerk_user_124",
    "title": "Taking a Taxi from Madrid-Barajas Airport",
    "role_scenario": "I need to get to the city center by taxi and negotiate the fare.",
    "feedback": "## 🚖 Taxi Ride Feedback\n\n¡Bienvenido a Madrid! Vamos a repasar tu conversación con el taxista:\n\n### Error highlighting:\n❌ *\"¿Cuánto cuesta al centro?\"* suena bien, pero en Madrid es más común:\n✅ **Corrección:** *\"¿Cuánto cuesta hasta el centro, por favor?\"* \n\n❌ *\"Me vale\"* no se usa para aceptar precios en España.\n✅ **Corrección:** *\"De acuerdo\"* o *\"¿Aceptaría...?\"* \n\n### Cultural Insights:\n- En España, los taxis suelen tener **tarifas fijas** desde el aeropuerto al centro.\n- No es necesario negociar el precio - el taxímetro es obligatorio.\n- Los taxistas en Madrid generalmente **no esperan propina**.\n- Si viajas con maletas, pregunta por el **cargo adicional**.\n\n### Pronunciation Tips:\n- *taxi* → /ˈtaxi/\n- *centro* → /ˈθentɾo/\n- *tarifa* → /taˈɾifa/\n\n### Suggestions for Improvement:\n- Usa **¿Me puede poner...?** para sonar más educado.\n- Pregunta **¿Hay cargo por maletas?** si viajas con equipaje.\n- Di **\"Sin detenerse, por favor\"** si no quieres parar en ruta.\n\n### Conversation Flow:\n**Tú:** Buenos días, ¿me puede poner al centro, por favor?\n**Taxista:** Claro, ¿hotel o dirección específica?\n**Tú:** Hotel Riu Plaza España, por favor.\n**Taxista:** Tarifa desde el aeropuerto es €35 aproximadamente.\n**Tú:** ¿Hay cargo por maletas?\n**Taxista:** Sí, €1 por maleta grande.\n**Tú:** De acuerdo, vamos.\n\n¡Sigue practicando! Con la práctica, te sentirás más cómodo hablando con taxistas.",
    "target_vocabulary": [
      {
        "vocab": "taxi",
        "part_of_speech": "noun",
        "meaning": ["taxi"],
        "tone": "Neutral",
        "regional_variations": [
          {
            "country": "Colombia",
            "word": "taxi",
            "part_of_speech": "noun",
            "meaning": ["taxi"],
            "example": {
              "sentence": "¿Dónde puedo tomar un taxi?",
              "translation": "Where can I catch a taxi?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "Necesito un taxi para el aeropuerto.",
            "translation": "I need a taxi to the airport."
          },
          {
            "sentence": "¿Me puede poner al centro, por favor?",
            "translation": "Could you take me to the city center, please?"
          }
        ],
        "idioms": [],
        "synonyms": ["coche de alquiler"],
        "antonyms": ["autobús"]
      },
      {
        "vocab": "centro",
        "part_of_speech": "noun",
        "meaning": ["center", "downtown"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Me puede poner al centro, por favor?",
            "translation": "Could you take me to the city center, please?"
          },
          {
            "sentence": "El centro histórico es muy turístico.",
            "translation": "The historic center is very touristy."
          }
        ],
        "idioms": [
          { "phrase": "estar al centro de algo", "meaning": "to be at the heart of something" }
        ],
        "synonyms": ["downtown", "centro urbano"],
        "antonyms": ["periferia"]
      },
      {
        "vocab": "tarifa",
        "part_of_speech": "noun",
        "meaning": ["rate", "fare"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "La tarifa desde el aeropuerto es fija.",
            "translation": "The fare from the airport is fixed."
          },
          {
            "sentence": "¿Cuál es la tarifa por maletas?",
            "translation": "What's the rate for luggage?"
          }
        ],
        "idioms": [],
        "synonyms": ["precio", "costo"],
        "antonyms": ["descuento"]
      },
      {
        "vocab": "maleta",
        "part_of_speech": "noun",
        "meaning": ["suitcase"],
        "tone": "Casual",
        "regional_variations": [
          {
            "country": "Argentina",
            "word": "valija",
            "part_of_speech": "noun",
            "meaning": ["suitcase"],
            "example": {
              "sentence": "Traigo una valija grande.",
              "translation": "I have a large suitcase."
            }
          }
        ],
        "examples": [
          {
            "sentence": "¿Hay cargo por maletas?",
            "translation": "Is there a charge for luggage?"
          },
          {
            "sentence": "Tengo dos maletas y un bolso.",
            "translation": "I have two suitcases and a bag."
          }
        ],
        "idioms": [],
        "synonyms": ["bolsa", "equipaje"],
        "antonyms": []
      },
      {
        "vocab": "propina",
        "part_of_speech": "noun",
        "meaning": ["tip"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "En España, generalmente no se da propina a taxistas.",
            "translation": "In Spain, you generally don't tip taxi drivers."
          },
          {
            "sentence": "¿Es normal dar propina aquí?",
            "translation": "Is it normal to give a tip here?"
          }
        ],
        "idioms": [],
        "synonyms": ["punta"],
        "antonyms": []
      },
      {
        "vocab": "taxímetro",
        "part_of_speech": "noun",
        "meaning": ["taximeter"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Asegúrate de que el taxímetro esté activado.",
            "translation": "Make sure the taximeter is on."
          },
          {
            "sentence": "El taxímetro muestra el precio exacto.",
            "translation": "The taximeter shows the exact price."
          }
        ],
        "idioms": [],
        "synonyms": ["metro"],
        "antonyms": []
      },
      {
        "vocab": "parada",
        "part_of_speech": "noun",
        "meaning": ["stop", "stand"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Sin detenerse, por favor.",
            "translation": "No stops, please."
          },
          {
            "sentence": "¿Dónde está la parada de taxi?",
            "translation": "Where is the taxi stand?"
          }
        ],
        "idioms": [],
        "synonyms": ["alto"],
        "antonyms": ["avance"]
      }
    ],
    "user_audio": "https://example.com/audio/taxi_madrid.mp3",
    "created_at": "2025-08-10T12:40:00Z"
  },
  {
    "id": "c3d4e5f6-a7b8-9012-cdef-3456789012cd",
    "session_id": "vapi_call_003_hotel_checkin",
    "user_id": "clerk_user_125",
    "title": "Checking into a Boutique Hotel in Barcelona",
    "role_scenario": "I want to practice checking in, asking about breakfast, and wifi passwords.",
    "feedback": "## 🏨 Hotel Check-in Feedback\n\n¡Excelente intento con el check-in! Vamos a mejorar algunos detalles:\n\n### Error highlighting:\n❌ *\"Tengo una reserva para hoy\"* puedes ser más específico.\n✅ **Corrección:** *\"Tengo una reserva a nombre de [tu apellido] para esta noche.\"* \n\n❌ *\"¿La habitación incluye wifi?\"* en España.\n✅ **Corrección:** *\"¿El wifi es gratuito en la habitación?\"* \n\n### Cultural Insights:\n- En hoteles españoles, es **obligatorio presentar el pasaporte** al check-in.\n- El **desayuno buffet** es común, pero algunos hoteles ofrecen desayuno americano.\n- Pregunta por **opciones de almuerzo** si llegas temprano.\n\n### Pronunciation Tips:\n- *buffet* → /bufe/\n- *habitación* → /abitasion/\n\n### Suggestions for Improvement:\n- Usa **¿Podría...?** para sonar más educado.\n- Pregunta **¿Hay opción de desayuno tardío?** si necesitas.\n- Di **\"¡Muchas gracias!\"** al finalizar.\n\n### Conversation Flow:\n**Tú:** Buenos días, tengo una reserva a nombre de García para esta noche.\n**Recepcionista:** Sí, señor/a García. ¿Puedo ver su pasaporte, por favor?\n**Tú:** Claro, aquí está. ¿El wifi es gratuito en la habitación?\n**Recepcionista:** Sí, la clave es 'HotelBarcelona' y se actualiza diariamente.\n**Tú:** Perfecto. ¿El desayuno es buffet o americano?\n**Recepcionista:** Es buffet con opciones vegetarianas.\n**Tú:** Ideal. ¡Muchas gracias!\n\n¡Sigue practicando! Con cada práctica, te sentirás más cómodo.",
    "target_vocabulary": [
      {
        "vocab": "check-in",
        "part_of_speech": "noun",
        "meaning": ["registration"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El check-in es a partir de las 14:00.",
            "translation": "Check-in is from 2:00 PM."
          },
          {
            "sentence": "¿Podría ayudarme con el check-in?",
            "translation": "Could you help me with check-in?"
          }
        ],
        "idioms": [],
        "synonyms": ["registro"],
        "antonyms": ["check-out"]
      },
      {
        "vocab": "habitación",
        "part_of_speech": "noun",
        "meaning": ["room"],
        "tone": "Casual",
        "regional_variations": [
          {
            "country": "Mexico",
            "word": "cuarto",
            "part_of_speech": "noun",
            "meaning": ["room"],
            "example": {
              "sentence": "¿Tienen cuarto doble?",
              "translation": "Do you have a double room?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "¿El wifi es gratuito en la habitación?",
            "translation": "Is wifi free in the room?"
          },
          {
            "sentence": "¿Tienen habitación con vista al mar?",
            "translation": "Do you have a room with sea view?"
          }
        ],
        "idioms": [
          { "phrase": "estar habituado a algo", "meaning": "to be accustomed to something" }
        ],
        "synonyms": ["cuarto", "alojamiento"],
        "antonyms": ["recepción"]
      },
      {
        "vocab": "desayuno",
        "part_of_speech": "noun",
        "meaning": ["breakfast"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿El desayuno es buffet o americano?",
            "translation": "Is breakfast buffet or American-style?"
          },
          {
            "sentence": "El desayuno se sirve de 7:30 a 10:30.",
            "translation": "Breakfast is served from 7:30 to 10:30."
          }
        ],
        "idioms": [
          { "phrase": "echar el desayuno", "meaning": "to waste time" }
        ],
        "synonyms": ["primer desayuno"],
        "antonyms": ["cena"]
      },
      {
        "vocab": "buffet",
        "part_of_speech": "noun",
        "meaning": ["buffet"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿El desayuno es buffet o americano?",
            "translation": "Is breakfast buffet or American-style?"
          },
          {
            "sentence": "El buffet tiene opciones vegetarianas.",
            "translation": "The buffet has vegetarian options."
          }
        ],
        "idioms": [],
        "synonyms": ["self-service"],
        "antonyms": ["servicio de mesa"]
      },
      {
        "vocab": "pasaporte",
        "part_of_speech": "noun",
        "meaning": ["passport"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Puedo ver su pasaporte, por favor?",
            "translation": "Could I see your passport, please?"
          },
          {
            "sentence": "Traigo dos pasaportes.",
            "translation": "I have two passports."
          }
        ],
        "idioms": [
          { "phrase": "tener pasaporte", "meaning": "to have a valid passport" }
        ],
        "synonyms": ["documento de viaje"],
        "antonyms": []
      },
      {
        "vocab": "clave",
        "part_of_speech": "noun",
        "meaning": ["key", "password"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "La clave del wifi es 'HotelBarcelona'.",
            "translation": "The wifi password is 'HotelBarcelona'."
          },
          {
            "sentence": "¿Podría darme la clave?",
            "translation": "Could you give me the password?"
          }
        ],
        "idioms": [
          { "phrase": "clave de bóveda", "meaning": "keystone" }
        ],
        "synonyms": ["contraseña"],
        "antonyms": []
      },
      {
        "vocab": "recepción",
        "part_of_speech": "noun",
        "meaning": ["reception"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "La recepción está en el primer piso.",
            "translation": "Reception is on the first floor."
          },
          {
            "sentence": "¿Podría ayudarme en recepción?",
            "translation": "Could you help me at reception?"
          }
        ],
        "idioms": [
          { "phrase": "estar en recepción", "meaning": "to be at the front desk" }
        ],
        "synonyms": ["desk"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/hotel_barcelona.mp3",
    "created_at": "2025-08-10T12:45:00Z"
  },
  {
    "id": "d4e5f6a7-b8c9-0123-defa-4567890123de",
    "session_id": "vapi_call_004_doctor_appointment",
    "user_id": "clerk_user_126",
    "title": "Making a Doctor’s Appointment by Phone",
    "role_scenario": "I need to schedule an appointment for a sore throat.",
    "feedback": "## 🩺 Doctor's Appointment Feedback\n\n¡Muy bien con tu llamada! Vamos a refinarla un poco:\n\n### Error highlighting:\n❌ *\"Tengo dolor en mi garganta\"* suena bien, pero en español médico:\n✅ **Corrección:** *\"Tengo dolor de garganta desde ayer.\"* \n\n❌ *\"Necesito ver al médico\"* podría ser más específico.\n✅ **Corrección:** *\"¿Podría hacerme una cita con el médico para mañana?\"* \n\n### Cultural Insights:\n- En España, para consultas menores como dolor de garganta, puedes ir a **urgencias de un centro de salud** sin cita previa.\n- Los médicos generalmente **no prescriben antibióticos** para dolor de garganta a menos que sea estreptocócico.\n- Es común **llevar un listado de síntomas** organizados cronológicamente.\n\n### Pronunciation Tips:\n- *garganta* → /ɡarˈɡanta/\n- *prescripción* → /preskripˈsjon/\n\n### Suggestions for Improvement:\n- Usa **¿Podría...?** para sonar más educado.\n- Di **\"Tengo dolor de garganta y dificultad para tragar\"** para describir mejor el síntoma.\n- Pregunta **¿Necesito preparar algo para la consulta?**\n\n### Conversation Flow:\n**Tú:** Buenos días, quisiera hacer una cita con el médico.\n**Secretaria:** Claro, ¿para qué consulta?\n**Tú:** Tengo dolor de garganta desde ayer y me cuesta tragar.\n**Secretaria:** ¿Ha tenido fiebre?\n**Tú:** Sí, 38°C desde esta mañana.\n**Secretaria:** Tenemos disponibilidad mañana a las 10:00.\n**Tú:** Perfecto, ¿necesito preparar algo para la consulta?\n**Secretaria:** Traiga su tarjeta sanitaria y lista de medicamentos.\n**Tú:** Muchas gracias.\n\n¡Sigue practicando! Con cada llamada, te sentirás más cómodo hablando con profesionales de la salud.",
    "target_vocabulary": [
      {
        "vocab": "cita",
        "part_of_speech": "noun",
        "meaning": ["appointment"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Podría hacerme una cita con el médico para mañana?",
            "translation": "Could I get an appointment with the doctor for tomorrow?"
          },
          {
            "sentence": "Tengo cita médica el jueves.",
            "translation": "I have a doctor's appointment on Thursday."
          }
        ],
        "idioms": [
          { "phrase": "a la cita", "meaning": "to the appointment" }
        ],
        "synonyms": ["turno"],
        "antonyms": ["cancelación"]
      },
      {
        "vocab": "médico",
        "part_of_speech": "noun",
        "meaning": ["doctor"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo una cita con el médico.",
            "translation": "I have an appointment with the doctor."
          },
          {
            "sentence": "El médico me recetó antibióticos.",
            "translation": "The doctor prescribed me antibiotics."
          }
        ],
        "idioms": [
          { "phrase": "hablar con el médico", "meaning": "to speak with the doctor" }
        ],
        "synonyms": ["médica"],
        "antonyms": ["paciente"]
      },
      {
        "vocab": "garganta",
        "part_of_speech": "noun",
        "meaning": ["throat"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo dolor de garganta desde ayer.",
            "translation": "I've had a sore throat since yesterday."
          },
          {
            "sentence": "Me cuesta tragar con dolor de garganta.",
            "translation": "It's hard to swallow with a sore throat."
          }
        ],
        "idioms": [
          { "phrase": "tener la garganta seca", "meaning": "to have a dry throat" }
        ],
        "synonyms": ["cuello"],
        "antonyms": ["pecho"]
      },
      {
        "vocab": "fiebre",
        "part_of_speech": "noun",
        "meaning": ["fever"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo 38°C de fiebre desde esta mañana.",
            "translation": "I've had a fever of 38°C since this morning."
          },
          {
            "sentence": "¿Ha tenido fiebre en los últimos días?",
            "translation": "Have you had a fever in the last few days?"
          }
        ],
        "idioms": [
          { "phrase": "estar con fiebre", "meaning": "to have a fever" }
        ],
        "synonyms": ["temperatura"],
        "antonyms": ["frío"]
      },
      {
        "vocab": "prescripción",
        "part_of_speech": "noun",
        "meaning": ["prescription"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El médico me dio una prescripción para antibióticos.",
            "translation": "The doctor gave me a prescription for antibiotics."
          },
          {
            "sentence": "¿Puedo renovar mi prescripción?",
            "translation": "Can I renew my prescription?"
          }
        ],
        "idioms": [
          { "phrase": "seguir la prescripción", "meaning": "to follow the prescription" }
        ],
        "synonyms": ["receta"],
        "antonyms": []
      },
      {
        "vocab": "síntoma",
        "part_of_speech": "noun",
        "meaning": ["symptom"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Los principales síntomas son dolor de garganta y fiebre.",
            "translation": "The main symptoms are sore throat and fever."
          },
          {
            "sentence": "¿Desde cuándo tiene estos síntomas?",
            "translation": "How long have you had these symptoms?"
          }
        ],
        "idioms": [
          { "phrase": "tener síntomas", "meaning": "to have symptoms" }
        ],
        "synonyms": ["señal"],
        "antonyms": ["cura"]
      },
      {
        "vocab": "tragar",
        "part_of_speech": "verb",
        "meaning": ["to swallow"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Me cuesta tragar con dolor de garganta.",
            "translation": "It's hard to swallow with a sore throat."
          },
          {
            "sentence": "Tengo dificultad para tragar.",
            "translation": "I have difficulty swallowing."
          }
        ],
        "idioms": [
          { "phrase": "tragar saliva", "meaning": "to swallow saliva" }
        ],
        "synonyms": ["ingerir"],
        "antonyms": ["vomitar"]
      }
    ],
    "user_audio": "https://example.com/audio/doctor_call.mp3",
    "created_at": "2025-08-10T12:50:00Z"
  },
  {
    "id": "e5f6a7b8-c9d0-1234-efab-5678901234ef",
    "session_id": "vapi_call_005_pharmacy",
    "user_id": "clerk_user_127",
    "title": "Buying Cold Medicine at a Pharmacy in Valencia",
    "role_scenario": "I have a cold and need something for congestion.",
    "feedback": "## 💊 Pharmacy Visit Feedback\n\n¡Muy bien con tu conversación en la farmacia! Vamos a mejorarla un poco:\n\n### Error highlighting:\n❌ *\"Necesito algo para el resfriado\"* es correcto, pero en farmacias españolas:\n✅ **Corrección:** *\"Busco algo para el resfriado, ¿me recomienda algo?\"* \n\n❌ *\"¿Cuánto cuesta?\"* suena bien, pero en farmacias suena mejor:\n✅ **Corrección:** *\"¿Me puede decir el precio?\"* \n\n### Cultural Insights:\n- En España, muchos medicamentos para el resfriado **no necesitan receta**.\n- Es común que el farmacéutico **te haga preguntas detalladas** sobre síntomas.\n- Los farmacéuticos suelen **recomendar productos específicos** basados en tus síntomas.\n\n### Pronunciation Tips:\n- *farmacia* → /farˈmasia/\n- *resfriado* → /resfriaˈðo/\n\n### Suggestions for Improvement:\n- Usa **¿Me recomienda...?** para sonar más educado.\n- Di **\"Tengo congestión nasal y dolor de garganta\"** para describir mejor el síntoma.\n- Pregunta **¿Hay genéricos disponibles?**\n\n### Conversation Flow:\n**Tú:** Buenos días, busco algo para el resfriado, ¿me recomienda algo?\n**Farmacéutico:** Claro. ¿Tiene fiebre o solo congestión nasal?\n**Tú:** Solo congestión nasal y dolor de garganta.\n**Farmacéutico:** Le recomiendo este spray nasal y estos caramelos para la garganta.\n**Tú:** ¿Me puede decir el precio?\n**Farmacéutico:** El spray es €9,95 y los caramelos son €4,50.\n**Tú:** Perfecto, los tomaré. ¿Hay genéricos disponibles?\n**Farmacéutico:** Sí, el spray tiene una opción genérica por €7,50.\n**Tú:** ¡Gracias por su ayuda!\n\n¡Sigue practicando! Con cada visita a la farmacia, te sentirás más cómodo pidiendo medicamentos.",
    "target_vocabulary": [
      {
        "vocab": "farmacia",
        "part_of_speech": "noun",
        "meaning": ["pharmacy"],
        "tone": "Neutral",
        "regional_variations": [
          {
            "country": "Mexico",
            "word": "farmacia",
            "part_of_speech": "noun",
            "meaning": ["pharmacy"],
            "example": {
              "sentence": "¿Dónde puedo encontrar una farmacia cerca?",
              "translation": "Where can I find a nearby pharmacy?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "La farmacia abre a las 9:00 de la mañana.",
            "translation": "The pharmacy opens at 9:00 AM."
          },
          {
            "sentence": "¿Hay farmacia de guardia tonight?",
            "translation": "Is there an on-call pharmacy tonight?"
          }
        ],
        "idioms": [],
        "synonyms": ["droguería"],
        "antonyms": []
      },
      {
        "vocab": "resfriado",
        "part_of_speech": "noun",
        "meaning": ["cold"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Busco algo para el resfriado, ¿me recomienda algo?",
            "translation": "I'm looking for something for a cold, could you recommend something?"
          },
          {
            "sentence": "Tengo un resfriado desde ayer.",
            "translation": "I've had a cold since yesterday."
          }
        ],
        "idioms": [
          { "phrase": "estar resfriado", "meaning": "to have a cold" }
        ],
        "synonyms": ["constipado"],
        "antonyms": ["saludable"]
      },
      {
        "vocab": "congestión",
        "part_of_speech": "noun",
        "meaning": ["congestion"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo congestión nasal desde esta mañana.",
            "translation": "I've had nasal congestion since this morning."
          },
          {
            "sentence": "¿Hay algo para la congestión?",
            "translation": "Is there anything for congestion?"
          }
        ],
        "idioms": [
          { "phrase": "estar congestionado", "meaning": "to be congested" }
        ],
        "synonyms": ["tapón nasal"],
        "antonyms": ["despejado"]
      },
      {
        "vocab": "dolor",
        "part_of_speech": "noun",
        "meaning": ["pain"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo dolor de garganta y congestión nasal.",
            "translation": "I have a sore throat and nasal congestion."
          },
          {
            "sentence": "¿Podría darme algo para el dolor?",
            "translation": "Could you give me something for the pain?"
          }
        ],
        "idioms": [
          { "phrase": "tener dolor", "meaning": "to have pain" }
        ],
        "synonyms": ["malestar"],
        "antonyms": ["alivio"]
      },
      {
        "vocab": "garganta",
        "part_of_speech": "noun",
        "meaning": ["throat"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo dolor de garganta desde ayer.",
            "translation": "I've had a sore throat since yesterday."
          },
          {
            "sentence": "Me cuesta tragar con dolor de garganta.",
            "translation": "It's hard to swallow with a sore throat."
          }
        ],
        "idioms": [
          { "phrase": "tener la garganta seca", "meaning": "to have a dry throat" }
        ],
        "synonyms": ["cuello"],
        "antonyms": ["pecho"]
      },
      {
        "vocab": "recomendar",
        "part_of_speech": "verb",
        "meaning": ["to recommend"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Me recomienda algo para el resfriado?",
            "translation": "Could you recommend something for a cold?"
          },
          {
            "sentence": "El farmacéutico me recomendó este spray nasal.",
            "translation": "The pharmacist recommended this nasal spray."
          }
        ],
        "idioms": [
          { "phrase": "recomendar a alguien", "meaning": "to recommend to someone" }
        ],
        "synonyms": ["sugerir"],
        "antonyms": ["desaconsejar"]
      },
      {
        "vocab": "farmacéutico",
        "part_of_speech": "noun",
        "meaning": ["pharmacist"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El farmacéutico me atendió muy bien.",
            "translation": "The pharmacist attended to me very well."
          },
          {
            "sentence": "¿Podría hablar con el farmacéutico?",
            "translation": "Could I speak with the pharmacist?"
          }
        ],
        "idioms": [
          { "phrase": "farmacéutico de guardia", "meaning": "on-call pharmacist" }
        ],
        "synonyms": ["químico"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/pharmacy_valencia.mp3",
    "created_at": "2025-08-10T12:55:00Z"
  },
  {
    "id": "f6a7b8c9-d0e1-2345-fabc-6789012345fa",
    "session_id": "vapi_call_006_market_haggle",
    "user_id": "clerk_user_128",
    "title": "Haggling for a Souvenir in the Market",
    "role_scenario": "I want to buy a hammock and try to negotiate the price.",
    "feedback": "## 🛍️ Market Haggling Feedback\n\n¡Excelente intento con tu regateo! Vamos a refinarlo un poco:\n\n### Error highlighting:\n❌ *\"Es muy caro, más barato\"* suena demasiado directo.\n✅ **Corrección:** *\"¿Me lo deja en 25 euros?\"* \n\n❌ *\"Quiero esta hamaca\"* podría ser más educado.\n✅ **Corrección:** *\"Me gusta esta hamaca, ¿me la podría vender en 25 euros?\"* \n\n### Cultural Insights:\n- En mercados mexicanos, el regateo es **esperado y amigable**.\n- Es común **sonreír y bromear** durante el regateo.\n- Los vendedores suelen **pedir un precio inicial alto**.\n\n### Pronunciation Tips:\n- *hamaca* → /aˈmaka/\n- *regatear* → /reɡaˈtear/\n\n### Suggestions for Improvement:\n- Usa **¿Me lo deja en...?** para sonar más educado.\n- Di **\"¡Qué bonita!\"** para halagar el producto.\n- Pregunta **¿Qué es lo menos que puede hacer?**\n\n### Conversation Flow:\n**Tú:** Buenos días, me gusta esta hamaca, ¿cuánto cuesta?\n**Vendedor:** Esta hamaca es €40.\n**Tú:** ¡Qué bonita! Me gustaría comprarla, pero es un poco cara para mi presupuesto.\n**Vendedor:** ¿Qué precio tenía en mente?\n**Tú:** ¿Me la podría vender en 25 euros?\n**Vendedor:** No puedo bajar tanto, pero puedo hacer 30 euros.\n**Tú:** Perfecto, la compro.\n\n¡Sigue practicando! Con cada regateo, te sentirás más cómodo negociando precios.",
    "target_vocabulary": [
      {
        "vocab": "regatear",
        "part_of_speech": "verb",
        "meaning": ["to haggle", "to bargain"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Espero que no te importe que regatee el precio.",
            "translation": "I hope you don't mind if I haggle the price."
          },
          {
            "sentence": "En este mercado se puede regatear todo.",
            "translation": "In this market you can haggle everything."
          }
        ],
        "idioms": [
          { "phrase": "estar para regatear", "meaning": "to be open to bargaining" }
        ],
        "synonyms": ["negociar"],
        "antonyms": ["aceptar precio"]
      },
      {
        "vocab": "hamaca",
        "part_of_speech": "noun",
        "meaning": ["hammock"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Me gusta esta hamaca, ¿me la podría vender en 25 euros?",
            "translation": "I like this hammock, could you sell it to me for €25?"
          },
          {
            "sentence": "La hamaca está hecha a mano.",
            "translation": "The hammock is handmade."
          }
        ],
        "idioms": [],
        "synonyms": ["columpio"],
        "antonyms": []
      },
      {
        "vocab": "precio",
        "part_of_speech": "noun",
        "meaning": ["price"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Me la podría vender en 25 euros?",
            "translation": "Could you sell it to me for €25?"
          },
          {
            "sentence": "El precio inicial es demasiado alto.",
            "translation": "The initial price is too high."
          }
        ],
        "idioms": [
          { "phrase": "poner precio a algo", "meaning": "to put a price on something" }
        ],
        "synonyms": ["coste"],
        "antonyms": ["descuento"]
      },
      {
        "vocab": "vendedor",
        "part_of_speech": "noun",
        "meaning": ["seller"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El vendedor me atendió muy bien.",
            "translation": "The seller attended to me very well."
          },
          {
            "sentence": "¿Podría hablar con el vendedor?",
            "translation": "Could I speak with the seller?"
          }
        ],
        "idioms": [
          { "phrase": "tener un buen vendedor", "meaning": "to have a good seller" }
        ],
        "synonyms": ["comerciante"],
        "antonyms": ["comprador"]
      },
      {
        "vocab": "presupuesto",
        "part_of_speech": "noun",
        "meaning": ["budget"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Es un poco cara para mi presupuesto.",
            "translation": "It's a bit expensive for my budget."
          },
          {
            "sentence": "¿Tiene algún producto dentro de mi presupuesto?",
            "translation": "Do you have any products within my budget?"
          }
        ],
        "idioms": [
          { "phrase": "entrar en presupuesto", "meaning": "to fit within the budget" }
        ],
        "synonyms": ["finanzas"],
        "antonyms": []
      },
      {
        "vocab": "producto",
        "part_of_speech": "noun",
        "meaning": ["product"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Tiene algún producto similar?",
            "translation": "Do you have any similar product?"
          },
          {
            "sentence": "El producto es de buena calidad.",
            "translation": "The product is of good quality."
          }
        ],
        "idioms": [
          { "phrase": "tener producto", "meaning": "to have product" }
        ],
        "synonyms": ["mercancía"],
        "antonyms": []
      },
      {
        "vocab": "calidad",
        "part_of_speech": "noun",
        "meaning": ["quality"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El producto es de buena calidad.",
            "translation": "The product is of good quality."
          },
          {
            "sentence": "¿Podría darme algo de mejor calidad?",
            "translation": "Could you give me something of better quality?"
          }
        ],
        "idioms": [
          { "phrase": "calidad precio", "meaning": "quality-price" }
        ],
        "synonyms": ["excelencia"],
        "antonyms": ["defectuoso"]
      }
    ],
    "user_audio": "https://example.com/audio/market_haggle.mp3",
    "created_at": "2025-08-10T13:00:00Z"
  },
  {
    "id": "a7b8c9d0-e1f2-3456-abcd-7890123456ab",
    "session_id": "vapi_call_007_bank_exchange",
    "user_id": "clerk_user_129",
    "title": "Exchanging Currency at a Bank in Barcelona",
    "role_scenario": "I need to change 200 USD to euros and ask about fees.",
    "feedback": "## 🏦 Bank Exchange Feedback\n\n¡Bienvenido/a al banco! Vamos a repasar tu conversación:\n\n### Error highlighting:\n❌ *\"Quiero cambiar dólares\"* suena bien, pero en España:\n✅ **Corrección:** *\"¿Puedo cambiar 200 dólares a euros, por favor?\"* \n\n❌ *\"¿Cuánto es la comisión?\"* es correcto, pero en bancos:\n✅ **Corrección:** *\"¿Hay comisión por el cambio?\"* \n\n### Cultural Insights:\n- En España, mucha gente **cambia dinero en oficinas de correo** también.\n- Los bancos suelen tener **comisiones más altas** que las casas de cambio.\n- Es común que te **entreguen billetes pequeños**.\n\n### Pronunciation Tips:\n- *comisión* → /komiˈsjon/\n- *cambio* → /ˈkambio/\n\n### Suggestions for Improvement:\n- Usa **¿Me podría...?** para sonar más educado.\n- Pregunta **¿Cuánto me saldrán 200 dólares?** para preguntar el total.\n- Di **\"Gracias por su ayuda\"** al final.\n\n### Conversation Flow:\n**Tú:** Buenos días, ¿puedo cambiar 200 dólares a euros, por favor?\n**Empleado:** Claro, ¿desea efectivo o transferencia?\n**Tú:** Efectivo, por favor.\n**Empleado:** La tasa actual es de 0.95 y hay una comisión de €5.\n**Tú:** ¿Hay comisión por el cambio?\n**Empleado:** Sí, la comisión es de €5.\n**Tú:** Perfecto, procedo con el cambio.\n**Empleado:** Aquí tiene sus euros.\n**Tú:** Muchas gracias por su ayuda.\n\n¡Sigue practicando! Con cada cambio, te sentirás más cómodo en transacciones bancarias.",
    "target_vocabulary": [
      {
        "vocab": "cambio",
        "part_of_speech": "noun",
        "meaning": ["exchange"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Puedo cambiar 200 dólares a euros, por favor?",
            "translation": "Could I exchange 200 dollars to euros, please?"
          },
          {
            "sentence": "La tasa de cambio es muy buena hoy.",
            "translation": "The exchange rate is very good today."
          }
        ],
        "idioms": [
          { "phrase": "hacer cambio", "meaning": "to make a change" }
        ],
        "synonyms": ["intercambio"],
        "antonyms": []
      },
      {
        "vocab": "comisión",
        "part_of_speech": "noun",
        "meaning": ["fee", "commission"],
        "tone": "Formal",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "La comisión por el cambio es de €5.",
            "translation": "The fee for the exchange is €5."
          },
          {
            "sentence": "¿Hay comisión por este servicio?",
            "translation": "Is there a fee for this service?"
          }
        ],
        "idioms": [
          { "phrase": "sin comisión", "meaning": "free of charge" }
        ],
        "synonyms": ["cargo"],
        "antonyms": []
      },
      {
        "vocab": "tasa",
        "part_of_speech": "noun",
        "meaning": ["rate"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "La tasa actual es de 0.95.",
            "translation": "The current rate is 0.95."
          },
          {
            "sentence": "¿Cuál es la tasa de cambio hoy?",
            "translation": "What's the exchange rate today?"
          }
        ],
        "idioms": [
          { "phrase": "a la tasa", "meaning": "at the rate" }
        ],
        "synonyms": ["proporción"],
        "antonyms": []
      },
      {
        "vocab": "billete",
        "part_of_speech": "noun",
        "meaning": ["bill", "note"],
        "tone": "Neutral",
        "regional_variations": [
          {
            "country": "Argentina",
            "word": "plata",
            "part_of_speech": "noun",
            "meaning": ["money"],
            "example": {
              "sentence": "¿Me das plata para el cambio?",
              "translation": "Can you give me money for the change?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "¿Me puede dar billetes pequeños?",
            "translation": "Could you give me small bills?"
          },
          {
            "sentence": "Tengo un billete de 50 euros.",
            "translation": "I have a €50 bill."
          }
        ],
        "idioms": [
          { "phrase": "billete de ida y vuelta", "meaning": "round-trip ticket" }
        ],
        "synonyms": ["efectivo"],
        "antonyms": ["moneda"]
      },
      {
        "vocab": "transferencia",
        "part_of_speech": "noun",
        "meaning": ["transfer"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Desea efectivo o transferencia?",
            "translation": "Do you want cash or transfer?"
          },
          {
            "sentence": "La transferencia bancaria tarda 2 días.",
            "translation": "The bank transfer takes 2 days."
          }
        ],
        "idioms": [
          { "phrase": "hacer una transferencia", "meaning": "to make a transfer" }
        ],
        "synonyms": ["giro"],
        "antonyms": []
      },
      {
        "vocab": "efectivo",
        "part_of_speech": "noun",
        "meaning": ["cash"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Efectivo, por favor.",
            "translation": "Cash, please."
          },
          {
            "sentence": "¿Tienen efectivo disponible?",
            "translation": "Do you have cash available?"
          }
        ],
        "idioms": [
          { "phrase": "en efectivo", "meaning": "in cash" }
        ],
        "synonyms": ["dinero"],
        "antonyms": ["cheque"]
      },
      {
        "vocab": "empleado",
        "part_of_speech": "noun",
        "meaning": ["employee"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El empleado me atendió muy bien.",
            "translation": "The employee attended to me very well."
          },
          {
            "sentence": "¿Podría hablar con el empleado de cambio?",
            "translation": "Could I speak with the exchange employee?"
          }
        ],
        "idioms": [
          { "phrase": "ser empleado", "meaning": "to be an employee" }
        ],
        "synonyms": ["trabajador"],
        "antonyms": ["jefe"]
      }
    ],
    "user_audio": "https://example.com/audio/bank_exchange.mp3",
    "created_at": "2025-08-10T13:05:00Z"
  },
  {
    "id": "b8c9d0e1-f2a3-4567-bcde-8901234567bc",
    "session_id": "vapi_call_008_laundry",
    "user_id": "clerk_user_130",
    "title": "Using a Self-Service Laundromat in Madrid",
    "role_scenario": "I need to wash clothes and buy detergent.",
    "feedback": "## ↳ Feedback de la lavandería\n\n¡Bienvenido/a a la lavandería! Vamos a repasar tu conversación:\n\n### Error highlighting:\n❌ *\"¿Dónde comprar detergente?\"* suena bien, pero en España:\n✅ **Corrección:** *\"¿Dónde puedo comprar detergente?\"* \n\n❌ *\"Ponga mi ropa\"* suena demasiado directo.\n✅ **Corrección:** *\"¿Me podría indicar dónde poner la ropa?\"* \n\n### Cultural Insights:\n- En España, las lavanderías suelen tener **órden de trabajo**.\n- Es común **usar suavizante** en todas las lavadas.\n- Muchas lavanderías ofrecen **servicio de secado adicional**.\n\n### Pronunciation Tips:\n- *suavizante* → /swaβiθante/\n- *lavadora* → /lawaˈðora/\n\n### Suggestions for Improvement:\n- Usa **¿Me podría...?** para sonar más educado.\n- Pregunta **¿Cuál es el precio por kilo?**\n- Di **\"Gracias por su ayuda\"** al final.\n\n### Conversation Flow:\n**Tú:** Buenos días, ¿dónde puedo comprar detergente?\n**Empleado:** Tenemos detergente en la recepción.\n**Tú:** Perfecto. ¿Me podría indicar dónde poner la ropa?\n**Empleado:** Las lavadoras están al fondo, número 5 está libre.\n**Tú:** ¿Cuál es el precio por kilo?\n**Empleado:** €1,50 por kilo y suavizante incluido.\n**Tú:** Ideal. ¡Gracias por su ayuda!\n\n¡Sigue practicando! Con cada visita a la lavandería, te sentirás más cómodo.",
    "target_vocabulary": [
      {
        "vocab": "detergente",
        "part_of_speech": "noun",
        "meaning": ["detergent"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Dónde puedo comprar detergente?",
            "translation": "Where can I buy detergent?"
          },
          {
            "sentence": "¿Tienen detergente para ropa delicada?",
            "translation": "Do you have detergent for delicate clothes?"
          }
        ],
        "idioms": [],
        "synonyms": ["jabón"],
        "antonyms": []
      },
      {
        "vocab": "suavizante",
        "part_of_speech": "noun",
        "meaning": ["fabric softener"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Incluyen suavizante en el precio?",
            "translation": "Is fabric softener included in the price?"
          },
          {
            "sentence": "El suavizante deja la ropa muy suave.",
            "translation": "The fabric softener leaves the clothes very soft."
          }
        ],
        "idioms": [],
        "synonyms": ["ablandador"],
        "antonyms": []
      },
      {
        "vocab": "lavadora",
        "part_of_speech": "noun",
        "meaning": ["washing machine"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Las lavadoras están al fondo.",
            "translation": "The washing machines are at the back."
          },
          {
            "sentence": "¿Cuánto tarda una lavadora en acabar?",
            "translation": "How long does a washing machine take to finish?"
          }
        ],
        "idioms": [],
        "synonyms": ["lavaplatos"],
        "antonyms": []
      },
      {
        "vocab": "precio",
        "part_of_speech": "noun",
        "meaning": ["price"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Cuál es el precio por kilo?",
            "translation": "What's the price per kilo?"
          },
          {
            "sentence": "El precio incluye suavizante.",
            "translation": "The price includes fabric softener."
          }
        ],
        "idioms": [
          { "phrase": "poner precio a algo", "meaning": "to set a price for something" }
        ],
        "synonyms": ["coste"],
        "antonyms": ["descuento"]
      },
      {
        "vocab": "kilo",
        "part_of_speech": "noun",
        "meaning": ["kilogram"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Cuál es el precio por kilo?",
            "translation": "What's the price per kilo?"
          },
          {
            "sentence": "Tengo dos kilos de ropa para lavar.",
            "translation": "I have two kilos of clothes to wash."
          }
        ],
        "idioms": [
          { "phrase": "a peso de kilo", "meaning": "at the price of a kilo" }
        ],
        "synonyms": ["kilogramo"],
        "antonyms": ["gramo"]
      },
      {
        "vocab": "recepción",
        "part_of_speech": "noun",
        "meaning": ["reception"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tenemos detergente en la recepción.",
            "translation": "We have detergent at the reception."
          },
          {
            "sentence": "¿Dónde está la recepción?",
            "translation": "Where is the reception?"
          }
        ],
        "idioms": [
          { "phrase": "estar en recepción", "meaning": "to be at the reception" }
        ],
        "synonyms": ["desk"],
        "antonyms": []
      },
      {
        "vocab": "empleada",
        "part_of_speech": "noun",
        "meaning": ["employee (female)"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "La empleada me atendió muy bien.",
            "translation": "The employee attended to me very well."
          },
          {
            "sentence": "¿Podría hablar con la empleada de turno?",
            "translation": "Could I speak with the employee on duty?"
          }
        ],
        "idioms": [
          { "phrase": "ser empleada", "meaning": "to be an employee" }
        ],
        "synonyms": ["trabajadora"],
        "antonyms": ["jefa"]
      }
    ],
    "user_audio": "https://example.com/audio/laundry_madrid.mp3",
    "created_at": "2025-08-10T13:10:00Z"
  },
  {
    "id": "c9d0e1f2-a3b4-5678-cdef-9012345678cd",
    "session_id": "vapi_call_009_haircut",
    "user_id": "clerk_user_131",
    "title": "Getting a Haircut in a Barber Shop",
    "role_scenario": "I want to explain the style I want and ask for a trim.",
    "feedback": "## ✂️ Feedback de la barbería\n\n¡Muy bien con tu visita a la barbería! Vamos a refinarla un poco:\n\n### Error highlighting:\n❌ *\"Corte pelo corto\"* suena bien, pero en peluquerías:\n✅ **Corrección:** *\"Quisiera un corte de pelo corto por atrás y un poco más largo arriba.\"* \n\n❌ *\"Terminado\"* podría ser más específico.\n✅ **Corrección:** *\"¿Podría dejarme el pelo un poco más largo arriba?\"* \n\n### Cultural Insights:\n- En peluquerías españolas, es común **pedir cita previa**.\n- Los peluqueros suelen **hacer preguntas detalladas** sobre el estilo deseado.\n- Es común **dejar propina** si estás satisfecho.\n\n### Pronunciation Tips:\n- *peluquería* → /pelukeria/\n- *corte* → /ˈkorte/\n\n### Suggestions for Improvement:\n- Usa **¿Podría...?** para sonar más educado.\n- Di **\"Quisiera algo fresco y ligero\"** para describir el estilo.\n- Pregunta **¿Cuánto tiempo tardará?**\n\n### Conversation Flow:\n**Tú:** Buenos días, quisiera un corte de pelo corto por atrás y un poco más largo arriba.\n**Peluquero:** Claro, ¿algo más?\n**Tú:** Sí, ¿podría dejarme el pelo un poco más largo arriba?\n**Peluquero:** Perfecto, ¿algo más?\n**Tú:** También quisiera que me corten un poco las puntas.\n**Peluquero:** Entiendo, un corte fresco y ligero.\n**Tú:** Exacto. ¿Cuánto tiempo tardará?\n**Peluquero:** Aproximadamente 30 minutos.\n**Tú:** Ideal. ¡Gracias!\n\n¡Sigue practicando! Con cada visita a la peluquería, te sentirás más cómodo explicando tu estilo.",
    "target_vocabulary": [
      {
        "vocab": "corte",
        "part_of_speech": "noun",
        "meaning": ["cut", "style"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Quisiera un corte de pelo corto por atrás y un poco más largo arriba.",
            "translation": "I'd like a short cut at the back and a bit longer on top."
          },
          {
            "sentence": "¿Podría dejarme el pelo un poco más largo arriba?",
            "translation": "Could you leave my hair a bit longer on top?"
          }
        ],
        "idioms": [
          { "phrase": "hacer un corte de pelo", "meaning": "to get a haircut" }
        ],
        "synonyms": ["estilo"],
        "antonyms": ["crecimiento"]
      },
      {
        "vocab": "peluquería",
        "part_of_speech": "noun",
        "meaning": ["hair salon"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Dónde está la peluquería más cercana?",
            "translation": "Where is the nearest hair salon?"
          },
          {
            "sentence": "Hecho en una peluquería de confianza.",
            "translation": "Done at a trusted hair salon."
          }
        ],
        "idioms": [
          { "phrase": "ir a la peluquería", "meaning": "to go to the hair salon" }
        ],
        "synonyms": ["barbería"],
        "antonyms": []
      },
      {
        "vocab": "estilo",
        "part_of_speech": "noun",
        "meaning": ["style"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Quisiera algo fresco y ligero.",
            "translation": "I'd like something fresh and light."
          },
          {
            "sentence": "¿Podría hacerme un estilo despeinado?",
            "translation": "Could you give me a tousled look?"
          }
        ],
        "idioms": [
          { "phrase": "tener estilo", "meaning": "to have style" }
        ],
        "synonyms": ["modo"],
        "antonyms": ["desorden"]
      },
      {
        "vocab": "punta",
        "part_of_speech": "noun",
        "meaning": ["end", "tip"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "También quisiera que me corten un poco las puntas.",
            "translation": "I'd also like to get my ends trimmed a bit."
          },
          {
            "sentence": "Las puntas están dañadas.",
            "translation": "The ends are damaged."
          }
        ],
        "idioms": [
          { "phrase": "hasta la punta", "meaning": "to the end" }
        ],
        "synonyms": ["extremo"],
        "antonyms": ["raíz"]
      },
      {
        "vocab": "cortar",
        "part_of_speech": "verb",
        "meaning": ["to cut"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Podría cortarme el pelo un poco más largo arriba?",
            "translation": "Could you cut my hair a bit longer on top?"
          },
          {
            "sentence": "El peluquero cortó el pelo demasiado corto.",
            "translation": "The hairdresser cut the hair too short."
          }
        ],
        "idioms": [
          { "phrase": "cortar relaciones", "meaning": "to cut ties" }
        ],
        "synonyms": ["tronchar"],
        "antonyms": ["crecer"]
      },
      {
        "vocab": "pelo",
        "part_of_speech": "noun",
        "meaning": ["hair"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Quisiera un corte de pelo corto por atrás y un poco más largo arriba.",
            "translation": "I'd like a short cut at the back and a bit longer on top."
          },
          {
            "sentence": "El pelo está muy seco.",
            "translation": "The hair is very dry."
          }
        ],
        "idioms": [
          { "phrase": "tener pelo", "meaning": "to have hair" }
        ],
        "synonyms": ["cabello"],
        "antonyms": ["piel"]
      },
      {
        "vocab": "tiempo",
        "part_of_speech": "noun",
        "meaning": ["time"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Cuánto tiempo tardará?",
            "translation": "How long will it take?"
          },
          {
            "sentence": "El corte de pelo tomará unos 30 minutos.",
            "translation": "The haircut will take about 30 minutes."
          }
        ],
        "idioms": [
          { "phrase": "en poco tiempo", "meaning": "in a short time" }
        ],
        "synonyms": ["duración"],
        "antonyms": ["eternidad"]
      }
    ],
    "user_audio": "https://example.com/audio/haircut.mp3",
    "created_at": "2025-08-10T13:15:00Z"
  },
  {
    "id": "d0e1f2a3-b4c5-6789-defa-0123456789de",
    "session_id": "vapi_call_010_gym_membership",
    "user_id": "clerk_user_132",
    "title": "Asking About Gym Membership",
    "role_scenario": "I need to know prices, classes, and if there's student discount.",
    "feedback": "## 🏋️ Feedback del gimnasio\n\n¡Bienvenido/a al gimnasio! Vamos a repasar tu conversación:\n\n### Error highlighting:\n❌ *\"¿Precio mensual?\"* suena bien, pero en gimnasios:\n✅ **Corrección:** *\"¿Cuánto cuesta la mensualidad?\"* \n\n❌ *\"¿Clases?\"* podría ser más específico.\n✅ **Corrección:** *\"¿Qué clases grupales ofrecen?\"* \n\n### Cultural Insights:\n- En España, los gimnasios suelen tener **horario amplio**.\n- Los **precios varían según el equipamiento**.\n- Es común **probar clases antes de inscribirse**.\n\n### Pronunciation Tips:\n- *mensualidad* → /menswalˈiðað/\n- *clases* → /ˈklaeses/\n\n### Suggestions for Improvement:\n- Usa **¿Me podría...?** para sonar más educado.\n- Pregunta **¿Hay descuento estudiantil?**\n- Di **\"Me interesaría probar una clase gratis\"**\n\n### Conversation Flow:\n**Tú:** Buenos días, ¿cuánto cuesta la mensualidad?\n**Empleado:** La mensualidad básica es de €30 y la premium de €50.\n**Tú:** ¿Qué incluye cada una?\n**Empleado:** La básica incluye acceso a máquinas y pesas. La premium incluye clases grupales.\n**Tú:** ¿Qué clases grupales ofrecen?\n**Empleado:** Tenemos yoga, spinning y zumba.\n**Tú:** Perfecto. ¿Hay descuento estudiantil?\n**Empleado:** Sí, un 20% de descuento con carné de estudiante.\n**Tú:** ¡Interesante! Me gustaría probar una clase gratis.\n**Empleado:** Claro, complete este formulario y le daremos acceso a una clase.\n**Tú:** Muchas gracias.\n\n¡Sigue practicando! Con cada visita al gimnasio, te sentirás más cómodo preguntando sobre membresías.",
    "target_vocabulary": [
      {
        "vocab": "mensualidad",
        "part_of_speech": "noun",
        "meaning": ["monthly fee"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Cuánto cuesta la mensualidad?",
            "translation": "How much is the monthly fee?"
          },
          {
            "sentence": "La mensualidad básica es de €30.",
            "translation": "The basic monthly fee is €30."
          }
        ],
        "idioms": [
          { "phrase": "pagar la mensualidad", "meaning": "to pay the monthly fee" }
        ],
        "synonyms": ["cuota"],
        "antonyms": ["gratis"]
      },
      {
        "vocab": "clases",
        "part_of_speech": "noun",
        "meaning": ["classes"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Qué clases grupales ofrecen?",
            "translation": "What group classes do you offer?"
          },
          {
            "sentence": "Las clases de yoga son muy populares.",
            "translation": "The yoga classes are very popular."
          }
        ],
        "idioms": [
          { "phrase": "asistir a clases", "meaning": "to attend classes" }
        ],
        "synonyms": ["sesiones"],
        "antonyms": ["individual"]
      },
      {
        "vocab": "descuento",
        "part_of_speech": "noun",
        "meaning": ["discount"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Hay descuento estudiantil?",
            "translation": "Is there a student discount?"
          },
          {
            "sentence": "Tenemos un descuento del 20%.",
            "translation": "We offer a 20% discount."
          }
        ],
        "idioms": [
          { "phrase": "aplicar descuento", "meaning": "to apply discount" }
        ],
        "synonyms": ["rebaja"],
        "antonyms": ["aumento"]
      },
      {
        "vocab": "estudiante",
        "part_of_speech": "noun",
        "meaning": ["student"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Hay descuento estudiantil?",
            "translation": "Is there a student discount?"
          },
          {
            "sentence": "Soy estudiante universitario.",
            "translation": "I am a university student."
          }
        ],
        "idioms": [
          { "phrase": "ser estudiante", "meaning": "to be a student" }
        ],
        "synonyms": ["alumno"],
        "antonyms": ["profesor"]
      },
      {
        "vocab": "carné",
        "part_of_speech": "noun",
        "meaning": ["ID card"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "con carné de estudiante.",
            "translation": "with student ID."
          },
          {
            "sentence": "¿Puedo ver su carné de identidad?",
            "translation": "Can I see your ID card?"
          }
        ],
        "idioms": [
          { "phrase": "tener carné", "meaning": "to have an ID card" }
        ],
        "synonyms": ["documento"],
        "antonyms": []
      },
      {
        "vocab": "gratis",
        "part_of_speech": "adjective",
        "meaning": ["free"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Me gustaría probar una clase gratis.",
            "translation": "I'd like to try a free class."
          },
          {
            "sentence": "El acceso a la piscina es gratis.",
            "translation": "Access to the pool is free."
          }
        ],
        "idioms": [
          { "phrase": "de gratis", "meaning": "for free" }
        ],
        "synonyms": ["sin costo"],
        "antonyms": ["pagado"]
      },
      {
        "vocab": "acceso",
        "part_of_speech": "noun",
        "meaning": ["access"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "complete este formulario y le daremos acceso a una clase.",
            "translation": "complete this form and we'll give you access to a class."
          },
          {
            "sentence": "¿Tiene acceso a internet?",
            "translation": "Do you have internet access?"
          }
        ],
        "idioms": [
          { "phrase": "dar acceso", "meaning": "to give access" }
        ],
        "synonyms": ["entrada"],
        "antonyms": ["salida"]
      }
    ],
    "user_audio": "https://example.com/audio/gym.mp3",
    "created_at": "2025-08-10T13:20:00Z"
  },

  {
    "id": "e1f2a3b4-c5d6-7890-efab-1234567890ef",
    "session_id": "vapi_call_011_coffee_date",
    "user_id": "clerk_user_12355",
    "title": "Meeting a Friend for Coffee in Medellín",
    "role_scenario": "I want to suggest a café, ask about their day, and order a tinto.",
    "feedback": "## ☕ Feedback de la cafetería\n\nDijiste ❌ *\"Qué más\"* como saludo—funciona, pero suena más cálido ✅ *¿Cómo va todo?*\n\n- **Cultural note:** En Colombia, *tinto* = **café negro pequeño**. No pides *café solo*.\n\n- **Pronunciation:** *Medellín* → /meðeˈʝin/ — ll suena /ʝ/.\n\n¡Usa *¡Qué pena!* si llegas tarde—muy paisa!",
    "target_vocabulary": [
      {
        "vocab": "tinto",
        "part_of_speech": "noun",
        "meaning": ["black coffee"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Un tinto grande o pequeño?",
            "translation": "A large or small black coffee?"
          }
        ],
        "idioms": [],
        "synonyms": ["café negro"],
        "antonyms": ["café con leche"]
      },
      {
        "vocab": "¿Cómo va todo?",
        "part_of_speech": "phrase",
        "meaning": ["How’s everything going?"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¡Hola! ¿Cómo va todo?",
            "translation": "Hey! How’s everything going?"
          }
        ],
        "idioms": [],
        "synonyms": ["¿Qué tal?"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/coffee_medellin.mp3",
    "created_at": "2025-08-10T13:25:00Z"
  },

  {
    "id": "f2a3b4c5-d6e7-8901-fabc-2345678901fa",
    "session_id": "vapi_call_012_bookstore",
    "user_id": "clerk_user_12356",
    "title": "Asking for a Novel in a Bookstore in Lima",
    "role_scenario": "I’m looking for a García Márquez book in Spanish.",
    "feedback": "## 📚 Feedback en la librería\n\nDijiste ❌ *\"Busco García Márquez\"*. Más completo: ✅ *\"¿Tiene algo de García Márquez en español?\"*\n\n- **Cultural note:** En Perú, usan **la ficha de cliente** para descuentos.\n\n- **Pronunciation:** *García* → /ɡaɾˈsia/.\n\n¡Pregunta por *edición de bolsillo* si viajas ligero!",
    "target_vocabulary": [
      {
        "vocab": "edición",
        "part_of_speech": "noun",
        "meaning": ["edition"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Tiene la edición de bolsillo?",
            "translation": "Do you have the pocket edition?"
          }
        ],
        "idioms": [],
        "synonyms": ["versión"],
        "antonyms": []
      },
      {
        "vocab": "ficha",
        "part_of_speech": "noun",
        "meaning": ["membership card"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Con ficha de cliente hay descuento?",
            "translation": "Is there a discount with the membership card?"
          }
        ],
        "idioms": [],
        "synonyms": ["tarjeta"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/bookstore_lima.mp3",
    "created_at": "2025-08-10T13:30:00Z"
  },

  {
    "id": "a3b4c5d6-e7f8-9012-abcd-3456789012ab",
    "session_id": "vapi_call_013_picnic_park",
    "user_id": "clerk_user_12357",
    "title": "Inviting Friends to a Picnic in Chapultepec",
    "role_scenario": "I want to ask who brings drinks and what time to meet.",
    "feedback": "## 🧺 Feedback del picnic\n\nDijiste ❌ *\"Cada uno trae bebidas\"*. Suena orden. Mejor: ✅ *\"¿Quién se encarga de las bebidas?\"*\n\n- **Cultural tip:** En México, llevar **cerveza artesanal** es un buen gesto.\n\n- **Pronunciation:** *Chapultepec* → /tʃapulˈtepek/.\n\n¡Sugiere *a eso de las 11* para evitar el mediodía caluroso!",
    "target_vocabulary": [
      {
        "vocab": "encargarse",
        "part_of_speech": "verb phrase",
        "meaning": ["to be in charge of"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Quién se encarga de las bebidas?",
            "translation": "Who’s in charge of the drinks?"
          }
        ],
        "idioms": [],
        "synonyms": ["encargar"],
        "antonyms": []
      },
      {
        "vocab": "a eso de",
        "part_of_speech": "phrase",
        "meaning": ["around (time)"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Nos vemos a eso de las once.",
            "translation": "Let’s meet around eleven."
          }
        ],
        "idioms": [],
        "synonyms": ["alrededor de"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/picnic_mexico.mp3",
    "created_at": "2025-08-10T13:35:00Z"
  },

  {
    "id": "b4c5d6e7-f8a9-0123-bcde-4567890123bc",
    "session_id": "vapi_call_014_climbing_gym",
    "user_id": "clerk_user_12358",
    "title": "Signing a Waiver at a Rock-Climbing Gym in Granada",
    "role_scenario": "I need to fill out forms and ask about shoe rental.",
    "feedback": "## 🧗 Feedback del rocódromo\n\nDijiste ❌ *\"¿Alquila zapatos?\"*. Más formal: ✅ *\"¿Se pueden alquilar zapatillas de escalada?\"*\n\n- **Cultural note:** Siempre firma **la hoja de responsabilidad**.\n\n- **Pronunciation:** *escalada* → /eskaˈlaða/.\n\n¡Pregunta por *ropa cómoda* si no trajiste la adecuada!",
    "target_vocabulary": [
      {
        "vocab": "alquilar",
        "part_of_speech": "verb",
        "meaning": ["to rent"],
        "tone": "Neutral",
        "regional_variations": [
          {
            "country": "Argentina",
            "word": "alquilar",
            "part_of_speech": "verb",
            "meaning": ["to rent"],
            "example": {
              "sentence": "¿Alquilan casco también?",
              "translation": "Do you also rent helmets?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "¿Se pueden alquilar zapatillas de escalada?",
            "translation": "Can climbing shoes be rented?"
          }
        ],
        "idioms": [],
        "synonyms": ["rentar"],
        "antonyms": ["devolver"]
      },
      {
        "vocab": "responsabilidad",
        "part_of_speech": "noun",
        "meaning": ["liability"],
        "tone": "Formal",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Debe firmar la hoja de responsabilidad.",
            "translation": "You must sign the liability form."
          }
        ],
        "idioms": [],
        "synonyms": ["seguro"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/climbing_granada.mp3",
    "created_at": "2025-08-10T13:40:00Z"
  },

  {
    "id": "c5d6e7f8-a9ba-1234-cdef-5678901234cd",
    "session_id": "vapi_call_015_cooking_class",
    "user_id": "clerk_user_12359",
    "title": "Signing Up for a Paella-Cooking Class in Valencia",
    "role_scenario": "I want to book a class and ask about dietary restrictions.",
    "feedback": "## 🥘 Feedback de la clase\n\nDijiste ❌ *\"Soy vegetariana\"* sin contexto. Mejor: ✅ *\"¿Hay opción vegetariana en la paella?\"*\n\n- **Cultural note:** La paella valenciana original lleva **conejo y judía verde**, pero hay versiones veggie.\n\n- **Pronunciation:** *judía verde* → /xuˈðia ˈβeɾðe/.\n\n¡Pregunta por *delantal* si te manchas fácil!",
    "target_vocabulary": [
      {
        "vocab": "opción vegetariana",
        "part_of_speech": "noun phrase",
        "meaning": ["vegetarian option"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Hay opción vegetariana para la paella?",
            "translation": "Is there a vegetarian option for the paella?"
          }
        ],
        "idioms": [],
        "synonyms": ["plato sin carne"],
        "antonyms": ["opción tradicional"]
      },
      {
        "vocab": "delantal",
        "part_of_speech": "noun",
        "meaning": ["apron"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Me prestan un delantal?",
            "translation": "Can I borrow an apron?"
          }
        ],
        "idioms": [],
        "synonyms": ["mandil"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/paella_class.mp3",
    "created_at": "2025-08-10T13:45:00Z"
  },

  {
    "id": "d6e7f8a9-baab-2345-defa-6789012345de",
    "session_id": "vapi_call_016_cinema_tickets",
    "user_id": "clerk_user_12360",
    "title": "Buying Movie Tickets in Original Version in Madrid",
    "role_scenario": "I want two tickets for the 7 pm show in VOSE.",
    "feedback": "## 🎬 Feedback de la taquilla\n\nDijiste ❌ *\"Dos para la peli\"*. Más claro: ✅ *\"Dos entradas para la sesión de las 19 h en versión original, por favor.\"*\n\n- **Cultural note:** **VOSE** = versión original subtítulos español.\n\n- **Pronunciation:** *entradas* → /enˈtɾaðas/.\n\n¡Pide *palomitas medianas* para compartir!",
    "target_vocabulary": [
      {
        "vocab": "entrada",
        "part_of_speech": "noun",
        "meaning": ["ticket"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Dos entradas para la sesión de las 19 h.",
            "translation": "Two tickets for the 7 pm showing."
          }
        ],
        "idioms": [],
        "synonyms": ["boleto"],
        "antonyms": []
      },
      {
        "vocab": "palomitas",
        "part_of_speech": "noun",
        "meaning": ["popcorn"],
        "tone": "Casual",
        "regional_variations": [
          {
            "country": "Argentina",
            "word": "pochoclos",
            "part_of_speech": "noun",
            "meaning": ["popcorn"],
            "example": {
              "sentence": "¿Querés pochoclos con caramelo?",
              "translation": "Do you want caramel popcorn?"
            }
          }
        ],
        "examples": [
          {
            "sentence": "Unas palomitas medianas, por favor.",
            "translation": "A medium popcorn, please."
          }
        ],
        "idioms": [],
        "synonyms": ["cabritas"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/cinema_madrid.mp3",
    "created_at": "2025-08-10T13:50:00Z"
  },

  {
    "id": "e7f8a9ba-bbac-3456-efab-7890123456ef",
    "session_id": "vapi_call_017_bakery_order",
    "user_id": "clerk_user_12361",
    "title": "Placing a Birthday Cake Order in Seville",
    "role_scenario": "I want a chocolate cake for 10 people and need it Saturday.",
    "feedback": "## 🎂 Feedback de la pastelería\n\nDijiste ❌ *\"Pastel chocolate 10 personas sábado\"*. Más natural: ✅ *\"¿Podría encargar un pastel de chocolate para diez personas para el sábado?\"*\n\n- **Cultural note:** Pide **felicitación escrita**—te la cobran aparte.\n\n- **Pronunciation:** *pastel* → /pasˈtel/.\n\n¡Recuerda confirmar *hora de recogida*!",
    "target_vocabulary": [
      {
        "vocab": "encargar",
        "part_of_speech": "verb",
        "meaning": ["to order (in advance)"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Puedo encargar un pastel para el sábado?",
            "translation": "Can I order a cake for Saturday?"
          }
        ],
        "idioms": [],
        "synonyms": ["pedir"],
        "antonyms": ["cancelar"]
      },
      {
        "vocab": "recogida",
        "part_of_speech": "noun",
        "meaning": ["pickup"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿A qué hora es la recogida?",
            "translation": "What time is pickup?"
          }
        ],
        "idioms": [],
        "synonyms": ["entrega"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/cake_seville.mp3",
    "created_at": "2025-08-10T13:55:00Z"
  },

  {
    "id": "f8a9babb-abcd-4567-fabc-8901234567fa",
    "session_id": "vapi_call_018_consulate",
    "user_id": "clerk_user_12362",
    "title": "Asking for a Visa Extension at the Consulate",
    "role_scenario": "I need to extend my tourist visa for another 30 days.",
    "feedback": "## 🛂 Feedback consular\n\nDijiste ❌ *\"Quiero más 30 días\"*. Más formal: ✅ *\"Solicito una prórroga de 30 días de mi visado de turista.\"*\n\n- **Cultural note:** Lleva **copia del pasaporte y justificante de alojamiento**.\n\n- **Pronunciation:** *prórroga* → /ˈpɔrroɣa/.\n\n¡Reserva **cita previa** online!",
    "target_vocabulary": [
      {
        "vocab": "prórroga",
        "part_of_speech": "noun",
        "meaning": ["extension"],
        "tone": "Formal",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Solicito una prórroga de 30 días.",
            "translation": "I request a 30-day extension."
          }
        ],
        "idioms": [],
        "synonyms": ["extensión"],
        "antonyms": []
      },
      {
        "vocab": "justificante",
        "part_of_speech": "noun",
        "meaning": ["proof", "certificate"],
        "tone": "Formal",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Adjunto justificante de alojamiento.",
            "translation": "Attached proof of accommodation."
          }
        ],
        "idioms": [],
        "synonyms": ["comprobante"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/consulate_visa.mp3",
    "created_at": "2025-08-10T14:00:00Z"
  },

  {
    "id": "a9babbcd-bcde-5678-abcd-9012345678ab",
    "session_id": "vapi_call_019_car_rental",
    "user_id": "clerk_user_12363",
    "title": "Renting a Car at Alicante Airport",
    "role_scenario": "I need an automatic compact car for 5 days with full insurance.",
    "feedback": "## 🚗 Feedback en el mostrador\n\nDijiste ❌ *\"Auto pequeño cinco días\"*. Completa: ✅ *\"Necesito un coche automático compacto por cinco días con seguro a todo riesgo.\"*\n\n- **Cultural note:** En España, **el seguro a terceros** es obligatorio; todo riesgo es opcional.\n\n- **Pronunciation:** *riesgo* → /ˈrjesɣo/.\n\n¡Revisa el **depósito de gasolina**!",
    "target_vocabulary": [
      {
        "vocab": "seguro a todo riesgo",
        "part_of_speech": "noun phrase",
        "meaning": ["full coverage insurance"],
        "tone": "Formal",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Cuánto cuesta el seguro a todo riesgo?",
            "translation": "How much is full coverage insurance?"
          }
        ],
        "idioms": [],
        "synonyms": ["seguro completo"],
        "antonyms": ["seguro básico"]
      },
      {
        "vocab": "depósito",
        "part_of_speech": "noun",
        "meaning": ["tank", "deposit"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Con depósito lleno o vacío?",
            "translation": "With full or empty tank?"
          }
        ],
        "idioms": [],
        "synonyms": ["tanque"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/car_rental_alicante.mp3",
    "created_at": "2025-08-10T14:05:00Z"
  },

  {
    "id": "babbcdcd-cdef-6789-bcde-0123456789bc",
    "session_id": "vapi_call_020_dentist",
    "user_id": "clerk_user_12364",
    "title": "Explaining Tooth Pain to a Dentist in Montevideo",
    "role_scenario": "I have a sharp pain when I drink cold water.",
    "feedback": '## 🦷 Feedback del dentista\n\nDijiste ❌ *"Dolor beber frío"*. Más claro: ✅ *"Siento un dolor punzante al tomar agua fría."*\n\n- **Cultural note:** En Uruguay, muchos dentistas **aceptan tarjeta de crédito**.\n\n- **Pronunciation:** *punzante* → /punˈθante/.\n\n¡Pide cita para limpieza también!',
    "target_vocabulary": [
      {
        "vocab": "dolor punzante",
        "part_of_speech": "noun phrase",
        "meaning": ["sharp pain"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo un dolor punzante en la muela.",
            "translation": "I have a sharp pain in my molar."
          }
        ],
        "idioms": [],
        "synonyms": ["dolor agudo"],
        "antonyms": ["dolor leve"]
      },
      {
        "vocab": "limpieza",
        "part_of_speech": "noun",
        "meaning": ["cleaning"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Puedo hacer una limpieza también?",
            "translation": "Can I get a cleaning as well?"
          }
        ],
        "idioms": [],
        "synonyms": ["higiene bucal"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/dentist_montevideo.mp3",
    "created_at": "2025-08-10T14:10:00Z"
  },

  {
    "id": "cdcdedef-defa-7890-cdef-1234567890cd",
    "session_id": "vapi_call_021_hiking_guide",
    "user_id": "clerk_user_12365",
    "title": "Booking a Guided Hike in the Atacama Desert",
    "role_scenario": "I need a sunrise tour and want to know what to bring.",
    "feedback": '## 🏜️ Feedback de la excursión\n\nDijiste ❌ *"Tour amanecer"*. Completa: ✅ *"Quiero reservar el tour al amanecer, ¿qué debo llevar?"*\n\n- **Cultural note:** Noches son **frías** aunque días calurosos; necesitas **abrigo**.\n\n- **Pronunciation:** *amanecer* → /amaneˈθeɾ/.\n\n¡Pregunta por **snack incluido**!',
    "target_vocabulary": [
      {
        "vocab": "amanecer",
        "part_of_speech": "noun",
        "meaning": ["sunrise"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "El tour al amanecer empieza a las 4:30.",
            "translation": "The sunrise tour starts at 4:30."
          }
        ],
        "idioms": [],
        "synonyms": ["salida del sol"],
        "antonyms": ["atardecer"]
      },
      {
        "vocab": "abrigo",
        "part_of_speech": "noun",
        "meaning": ["coat", "warm clothing"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Lleve abrigo, por la mañana hace frío.",
            "translation": "Bring a coat, it’s cold in the morning."
          }
        ],
        "idioms": [],
        "synonyms": ["chaqueta"],
        "antonyms": ["ropa ligera"]
      }
    ],
    "user_audio": "https://example.com/audio/atacama_hike.mp3",
    "created_at": "2025-08-10T14:15:00Z"
  },

  {
    "id": "dedefefa-efab-8901-defa-2345678901de",
    "session_id": "vapi_call_022_veterinarian",
    "user_id": "clerk_user_12366",
    "title": "Taking My Dog to the Vet in Guadalajara",
    "role_scenario": "My dog has been scratching a lot and I need advice.",
    "feedback": '## 🐕 Feedback veterinario\n\nDijiste ❌ *"Mi perro rasca mucho"*. Más clínico: ✅ *"Mi perro se rasca excesivamente, ¿podría revisarlo?"*\n\n- **Cultural note:** Lleva **carnet de vacunas** y **muestra de pulgas** si las ves.\n\n- **Pronunciation:** *excesivamente* → /eksesiβaˈmente/.\n\n¡Pregunta por **pipeta antipulgas**!',
    "target_vocabulary": [
      {
        "vocab": "rascar",
        "part_of_speech": "verb",
        "meaning": ["to scratch"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Mi perro se rasca todo el día.",
            "translation": "My dog scratches all day long."
          }
        ],
        "idioms": [],
        "synonyms": ["arañar"],
        "antonyms": []
      },
      {
        "vocab": "pipeta",
        "part_of_speech": "noun",
        "meaning": ["spot-on flea treatment"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Cuánto cuesta la pipeta antipulgas?",
            "translation": "How much is the flea spot-on?"
          }
        ],
        "idioms": [],
        "synonyms": ["tratamiento"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/vet_guadalajara.mp3",
    "created_at": "2025-08-10T14:20:00Z"
  },

  {
    "id": "efefabab-fabc-9012-efab-3456789012ef",
    "session_id": "vapi_call_023_tattoo_studio",
    "user_id": "clerk_user_12367",
    "title": "Consulting a Tattoo Artist in Mexico City",
    "role_scenario": "I want a small hummingbird design on my wrist.",
    "feedback": '## 🪶 Feedback del estudio\n\nDijiste ❌ *"Quiero colibrí"*. Completa: ✅ *"Me gustaría un colibrí pequeño en la muñeca, ¿cuánto costaría?"*\n\n- **Cultural note:** Pregunta por **higiene y aguja desechable**.\n\n- **Pronunciation:** *colibrí* → /koliˈβɾi/.\n\n¡Pide ver el **portafolio**!',
    "target_vocabulary": [
      {
        "vocab": "colibrí",
        "part_of_speech": "noun",
        "meaning": ["hummingbird"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Un colibrí de colores vivos.",
            "translation": "A brightly colored hummingbird."
          }
        ],
        "idioms": [],
        "synonyms": [],
        "antonyms": []
      },
      {
        "vocab": "portafolio",
        "part_of_speech": "noun",
        "meaning": ["portfolio"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Puedo ver su portafolio?",
            "translation": "Can I see your portfolio?"
          }
        ],
        "idioms": [],
        "synonyms": ["muestras"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/tattoo_cdmx.mp3",
    "created_at": "2025-08-10T14:25:00Z"
  },

  {
    "id": "fabcabcd-abcd-0123-fabc-4567890123fa",
    "session_id": "vapi_call_024_tech_store",
    "user_id": "clerk_user_12368",
    "title": "Buying a Laptop Charger in Santiago",
    "role_scenario": "Mine broke and I need a USB-C 65 W charger.",
    "feedback": '## 💻 Feedback de la tienda\n\nDijiste ❌ *"Cargador USB-C"*. Específico: ✅ *"¿Tienen cargador USB-C de 65 vatios?"*\n\n- **Cultural note:** Pide **factura** para garantía.\n\n- **Pronunciation:** *vatios* → /ˈbatjos/.\n\n¡Confirma **voltaje 220 V**!',
    "target_vocabulary": [
      {
        "vocab": "cargador",
        "part_of_speech": "noun",
        "meaning": ["charger"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Necesito un cargador USB-C de 65 vatios.",
            "translation": "I need a 65-watt USB-C charger."
          }
        ],
        "idioms": [],
        "synonyms": ["adaptador"],
        "antonyms": []
      },
      {
        "vocab": "factura",
        "part_of_speech": "noun",
        "meaning": ["invoice", "receipt"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Puede darme factura para la garantía?",
            "translation": "Can I get an invoice for the warranty?"
          }
        ],
        "idioms": [],
        "synonyms": ["ticket"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/charger_santiago.mp3",
    "created_at": "2025-08-10T14:30:00Z"
  },

  {
    "id": "abcdcdef-bcde-1234-abcd-5678901234ab",
    "session_id": "vapi_call_025_eyeglasses",
    "user_id": "clerk_user_12369",
    "title": "Ordering Prescription Glasses in Bogotá",
    "role_scenario": "I lost my glasses and have my prescription.",
    "feedback": '## 👓 Feedback óptico\n\nDijiste ❌ *"Armazón barato"**. Más educado: ✅ *"¿Qué opciones de armazón económico tienen?"*\n\n- **Cultural note:** Lleva **graduación actualizada**.\n\n- **Pronunciation:** *armazón* → /armaˈθon/.\n\n¡Pregunta por **lentes antirreflejo**!',
    "target_vocabulary": [
      {
        "vocab": "armazón",
        "part_of_speech": "noun",
        "meaning": ["frame"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Busco un armazón ligero.",
            "translation": "I’m looking for a lightweight frame."
          }
        ],
        "idioms": [],
        "synonyms": ["montura"],
        "antonyms": []
      },
      {
        "vocab": "antirreflejo",
        "part_of_speech": "adjective",
        "meaning": ["anti-glare"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Las lentes incluyen antirreflejo?",
            "translation": "Do the lenses include anti-glare?"
          }
        ],
        "idioms": [],
        "synonyms": [],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/glasses_bogota.mp3",
    "created_at": "2025-08-10T14:35:00Z"
  },

  {
    "id": "cdefcdef-cdef-2345-bcde-6789012345cd",
    "session_id": "vapi_call_026_lost_phone",
    "user_id": "clerk_user_12370",
    "title": "Reporting a Lost Phone at a Mall in Lima",
    "role_scenario": "It fell somewhere in the food court.",
    "feedback": '## 📱 Feedback de seguridad\n\nDijiste ❌ *"Perdí celular"**. Completa: ✅ *"Perdí mi celular en la zona de comidas, ¿lo han encontrado?"*\n\n- **Cultural note:** Lleva **IMEI y contraseña**.\n\n- **Pronunciation:** *contraseña* → /kontraˈseɲa/.\n\n¡Pide **formulario de pérdidas**!',
    "target_vocabulary": [
      {
        "vocab": "zona de comidas",
        "part_of_speech": "noun phrase",
        "meaning": ["food court"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Lo dejé en la zona de comidas.",
            "translation": "I left it in the food court."
          }
        ],
        "idioms": [],
        "synonyms": ["food court"],
        "antonyms": []
      },
      {
        "vocab": "IMEI",
        "part_of_speech": "noun",
        "meaning": ["IMEI number"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Tengo el IMEI anotado.",
            "translation": "I have the IMEI written down."
          }
        ],
        "idioms": [],
        "synonyms": [],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/lost_phone_lima.mp3",
    "created_at": "2025-08-10T14:40:00Z"
  },

  {
    "id": "defdefab-defa-3456-cdef-7890123456de",
    "session_id": "vapi_call_027_flower_shop",
    "user_id": "clerk_user_12371",
    "title": "Buying Anniversary Flowers in Puebla",
    "role_scenario": "I need red roses and a note written in Spanish.",
    "feedback": '## 🌹 Feedback de la florería\n\nDijiste ❌ *"Rosas rojas con tarjeta"**. Amable: ✅ *"Una docena de rosas rojas con una tarjeta de aniversario, por favor."*\n\n- **Cultural note:** Pide **envoltura elegante**.\n\n- **Pronunciation:** *aniversario* → /anibeɾˈsaɾjo/.\n\n¡Elige **mensaje romántico** preescrito!',
    "target_vocabulary": [
      {
        "vocab": "docena",
        "part_of_speech": "noun",
        "meaning": ["dozen"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Una docena de rosas, por favor.",
            "translation": "A dozen roses, please."
          }
        ],
        "idioms": [],
        "synonyms": ["12 unidades"],
        "antonyms": []
      },
      {
        "vocab": "tarjeta",
        "part_of_speech": "noun",
        "meaning": ["card"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Puede escribir en la tarjeta?",
            "translation": "Can you write on the card?"
          }
        ],
        "idioms": [],
        "synonyms": ["sobre"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/flowers_puebla.mp3",
    "created_at": "2025-08-10T14:45:00Z"
  },

  {
    "id": "efefabcd-efab-4567-defa-8901234567ef",
    "session_id": "vapi_call_028_ski_rental",
    "user_id": "clerk_user_12372",
    "title": "Renting Ski Gear in the Pyrenees",
    "role_scenario": "I need boots and skis for 3 days, helmet included.",
    "feedback": '## ⛷️ Feedback del alquiler\n\nDijiste ❌ *"Esquís y botas tres días"**. Completo: ✅ *"Quiero alquilar esquís y botas por tres días, ¿incluye casco?"*\n\n- **Cultural tip:** Pregunta por **gafas si nieva**.\n\n- **Pronunciation:** *casco* → /ˈkasko/.\n\n¡Ajusta **talla exacta**!',
    "target_vocabulary": [
      {
        "vocab": "casco",
        "part_of_speech": "noun",
        "meaning": ["helmet"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿El alquiler incluye casco?",
            "translation": "Does the rental include a helmet?"
          }
        ],
        "idioms": [],
        "synonyms": ["casco de seguridad"],
        "antonyms": []
      },
      {
        "vocab": "talla",
        "part_of_speech": "noun",
        "meaning": ["size"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Qué talla usa en botas?",
            "translation": "What size do you wear for boots?"
          }
        ],
        "idioms": [],
        "synonyms": ["tamaño"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/ski_pyrenees.mp3",
    "created_at": "2025-08-10T14:50:00Z"
  },

  {
    "id": "fabcdefa-fabc-5678-efab-0123456789fa",
    "session_id": "vapi_call_029_language_exchange",
    "user_id": "clerk_user_12373",
    "title": "Joining a Language-Exchange Meetup in Barcelona",
    "role_scenario": "I want to practice Catalan and meet locals.",
    "feedback": '## 🗣️ Feedback del intercambio\n\nDijiste ❌ *"Quiero practicar catalán"**. Amable: ✅ *"Estoy aprendiendo catalán, ¿alguien quiere practicar conmigo?"*\n\n- **Cultural note:** Muchos grupos usan **pegatinas** para indicar idiomas.\n\n- **Pronunciation:** *catalán* → /kataˈlan/.\n\n¡Lleva **pegatina verde** si hablas español!',
    "target_vocabulary": [
      {
        "vocab": "intercambio",
        "part_of_speech": "noun",
        "meaning": ["exchange"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Dónde es el intercambio de idiomas?",
            "translation": "Where is the language exchange?"
          }
        ],
        "idioms": [],
        "synonyms": ["meetup", "quedada"],
        "antonyms": []
      },
      {
        "vocab": "pegatina",
        "part_of_speech": "noun",
        "meaning": ["sticker"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "Ponte la pegatina verde si hablas español.",
            "translation": "Wear the green sticker if you speak Spanish."
          }
        ],
        "idioms": [],
        "synonyms": ["etiqueta"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/lang_exchange_bcn.mp3",
    "created_at": "2025-08-10T14:55:00Z"
  },

  {
    "id": "abcdefab-abcd-6789-fabc-1234567890ab",
    "session_id": "vapi_call_030_bike_repair",
    "user_id": "clerk_user_12374",
    "title": "Fixing a Flat Tire at a Bike Shop in Valencia",
    "role_scenario": "My rear tire is flat and I need it today.",
    "feedback": '## 🚲 Feedback del taller\n\nDijiste ❌ *"Rueda trasera pinchada"**. Explica: ✅ *"Tengo la rueda trasera pinchada, ¿la pueden arreglar hoy?"*\n\n- **Cultural note:** Muchos cierran **mediodía**.\n\n- **Pronunciation:** *pinchada* → /pinˈtʃaða/.\n\n¡Pregunta por **cámara nueva** si es necesaria!',
    "target_vocabulary": [
      {
        "vocab": "pinchada",
        "part_of_speech": "noun",
        "meaning": ["flat tire"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Cuánto cuesta arreglar una pinchada?",
            "translation": "How much to fix a flat?"
          }
        ],
        "idioms": [],
        "synonyms": ["reventón"],
        "antonyms": []
      },
      {
        "vocab": "cámara",
        "part_of_speech": "noun",
        "meaning": ["inner tube"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          {
            "sentence": "¿Necesito cámara nueva?",
            "translation": "Do I need a new inner tube?"
          }
        ],
        "idioms": [],
        "synonyms": ["tubo"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/bike_valencia.mp3",
    "created_at": "2025-08-10T15:00:00Z"
  },

  {
    "id": "bcde1234-cdef-5678-9012-3456789012bc",
    "session_id": "vapi_call_031_coffee_order",
    "user_id": "clerk_user_12375",
    "title": "Ordering a Specialty Pour-Over in a Third-Wave Café in CDMX",
    "role_scenario": "I want a single-origin pour-over and ask about tasting notes.",
    "feedback": "## ☕ Feedback barista\nDijiste ❌ *\"Quiero café de origen\"*. Más natural: ✅ *\"¿Qué origen tienen para pour-over hoy?\"*\n- **Cultural note:** Pregunta por **notas de cata** y **tiempos de filtrado**.\n- **Pronunciation:** *filtrado* → /filˈtɾaðo/.\n¡Pide **pan de plátano** si hay!",
    "target_vocabulary": [
      {
        "vocab": "notas de cata",
        "part_of_speech": "noun phrase",
        "meaning": ["tasting notes"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Qué notas de cata tiene este grano?", "translation": "What tasting notes does this bean have?" }
        ],
        "idioms": [],
        "synonyms": ["perfil sensorial"],
        "antonyms": []
      },
      {
        "vocab": "filtrado",
        "part_of_speech": "noun",
        "meaning": ["pour-over", "filtered brew"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "El filtrado tarda unos cinco minutos.", "translation": "The pour-over takes about five minutes." }
        ],
        "idioms": [],
        "synonyms": ["café filtrado"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/pour_over_cdmx.mp3",
    "created_at": "2025-08-10T15:05:00Z"
  },

  {
    "id": "cdef2345-defa-6789-0123-4567890123cd",
    "session_id": "vapi_call_032_taco_vegan",
    "user_id": "clerk_user_12376",
    "title": "Ordering Vegan Tacos at a Street Stand in Tijuana",
    "role_scenario": "I want two mushroom tacos without cheese or cream.",
    "feedback": '## 🌮 Feedback taquero\nDijiste ❌ *"Sin queso ni crema"*. Completo: ✅ *"Dos tacos de champiñón veganos, sin queso ni crema, por favor."*\n- **Cultural tip:** Pregunta por **salsa verde sin lácteos**.\n- **Pronunciation:** *champiñón* → /tʃampiˈɲon/.\n¡Prueba **nopal asado** como extra!',
    "target_vocabulary": [
      {
        "vocab": "vegano",
        "part_of_speech": "adjective",
        "meaning": ["vegan"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Tienen opción vegana?", "translation": "Do you have a vegan option?" }
        ],
        "idioms": [],
        "synonyms": ["sin ingredientes animales"],
        "antonyms": ["con lácteos"]
      },
      {
        "vocab": "nopal",
        "part_of_speech": "noun",
        "meaning": ["cactus paddle"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Agrega nopal a los tacos.", "translation": "Add cactus to the tacos." }
        ],
        "idioms": [],
        "synonyms": [],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/vegan_tacos_tijuana.mp3",
    "created_at": "2025-08-10T15:10:00Z"
  },

  {
    "id": "defa3456-efab-7890-1234-5678901234de",
    "session_id": "vapi_call_033_hostel_laundry",
    "user_id": "clerk_user_12377",
    "title": "Using the Hostel Laundry Room in Medellín",
    "role_scenario": "I need coins and detergent, and ask about dryer time.",
    "feedback": '## 🧼 Feedback lavandería\nDijiste ❌ *"¿Monedas detergente?"*. Claro: ✅ *"¿Dónde compro fichas y detergente?"*\n- **Cultural tip:** Cambia billetes en **recepción**.\n- **Pronunciation:** *fichas* → /ˈfitʃas/.\n¡Pide **suavizante** si no incluye!',
    "target_vocabulary": [
      {
        "vocab": "ficha",
        "part_of_speech": "noun",
        "meaning": ["token", "coin"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "Necesito dos fichas para la lavadora.", "translation": "I need two tokens for the washer." }
        ],
        "idioms": [],
        "synonyms": ["moneda"],
        "antonyms": []
      },
      {
        "vocab": "secadora",
        "part_of_speech": "noun",
        "meaning": ["dryer"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Cuánto dura el ciclo de la secadora?", "translation": "How long is the dryer cycle?" }
        ],
        "idioms": [],
        "synonyms": ["tendedero"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/hostel_laundry_med.mp3",
    "created_at": "2025-08-10T15:15:00Z"
  },

  {
    "id": "efab4567-fabc-8901-2345-6789012345ef",
    "session_id": "vapi_call_034_bicycle_tour",
    "user_id": "clerk_user_12378",
    "title": "Booking a Night Bike Tour in Bogotá",
    "role_scenario": "I want to join the 7 pm tour and ask about safety.",
    "feedback": '## 🚲 Feedback cicloturismo\nDijiste ❌ *"Tour noche bicicleta"**. Completo: ✅ *"Quiero unirme al tour nocturno en bici de las 7 pm, ¿es seguro?"*\n- **Cultural note:** Llevan **chaleco reflectante y casco** incluidos.\n- **Pronunciation:** *nocturno* → /nokˈtuɾno/.\n¡Pregunta por **ruta iluminada**!',
    "target_vocabulary": [
      {
        "vocab": "chaleco reflectante",
        "part_of_speech": "noun phrase",
        "meaning": ["reflective vest"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Nos dan chaleco reflectante y casco.", "translation": "They give us a reflective vest and helmet." }
        ],
        "idioms": [],
        "synonyms": ["chaleco fluorescente"],
        "antonyms": []
      },
      {
        "vocab": "ruta iluminada",
        "part_of_speech": "noun phrase",
        "meaning": ["lit route"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "La ruta está completamente iluminada.", "translation": "The route is fully lit." }
        ],
        "idioms": [],
        "synonyms": ["trayecto seguro"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/bike_tour_bogota.mp3",
    "created_at": "2025-08-10T15:20:00Z"
  },

  {
    "id": "fabc5678-abcd-9012-3456-7890123456fa",
    "session_id": "vapi_call_035_metro_card",
    "user_id": "clerk_user_12379",
    "title": "Buying a Metro Card in Santiago",
    "role_scenario": "I need a Bip! card with 5,000 CLP credit.",
    "feedback": '## 🚇 Feedback del metro\nDijiste ❌ *"Tarjeta 5 mil"**. Completo: ✅ *"Quiero una tarjeta Bip! con 5 mil pesos de carga, por favor."*\n- **Cultural tip:** Se llama **Bip!** y sirve también para buses.\n- **Pronunciation:** *carga* → /ˈkaɾɣa/.\n¡Recarga en **máquinas rojas**!',
    "target_vocabulary": [
      {
        "vocab": "carga",
        "part_of_speech": "noun",
        "meaning": ["top-up", "credit"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Puedo hacer una carga de 5 mil pesos?", "translation": "Can I top up 5,000 pesos?" }
        ],
        "idioms": [],
        "synonyms": ["recarga"],
        "antonyms": []
      },
      {
        "vocab": "máquina",
        "part_of_speech": "noun",
        "meaning": ["machine"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Utiliza la máquina automática para recargar.", "translation": "Use the automatic machine to top up." }
        ],
        "idioms": [],
        "synonyms": ["expendedor"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/metro_santiago.mp3",
    "created_at": "2025-08-10T15:25:00Z"
  },

  {
    "id": "abcd6789-bcde-0123-4567-8901234567ab",
    "session_id": "vapi_call_036_pet_shop",
    "user_id": "clerk_user_12380",
    "title": "Buying Cat Food in Buenos Aires",
    "role_scenario": "I need grain-free dry food for an adult cat.",
    "feedback": '## 🐈 Feedback pet-shop\nDijiste ❌ *"Comida gato sin granos"**. Completo: ✅ *"¿Tienen alimento seco para gato adulto sin granos?"*\n- **Cultural note:** Pregunta por **descuento en bolsas grandes**.\n- **Pronunciation:** *alimento* → /aliˈmento/.\n¡Consulta **cupón digital**!',
    "target_vocabulary": [
      {
        "vocab": "alimento seco",
        "part_of_speech": "noun phrase",
        "meaning": ["dry food"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Prefiero alimento seco sin granos.", "translation": "I prefer grain-free dry food." }
        ],
        "idioms": [],
        "synonyms": ["croquetas"],
        "antonyms": ["alimento húmedo"]
      },
      {
        "vocab": "cupón",
        "part_of_speech": "noun",
        "meaning": ["coupon"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Tienen cupón para clientes nuevos?", "translation": "Do you have a coupon for new customers?" }
        ],
        "idioms": [],
        "synonyms": ["descuento"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/cat_food_bsas.mp3",
    "created_at": "2025-08-10T15:30:00Z"
  },

  {
    "id": "bcde7890-cdef-1234-5678-9012345678bc",
    "session_id": "vapi_call_037_ice_cream",
    "user_id": "clerk_user_12381",
    "title": "Choosing Gelato Flavors in Seville",
    "role_scenario": "I want two scoops, one of pistachio and one dairy-free mango.",
    "feedback": '## 🍨 Feedback heladería\nDijiste ❌ *"Dos bolas pistacho mango"**. Amable: ✅ *"¿Me da dos bolas, una de pistacho y otra de mango sin lácteos?"*\n- **Cultural note:** Pregunta por **cucurucho o tarrina**.\n- **Pronunciation:** *cucurucho* → /kukuˈɾutʃo/.\n¡Prueba **turrón** si está!',
    "target_vocabulary": [
      {
        "vocab": "bola",
        "part_of_speech": "noun",
        "meaning": ["scoop"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "Una bola de vainilla y otra de chocolate.", "translation": "One scoop of vanilla and one of chocolate." }
        ],
        "idioms": [],
        "synonyms": ["porción"],
        "antonyms": []
      },
      {
        "vocab": "cucurucho",
        "part_of_speech": "noun",
        "meaning": ["cone"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿En cucurucho o tarrina?", "translation": "In a cone or cup?" }
        ],
        "idioms": [],
        "synonyms": ["cono"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/gelato_seville.mp3",
    "created_at": "2025-08-10T15:35:00Z"
  },

  {
    "id": "cdef8901-defa-2345-6789-0123456789cd",
    "session_id": "vapi_call_038_post_office",
    "user_id": "clerk_user_12382",
    "title": "Sending a Postcard to the US from Costa Rica",
    "role_scenario": "I need stamps and want to confirm delivery time.",
    "feedback": '## 📮 Feedback del correo\nDijiste ❌ *"Sellos para postal a EE.UU."**. Completo: ✅ *"¿Cuántos sellos necesito para enviar esta postal a Estados Unidos?"*\n- **Cultural note:** Tarda **una semana**.\n- **Pronunciation:** *sello* → /ˈseʝo/.\n¡Pide **certificado** si es urgente!',
    "target_vocabulary": [
      {
        "vocab": "sello",
        "part_of_speech": "noun",
        "meaning": ["stamp"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Tres sellos para Europa son 1.50 €.", "translation": "Three stamps to Europe are €1.50." }
        ],
        "idioms": [],
        "synonyms": ["estampilla"],
        "antonyms": []
      },
      {
        "vocab": "certificado",
        "part_of_speech": "noun",
        "meaning": ["registered mail"],
        "tone": "Formal",
        "regional_variations": [],
        "examples": [
          { "sentence": "Quiero envío certificado, por favor.", "translation": "I want registered mail, please." }
        ],
        "idioms": [],
        "synonyms": ["con acuse de recibo"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/postcard_cr.mp3",
    "created_at": "2025-08-10T15:40:00Z"
  },

  {
    "id": "defa9012-efab-3456-7890-1234567890de",
    "session_id": "vapi_call_039_street_art",
    "user_id": "clerk_user_12383",
    "title": "Joining a Street-Art Walking Tour in Valparaíso",
    "role_scenario": "I want to know meeting point and if photos are allowed.",
    "feedback": '## 🎨 Feedback tour\nDijiste ❌ *"¿Fotos permitidas?"**. Completo: ✅ *"¿Dónde es el punto de encuentro y se pueden tomar fotos?"*\n- **Cultural note:** Pregunta por **propina voluntaria**.\n- **Pronunciation:** *punto de encuentro* → /ˈpunto ðe enˈkwentɾo/.\n¡Lleva **agua** y protector solar!',
    "target_vocabulary": [
      {
        "vocab": "punto de encuentro",
        "part_of_speech": "noun phrase",
        "meaning": ["meeting point"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "El punto de encuentro es en la Plaza Aníbal Pinto.", "translation": "The meeting point is at Aníbal Pinto Square." }
        ],
        "idioms": [],
        "synonyms": ["lugar de inicio"],
        "antonyms": []
      },
      {
        "vocab": "propina voluntaria",
        "part_of_speech": "noun phrase",
        "meaning": ["voluntary tip"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "La propina es voluntaria al final del tour.", "translation": "The tip is voluntary at the end of the tour." }
        ],
        "idioms": [],
        "synonyms": ["gratificación"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/street_art_valpo.mp3",
    "created_at": "2025-08-10T15:45:00Z"
  },

  {
    "id": "efab0123-fabc-4567-8901-2345678901ef",
    "session_id": "vapi_call_040_pool_pass",
    "user_id": "clerk_user_12384",
    "title": "Buying a Day Pass to a Public Pool in Málaga",
    "role_scenario": "I want entry for one adult and ask about locker rental.",
    "feedback": '##🏊 Feedback de la piscina\nDijiste ❌ *"Una entrada adulto"**. Completo: ✅ *"Una entrada de adulto para todo el día, ¿alquilan casilleros?"*\n- **Cultural note:** Lleva **gorro de baño obligatorio**.\n- **Pronunciation:** *casillero* → /kasiˈʝeɾo/.\n¡Pide **toalla extra**!',
    "target_vocabulary": [
      {
        "vocab": "casillero",
        "part_of_speech": "noun",
        "meaning": ["locker"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Cuánto cuesta el casillero por día?", "translation": "How much is the locker per day?" }
        ],
        "idioms": [],
        "synonyms": ["taquilla"],
        "antonyms": []
      },
      {
        "vocab": "gorro de baño",
        "part_of_speech": "noun phrase",
        "meaning": ["swim cap"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Necesito comprar un gorro de baño.", "translation": "I need to buy a swim cap." }
        ],
        "idioms": [],
        "synonyms": ["gorro de natación"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/pool_malaga.mp3",
    "created_at": "2025-08-10T15:50:00Z"
  },
   {
    "id": "fabc5678-9abc-def0-1234-567890abcdef",
    "session_id": "vapi_call_041_escape_room",
    "user_id": "clerk_user_12385",
    "title": "Booking an Escape-Room Slot in Monterrey",
    "role_scenario": "I want the 6 pm Jurassic-themed room for four people and ask about English clues.",
    "feedback": "## 🦖 Feedback de la sala\nDijiste ❌ *\"Reservar 6 Jurassic 4\"**. Completo: ✅ *\"Quiero reservar la sala Jurassic a las 6 pm para cuatro personas, ¿ofrecen pistas en inglés?\"*\n- **Cultural note:** Pregunta por **descuento estudiante**.\n- **Pronunciation:** *pista* → /ˈpista/.\n¡Llega 15 min antes para briefing!",
    "target_vocabulary": [
      {
        "vocab": "pista",
        "part_of_speech": "noun",
        "meaning": ["clue", "hint"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Pueden darnos pistas en inglés si la necesitamos?", "translation": "Can you give us clues in English if needed?" }
        ],
        "idioms": [],
        "synonyms": ["ayuda"],
        "antonyms": []
      },
      {
        "vocab": "briefing",
        "part_of_speech": "noun",
        "meaning": ["introduction", "rules explanation"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "El briefing dura unos 10 minutos.", "translation": "The rules explanation takes about 10 minutes." }
        ],
        "idioms": [],
        "synonyms": ["instrucciones"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/escape_room_mty.mp3",
    "created_at": "2025-08-10T15:55:00Z"
  },

  {
    "id": "9abc6789-bcde-0123-4567-8901234567ab",
    "session_id": "vapi_call_042_padel_court",
    "user_id": "clerk_user_12386",
    "title": "Renting a Padel Court in Marbella",
    "role_scenario": "I want an hour tonight and need to rent rackets and balls.",
    "feedback": '## 🎾 Feedback club\nDijiste ❌ *"Hora padel hoy"**. Completo: ✅ *"¿Hay pista libre para una hora esta noche? ¿Alquilan paletas y bolas?\"*\n- **Cultural note:** Reserva por **app club**.\n- **Pronunciation:** *paletas* → /paˈletas/.\n¡Pide **botellas de agua heladas**!',
    "target_vocabulary": [
      {
        "vocab": "pista",
        "part_of_speech": "noun",
        "meaning": ["court"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿A qué hora está libre la pista?", "translation": "What time is the court free?" }
        ],
        "idioms": [],
        "synonyms": ["cancha"],
        "antonyms": []
      },
      {
        "vocab": "paleta",
        "part_of_speech": "noun",
        "meaning": ["padel racket"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Alquilan paletas de nivel intermedio?", "translation": "Do you rent intermediate-level rackets?" }
        ],
        "idioms": [],
        "synonyms": ["raqueta"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/padel_marbella.mp3",
    "created_at": "2025-08-10T16:00:00Z"
  },

  {
    "id": "bcde7890-cdef-2345-6789-0123456789cd",
    "session_id": "vapi_call_043_fish_market",
    "user_id": "clerk_user_12387",
    "title": "Buying Fresh Tuna at a Coastal Market in Galicia",
    "role_scenario": "I want two kilos cleaned and vacuum-packed to take on the plane.",
    "feedback": '## 🐟 Feedback del pescadero\nDijiste ❌ *"Dos atún limpio"**. Completo: ✅ *"¿Me da dos kilos de atún limpio y envasado al vacío para llevar en avión?\"*\n- **Cultural note:** Pregunta por **hielo seco**.\n- **Pronunciation:** *envasado al vacío* → /embaˈsaðo al βaˈsio/.\n¡Solicita **factura tax-free**!',
    "target_vocabulary": [
      {
        "vocab": "envasado al vacío",
        "part_of_speech": "noun phrase",
        "meaning": ["vacuum-packed"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Puede enviarlo al vacío para viaje?", "translation": "Can you vacuum-pack it for travel?" }
        ],
        "idioms": [],
        "synonyms": ["empaque sellado"],
        "antonyms": []
      },
      {
        "vocab": "hielo seco",
        "part_of_speech": "noun phrase",
        "meaning": ["dry ice"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Venden hielo seco para conservarlo?", "translation": "Do you sell dry ice to keep it fresh?" }
        ],
        "idioms": [],
        "synonyms": ["hielo refrigerante"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/tuna_galicia.mp3",
    "created_at": "2025-08-10T16:05:00Z"
  },

  {
    "id": "cdef8901-defa-3456-7890-1234567890de",
    "session_id": "vapi_call_044_study_room",
    "user_id": "clerk_user_12388",
    "title": "Reserving a Private Study Cabin at a Library in Madrid",
    "role_scenario": "I need the room for 3 hours tomorrow morning and ask about Wi-Fi.",
    "feedback": '## 📚 Feedback biblioteca\nDijiste ❌ *"Cabin 3 horas"**. Completo: ✅ *"Quiero reservar una cabina de estudio para 3 horas mañana por la mañana, ¿tiene Wi-Fi?\"*\n- **Cultural note:** Pide **código de acceso**.\n- **Pronunciation:** *cabina* → /kaˈβina/.\n¡Lleva **DNI** para registrarte!',
    "target_vocabulary": [
      {
        "vocab": "cabina de estudio",
        "part_of_speech": "noun phrase",
        "meaning": ["study cabin"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Las cabinas de estudio están en la segunda planta.", "translation": "The study cabins are on the second floor." }
        ],
        "idioms": [],
        "synonyms": ["aula individual"],
        "antonyms": []
      },
      {
        "vocab": "código de acceso",
        "part_of_speech": "noun phrase",
        "meaning": ["access code"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Te enviaremos el código de acceso por mail.", "translation": "We’ll email you the access code." }
        ],
        "idioms": [],
        "synonyms": ["contraseña"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/study_madrid.mp3",
    "created_at": "2025-08-10T16:10:00Z"
  },

  {
    "id": "defa9012-efab-4567-8901-2345678901ef",
    "session_id": "vapi_call_045_craft_market",
    "user_id": "clerk_user_12389",
    "title": "Buying Handmade Leather Earrings in Oaxaca",
    "role_scenario": "I want a pair with turquoise stones and ask if they do custom colors.",
    "feedback": '## 👜 Feedback artesano\nDijiste ❌ *"¿Personalizado colores?"**. Completo: ✅ *"¿Podrían hacer estos pendientes en otros colores a pedido?\"*\n- **Cultural note:** Pregunta por **tiempo de elaboración**.\n- **Pronunciation:** *elaboración* → /elaβoɾaˈsjon/.\n¡Pide **bolsa de regalo**!',
    "target_vocabulary": [
      {
        "vocab": "a pedido",
        "part_of_speech": "phrase",
        "meaning": ["custom-made"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Hacemos piezas a pedido en 3 días.", "translation": "We make custom pieces in 3 days." }
        ],
        "idioms": [],
        "synonyms": ["personalizado"],
        "antonyms": ["stock"]
      },
      {
        "vocab": "bolsa de regalo",
        "part_of_speech": "noun phrase",
        "meaning": ["gift bag"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Me da una bolsa de regalo, por favor?", "translation": "Can I have a gift bag, please?" }
        ],
        "idioms": [],
        "synonyms": ["envoltorio"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/earrings_oaxaca.mp3",
    "created_at": "2025-08-10T16:15:00Z"
  },

  {
    "id": "efab0123-fabc-5678-9012-3456789012ab",
    "session_id": "vapi_call_046_manicure",
    "user_id": "clerk_user_12390",
    "title": "Getting a Gel Manicure in Panama City",
    "role_scenario": "I want a nude color and ask for removal of old gel polish.",
    "feedback": '## 💅 Feedback estética\nDijiste ❌ *"Gel color nude"**. Completo: ✅ *"Quiero una manicura en gel color nude y retirar el esmalte anterior, por favor."*\n- **Cultural note:** Pregunta por **secado LED**.\n- **Pronunciation:** *retirar* → /ɾetiˈɾaɾ/.\n¡Pide **hidratante** al final!',
    "target_vocabulary": [
      {
        "vocab": "retirar",
        "part_of_speech": "verb",
        "meaning": ["to remove"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Me pueden retirar el gel viejo?", "translation": "Can you remove the old gel?" }
        ],
        "idioms": [],
        "synonyms": ["quitar"],
        "antonyms": ["aplicar"]
      },
      {
        "vocab": "secado LED",
        "part_of_speech": "noun phrase",
        "meaning": ["LED curing"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "El secado LED dura 30 segundos por capa.", "translation": "LED curing takes 30 seconds per coat." }
        ],
        "idioms": [],
        "synonyms": ["lámpara UV"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/manicure_panama.mp3",
    "created_at": "2025-08-10T16:20:00Z"
  },

  {
    "id": "fabc1234-abcd-6789-0123-456789abcdef",
    "session_id": "vapi_call_047_wine_tasting",
    "user_id": "clerk_user_12391",
    "title": "Joining a Guided Wine Tasting in Mendoza",
    "role_scenario": "I want the 3-glass tasting and ask about transport to my hotel.",
    "feedback": '## 🍷 Feedback bodega\nDijiste ❌ *"Tres vinos hotel"**. Completo: ✅ *"Quiero la degustación de tres vinos, ¿incluyen transporte a mi hotel?\"*\n- **Cultural note:** Pregunta por **spittoon** si no bebes todo.\n- **Pronunciation:** *degustación* → /deɣustaˈsjon/.\n¡Compra **aceite de oliva artesanal**!',
    "target_vocabulary": [
      {
        "vocab": "degustación",
        "part_of_speech": "noun",
        "meaning": ["tasting"],
        "tone": "Formal",
        "regional_variations": [],
        "examples": [
          { "sentence": "La degustación incluye quesos y empanadas.", "translation": "The tasting includes cheeses and empanadas." }
        ],
        "idioms": [],
        "synonyms": ["catación"],
        "antonyms": []
      },
      {
        "vocab": "transporte",
        "part_of_speech": "noun",
        "meaning": ["transport"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Ofrecen transporte desde el centro?", "translation": "Do you offer transport from downtown?" }
        ],
        "idioms": [],
        "synonyms": ["traslado"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/wine_mendoza.mp3",
    "created_at": "2025-08-10T16:25:00Z"
  },

  {
    "id": "abcd2345-bcde-7890-1234-5678901234ab",
    "session_id": "vapi_call_048_museum_audio",
    "user_id": "clerk_user_12392",
    "title": "Renting an Audio Guide at the Frida Kahlo Museum",
    "role_scenario": "I want the English guide and ask about student price.",
    "feedback": '## 🎧 Feedback museo\nDijiste ❌ *"Guía inglés"**. Completo: ✅ *"Quiero la audioguía en inglés, ¿hay descuento estudiante?\"*\n- **Cultural note:** Necesitas **audífonos propios** o alquilar.\n- **Pronunciation:** *audífonos* → /auˈðifonos/.\n¡Descarga **app oficial** también!',
    "target_vocabulary": [
      {
        "vocab": "audioguía",
        "part_of_speech": "noun",
        "meaning": ["audio guide"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Dónde recojo la audioguía?", "translation": "Where do I pick up the audio guide?" }
        ],
        "idioms": [],
        "synonyms": ["guía sonora"],
        "antonyms": []
      },
      {
        "vocab": "audífonos",
        "part_of_speech": "noun",
        "meaning": ["headphones"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Puedo usar mis propios audífonos?", "translation": "Can I use my own headphones?" }
        ],
        "idioms": [],
        "synonyms": ["auriculares"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/audio_guide_cdmx.mp3",
    "created_at": "2025-08-10T16:30:00Z"
  },

  {
    "id": "bcde3456-cdef-8901-2345-6789012345cd",
    "session_id": "vapi_call_049_kayak_rental",
    "user_id": "clerk_user_12393",
    "title": "Renting a Kayak in San Juan, Puerto Rico",
    "role_scenario": "I need a double kayak for 2 hours and ask about life-vest sizes.",
    "feedback": '## 🛶 Feedback alquiler\nDijiste ❌ *"Kayak doble dos horas"**. Completo: ✅ *"Quiero un kayak doble por dos horas, ¿tienen chalecos talla grande?\"*\n- **Cultural note:** Incluye **botella de agua gratis**.\n- **Pronunciation:** *chaleco* → /tʃaˈleko/.\n¡Pide **mapa de manglares**!',
    "target_vocabulary": [
      {
        "vocab": "chaleco salvavidas",
        "part_of_speech": "noun phrase",
        "meaning": ["life vest"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "¿Tienen chalecos salvavidas para niños?", "translation": "Do you have life vests for kids?" }
        ],
        "idioms": [],
        "synonyms": ["flotador"],
        "antonyms": []
      },
      {
        "vocab": "manglar",
        "part_of_speech": "noun",
        "meaning": ["mangrove"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "El recorrido incluye el manglar de la bahía.", "translation": "The route includes the bay’s mangrove." }
        ],
        "idioms": [],
        "synonyms": ["bosque salino"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/kayak_sanjuan.mp3",
    "created_at": "2025-08-10T16:35:00Z"
  },

  {
    "id": "cdef4567-defa-0123-4567-8901234567de",
    "session_id": "vapi_call_050_thermal_bath",
    "user_id": "clerk_user_12394",
    "title": "Booking a Thermal Bath Session in Ourense",
    "role_scenario": "I want a 90-min session and ask about towel rental and lockers.",
    "feedback": '## ♨️ Feedback balneario\nDijiste ❌ *"90 minutos toalla"**. Completo: ✅ *"Quiero una sesión de 90 minutos, ¿alquilan toallas y taquillas?\"*\n- **Cultural note:** Lleva **chanclas obligatorias**.\n- **Pronunciation:** *taquilla* → /taˈkiʎa/.\n¡Reserva **piscina exterior** si hace sol!',
    "target_vocabulary": [
      {
        "vocab": "taquilla",
        "part_of_speech": "noun",
        "meaning": ["locker"],
        "tone": "Neutral",
        "regional_variations": [],
        "examples": [
          { "sentence": "Las taquillas son gratuitas con llave.", "translation": "Lockers are free with key." }
        ],
        "idioms": [],
        "synonyms": ["casillero"],
        "antonyms": []
      },
      {
        "vocab": "chanclas",
        "part_of_speech": "noun",
        "meaning": ["flip-flops"],
        "tone": "Casual",
        "regional_variations": [],
        "examples": [
          { "sentence": "No olvides llevar chanclas.", "translation": "Don’t forget flip-flops." }
        ],
        "idioms": [],
        "synonyms": ["sandalias"],
        "antonyms": []
      }
    ],
    "user_audio": "https://example.com/audio/thermal_ourense.mp3",
    "created_at": "2025-08-10T16:40:00Z"
  }

]
