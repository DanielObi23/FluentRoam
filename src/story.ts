export type StoryType =
  | "flash-fiction"
  | "short-story"
  | "novella"
  | "ballad"
  | "lyric-poem"
  | "stageplay";

export type Proficiency = "beginner" | "intermediate" | "advanced";

export interface VocabEntry {
  text: string;
  pos: string;
  translation: string; // always "" initially for learning
  sentence_context: string;
}

export interface Sentence {
  text: string;
  translation: string; // always ""
}

export interface ChapterTitle {
  text: string;
  translation: string; // always ""
}

export interface Page {
  audioUrl: string | null;
  chapterTitle: ChapterTitle;
  sentences: Sentence[];
  vocab: VocabEntry[];
}

export interface StoryTags {
  theme: string[];
  tone: string[];
  genre: string[];
}

export interface StorySummary {
  text: string;
  translation: string; // always ""
}

export interface Story {
  id: string; // UUID
  userId: string; // e.g., "usr_123"
  title: string;
  storySeed: string;
  coverImageUrl: string | null; // can be null if no cover
  tags: StoryTags;
  storyType: StoryType;
  proficiency: Proficiency;
  summary: StorySummary;
  pages: Page[];
  wordCount: number; // total words of target-language text only
  created_at: string; // ISO timestamp
}

// The full JSON file is an array of stories
export type StoryFile = Story[];

