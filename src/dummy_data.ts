export const chatMessages = [
  { "role": "user", "content": "Hola, ¿puedes ayudarme a planear un viaje a Perú?" },
  { "role": "assistant", "content": "¡Claro! ¿Cuántos días tienes y qué te interesa más: cultura, naturaleza o gastronomía?" },
  { "role": "user", "content": "Tengo 8 días y me gustaría mezclar un poco de todo." },
  { "role": "assistant", "content": "Perfecto. Te recomiendo 3 días en Cusco y Valle Sagrado, 2 días en Machu Picchu y 3 días en Lima." },
  { "role": "user", "content": "Suena bien. ¿Y el clima en octubre?" },
  { "role": "assistant", "content": "Octubre es primavera: días templados (20-25 °C) y noches frescas. Lleva capas y un impermeable ligero." },
  { "role": "user", "content": "¿Dónde como ceviche de verdad sin arruinarme?" },
  { "role": "assistant", "content": "En Lima prueba ‘Canta Rana’ en Barranco o ‘La Mar’ si quieres algo más trendy. Ambos tienen precios justos." },
  { "role": "user", "content": "Gracias. ¿Puedes resumirme la historia de Machu Picchu en 3 frases?" },
  { "role": "assistant", "content": "Machu Picchu fue una ciudadela inca del siglo XV, abandonada tras la conquista española y redescubierta en 1911 por Hiram Bingham." },
  { "role": "user", "content": "¿Hay que reservar boletos con anticipación?" },
  { "role": "assistant", "content": "Sí, compra tus entradas al menos 3 semanas antes, especialmente si quieres subir al Huayna Picchu." },
  { "role": "user", "content": "Vale. ¿Alguna app útil para moverme en Cusco?" },
  { "role": "assistant", "content": "‘Moovit’ funciona bien para transporte público y ‘Cabify’ para taxis seguros." },
  { "role": "user", "content": "¿Y qué tan alta es la altitud en Cusco?" },
  { "role": "assistant", "content": "Cusco está a 3 400 m. Tómate el primer día con calma, bebe mucha agua y prueba la coca o el mate de coca." },
  { "role": "user", "content": "Buen dato. ¿Qué souvenir típico me recomiendas?" },
  { "role": "assistant", "content": "Un chullo de alpaca tejido a mano: cálido, ligero y auténtico. Pídelo en el mercado de San Pedro." },
  { "role": "user", "content": "Perfecto. ¿Tienes alguna frase útil en quechua?" },
  { "role": "assistant", "content": "Claro: ‘Allillanchu’ significa ‘¿Estás bien?’ y ‘Añay’ es ‘gracias’. Los locales aprecian el gesto." },
  { "role": "user", "content": "Gracias por todo. ¿Algo más que no deba olvidar?" },
  { "role": "assistant", "content": "Lleva protector solar, bebidas y snacks para el tren a Machu Picchu, y recuerda llevar efectivo en soles pequeños." }
]