// tryb to get more idioms and phrases, add "saved" and default to false for all, add pov to metadata (1st, 2nd, 3rd person)
export const story = [
    {
        "id": "uuid-flash-1",
        "userId": "usr_123",
        "title": "El Último Tren",
        "storySeed": "Un hombre pierde el último tren y descubre un secreto en la estación vacía.",
        "coverImageUrl": null,
        "tags": {
            "theme": ["misterio", "soledad"],
            "tone": ["tenso", "sorprendente"],
            "genre": ["realismo mágico"]
        },
        "storyType": "flash-fiction",
        "proficiency": "intermediate",
        "summary": { "text": "Un hombre pierde el último tren y halla algo extraño en la estación desierta.", "translation": "" },
        "pages": [
            {
            "audioUrl": null,
            "chapterTitle": { "text": "El Andén Vacío", "translation": "" },
            "sentences": [
                { "text": "La estación estaba en silencio cuando Martín llegó corriendo, jadeando por el esfuerzo.", "translation": "" },
                { "text": "El último tren se había marchado un minuto antes, dejando solo ecos metálicos en el aire.", "translation": "" },
                { "text": "Miró el reloj grande en la pared, cuyo péndulo seguía marcando un ritmo indiferente.", "translation": "" },
                { "text": "Martín suspiró, maldiciendo su retraso, y se dejó caer en un banco frío de hierro.", "translation": "" },
                { "text": "Entonces escuchó un susurro, apenas audible, que parecía provenir de los rieles vacíos.", "translation": "" },
                { "text": "Se inclinó y creyó ver un brillo, como si una luz subterránea respirara bajo la tierra.", "translation": "" },
                { "text": "El susurro se hizo más claro: lo llamaba por su nombre, repetido con una voz dulce.", "translation": "" },
                { "text": "Martín se levantó, con el corazón acelerado, y dio un paso hacia el borde del andén.", "translation": "" },
                { "text": "Las luces de la estación parpadearon, y el reloj detuvo su tic-tac repentinamente.", "translation": "" },
                { "text": "De pronto, un tren sin ruido emergió de la oscuridad, compuesto de vagones transparentes.", "translation": "" },
                { "text": "En su interior, figuras borrosas lo observaban, invitándolo con miradas serenas.", "translation": "" },
                { "text": "Martín sintió un impulso irresistible y subió al primer vagón sin pensar demasiado.", "translation": "" },
                { "text": "La puerta se cerró suavemente detrás de él, y el tren comenzó a moverse sin sonido.", "translation": "" },
                { "text": "Desde la ventanilla vio cómo la estación se desvanecía en un resplandor blanquecino.", "translation": "" },
                { "text": "Cuando quiso hablar, descubrió que su voz ya no existía: era solo un reflejo viajando.", "translation": "" }
            ],
            "vocab": [
                    { "text": "andén", "pos": "noun", "translation": "platform", "sentence_context": "Martín se levantó, con el corazón acelerado, y dio un paso hacia el borde del andén." },
                    { "text": "susurro", "pos": "noun", "translation": "whisper", "sentence_context": "Entonces escuchó un susurro, apenas audible, que parecía provenir de los rieles vacíos." },
                    { "text": "vagón", "pos": "noun", "translation": "carriage", "sentence_context": "Martín sintió un impulso irresistible y subió al primer vagón sin pensar demasiado." },
                    { "text": "reloj", "pos": "noun", "translation": "clock", "sentence_context": "Miró el reloj grande en la pared, cuyo péndulo seguía marcando un ritmo indiferente." },
                    { "text": "transparente", "pos": "adjective", "translation": "transparent", "sentence_context": "De pronto, un tren sin ruido emergió de la oscuridad, compuesto de vagones transparentes." },
                    { "text": "estación", "pos": "noun", "translation": "station", "sentence_context": "La estación estaba en silencio cuando Martín llegó corriendo, jadeando por el esfuerzo." },
                    { "text": "péndulo", "pos": "noun", "translation": "pendulum", "sentence_context": "Miró el reloj grande en la pared, cuyo péndulo seguía marcando un ritmo indiferente." },
                    { "text": "esfuerzo", "pos": "noun", "translation": "effort", "sentence_context": "La estación estaba en silencio cuando Martín llegó corriendo, jadeando por el esfuerzo." },
                    { "text": "ventanilla", "pos": "noun", "translation": "window", "sentence_context": "Desde la ventanilla vio cómo la estación se desvanecía en un resplandor blanquecino." },
                    { "text": "resplandor", "pos": "noun", "translation": "glow", "sentence_context": "Desde la ventanilla vio cómo la estación se desvanecía en un resplandor blanquecino." }
                ]
            }
        ],
        "wordCount": 295,
        "created_at": "2025-08-18T03:10:00Z"
    },
    {
        "id": "uuid-lyric-1",
        "userId": "usr_123",
        "title": "Amanecer en la Montaña",
        "storySeed": "Un poema lírico que celebra la llegada de la luz y el renacer del espíritu.",
        "coverImageUrl": null,
        "tags": {
            "theme": ["naturaleza", "renovación"],
            "tone": ["sereno", "esperanzador"],
            "genre": ["poesía lírica"]
        },
        "storyType": "lyric-poem",
        "proficiency": "beginner",
        "summary": { "text": "Un poema describe el amanecer como símbolo de esperanza y vida nueva.", "translation": "" },
        "pages": [
            {
            "audioUrl": null,
            "chapterTitle": { "text": "Amanecer", "translation": "" },
            "sentences": [
                { "text": "El cielo tiembla en tonos rosados sobre la cima tranquila.", "translation": "" },
                { "text": "Un suspiro de viento acaricia los pinos dormidos.", "translation": "" },
                { "text": "La montaña abre los ojos con rayos dorados de fuego suave.", "translation": "" },
                { "text": "El río canta con voz cristalina, arrastrando las sombras nocturnas.", "translation": "" },
                { "text": "El sol dibuja caminos de luz sobre la hierba fresca.", "translation": "" },
                { "text": "Cada hoja despierta y se tiñe de esperanza nueva.", "translation": "" },
                { "text": "Mi pecho respira un aire limpio, lleno de promesas.", "translation": "" },
                { "text": "El amanecer me recuerda que todo renace en silencio.", "translation": "" }
            ],
            "vocab": [
                { "text": "cima", "pos": "noun", "translation": "summit", "sentence_context": "El cielo tiembla en tonos rosados sobre la cima tranquila." },
                { "text": "acariciar", "pos": "verb", "translation": "to caress", "sentence_context": "Un suspiro de viento acaricia los pinos dormidos." },
                { "text": "pinos", "pos": "noun", "translation": "pines", "sentence_context": "Un suspiro de viento acaricia los pinos dormidos." },
                { "text": "cristalina", "pos": "adjective", "translation": "crystalline", "sentence_context": "El río canta con voz cristalina, arrastrando las sombras nocturnas." },
                { "text": "hierba", "pos": "noun", "translation": "grass", "sentence_context": "El sol dibuja caminos de luz sobre la hierba fresca." },
                { "text": "hoja", "pos": "noun", "translation": "leaf", "sentence_context": "Cada hoja despierta y se tiñe de esperanza nueva." },
                { "text": "renacer", "pos": "verb", "translation": "to be reborn", "sentence_context": "El amanecer me recuerda que todo renace en silencio." },
                { "text": "amanecer", "pos": "noun", "translation": "dawn", "sentence_context": "El amanecer me recuerda que todo renace en silencio." },
                { "text": "promesas", "pos": "noun", "translation": "promises", "sentence_context": "Mi pecho respira un aire limpio, lleno de promesas." },
                { "text": "montaña", "pos": "noun", "translation": "mountain", "sentence_context": "La montaña abre los ojos con rayos dorados de fuego suave." }
            ]
            }
        ],
        "wordCount": 134,
        "created_at": "2025-08-18T03:20:00Z"
    },
    {
        "id": "uuid-ballad-1",
        "userId": "usr_123",
        "title": "La Balada del Viajero",
        "storySeed": "Una balada sobre un viajero que atraviesa montañas y mares buscando un lugar de pertenencia.",
        "coverImageUrl": null,
        "tags": {
            "theme": ["viaje", "soledad", "esperanza"],
            "tone": ["melancólico", "épico"],
            "genre": ["balada"]
        },
        "storyType": "ballad",
        "proficiency": "intermediate",
        "summary": { "text": "Un viajero solitario cruza tierras y mares buscando un hogar y encuentra en el camino canciones que lo acompañan.", "translation": "" },
        "pages": [
            {
            "audioUrl": null,
            "chapterTitle": { "text": "Balada del Viajero", "translation": "" },
            "sentences": [
                { "text": "En la aldea dormida lo vieron partir,", "translation": "" },
                { "text": "con pasos cansados y ansias de vivir.", "translation": "" },
                { "text": "Montañas de sombra, ríos de cristal,", "translation": "" },
                { "text": "llevaban su nombre en canto inmortal.", "translation": "" },
                { "text": "Oh viajero, oh viajero, ¿a dónde irás?", "translation": "" },
                { "text": "El viento responde: jamás volverás.", "translation": "" },
                { "text": "Cruzó los caminos de polvo y de sol,", "translation": "" },
                { "text": "miraba horizontes de fuego y de rol.", "translation": "" },
                { "text": "El mar lo llamó con voz tempestad,", "translation": "" },
                { "text": "le ofreció refugio y cruel soledad.", "translation": "" },
                { "text": "Oh viajero, oh viajero, ¿qué encontrarás?", "translation": "" },
                { "text": "Quizá un destino, quizá nada más.", "translation": "" },
                { "text": "En la ciudad lejana buscó un hogar,", "translation": "" },
                { "text": "pero halló silencio y sombras al pasar.", "translation": "" },
                { "text": "Cantaba su pena en plazas de sol,", "translation": "" },
                { "text": "los niños reían, no oían su voz." },
                { "text": "Oh viajero, oh viajero, ¿quién te oirá?", "translation": "" },
                { "text": "La luna en su cielo lo escuchará." },
                { "text": "Años cayeron cual hojas de abril,", "translation": "" },
                { "text": "su barba era nieve, su andar juvenil." },
                { "text": "Un valle encontró, cubierto de paz,", "translation": "" },
                { "text": "allí su camino llegaba al final." },
                { "text": "Oh viajero, oh viajero, ya descansarás,", "translation": "" },
                { "text": "bajo estrellas claras renacerás." }
            ],
            "vocab": [
                { "text": "aldea", "pos": "noun", "translation": "village", "sentence_context": "En la aldea dormida lo vieron partir." },
                { "text": "ansias", "pos": "noun", "translation": "longing", "sentence_context": "con pasos cansados y ansias de vivir." },
                { "text": "inmortal", "pos": "adjective", "translation": "immortal", "sentence_context": "llevaban su nombre en canto inmortal." },
                { "text": "tempestad", "pos": "noun", "translation": "storm", "sentence_context": "El mar lo llamó con voz tempestad." },
                { "text": "soledad", "pos": "noun", "translation": "loneliness", "sentence_context": "le ofreció refugio y cruel soledad." },
                { "text": "refugio", "pos": "noun", "translation": "refuge", "sentence_context": "le ofreció refugio y cruel soledad." },
                { "text": "plazas", "pos": "noun", "translation": "squares (town plazas)", "sentence_context": "Cantaba su pena en plazas de sol." },
                { "text": "pena", "pos": "noun", "translation": "sorrow", "sentence_context": "Cantaba su pena en plazas de sol." },
                { "text": "valle", "pos": "noun", "translation": "valley", "sentence_context": "Un valle encontró, cubierto de paz." },
                { "text": "descansar", "pos": "verb", "translation": "to rest", "sentence_context": "Oh viajero, oh viajero, ya descansarás." },
                { "text": "estrellas", "pos": "noun", "translation": "stars", "sentence_context": "bajo estrellas claras renacerás." },
                { "text": "renacer", "pos": "verb", "translation": "to be reborn", "sentence_context": "bajo estrellas claras renacerás." }
            ]
            }
        ],
        "wordCount": 912,
        "created_at": "2025-08-18T03:35:00Z"
    },
    {
        "id": "uuid-shortstory-1",
        "userId": "usr_123",
        "title": "El Misterio del Faro",
        "storySeed": "Un joven llega a un faro abandonado y descubre secretos que conectan generaciones.",
        "coverImageUrl": null,
        "tags": {
            "theme": ["misterio", "familia", "aventura"],
            "tone": ["suspenso", "melancólico"],
            "genre": ["cuento largo"]
        },
        "storyType": "short-story",
        "proficiency": "intermediate",
        "summary": { "text": "Un joven explora un faro antiguo y descubre cartas y diarios que revelan la historia de su familia.", "translation": "" },
        "pages": [
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 1: La Llegada", "translation": "" },
                "sentences": [
                    { "text": "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados.", "translation": "" },
                    { "text": "El faro se alzaba en la colina, imponente y silencioso, con sus ventanas rotas reflejando la luz tenue.", "translation": "" },
                    { "text": "La puerta de madera crujió al abrirse, revelando escaleras polvorientas que subían hacia la torre.", "translation": "" },
                    { "text": "Dentro, el aire olía a sal y a recuerdos olvidados.", "translation": "" },
                    { "text": "En el suelo encontró un sobre amarillo con su nombre escrito a mano.", "translation": "" },
                    { "text": "Al abrirlo, descubrió una carta antigua que hablaba de un marinero desaparecido y secretos familiares.", "translation": "" },
                    { "text": "Cada palabra despertaba en él un sentimiento desconocido de responsabilidad y curiosidad.", "translation": "" },
                    { "text": "Decidió subir la escalera que crujía bajo su peso, sintiendo cómo el viento entraba por las grietas.", "translation": "" },
                    { "text": "En la cima, la luz del faro parecía apagada, pero un destello le indicó la presencia de algo más.", "translation": "" },
                    { "text": "Un diario abierto reposaba sobre la mesa, cubierto de polvo y arena.", "translation": "" },
                    { "text": "Mateo lo tomó y comenzó a leer sobre aventuras, tormentas y un amor perdido en el mar.", "translation": "" },
                    { "text": "El sonido lejano de las olas acompañaba cada página que pasaba con cuidado.", "translation": "" },
                    { "text": "Sintió que cada historia le hablaba directamente a él, como si la torre guardara secretos de su propia sangre.", "translation": "" },
                    { "text": "Mientras el sol ascendía, Mateo comprendió que debía continuar la búsqueda de aquellos relatos ocultos.", "translation": "" }
                ],
                "vocab": [
                    { "text": "puerto", "pos": "noun", "translation": "port", "sentence_context": "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados." },
                    { "text": "bruma", "pos": "noun", "translation": "fog", "sentence_context": "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados." },
                    { "text": "colina", "pos": "noun", "translation": "hill", "sentence_context": "El faro se alzaba en la colina, imponente y silencioso, con sus ventanas rotas reflejando la luz tenue." },
                    { "text": "grietas", "pos": "noun", "translation": "cracks", "sentence_context": "Decidió subir la escalera que crujía bajo su peso, sintiendo cómo el viento entraba por las grietas." },
                    { "text": "sobre", "pos": "noun", "translation": "envelope", "sentence_context": "En el suelo encontró un sobre amarillo con su nombre escrito a mano." },
                    { "text": "diario", "pos": "noun", "translation": "diary", "sentence_context": "Un diario abierto reposaba sobre la mesa, cubierto de polvo y arena." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 2: Revelaciones", "translation": "" },
                "sentences": [
                    { "text": "Mateo leyó cada línea con cuidado, descubriendo nombres de familiares que nunca había conocido.", "translation": "" },
                    { "text": "Cada historia parecía entrelazada con la suya propia, como si el pasado y el presente se encontraran en la torre.", "translation": "" },
                    { "text": "Una ventana rota dejaba pasar un rayo de sol que iluminaba los retratos antiguos en la pared.", "translation": "" },
                    { "text": "El viento llevaba consigo un aroma a sal y madera vieja, evocando recuerdos que él no había vivido.", "translation": "" },
                    { "text": "Encontró mapas del litoral, anotaciones de mareas y fechas que coincidían con viejas cartas de la familia.", "translation": "" },
                    { "text": "Con cada descubrimiento, Mateo sentía que el faro cobraba vida, contándole sus secretos de generación en generación.", "translation": "" },
                    { "text": "Decidió que debía restaurar la torre y preservar las historias, para que no se perdieran otra vez.", "translation": "" },
                    { "text": "Al anochecer, encendió la luz del faro por primera vez en décadas, viendo cómo su haz iluminaba el horizonte.", "translation": "" },
                    { "text": "Las olas rompían suavemente contra los acantilados, como aplaudiendo su decisión.", "translation": "" },
                    { "text": "Mateo entendió que había encontrado un lugar al que realmente pertenecía, uniendo pasado y futuro.", "translation": "" },
                    { "text": "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias.", "translation": "" },
                    { "text": "La brisa nocturna traía el olor del mar, recordándole que cada aventura es también un regreso a casa.", "translation": "" },
                    { "text": "El faro, testigo silencioso, guardaba ahora también sus secretos, esperando a la siguiente generación.", "translation": "" }
                ],
                "vocab": [
                    { "text": "retratos", "pos": "noun", "translation": "portraits", "sentence_context": "Una ventana rota dejaba pasar un rayo de sol que iluminaba los retratos antiguos en la pared." },
                    { "text": "mareas", "pos": "noun", "translation": "tides", "sentence_context": "Encontró mapas del litoral, anotaciones de mareas y fechas que coincidían con viejas cartas de la familia." },
                    { "text": "acantilados", "pos": "noun", "translation": "cliffs", "sentence_context": "Las olas rompían suavemente contra los acantilados, como aplaudiendo su decisión." },
                    { "text": "restaurar", "pos": "verb", "translation": "to restore", "sentence_context": "Decidió que debía restaurar la torre y preservar las historias, para que no se perdieran otra vez." },
                    { "text": "habitacion", "pos": "noun", "translation": "room", "sentence_context": "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias." },
                    { "text": "cadena", "pos": "noun", "translation": "chain", "sentence_context": "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias." }
                ]
            }
        ],
        "wordCount": 1503,
        "created_at": "2025-08-18T03:50:00Z"
    },
    {
        "id": "uuid-novella-1",
        "userId": "usr_123",
        "title": "La Sombra del Bosque",
        "storySeed": "Una joven investigadora explora un bosque misterioso donde los secretos del pasado se entrelazan con leyendas vivas.",
        "coverImageUrl": null,
        "tags": {
            "theme": ["misterio", "aventura", "leyenda"],
            "tone": ["suspenso", "épico"],
            "genre": ["novela corta"]
        },
        "storyType": "novella",
        "proficiency": "advanced",
        "summary": { "text": "Una joven explora un bosque lleno de misterios y descubre secretos familiares, leyendas antiguas y fuerzas desconocidas.", "translation": "" },
        "pages": [
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 1: El Bosque Llamante", "translation": "" },
                "sentences": [
                    { "text": "Clara caminaba entre los árboles al amanecer, cuando la niebla aún cubría el suelo como un manto de misterio que parecía moverse con vida propia.", "translation": "" },
                    { "text": "Cada paso sobre hojas húmedas y ramas caídas crujía, despertando ecos que parecían susurrar historias olvidadas de viajeros que se habían perdido allí.", "translation": "" },
                    { "text": "El aroma a tierra mojada y musgo llenaba sus pulmones, mientras sus ojos intentaban distinguir formas entre la bruma que se deslizaba entre los troncos.", "translation": "" },
                    { "text": "A lo lejos, un destello de luz parpadeaba entre los árboles, como si alguien o algo la invitara a adentrarse más en el corazón del bosque.", "translation": "" },
                    { "text": "Sintió un escalofrío que recorría su espalda, mezcla de miedo y emoción, pero su curiosidad era más fuerte que cualquier temor.", "translation": "" },
                    { "text": "Se acercó a un viejo roble cuya corteza estaba cubierta de líquenes y marcas que parecían símbolos antiguos grabados con precisión.", "translation": "" },
                    { "text": "Al tocar la corteza, percibió una vibración leve, casi imperceptible, como si el árbol respirara con un ritmo propio.", "translation": "" },
                    { "text": "Clara recordó las historias que su abuelo le contaba sobre aquel bosque, sobre guardianes invisibles y secretos que solo los valientes podían descubrir.", "translation": "" },
                    { "text": "Mientras avanzaba, encontró una pequeña cabaña cubierta de enredaderas y musgo, con la puerta entreabierta que emitía un suave chirrido al balancearse con el viento.", "translation": "" },
                    { "text": "Dentro, todo estaba cubierto de polvo, pero los rayos de sol que se filtraban por las grietas iluminaban viejos libros, mapas y pergaminos cuidadosamente apilados sobre mesas y estantes.", "translation": "" },
                    { "text": "Clara abrió un diario que parecía muy antiguo; las páginas amarillentas estaban llenas de anotaciones sobre expediciones, mapas del bosque y leyendas de criaturas que habitaban allí." },
                    { "text": "Mientras leía, sintió que cada palabra cobraba vida, y por un instante creyó escuchar voces lejanas contándole secretos que solo ella podía entender.", "translation": "" },
                    { "text": "En un rincón encontró un retrato familiar: un hombre con mirada intensa que, según la nota al pie, había sido uno de los protectores del bosque generaciones atrás.", "translation": "" },
                    { "text": "Un mapa detallado mostraba senderos, ríos y claros ocultos, y Clara comprendió que su viaje no solo sería físico, sino también un descubrimiento de su propia historia familiar.", "translation": "" },
                    { "text": "Al salir de la cabaña, la luz del sol comenzaba a atravesar la niebla, creando patrones danzantes sobre el suelo y los troncos de los árboles.", "translation": "" },
                    { "text": "El bosque parecía cambiar con cada paso que daba, como si evaluara su valor y determinara si estaba lista para continuar su aventura.", "translation": "" },
                    { "text": "Una pequeña ardilla se cruzó en su camino y se detuvo a mirarla, como si la observara y luego le diera permiso para seguir adelante.", "translation": "" },
                    { "text": "Clara decidió seguir un sendero que se adentraba más profundo, guiada por la intuición y la sensación de que algo importante la esperaba.", "translation": "" },
                    { "text": "El sonido de un arroyo cercano se mezclaba con el canto de aves desconocidas, creando una melodía que la acompañaba en silencio.", "translation": "" },
                    { "text": "Se dio cuenta de que el bosque no era solo un lugar físico: era un espacio donde pasado, presente y leyenda se encontraban, y donde ella comenzaba a escribir su propia historia.", "translation": "" },
                    { "text": "Con cada paso, sentía cómo su vínculo con el bosque se fortalecía, y que aquel primer día sería solo el inicio de un viaje que cambiaría su vida para siempre.", "translation": "" }
                ],
                "vocab": [
                    { "text": "niebla", "pos": "noun", "translation": "fog", "sentence_context": "Clara caminaba entre los árboles al amanecer, cuando la niebla aún cubría el suelo como un manto de misterio que parecía moverse con vida propia." },
                    { "text": "manto", "pos": "noun", "translation": "cloak", "sentence_context": "Clara caminaba entre los árboles al amanecer, cuando la niebla aún cubría el suelo como un manto de misterio que parecía moverse con vida propia." },
                    { "text": "enredaderas", "pos": "noun", "translation": "vines", "sentence_context": "Mientras avanzaba, encontró una pequeña cabaña cubierta de enredaderas y musgo, con la puerta entreabierta que emitía un suave chirrido al balancearse con el viento." },
                    { "text": "musgo", "pos": "noun", "translation": "moss", "sentence_context": "Mientras avanzaba, encontró una pequeña cabaña cubierta de enredaderas y musgo, con la puerta entreabierta que emitía un suave chirrido al balancearse con el viento." },
                    { "text": "vibración", "pos": "noun", "translation": "vibration", "sentence_context": "Al tocar la corteza, percibió una vibración leve, casi imperceptible, como si el árbol respirara con un ritmo propio." },
                    { "text": "guardianes", "pos": "noun", "translation": "guardians", "sentence_context": "Clara recordó las historias que su abuelo le contaba sobre aquel bosque, sobre guardianes invisibles y secretos que solo los valientes podían descubrir." },
                    { "text": "pergaminos", "pos": "noun", "translation": "parchments", "sentence_context": "Dentro, todo estaba cubierto de polvo, pero los rayos de sol que se filtraban por las grietas iluminaban viejos libros, mapas y pergaminos cuidadosamente apilados sobre mesas y estantes." },
                    { "text": "anotaciones", "pos": "noun", "translation": "notes", "sentence_context": "Clara abrió un diario que parecía muy antiguo; las páginas amarillentas estaban llenas de anotaciones sobre expediciones, mapas del bosque y leyendas de criaturas que habitaban allí." },
                    { "text": "expediciones", "pos": "noun", "translation": "expeditions", "sentence_context": "Clara abrió un diario que parecía muy antiguo; las páginas amarillentas estaban llenas de anotaciones sobre expediciones, mapas del bosque y leyendas de criaturas que habitaban allí." },
                    { "text": "intuición", "pos": "noun", "translation": "intuition", "sentence_context": "Clara decidió seguir un sendero que se adentraba más profundo, guiada por la intuición y la sensación de que algo importante la esperaba." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 2: Ecos del Pasado", "translation": "" },
                "sentences": [
                    { "text": "Después de recorrer un sendero estrecho y cubierto de raíces, Clara llegó a una cabaña que parecía olvidada por el tiempo." },
                    { "text": "Las paredes exteriores estaban cubiertas de enredaderas y musgo, y la puerta, aunque vieja, estaba entreabierta como invitándola a entrar." },
                    { "text": "Al cruzar el umbral, un aroma a madera húmeda y papel antiguo la envolvió, evocando sensaciones de antigüedad y misterio." },
                    { "text": "Dentro, estantes polvorientos sostenían libros, diarios y mapas que habían sido cuidadosamente apilados pero olvidados durante décadas." },
                    { "text": "Clara tomó un diario con la portada de cuero desgastada y comenzó a leer: hablaba de expediciones pasadas, de caminos secretos en el bosque y de encuentros con criaturas que los aldeanos consideraban míticas." },
                    { "text": "Cada página estaba escrita con caligrafía elegante, y las notas al margen revelaban la preocupación de sus antepasados por proteger los secretos del bosque." },
                    { "text": "Entre los mapas, un dibujo detallado mostraba ríos, claros y senderos ocultos que parecían cambiar con el paso del tiempo." },
                    { "text": "Clara sintió que los ecos del pasado estaban vivos dentro de la cabaña, y que cada objeto contaba historias que aún podían escucharse si se prestaba atención.", "translation": "" },
                    { "text": "Un retrato antiguo colgaba de la pared: un hombre con mirada intensa y penetrante que parecía observarla con cierta aprobación y misterio.", "translation": "" },
                    { "text": "La joven pasó horas examinando los documentos, descubriendo nombres familiares, fechas y sucesos que habían marcado la historia de su linaje.", "translation": "" },
                    { "text": "Cada hallazgo fortalecía su sensación de pertenencia y de responsabilidad: ahora no solo exploraba el bosque, sino también su propia historia.", "translation": "" },
                    { "text": "Entre los pergaminos encontró referencias a un ritual ancestral que los guardianes del bosque realizaban cada generación para mantener el equilibrio natural.", "translation": "" },
                    { "text": "Clara comprendió que su llegada no era casual; la sangre de sus antepasados la había traído a ese lugar por un propósito que apenas comenzaba a entender.", "translation": "" },
                    { "text": "Al mirar por la ventana, la luz del sol atravesaba las copas de los árboles, dibujando sombras que parecían moverse con vida propia sobre el suelo de la cabaña.", "translation": "" },
                    { "text": "Un viento suave hizo que las páginas de los libros se agitaran, como si el bosque mismo la instara a continuar investigando.", "translation": "" },
                    { "text": "Se dio cuenta de que cada objeto, cada nota, cada símbolo grabado en la madera era una pista para desentrañar los secretos que aguardaban más adentro del bosque.", "translation": "" },
                    { "text": "Clara salió de la cabaña al atardecer, llevando consigo el diario y un mapa enrollado bajo el brazo, lista para seguir los senderos que los guardianes del pasado habían delineado.", "translation": "" },
                    { "text": "El aire fresco y la brisa traían consigo los sonidos de la fauna, y los árboles parecían susurrarle palabras de bienvenida y advertencia al mismo tiempo.", "translation": "" },
                    { "text": "Con cada paso que daba alejándose de la cabaña, la joven sentía que la historia se entrelazaba con su destino, y que la noche que se avecinaba sería el inicio de revelaciones más profundas.", "translation": "" },
                    { "text": "Antes de que la oscuridad cubriera el bosque por completo, Clara encontró un claro iluminado por la luz del crepúsculo, y decidió acampar allí, preparándose para enfrentar lo desconocido con determinación y respeto.", "translation": "" }
                ],
                "vocab": [
                    { "text": "umbral", "pos": "noun", "translation": "threshold", "sentence_context": "Al cruzar el umbral, un aroma a madera húmeda y papel antiguo la envolvió, evocando sensaciones de antigüedad y misterio." },
                    { "text": "caligrafía", "pos": "noun", "translation": "handwriting", "sentence_context": "Cada página estaba escrita con caligrafía elegante, y las notas al margen revelaban la preocupación de sus antepasados por proteger los secretos del bosque." },
                    { "text": "antepasados", "pos": "noun", "translation": "ancestors", "sentence_context": "Cada hallazgo fortalecía su sensación de pertenencia y de responsabilidad: ahora no solo exploraba el bosque, sino también su propia historia." },
                    { "text": "ritual", "pos": "noun", "translation": "ritual", "sentence_context": "Entre los pergaminos encontró referencias a un ritual ancestral que los guardianes del bosque realizaban cada generación para mantener el equilibrio natural." },
                    { "text": "equilibrio", "pos": "noun", "translation": "balance", "sentence_context": "Entre los pergaminos encontró referencias a un ritual ancestral que los guardianes del bosque realizaban cada generación para mantener el equilibrio natural." },
                    { "text": "crepúsculo", "pos": "noun", "translation": "twilight", "sentence_context": "Con cada paso que daba alejándose de la cabaña, la joven sentía que la historia se entrelazaba con su destino, y que la noche que se avecinaba sería el inicio de revelaciones más profundas." },
                    { "text": "fauna", "pos": "noun", "translation": "wildlife", "sentence_context": "El aire fresco y la brisa traían consigo los sonidos de la fauna, y los árboles parecían susurrarle palabras de bienvenida y advertencia al mismo tiempo." },
                    { "text": "símbolo", "pos": "noun", "translation": "symbol", "sentence_context": "Se dio cuenta de que cada objeto, cada nota, cada símbolo grabado en la madera era una pista para desentrañar los secretos que aguardaban más adentro del bosque." },
                    { "text": "claro", "pos": "noun", "translation": "clearing", "sentence_context": "Antes de que la oscuridad cubriera el bosque por completo, Clara encontró un claro iluminado por la luz del crepúsculo, y decidió acampar allí, preparándose para enfrentar lo desconocido con determinación y respeto." },
                    { "text": "determinación", "pos": "noun", "translation": "determination", "sentence_context": "Antes de que la oscuridad cubriera el bosque por completo, Clara encontró un claro iluminado por la luz del crepúsculo, y decidió acampar allí, preparándose para enfrentar lo desconocido con determinación y respeto." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 3: La Luz entre los Árboles", "translation": "" },
                "sentences": [
                    { "text": "Al amanecer, Clara despertó en el claro donde había pasado la noche; la niebla se levantaba lentamente dejando filtrar rayos de sol que iluminaban el bosque con tonos dorados.", "translation": "" },
                    { "text": "Los árboles se alzaban altos y majestuosos, sus copas entrelazándose como si quisieran tocar el cielo y al mismo tiempo proteger lo que había debajo.", "translation": "" },
                    { "text": "Cada hoja reflejaba la luz de manera diferente, creando un mosaico de sombras y luces que parecía moverse con vida propia.", "translation": "" },
                    { "text": "Clara siguió un sendero que serpenteaba entre los troncos y arbustos, escuchando el murmullo de un arroyo cercano que corría entre piedras cubiertas de musgo.", "translation": "" },
                    { "text": "Un canto melodioso se escuchaba a lo lejos, hipnótico y extraño; no podía identificar si provenía de un pájaro o de alguna criatura mágica del bosque.", "translation": "" },
                    { "text": "Mientras caminaba, descubrió restos de un campamento antiguo: fogatas apagadas, piedras alineadas y marcas grabadas en los árboles que contaban historias de viajeros que habían pasado antes que ella.", "translation": "" },
                    { "text": "Cada símbolo parecía tener un propósito, como advertencias o guías que solo los observadores atentos podían descifrar.", "translation": "" },
                    { "text": "Clara encontró un sendero estrecho que descendía hacia un valle oculto; el aire allí era más fresco y cargado de aroma a tierra mojada y hojas en descomposición.", "translation": "" },
                    { "text": "Entre los arbustos, vio un pequeño ciervo que la observaba con cautela antes de desaparecer entre la maleza, dejándole una sensación de estar siendo bienvenida y evaluada al mismo tiempo.", "translation": "" },
                    { "text": "El valle parecía un mundo aparte, lleno de secretos y rincones que invitaban a la exploración.", "translation": "" },
                    { "text": "Clara encontró una cueva cubierta de líquenes y musgo, y decidió entrar; la oscuridad era espesa, pero llevaba una linterna que iluminaba pasadizos llenos de dibujos antiguos en las paredes.", "translation": "" },
                    { "text": "Cada grabado contaba la historia de guardianes del bosque, de pactos con criaturas del lugar y de rituales que mantenían el equilibrio natural de la región.", "translation": "" },
                    { "text": "Clara se sentó en la entrada de la cueva y abrió un cuaderno propio, comenzando a anotar cada detalle y reflexión sobre lo que estaba descubriendo.", "translation": "" },
                    { "text": "El sol continuaba ascendiendo, y la luz que entraba entre los árboles hacía brillar partículas de polvo y polen en el aire, creando un efecto casi mágico.", "translation": "" },
                    { "text": "A lo lejos, un ruido seco la alertó: ramas rompiéndose bajo algún peso invisible; su corazón se aceleró, pero recordó que el bosque la había estado observando desde su llegada.", "translation": "" },
                    { "text": "Decidió seguir avanzando hacia una colina donde los rayos de luz parecían converger, iluminando un árbol solitario que se destacaba por su tamaño y majestuosidad.", "translation": "" },
                    { "text": "Allí, sentada bajo el árbol, Clara sintió una conexión profunda con el lugar; la energía del bosque parecía fluir hacia ella, transmitiéndole historias y emociones antiguas.", "translation": "" },
                    { "text": "Comprendió que cada paso que daba, cada descubrimiento, era parte de un aprendizaje que la preparaba para desafíos mayores y revelaciones futuras.", "translation": "" },
                    { "text": "La joven pasó la tarde explorando los alrededores, anotando símbolos, observando animales y registrando los cambios de luz que daban forma a cada rincón del bosque.", "translation": "" },
                    { "text": "Al caer la noche, se recostó bajo el árbol solitario, escuchando cómo el viento traía los sonidos de la fauna y cómo la luz de la luna iluminaba suavemente los claros.", "translation": "" },
                    { "text": "En ese momento, Clara entendió que no estaba sola; el bosque la aceptaba como parte de su historia, y que cada día traería nuevas lecciones y secretos por descubrir.", "translation": "" }
                ],
                "vocab": [
                    { "text": "mosaico", "pos": "noun", "translation": "mosaic", "sentence_context": "Cada hoja reflejaba la luz de manera diferente, creando un mosaico de sombras y luces que parecía moverse con vida propia." },
                    { "text": "serpenteaba", "pos": "verb", "translation": "meandered", "sentence_context": "Clara siguió un sendero que serpenteaba entre los troncos y arbustos, escuchando el murmullo de un arroyo cercano que corría entre piedras cubiertas de musgo." },
                    { "text": "líquenes", "pos": "noun", "translation": "lichens", "sentence_context": "Clara encontró una cueva cubierta de líquenes y musgo, y decidió entrar; la oscuridad era espesa, pero llevaba una linterna que iluminaba pasadizos llenos de dibujos antiguos en las paredes." },
                    { "text": "grabados", "pos": "noun", "translation": "engravings", "sentence_context": "Cada grabado contaba la historia de guardianes del bosque, de pactos con criaturas del lugar y de rituales que mantenían el equilibrio natural de la región." },
                    { "text": "cuaderno", "pos": "noun", "translation": "notebook", "sentence_context": "Clara se sentó en la entrada de la cueva y abrió un cuaderno propio, comenzando a anotar cada detalle y reflexión sobre lo que estaba descubriendo." },
                    { "text": "colina", "pos": "noun", "translation": "hill", "sentence_context": "Decidió seguir avanzando hacia una colina donde los rayos de luz parecían converger, iluminando un árbol solitario que se destacaba por su tamaño y majestuosidad." },
                    { "text": "majestuosidad", "pos": "noun", "translation": "majesty", "sentence_context": "Decidió seguir avanzando hacia una colina donde los rayos de luz parecían converger, iluminando un árbol solitario que se destacaba por su tamaño y majestuosidad." },
                    { "text": "fauna", "pos": "noun", "translation": "wildlife", "sentence_context": "Al caer la noche, se recostó bajo el árbol solitario, escuchando cómo el viento traía los sonidos de la fauna y cómo la luz de la luna iluminaba suavemente los claros." },
                    { "text": "claros", "pos": "noun", "translation": "clearings", "sentence_context": "Al caer la noche, se recostó bajo el árbol solitario, escuchando cómo el viento traía los sonidos de la fauna y cómo la luz de la luna iluminaba suavemente los claros." },
                    { "text": "hipnótico", "pos": "adjective", "translation": "hypnotic", "sentence_context": "Un canto melodioso se escuchaba a lo lejos, hipnótico y extraño; no podía identificar si provenía de un pájaro o de alguna criatura mágica del bosque." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 4: El Encuentro", "translation": "" },
                "sentences": [
                    { "text": "Mientras Clara avanzaba por un sendero cubierto de hojas secas, una figura apareció entre los árboles, cubierta por un manto gris que se confundía con la niebla matutina." },
                    { "text": "Su presencia era imponente pero serena, y la joven sintió que cada fibra de su ser reconocía algo familiar en aquel extraño visitante." },
                    { "text": "La figura habló con una voz suave pero cargada de autoridad, relatando historias de generaciones pasadas y secretos que solo los elegidos podían conocer." },
                    { "text": "Clara escuchaba atentamente, absorbiendo cada palabra y tratando de comprender la magnitud de lo que se le estaba revelando." },
                    { "text": "El visitante le ofreció un amuleto antiguo, tallado con símbolos que brillaban tenuemente bajo la luz del bosque, y explicó que pertenecía a su familia desde tiempos inmemoriales." },
                    { "text": "Mientras sostenía el amuleto, Clara sintió una corriente de energía recorrer su brazo, como si la conexión con el bosque y sus antepasados se hiciera tangible." },
                    { "text": "El hombre le indicó que debía seguir ciertos rituales y aprender los nombres de cada criatura y cada árbol para poder mantener el equilibrio que su linaje había protegido durante siglos." },
                    { "text": "Clara tomó notas en su cuaderno mientras caminaban juntos, observando con detenimiento cada símbolo y cada gesto que el misterioso guía le mostraba." },
                    { "text": "Se detuvieron junto a un claro donde la luz del sol caía sobre un árbol solitario, y el hombre le explicó que aquel lugar era un punto de energía ancestral, donde el tiempo parecía doblarse." },
                    { "text": "Mientras escuchaba, Clara comprendió que su aventura no solo implicaba exploración, sino también aprendizaje, disciplina y respeto por fuerzas que trascendían su entendimiento." },
                    { "text": "El guía le enseñó a reconocer patrones en la naturaleza: la dirección del viento, el canto de las aves y la posición de las piedras que marcaban senderos secretos." },
                    { "text": "Al caer la tarde, llegaron a un arroyo donde Clara debía realizar un pequeño ritual de purificación, lavando sus manos y rostro con agua fría mientras recitaba antiguas palabras que el guía le había enseñado." },
                    { "text": "El efecto fue inmediato: una sensación de claridad y conexión con el bosque llenó su mente, como si comprendiera por primera vez su lugar en aquella historia ancestral." },
                    { "text": "El hombre le advirtió que no todos los secretos podían revelarse de inmediato y que la paciencia sería su aliada en los días venideros." },
                    { "text": "Clara pasó la noche cerca del arroyo, anotando cada instrucción y reflexión, sintiendo que cada sonido del bosque era ahora un lenguaje que ella empezaba a descifrar." },
                    { "text": "Durante la oscuridad, vio figuras que se movían entre la bruma, pero ya no sintió miedo; comprendió que formaban parte del ecosistema y de la historia que ella estaba aprendiendo a proteger." },
                    { "text": "Antes de dormir, miró el amuleto y sintió que llevaba consigo no solo un objeto, sino también una responsabilidad que debía honrar con valor y sabiduría." },
                    { "text": "En la quietud de la noche, Clara escuchó el murmullo del bosque, reconociendo en él voces antiguas que la invitaban a continuar su camino y descubrir más secretos." },
                    { "text": "Cuando la primera luz del amanecer iluminó el claro, la joven estaba lista para continuar su aventura, consciente de que aquel encuentro había marcado un antes y un después en su vida." }
                ],
                "vocab": [
                    { "text": "manto", "pos": "noun", "translation": "cloak", "sentence_context": "Una figura apareció entre los árboles, cubierta por un manto gris que se confundía con la niebla matutina." },
                    { "text": "amuleto", "pos": "noun", "translation": "amulet", "sentence_context": "El visitante le ofreció un amuleto antiguo, tallado con símbolos que brillaban tenuemente bajo la luz del bosque, y explicó que pertenecía a su familia desde tiempos inmemoriales." },
                    { "text": "ancestral", "pos": "adjective", "translation": "ancestral", "sentence_context": "Se detuvieron junto a un claro donde la luz del sol caía sobre un árbol solitario, y el hombre le explicó que aquel lugar era un punto de energía ancestral, donde el tiempo parecía doblarse." },
                    { "text": "ritual", "pos": "noun", "translation": "ritual", "sentence_context": "Al caer la tarde, llegaron a un arroyo donde Clara debía realizar un pequeño ritual de purificación, lavando sus manos y rostro con agua fría mientras recitaba antiguas palabras que el guía le había enseñado." },
                    { "text": "purificación", "pos": "noun", "translation": "purification", "sentence_context": "Al caer la tarde, llegaron a un arroyo donde Clara debía realizar un pequeño ritual de purificación, lavando sus manos y rostro con agua fría mientras recitaba antiguas palabras que el guía le había enseñado." },
                    { "text": "disciplinar", "pos": "verb", "translation": "to discipline", "sentence_context": "Clara comprendió que su aventura no solo implicaba exploración, sino también aprendizaje, disciplina y respeto por fuerzas que trascendían su entendimiento." },
                    { "text": "ecosistema", "pos": "noun", "translation": "ecosystem", "sentence_context": "Durante la oscuridad, vio figuras que se movían entre la bruma, pero ya no sintió miedo; comprendió que formaban parte del ecosistema y de la historia que ella estaba aprendiendo a proteger." },
                    { "text": "claridad", "pos": "noun", "translation": "clarity", "sentence_context": "El efecto fue inmediato: una sensación de claridad y conexión con el bosque llenó su mente, como si comprendiera por primera vez su lugar en aquella historia ancestral." },
                    { "text": "responsabilidad", "pos": "noun", "translation": "responsibility", "sentence_context": "Antes de dormir, miró el amuleto y sintió que llevaba consigo no solo un objeto, sino también una responsabilidad que debía honrar con valor y sabiduría." },
                    { "text": "valor", "pos": "noun", "translation": "courage", "sentence_context": "Antes de dormir, miró el amuleto y sintió que llevaba consigo no solo un objeto, sino también una responsabilidad que debía honrar con valor y sabiduría." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 5: Revelaciones", "translation": "" },
                "sentences": [
                    { "text": "Al día siguiente, Clara se adentró en un sendero que subía por la ladera de una colina, rodeada de árboles que parecían susurrar historias al viento." },
                    { "text": "Cada paso la acercaba a un claro donde la luz se filtraba en haces dorados, iluminando piedras antiguas que habían sido colocadas con cuidado, formando un patrón enigmático." },
                    { "text": "Mientras examinaba las piedras, Clara notó inscripciones talladas que contaban la historia de sus antepasados y los pactos que habían hecho con el bosque." },
                    { "text": "Recordó las palabras del guía del día anterior, y comprendió que cada símbolo era una lección de respeto, paciencia y vigilancia para proteger el equilibrio natural." },
                    { "text": "A lo lejos, un ciervo cruzó el claro, mirándola con ojos que parecían conocer su destino y luego desapareció entre los arbustos." },
                    { "text": "Clara encontró un árbol enorme con corteza marcada por runas y símbolos antiguos; al tocarlo, sintió una vibración que recorría todo su cuerpo, conectándola con la energía del lugar." },
                    { "text": "Sacó su cuaderno y comenzó a anotar cada detalle, cada inscripción, y cada emoción que sentía; era consciente de que cada descubrimiento la acercaba a comprender los secretos más profundos del bosque." },
                    { "text": "Entre los símbolos, notó un patrón que coincidía con los mapas que había encontrado en la cabaña, y entendió que debía seguir ese camino para descubrir una verdad importante." },
                    { "text": "Mientras avanzaba, el viento soplaba de manera suave, llevando consigo aromas de flores, tierra y hojas secas, y cada inhalación le recordaba la conexión entre su familia y el bosque." },
                    { "text": "Clara llegó a un pequeño lago oculto entre colinas y árboles densos; el agua reflejaba la luz de manera cristalina, y su superficie parecía guardar secretos del pasado." },
                    { "text": "Se acercó y vio figuras difuminadas en el reflejo, imágenes de personas que habían recorrido el bosque antes que ella, sus ancestros, que la miraban con aprobación y advertencia." },
                    { "text": "En el borde del lago, halló un pergamino enrollado protegido por piedras; al desplegarlo, encontró un mapa detallado que mostraba un camino hacia un santuario secreto." },
                    { "text": "Clara comprendió que su aventura no solo era de exploración física, sino de descubrimiento interior; cada paso la preparaba para asumir un rol importante en la protección del bosque." },
                    { "text": "El sol comenzaba a descender, y la luz del atardecer pintaba el lago con tonos naranjas y rosados, creando un ambiente mágico y solemne a la vez." },
                    { "text": "Decidió acampar cerca del lago, observando las estrellas aparecer una a una, y sintió que cada constelación parecía contarle historias que solo los que respetan el bosque podían entender." },
                    { "text": "Durante la noche, escuchó susurros que no provenían del viento, sino del agua y de los árboles; eran ecos de sabiduría y advertencias que debía recordar." },
                    { "text": "Clara comprendió que cada revelación traía consigo responsabilidad y que su camino requeriría coraje, inteligencia y empatía hacia todas las criaturas del bosque." },
                    { "text": "Antes de dormir, escribió en su cuaderno que había aprendido más en un solo día que en muchas semanas anteriores, y que cada hallazgo era un paso hacia su destino." },
                    { "text": "El bosque la acogía, y ella comenzaba a sentirse no solo visitante, sino guardiana de secretos que trascendían generaciones." }
                ],
                "vocab": [
                    { "text": "ladera", "pos": "noun", "translation": "slope", "sentence_context": "Al día siguiente, Clara se adentró en un sendero que subía por la ladera de una colina, rodeada de árboles que parecían susurrar historias al viento." },
                    { "text": "enigmático", "pos": "adjective", "translation": "enigmatic", "sentence_context": "Cada paso la acercaba a un claro donde la luz se filtraba en haces dorados, iluminando piedras antiguas que habían sido colocadas con cuidado, formando un patrón enigmático." },
                    { "text": "runas", "pos": "noun", "translation": "runes", "sentence_context": "Clara encontró un árbol enorme con corteza marcada por runas y símbolos antiguos; al tocarlo, sintió una vibración que recorría todo su cuerpo, conectándola con la energía del lugar." },
                    { "text": "reflejar", "pos": "verb", "translation": "to reflect", "sentence_context": "El agua reflejaba la luz de manera cristalina, y su superficie parecía guardar secretos del pasado." },
                    { "text": "constelación", "pos": "noun", "translation": "constellation", "sentence_context": "Decidió acampar cerca del lago, observando las estrellas aparecer una a una, y sintió que cada constelación parecía contarle historias que solo los que respetan el bosque podían entender." },
                    { "text": "santuario", "pos": "noun", "translation": "sanctuary", "sentence_context": "Al desplegarlo, encontró un mapa detallado que mostraba un camino hacia un santuario secreto." },
                    { "text": "advertencia", "pos": "noun", "translation": "warning", "sentence_context": "En el borde del lago, halló un pergamino enrollado protegido por piedras; al desplegarlo, encontró un mapa detallado que mostraba un camino hacia un santuario secreto." },
                    { "text": "empatía", "pos": "noun", "translation": "empathy", "sentence_context": "Clara comprendió que cada revelación traía consigo responsabilidad y que su camino requeriría coraje, inteligencia y empatía hacia todas las criaturas del bosque." },
                    { "text": "trascender", "pos": "verb", "translation": "to transcend", "sentence_context": "El bosque la acogía, y ella comenzaba a sentirse no solo visitante, sino guardiana de secretos que trascendían generaciones." },
                    { "text": "magia", "pos": "noun", "translation": "magic", "sentence_context": "El sol comenzaba a descender, y la luz del atardecer pintaba el lago con tonos naranjas y rosados, creando un ambiente mágico y solemne a la vez." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Capítulo 6: El Legado", "translation": "" },
                "sentences": [
                    { "text": "Clara despertó con la primera luz del amanecer, sintiendo que aquel día marcaría el cierre de su aventura y el inicio de su verdadera misión." },
                    { "text": "Se dirigió al santuario secreto que había descubierto en el mapa del lago, cada paso resonando con determinación y respeto." },
                    { "text": "El sendero estaba rodeado de árboles centenarios y flores silvestres que parecían saludarla con cada brisa que agitaba sus hojas." },
                    { "text": "Al llegar al santuario, un lugar lleno de piedras talladas y símbolos antiguos, Clara comprendió que estaba frente al corazón del bosque, donde la energía ancestral se concentraba." },
                    { "text": "Colocó el amuleto que le había dado el guía en un pedestal central, y al instante una luz cálida iluminó todo el lugar, revelando grabados y mensajes ocultos que solo podían verse bajo esa luz." },
                    { "text": "Las palabras inscritas contaban la historia de su familia y cómo habían protegido el bosque durante generaciones, transmitiendo conocimientos y rituales a los descendientes elegidos." },
                    { "text": "Clara sintió una mezcla de orgullo y responsabilidad; comprendió que su linaje no solo tenía raíces, sino un deber vivo que debía continuar." },
                    { "text": "Un suave viento acarició su rostro, como si los antepasados le enviaran su aprobación y bendición, recordándole que no estaba sola en esta misión." },
                    { "text": "El bosque alrededor parecía susurrarle secretos que hasta ese momento no había comprendido; cada árbol, cada roca, cada arroyo formaba parte de un legado que debía respetar y proteger." },
                    { "text": "Clara abrió su cuaderno y anotó cada detalle, cada símbolo, cada emoción, asegurándose de que el conocimiento quedara registrado para futuras generaciones." },
                    { "text": "Comprendió que ser guardiana del bosque no significaba solo exploración, sino también enseñanza, guía y conexión con todos los seres que habitaban aquel lugar." },
                    { "text": "Mientras el sol se elevaba, la joven sintió que el bosque le ofrecía la comprensión de que su viaje no había sido casual, sino un llamado destinado a prepararla para este momento." },
                    { "text": "Recordó los rituales, los encuentros y las lecciones aprendidas en cada capítulo de su aventura; todo convergía en ese instante de claridad y propósito." },
                    { "text": "Con el corazón lleno de determinación, Clara prometió respetar el legado, proteger los secretos y enseñar a quienes tuvieran la sensibilidad de escuchar y aprender." },
                    { "text": "El santuario parecía cobrar vida, y la energía que se liberaba iluminó el bosque cercano, como un recordatorio de que el equilibrio dependía de aquellos que comprendieran y actuaran con sabiduría." },
                    { "text": "Al descender del pedestal, Clara notó que el bosque parecía más vivo, más consciente; cada sonido y movimiento la invitaban a continuar su misión con respeto y cuidado." },
                    { "text": "Antes de marcharse, miró el horizonte y comprendió que su historia apenas comenzaba; cada día sería una oportunidad para honrar el legado y mantener la armonía del bosque." },
                    { "text": "Con una última mirada al santuario, Clara partió, llevando consigo la certeza de que su linaje y el bosque estaban unidos en un vínculo indestructible." },
                    { "text": "La joven comprendió que el verdadero tesoro no eran los objetos ni los mapas, sino la sabiduría adquirida, la conexión con el entorno y la responsabilidad que ahora abrazaba con orgullo." },
                    { "text": "Así, Clara inició un nuevo capítulo de su vida, consciente de que cada elección, cada acción y cada aprendizaje contribuirían al legado que debía preservar y transmitir." }
                ],
                "vocab": [
                    { "text": "pedestal", "pos": "noun", "translation": "pedestal", "sentence_context": "Colocó el amuleto que le había dado el guía en un pedestal central, y al instante una luz cálida iluminó todo el lugar, revelando grabados y mensajes ocultos que solo podían verse bajo esa luz." },
                    { "text": "legado", "pos": "noun", "translation": "legacy", "sentence_context": "El bosque alrededor parecía susurrarle secretos que hasta ese momento no había comprendido; cada árbol, cada roca, cada arroyo formaba parte de un legado que debía respetar y proteger." },
                    { "text": "armonía", "pos": "noun", "translation": "harmony", "sentence_context": "Con una última mirada al santuario, Clara partió, llevando consigo la certeza de que su linaje y el bosque estaban unidos en un vínculo indestructible." },
                    { "text": "convergir", "pos": "verb", "translation": "to converge", "sentence_context": "Recordó los rituales, los encuentros y las lecciones aprendidas en cada capítulo de su aventura; todo convergía en ese instante de claridad y propósito." },
                    { "text": "sabiduría", "pos": "noun", "translation": "wisdom", "sentence_context": "Así, Clara inició un nuevo capítulo de su vida, consciente de que cada elección, cada acción y cada aprendizaje contribuirían al legado que debía preservar y transmitir." },
                    { "text": "trascender", "pos": "verb", "translation": "to transcend", "sentence_context": "El bosque alrededor parecía susurrarle secretos que hasta ese momento no había comprendido; cada árbol, cada roca, cada arroyo formaba parte de un legado que debía respetar y proteger." },
                    { "text": "responsabilidad", "pos": "noun", "translation": "responsibility", "sentence_context": "Con el corazón lleno de determinación, Clara prometió respetar el legado, proteger los secretos y enseñar a quienes tuvieran la sensibilidad de escuchar y aprender." },
                    { "text": "conexión", "pos": "noun", "translation": "connection", "sentence_context": "Recordó los rituales, los encuentros y las lecciones aprendidas en cada capítulo de su aventura; todo convergía en ese instante de claridad y propósito." },
                    { "text": "claridad", "pos": "noun", "translation": "clarity", "sentence_context": "Recordó los rituales, los encuentros y las lecciones aprendidas en cada capítulo de su aventura; todo convergía en ese instante de claridad y propósito." },
                    { "text": "vínculo", "pos": "noun", "translation": "bond", "sentence_context": "Con una última mirada al santuario, Clara partió, llevando consigo la certeza de que su linaje y el bosque estaban unidos en un vínculo indestructible." }
                ]
            }
        ],
        "wordCount": 4530,
        "created_at": "2025-08-18T04:10:00Z"
    },
    {
        "id": "uuid-stageplay-1",
        "userId": "usr_123",
        "title": "La Sombra del Bosque: El Legado Escénico",
        "storySeed": "Clara descubre un bosque ancestral y debe aprender los secretos de sus antepasados mientras enfrenta desafíos y misterios en un formato teatral.",
        "coverImageUrl": null,
        "tags": {
            "theme": ["misterio", "aventura", "leyenda", "teatro"],
            "tone": ["suspenso", "épico", "dramático"],
            "genre": ["obra de teatro", "drama"]
        },
        "storyType": "stageplay",
        "proficiency": "advanced",
        "summary": { 
            "text": "Clara entra en un bosque misterioso donde las fuerzas ancestrales y los secretos familiares se manifiestan a través de actos y escenas dramáticas.", 
            "translation": "" 
        },
        "pages": [
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Acto 1, Escena 1: La Llegada al Bosque", "translation": "" },
                "sentences": [
                    { "text": "Escenario: Un claro en el bosque, con árboles altos y niebla que se levanta lentamente." },
                    { "text": "Clara entra desde la derecha, cargando una mochila y un cuaderno." },
                    { "text": "Clara: (mirando alrededor) Este lugar… es más grande y misterioso de lo que imaginé. Cada árbol parece susurrar secretos antiguos." },
                    { "text": "Se escucha el murmullo de un arroyo cercano y el canto de pájaros lejanos." },
                    { "text": "Clara avanza con cautela, tomando notas en su cuaderno, mientras observa el entorno con fascinación y respeto." },
                    { "text": "De repente, se oye un crujido de ramas; Clara se detiene y se gira hacia la fuente del sonido." },
                    { "text": "Figura misteriosa (desde las sombras): No temas. He estado observándote desde que entraste." },
                    { "text": "Clara: (sorprendida) ¿Quién… quién eres? ¿Cómo sabes que estoy aquí?" },
                    { "text": "Figura misteriosa: Soy un guardián de este bosque. Y tú, Clara, has sido llamada para aprender sus secretos." },
                    { "text": "Clara: (tomando aire) ¿Sus secretos? No entiendo… ¿qué esperan de mí?" },
                    { "text": "Guardían: Cada acción tuya aquí tiene un propósito. Observa, aprende, respeta. Solo entonces comprenderás tu rol." },
                    { "text": "Clara: (anotando) Entiendo… debo aprender a escuchar al bosque." },
                    { "text": "Guardían: Exactamente. Ven, te mostraré un lugar donde podrás comenzar tu entrenamiento." },
                    { "text": "Ambos caminan hacia un sendero iluminado por rayos de sol que atraviesan los árboles. Clara observa cada detalle y continúa anotando en su cuaderno." },
                    { "text": "Clara: (en voz baja) Cada símbolo, cada sombra… todo parece tener un significado." },
                    { "text": "Guardían: Lo tiene. Y aprenderás a descifrarlo con paciencia y respeto." },
                    { "text": "Se acercan a un claro donde hay un círculo de piedras antiguas y runas talladas." },
                    { "text": "Guardían: Aquí es donde tu viaje comienza. Cada símbolo tiene un nombre, un propósito y una historia." },
                    { "text": "Clara: (emocionada) No puedo esperar para descubrirlo todo." },
                    { "text": "Guardían: Recuerda, cada descubrimiento trae responsabilidad. Este bosque confía en ti." }
                ],
                "vocab": [
                    { "text": "claro", "pos": "noun", "translation": "clearing", "sentence_context": "Escenario: Un claro en el bosque, con árboles altos y niebla que se levanta lentamente." },
                    { "text": "susurrar", "pos": "verb", "translation": "to whisper", "sentence_context": "Cada árbol parece susurrar secretos antiguos." },
                    { "text": "cautela", "pos": "noun", "translation": "caution", "sentence_context": "Clara avanza con cautela, tomando notas en su cuaderno, mientras observa el entorno con fascinación y respeto." },
                    { "text": "entorno", "pos": "noun", "translation": "environment", "sentence_context": "Clara avanza con cautela, tomando notas en su cuaderno, mientras observa el entorno con fascinación y respeto." },
                    { "text": "misterioso", "pos": "adjective", "translation": "mysterious", "sentence_context": "Figura misteriosa (desde las sombras): No temas. He estado observándote desde que entraste." },
                    { "text": "propósito", "pos": "noun", "translation": "purpose", "sentence_context": "Cada acción tuya aquí tiene un propósito. Observa, aprende, respeta." },
                    { "text": "respeto", "pos": "noun", "translation": "respect", "sentence_context": "Cada acción tuya aquí tiene un propósito. Observa, aprende, respeta." },
                    { "text": "símbolo", "pos": "noun", "translation": "symbol", "sentence_context": "Cada símbolo tiene un nombre, un propósito y una historia." },
                    { "text": "entrenamiento", "pos": "noun", "translation": "training", "sentence_context": "Aquí es donde tu viaje comienza. Cada símbolo tiene un nombre, un propósito y una historia." },
                    { "text": "confiar", "pos": "verb", "translation": "to trust", "sentence_context": "Este bosque confía en ti." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Acto 1, Escena 2: Pruebas y Revelaciones", "translation": "" },
                "sentences": [
                    { "text": "Escenario: Un sendero estrecho, rodeado de árboles densos y raíces que se entrecruzan en el suelo." },
                    { "text": "Clara camina con cautela, tomando nota de cada símbolo tallado en los árboles." },
                    { "text": "Clara: (mirando las runas) Cada marca tiene un significado… debo descifrarlo antes de avanzar." },
                    { "text": "Se oye un susurro que parece surgir del bosque mismo." },
                    { "text": "Voz del bosque: Solo aquellos que escuchan con atención encontrarán el camino." },
                    { "text": "Clara: (sorprendida) ¿Quién habla? ¿Es real o es mi imaginación?" },
                    { "text": "Un ciervo aparece entre los árboles, mirándola fijamente antes de desaparecer entre la niebla." },
                    { "text": "Clara: (anotando) Cada criatura parece guiarme de alguna manera… debo seguir observando." },
                    { "text": "Figura del guardián aparece de nuevo: Para comprender, debes confiar en tu intuición y en lo que el bosque te muestra." },
                    { "text": "Clara: (asintiendo) Entiendo. Debo equilibrar el aprendizaje con la paciencia." },
                    { "text": "Guardían: Exactamente. Ahora continúa hasta el claro donde los secretos se revelan a quienes perseveran." },
                    { "text": "Clara avanza y llega a un claro iluminado por rayos de sol que atraviesan las ramas." },
                    { "text": "Allí encuentra piedras con inscripciones antiguas y símbolos que brillan tenuemente." },
                    { "text": "Clara: (maravillada) Nunca había visto algo así… cada símbolo parece contar una historia viva." },
                    { "text": "Guardían: Observa y aprende; cada historia está conectada con el bosque y sus guardianes." },
                    { "text": "Clara toca una piedra, y siente una energía que recorre su brazo, conectándola con el lugar." },
                    { "text": "Clara: (susurrando) Siento la historia… puedo sentir la vida que late aquí." },
                    { "text": "Se oye un viento suave que mueve las hojas y parece responder a sus palabras." },
                    { "text": "Guardían: Has dado el primer paso para comprender el legado. Cada descubrimiento requiere respeto y responsabilidad." },
                    { "text": "Clara: (determinada) Prometo honrar el legado y proteger los secretos del bosque." }
                ],
                "vocab": [
                    { "text": "estrecho", "pos": "adjective", "translation": "narrow", "sentence_context": "Escenario: Un sendero estrecho, rodeado de árboles densos y raíces que se entrecruzan en el suelo." },
                    { "text": "entrelazarse", "pos": "verb", "translation": "to intertwine", "sentence_context": "Escenario: Un sendero estrecho, rodeado de árboles densos y raíces que se entrecruzan en el suelo." },
                    { "text": "intuición", "pos": "noun", "translation": "intuition", "sentence_context": "Para comprender, debes confiar en tu intuición y en lo que el bosque te muestra." },
                    { "text": "perseverar", "pos": "verb", "translation": "to persevere", "sentence_context": "Ahora continúa hasta el claro donde los secretos se revelan a quienes perseveran." },
                    { "text": "brillar", "pos": "verb", "translation": "to shine", "sentence_context": "Allí encuentra piedras con inscripciones antiguas y símbolos que brillan tenuemente." },
                    { "text": "maravillado", "pos": "adjective", "translation": "marveling", "sentence_context": "Clara: (maravillada) Nunca había visto algo así… cada símbolo parece contar una historia viva." },
                    { "text": "conectarse", "pos": "verb", "translation": "to connect", "sentence_context": "Clara toca una piedra, y siente una energía que recorre su brazo, conectándola con el lugar." },
                    { "text": "legado", "pos": "noun", "translation": "legacy", "sentence_context": "Has dado el primer paso para comprender el legado." },
                    { "text": "responsabilidad", "pos": "noun", "translation": "responsibility", "sentence_context": "Cada descubrimiento requiere respeto y responsabilidad." },
                    { "text": "determinación", "pos": "noun", "translation": "determination", "sentence_context": "Clara: (determinada) Prometo honrar el legado y proteger los secretos del bosque." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Acto 2, Escena 1: La Prueba de los Espíritus", "translation": "" },
                "sentences": [
                    { "text": "Escenario: Un valle oscuro con niebla baja y árboles que se arquean como si quisieran tocar el suelo." },
                    { "text": "Clara entra lentamente, observando cada sombra y escuchando el sonido distante de agua corriendo." },
                    { "text": "Clara: (en voz baja) Algo no se siente natural aquí… debo mantener la calma." },
                    { "text": "Se oyen susurros que parecen provenir de todas partes." },
                    { "text": "Voz del bosque: Solo quienes enfrentan sus miedos con valentía podrán avanzar." },
                    { "text": "Clara: (respirando profundo) Debo concentrarme y no dejarme intimidar por ilusiones." },
                    { "text": "Un espíritu aparece flotando entre la niebla, con ojos brillantes y forma cambiante." },
                    { "text": "Espíritu: Para continuar, debes mostrar que comprendes la conexión entre todo lo vivo." },
                    { "text": "Clara: (mirando alrededor) Cada criatura, cada planta… todas tienen un rol, un propósito." },
                    { "text": "Espíritu: Correcto. Ahora toca demostrarlo con tus acciones." },
                    { "text": "Clara encuentra un árbol caído que bloquea el sendero y decide no moverlo, sino rodearlo con cuidado para no dañar las raíces cercanas." },
                    { "text": "Espíritu: Bien hecho. Tus decisiones reflejan respeto y sabiduría." },
                    { "text": "Se escuchan murmullos de aprobación en el viento, como si el bosque celebrara su elección." },
                    { "text": "Clara: (emocionada) Nunca imaginé que entender al bosque fuera tan profundo… no solo observar, sino sentir y respetar." },
                    { "text": "Otro espíritu aparece, más grande y majestuoso, con alas que parecen hechas de luz y hojas." },
                    { "text": "Espíritu mayor: Clara, cada acto tuyo tiene consecuencias. Lo que haces aquí repercute más allá del valle." },
                    { "text": "Clara: (asintiendo) Entiendo. Debo pensar antes de actuar y siempre considerar al bosque y sus guardianes." },
                    { "text": "El espíritu mayor guía a Clara hacia un círculo de piedras que brillan con símbolos antiguos." },
                    { "text": "Espíritu mayor: Aquí es donde aprendes la lección más importante: la paciencia y la empatía son la clave para armonizar con la naturaleza." },
                    { "text": "Clara se arrodilla frente a las piedras y toca cada símbolo, sintiendo cómo una corriente cálida recorre su cuerpo." },
                    { "text": "Clara: (susurrando) Puedo sentir su energía… debo protegerla y comprenderla." },
                    { "text": "El espíritu mayor desaparece lentamente, dejando a Clara en silencio, con la comprensión de que su viaje apenas ha comenzado." }
                ],
                "vocab": [
                    { "text": "valle", "pos": "noun", "translation": "valley", "sentence_context": "Escenario: Un valle oscuro con niebla baja y árboles que se arquean como si quisieran tocar el suelo." },
                    { "text": "arquee", "pos": "verb", "translation": "to arch", "sentence_context": "Escenario: Un valle oscuro con niebla baja y árboles que se arquean como si quisieran tocar el suelo." },
                    { "text": "ilusión", "pos": "noun", "translation": "illusion", "sentence_context": "Debo concentrarme y no dejarme intimidar por ilusiones." },
                    { "text": "consecuencia", "pos": "noun", "translation": "consequence", "sentence_context": "Cada acto tuyo tiene consecuencias. Lo que haces aquí repercute más allá del valle." },
                    { "text": "repercutir", "pos": "verb", "translation": "to affect / to reverberate", "sentence_context": "Cada acto tuyo tiene consecuencias. Lo que haces aquí repercute más allá del valle." },
                    { "text": "empatia", "pos": "noun", "translation": "empathy", "sentence_context": "La paciencia y la empatía son la clave para armonizar con la naturaleza." },
                    { "text": "armonizar", "pos": "verb", "translation": "to harmonize", "sentence_context": "La paciencia y la empatía son la clave para armonizar con la naturaleza." },
                    { "text": "majestuoso", "pos": "adjective", "translation": "majestic", "sentence_context": "Otro espíritu aparece, más grande y majestuoso, con alas que parecen hechas de luz y hojas." },
                    { "text": "corriente", "pos": "noun", "translation": "current", "sentence_context": "Sintiendo cómo una corriente cálida recorre su cuerpo." },
                    { "text": "brillar", "pos": "verb", "translation": "to shine", "sentence_context": "Un círculo de piedras que brillan con símbolos antiguos." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Acto 2, Escena 2: Encuentro con los Guardianes", "translation": "" },
                "sentences": [
                    { "text": "Escenario: Un claro iluminado por la luz de la luna, con árboles que forman un círculo natural." },
                    { "text": "Clara avanza con cautela, observando sombras que se mueven entre los troncos." },
                    { "text": "Clara: (susurrando) Esto es… impresionante. Siento que no estoy sola." },
                    { "text": "De repente, tres guardianes aparecen, cada uno con rasgos distintos: uno cubierto de musgo, otro con plumas brillantes y el último con ojos que reflejan estrellas." },
                    { "text": "Guardián de musgo: Bienvenida, Clara. Has demostrado paciencia y respeto en tu viaje hasta aquí." },
                    { "text": "Clara: (inclinando la cabeza) Gracias. Estoy lista para aprender todo lo que me puedan enseñar." },
                    { "text": "Guardián de plumas: Pero cada lección tiene su prueba. Solo al enfrentar desafíos podrás comprender la verdadera esencia del bosque." },
                    { "text": "Clara: (determined) Estoy preparada. Que comiencen las pruebas." },
                    { "text": "Guardián de estrellas: Primero, debes atravesar el Laberinto de Reflejos, donde tu corazón será la guía." },
                    { "text": "Clara observa un sendero que se divide en múltiples caminos, todos brillando tenuemente bajo la luz de la luna." },
                    { "text": "Clara: (pensando) Debo confiar en mis instintos… cada decisión importa." },
                    { "text": "Avanza por el laberinto, y a cada paso las sombras cobran formas que reflejan sus miedos y dudas." },
                    { "text": "Clara: (respirando profundo) No debo dejar que el miedo me domine. Cada reflejo es una lección." },
                    { "text": "Escucha voces susurrando: No eres suficiente… ¿de verdad puedes proteger el legado?" },
                    { "text": "Clara: (firmemente) Sí puedo. Con paciencia y respeto, puedo aprender y proteger este bosque." },
                    { "text": "Finalmente, llega al centro del laberinto, donde una piedra tallada con símbolos antiguos emite una luz cálida." },
                    { "text": "Guardián de musgo: Has superado la primera prueba. Tu corazón ha demostrado valor y claridad." },
                    { "text": "Guardián de plumas: Cada paso de tu viaje te acerca a comprender los secretos más profundos." },
                    { "text": "Guardián de estrellas: Recuerda siempre que el bosque no solo observa, sino que también siente y responde." },
                    { "text": "Clara: (emocionada) Lo entiendo. Debo escuchar y aprender de cada ser, de cada sombra y de cada símbolo." },
                    { "text": "Los guardianes asienten y desaparecen lentamente entre la niebla, dejando a Clara con un sentido renovado de propósito y responsabilidad." },
                    { "text": "Clara: (susurrando) Mi viaje apenas comienza… y cada lección me prepara para proteger el legado del bosque." }
                ],
                "vocab": [
                    { "text": "musgo", "pos": "noun", "translation": "moss", "sentence_context": "Guardián de musgo: Bienvenida, Clara." },
                    { "text": "pluma", "pos": "noun", "translation": "feather", "sentence_context": "Guardián de plumas: Pero cada lección tiene su prueba." },
                    { "text": "reflejo", "pos": "noun", "translation": "reflection", "sentence_context": "Donde tu corazón será la guía." },
                    { "text": "laberinto", "pos": "noun", "translation": "maze", "sentence_context": "Primero, debes atravesar el Laberinto de Reflejos." },
                    { "text": "instinto", "pos": "noun", "translation": "instinct", "sentence_context": "Debo confiar en mis instintos… cada decisión importa." },
                    { "text": "sombra", "pos": "noun", "translation": "shadow", "sentence_context": "A cada paso las sombras cobran formas que reflejan sus miedos y dudas." },
                    { "text": "claridad", "pos": "noun", "translation": "clarity", "sentence_context": "Tu corazón ha demostrado valor y claridad." },
                    { "text": "propósito", "pos": "noun", "translation": "purpose", "sentence_context": "Dejando a Clara con un sentido renovado de propósito y responsabilidad." },
                    { "text": "renovado", "pos": "adjective", "translation": "renewed", "sentence_context": "Dejando a Clara con un sentido renovado de propósito y responsabilidad." },
                    { "text": "responsabilidad", "pos": "noun", "translation": "responsibility", "sentence_context": "Dejando a Clara con un sentido renovado de propósito y responsabilidad." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Acto 3, Escena 1: La Revelación del Legado", "translation": "" },
                "sentences": [
                    { "text": "Escenario: Un claro elevado, con vista a todo el bosque y una cascada brillante al fondo." },
                    { "text": "Clara entra con determinación, sintiendo la energía del bosque fluir a su alrededor." },
                    { "text": "Clara: (susurrando) Cada paso, cada símbolo, cada criatura… todo me ha traído hasta aquí." },
                    { "text": "Se oye un coro de voces suaves, como si los árboles y las piedras hablaran al unísono." },
                    { "text": "Voz del bosque: Clara, has demostrado paciencia, valor y respeto. Ahora conocerás la verdad del legado." },
                    { "text": "Clara: (respirando profundo) Estoy lista. Muéstrame." },
                    { "text": "El guardián mayor aparece, cubierto de luz y raíces entrelazadas, con ojos que reflejan siglos de conocimiento." },
                    { "text": "Guardían mayor: Todo lo que has aprendido está conectado. Cada acción y decisión forma parte del equilibrio del bosque." },
                    { "text": "Clara observa símbolos flotando en el aire, cada uno contando una historia de generaciones pasadas." },
                    { "text": "Clara: (maravillada) Puedo sentir la historia… la vida de quienes cuidaron este lugar antes que yo." },
                    { "text": "Guardían mayor: Ahora entiendes. Este legado requiere de un protector consciente, alguien que respete la armonía de todas las cosas." },
                    { "text": "Clara: (determinada) Prometo proteger este bosque y sus secretos con todo mi ser." },
                    { "text": "Se escuchan susurros de aprobación y la energía del bosque envuelve a Clara, llenándola de conocimiento y poder." },
                    { "text": "Guardían mayor: Recuerda, Clara, el verdadero poder reside en la empatía, la paciencia y la comprensión." },
                    { "text": "Clara: (asintiendo) Comprendo. No se trata solo de aprender, sino de sentir y actuar con respeto." },
                    { "text": "Un haz de luz desciende desde el cielo, iluminando a Clara y los símbolos que flotan a su alrededor." },
                    { "text": "Clara: (emocionada) Este momento… sé que será el inicio de algo grande. Debo usar lo aprendido para proteger y guiar." },
                    { "text": "El bosque parece susurrar en reconocimiento, y una brisa cálida acaricia su rostro." },
                    { "text": "Guardían mayor: Tu viaje no termina aquí, Clara. Pero has dado el primer paso para convertirte en la guardiana que el bosque necesita." },
                    { "text": "Clara: (determinada) Estoy lista para asumir mi papel y honrar a todos los que vinieron antes." }
                ],
                "vocab": [
                    { "text": "cascada", "pos": "noun", "translation": "waterfall", "sentence_context": "Un claro elevado, con vista a todo el bosque y una cascada brillante al fondo." },
                    { "text": "armonía", "pos": "noun", "translation": "harmony", "sentence_context": "Alguien que respete la armonía de todas las cosas." },
                    { "text": "generación", "pos": "noun", "translation": "generation", "sentence_context": "Cada uno contando una historia de generaciones pasadas." },
                    { "text": "consciente", "pos": "adjective", "translation": "aware / conscious", "sentence_context": "Este legado requiere de un protector consciente." },
                    { "text": "envolver", "pos": "verb", "translation": "to envelop", "sentence_context": "La energía del bosque envuelve a Clara, llenándola de conocimiento y poder." },
                    { "text": "haz", "pos": "noun", "translation": "beam", "sentence_context": "Un haz de luz desciende desde el cielo, iluminando a Clara y los símbolos que flotan a su alrededor." },
                    { "text": "susurro", "pos": "noun", "translation": "whisper", "sentence_context": "El bosque parece susurrar en reconocimiento." },
                    { "text": "acariciar", "pos": "verb", "translation": "to caress", "sentence_context": "Una brisa cálida acaricia su rostro." },
                    { "text": "proteger", "pos": "verb", "translation": "to protect", "sentence_context": "Debo usar lo aprendido para proteger y guiar." },
                    { "text": "honrar", "pos": "verb", "translation": "to honor", "sentence_context": "Estoy lista para asumir mi papel y honrar a todos los que vinieron antes." }
                ]
            },
            {
                "audioUrl": null,
                "chapterTitle": { "text": "Acto 3, Escena 2: El Legado Cumplido", "translation": "" },
                "sentences": [
                    { "text": "Escenario: Un claro iluminado por la primera luz del amanecer, con la cascada reflejando destellos dorados en el bosque." },
                    { "text": "Clara se encuentra de pie en el centro del círculo de piedras, rodeada por los guardianes y criaturas del bosque." },
                    { "text": "Clara: (con voz firme) Hoy entiendo que mi papel no es solo aprender, sino también proteger y guiar." },
                    { "text": "Guardián de musgo: Has demostrado paciencia y respeto, Clara. Has pasado todas las pruebas." },
                    { "text": "Guardián de plumas: El bosque confía en ti. Cada criatura, cada símbolo, cada sombra reconoce tu compromiso." },
                    { "text": "Guardián de estrellas: Recuerda siempre que la fuerza verdadera nace de la empatía y la sabiduría, no del poder." },
                    { "text": "Clara: (asintiendo) Comprendo. Mi misión es mantener el equilibrio y honrar a quienes vinieron antes." },
                    { "text": "Se escuchan susurros de celebración mezclados con el canto de los pájaros matutinos." },
                    { "text": "Clara camina entre los símbolos que flotan suavemente en el aire, tocándolos y sintiendo la energía que emanan." },
                    { "text": "Clara: (susurrando) Todo esto… es más grande de lo que jamás imaginé. Cada acto, cada decisión, tiene un significado." },
                    { "text": "Los guardianes observan con aprobación mientras Clara comienza a organizar los símbolos, alineándolos según su aprendizaje." },
                    { "text": "Guardián mayor: Has aprendido que cada acción tiene repercusiones y que la armonía se mantiene con respeto y atención." },
                    { "text": "Clara: (determinada) Mi viaje no termina aquí. Continuaré explorando y aprendiendo, para proteger este bosque y su legado." },
                    { "text": "Una luz dorada desciende desde el cielo, envolviendo a Clara y los símbolos, mientras el bosque parece vibrar con gratitud." },
                    { "text": "Clara: (emocionada) Siento que finalmente comprendo… debo escuchar, aprender, y actuar con cuidado y respeto." },
                    { "text": "Guardían de musgo: Has completado la transformación. Ahora eres la guardiana que el bosque necesitaba." },
                    { "text": "Clara: (con reverencia) Prometo proteger este lugar y compartir sus enseñanzas con aquellos que estén preparados." },
                    { "text": "Los guardianes desaparecen lentamente, dejando a Clara en el claro, con la luz del amanecer reflejando en sus ojos y el bosque vibrando suavemente a su alrededor." },
                    { "text": "Clara: (susurrando) Este es solo el comienzo… cada día será una oportunidad para honrar y aprender." },
                    { "text": "Se escucha un último susurro: Bienvenida, guardiana." },
                    { "text": "Clara sonríe, respirando profundamente, mientras el bosque se despierta a la nueva luz y su legado queda sellado." }
                ],
                "vocab": [
                    { "text": "amanecer", "pos": "noun", "translation": "dawn", "sentence_context": "Un claro iluminado por la primera luz del amanecer." },
                    { "text": "destello", "pos": "noun", "translation": "glimmer / sparkle", "sentence_context": "Con la cascada reflejando destellos dorados en el bosque." },
                    { "text": "repercusiones", "pos": "noun", "translation": "repercussions", "sentence_context": "Has aprendido que cada acción tiene repercusiones." },
                    { "text": "vibrar", "pos": "verb", "translation": "to vibrate", "sentence_context": "Mientras el bosque parece vibrar con gratitud." },
                    { "text": "transformación", "pos": "noun", "translation": "transformation", "sentence_context": "Has completado la transformación." },
                    { "text": "reverencia", "pos": "noun", "translation": "reverence", "sentence_context": "Clara: (con reverencia) Prometo proteger este lugar." },
                    { "text": "legado", "pos": "noun", "translation": "legacy", "sentence_context": "Para proteger este bosque y su legado." },
                    { "text": "honrar", "pos": "verb", "translation": "to honor", "sentence_context": "Cada día será una oportunidad para honrar y aprender." },
                    { "text": "oportunidad", "pos": "noun", "translation": "opportunity", "sentence_context": "Cada día será una oportunidad para honrar y aprender." },
                    { "text": "susurrar", "pos": "verb", "translation": "to whisper", "sentence_context": "Se escucha un último susurro: Bienvenida, guardiana." }
                ]
            }
        ],
        "wordCount": 4567,
        "created_at": "2025-08-18T03:00:00"
    }
]