export const callTranscript = [
  {
    "type": "message",
    "transcript": "Hola, soy Juan del hotel Sol Benidorm. ¿Qué tipo de habitación necesita? ¿Cuántas noches le gustaría reservar? ¿Sólo una persona o más?",
    "role": "assistant",
    "transcriptType": "final"
  },
  {
    "type": "message",
    "transcript": "¡Hola Juan! Sí, mira, quiero reservar dos días allí en Belindón... bueno, Benidorm quería decir, perdón. Es que estoy súper emocionada por este viaje, hace tiempo que no salgo de vacaciones",
    "role": "user",
    "transcriptType": "final",
    "input": "¡Hola Juan! Sí, mira, quiero reservar dos días allí en Belindón... bueno, Benidorm quería decir, perdón. Es que estoy súper emocionada por este viaje, hace tiempo que no salgo de vacaciones",
    "translation": "Hello Juan! Yes, look, I want to book two days there in Belindón... well, Benidorm I meant to say, sorry. It's just that I'm super excited about this trip, it's been a while since I went on vacation"
  },
  {
    "type": "message",
    "transcript": "Disculpa, pero creo que habíamos convenido en Benidorm. ¿Necesita habitación individual o doble?",
    "role": "assistant",
    "transcriptType": "final",
    "translation": "Sorry, but I think we agreed on Benidorm. Do you need a single or double room?"
  },
  {
    "type": "message",
    "transcript": "Ah sí, claro, necesito habitación doble. Voy con mi marido, es nuestro aniversario de bodas, 15 años ya, ¿te imaginas? Por eso queremos algo especial",
    "role": "user",
    "transcriptType": "final",
    "input": "Ah sí, claro, necesito habitación doble. Voy con mi marido, es nuestro aniversario de bodas, 15 años ya, ¿te imaginas? Por eso queremos algo especial"
  },
  {
    "type": "message",
    "transcript": "Tendremos habitaciones dobles con vistas al mar. ¿Querría también desayuno incluido en su estancia?",
    "role": "assistant",
    "transcriptType": "final"
  },
  {
    "type": "message",
    "transcript": "¡Ay, sí por favor! Me encanta el desayuno, y mi marido es de esos que no puede funcionar sin su café de la mañana, ja ja ja. ¿Tienen buena variedad? ¿Hay fruta fresca?",
    "role": "user",
    "transcriptType": "final",
    "input": "¡Ay, sí por favor! Me encanta el desayuno, y mi marido es de esos que no puede funcionar sin su café de la mañana, ja ja ja. ¿Tienen buena variedad? ¿Hay fruta fresca?",
    "translation": "Oh yes please! I love breakfast, and my husband is one of those who can't function without his morning coffee, ha ha ha. Do you have good variety? Is there fresh fruit?"
  },
  {
    "type": "message",
    "transcript": "Perfecto. ¿Para qué fechas específicas necesita la reserva? ¿Y podría confirmarme cuántas personas se alojarán?",
    "role": "assistant",
    "transcriptType": "final"
  },
  {
    "type": "message",
    "transcript": "Mira, para el 15 y 16 de agosto, somos dos personas. Elegimos esas fechas porque es exactamente el día que nos casamos, hace 15 años. Mi marido quería ir a la montaña, pero yo le dije 'no, mi amor, vamos a la playa que hace calor y necesito relajarme'",
    "role": "user",
    "transcriptType": "final",
    "input": "Mira, para el 15 y 16 de agosto, somos dos personas. Elegimos esas fechas porque es exactamente el día que nos casamos, hace 15 años. Mi marido quería ir a la montaña, pero yo le dije 'no, mi amor, vamos a la playa que hace calor y necesito relajarme'"
  },
  {
    "type": "message",
    "transcript": "Excelente. Habitación doble del 15 al 16 de agosto para dos personas con desayuno incluido. El precio sería 120 euros por noche. ¿Necesita algún servicio adicional como parking o traslado del aeropuerto?",
    "role": "assistant",
    "transcriptType": "final",
    "translation": "Excellent. Double room from August 15th to 16th for two people with breakfast included. The price would be 120 euros per night. Do you need any additional services like parking or airport transfer?"
  },
  {
    "type": "message",
    "transcript": "¿Parking? ¡Ay, qué bueno que me lo menciones! Sí, sí necesitamos parking porque vamos en nuestro coche. Es un Seat León rojo, mi bebé, ja ja ja. ¿Cuánto cuesta? ¿Es seguro? Es que en la ciudad a veces me da miedo dejar el coche",
    "role": "user",
    "transcriptType": "final",
    "input": "¿Parking? ¡Ay, qué bueno que me lo menciones! Sí, sí necesitamos parking porque vamos en nuestro coche. Es un Seat León rojo, mi bebé, ja ja ja. ¿Cuánto cuesta? ¿Es seguro? Es que en la ciudad a veces me da miedo dejar el coche",
    "translation": "Parking? Oh, how good that you mention it! Yes, yes we need parking because we're going in our car. It's a red Seat León, my baby, ha ha ha. How much does it cost? Is it safe? It's just that in the city sometimes I'm afraid to leave the car"
  },
  {
    "type": "message",
    "transcript": "Sí, tenemos parking privado por 10 euros adicionales por noche. También ofrecemos traslado desde el aeropuerto de Alicante por 25 euros por trayecto.",
    "role": "assistant",
    "transcriptType": "final"
  },
  {
    "type": "message",
    "transcript": "Perfecto, me quedo con el parking entonces. El traslado no lo necesito porque, como te dije, vamos en nuestro coche. Además mi marido disfruta mucho conduciendo, dice que es su momento zen, ja ja ja",
    "role": "user",
    "transcriptType": "final",
    "input": "Perfecto, me quedo con el parking entonces. El traslado no lo necesito porque, como te dije, vamos en nuestro coche. Además mi marido disfruta mucho conduciendo, dice que es su momento zen, ja ja ja"
  },
  {
    "type": "message",
    "transcript": "Perfecto. Entonces el total sería: habitación doble con desayuno 240 euros más parking 20 euros, total 260 euros por dos noches. ¿Podría proporcionarme su nombre completo y teléfono para confirmar la reserva?",
    "role": "assistant",
    "transcriptType": "final"
  },
  {
    "type": "message",
    "transcript": "¡Claro que sí! Mi nombre es Carlos Martínez, bueno, en realidad soy Carmen Martínez, mi marido es Carlos, siempre me confundo, ja ja ja. Mi teléfono es seis-siete-ocho-nueve-uno-dos-tres-cuatro-cinco. ¿Y me van a mandar la confirmación por WhatsApp o por mensaje normal?",
    "role": "user",
    "transcriptType": "final",
    "input": "¡Claro que sí! Mi nombre es Carlos Martínez, bueno, en realidad soy Carmen Martínez, mi marido es Carlos, siempre me confundo, ja ja ja. Mi teléfono es seis-siete-ocho-nueve-uno-dos-tres-cuatro-cinco. ¿Y me van a mandar la confirmación por WhatsApp o por mensaje normal?",
    "translation": "Of course! My name is Carlos Martínez, well, actually I'm Carmen Martínez, my husband is Carlos, I always get confused, ha ha ha. My phone is six-seven-eight-nine-one-two-three-four-five. And are you going to send me the confirmation by WhatsApp or regular message?"
  },
  {
    "type": "message",
    "transcript": "Gracias Sr. Martínez. Su reserva está confirmada: habitación doble del 15 al 16 de agosto, desayuno incluido y parking, total 260 euros. Le enviaremos la confirmación por SMS. ¿Hay algo más en lo que pueda ayudarle?",
    "role": "assistant",
    "transcriptType": "final",
    "translation": "Thank you Mr. Martínez. Your reservation is confirmed: double room from August 15th to 16th, breakfast included and parking, total 260 euros. We will send you the confirmation by SMS. Is there anything else I can help you with?"
  },
  {
    "type": "message",
    "transcript": "¡Ay, no, qué va! Muchas gracias a ti Juan, has sido súper amable. Oye, y una última pregunta, ¿la playa está muy cerca del hotel? Es que quiero ir a caminar por la mañana temprano, antes de que mi marido se despierte, ja ja ja",
    "role": "user",
    "transcriptType": "final",
    "input": "¡Ay, no, qué va! Muchas gracias a ti Juan, has sido súper amable. Oye, y una última pregunta, ¿la playa está muy cerca del hotel? Es que quiero ir a caminar por la mañana temprano, antes de que mi marido se despierte, ja ja ja"
  },
  {
    "type": "message",
    "transcript": "¡Qué bien! La playa está a solo 2 minutos caminando, Sra. Martínez. Es perfecta para paseos matutinos. Nos vemos el 15 de agosto, ¡que disfruten su aniversario!",
    "role": "assistant",
    "transcriptType": "final"
  },
  {
    "type": "message",
    "transcript": "¡Perfecto! ¡Qué ganas tengo ya! Hasta el 15 entonces, Juan. ¡Que tengas buen día tú también! ¡Chao, chao!",
    "role": "user",
    "transcriptType": "final",
    "input": "¡Perfecto! ¡Qué ganas tengo ya! Hasta el 15 entonces, Juan. ¡Que tengas buen día tú también! ¡Chao, chao!"
  }
]