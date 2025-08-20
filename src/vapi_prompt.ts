const hell = {
  "firstMessage": "¿Necesitas ayuda con algo? ¿Estás perdido en un sitio?",
  "followUp": {
    "chatId": "4df65b16-c7e4-4b1c-b0b1-e2130f97fa0c",
    "response": "¿En dónde estás? Hay una zona comercial cerca de aquí. Puedo ayudarte a encontrar...",
    "fullData": {
      "id": "4df65b16-c7e4-4b1c-b0b1-e2130f97fa0c",
      "orgId": "2c411254-75ec-42a8-b3b9-5f0c23ea2182",
      "previousChatId": "26316bbf-df1f-4e8a-9f19-444f495a6bbf",
      "input": [
        {
          "role": "user",
          "content": "Tell me more"
        }
      ],
      "output": [
        {
          "role": "assistant",
          "content": "¿En dónde estás? Hay una zona comercial cerca de aquí. Puedo ayudarte a encontrar..."
        }
      ],
      "assistantId": "e3fbfb66-b32e-4c74-b456-c6ea5fb15663",
      "messages": [
        {
          "role": "user",
          "content": "Hello, I need help"
        },
        {
          "role": "assistant",
          "content": "¿Necesitas ayuda con algo? ¿Estás perdido en un sitio?"
        }
      ],
      "createdAt": "2025-08-11T14:25:08.734Z",
      "updatedAt": "2025-08-11T14:25:08.734Z",
      "cost": 0.005,
      "costs": [
        {
          "cost": 0.00002364,
          "type": "model",
          "model": {
            "model": "llama-3.1-8b-instant",
            "provider": "groq"
          },
          "promptTokens": 436,
          "completionTokens": 23
        },
        {
          "cost": 0.005,
          "type": "chat"
        }
      ]
    }
  },
  "thirdMessage": {
    "chatId": "c20baa0b-09da-4972-ad8d-21c8afa78d24",
    "response": "¿Quieres aprender más sobre algo en particular? ¿Un museo, el centro de la ciudad o tal vez una biblioteca?",
    "fullData": {
      "id": "c20baa0b-09da-4972-ad8d-21c8afa78d24",
      "orgId": "2c411254-75ec-42a8-b3b9-5f0c23ea2182",
      "previousChatId": "4df65b16-c7e4-4b1c-b0b1-e2130f97fa0c",
      "input": [
        {
          "role": "user",
          "content": "Where is the best place to learn more?"
        }
      ],
      "output": [
        {
          "role": "assistant",
          "content": "¿Quieres aprender más sobre algo en particular? ¿Un museo, el centro de la ciudad o tal vez una biblioteca?"
        }
      ],
      "assistantId": "e3fbfb66-b32e-4c74-b456-c6ea5fb15663",
      "messages": [
        {
          "role": "user",
          "content": "Hello, I need help"
        },
        {
          "role": "assistant",
          "content": "¿Necesitas ayuda con algo? ¿Estás perdido en un sitio?"
        },
        {
          "role": "user",
          "content": "Tell me more"
        },
        {
          "role": "assistant",
          "content": "¿En dónde estás? Hay una zona comercial cerca de aquí. Puedo ayudarte a encontrar..."
        }
      ],
      "createdAt": "2025-08-11T14:25:09.209Z",
      "updatedAt": "2025-08-11T14:25:09.209Z",
      "cost": 0.005,
      "costs": [
        {
          "cost": 0.00002606,
          "type": "model",
          "model": {
            "model": "llama-3.1-8b-instant",
            "provider": "groq"
          },
          "promptTokens": 478,
          "completionTokens": 27
        },
        {
          "cost": 0.005,
          "type": "chat"
        }
      ]
    }
  }
}


const storyT = [{
  "id": "uuid",
  "userId": "user_id",
  "title": "string",
  "storySeed": "string",
  "coverImageUrl": "image url | null", //I'm not sure if i should generate this as well, i'm worried about cost, default to a gradient background, or simply write "NO COVER IMAGE"
  // let user click to generate, allow for only native pack subscribers
  "tags": {
    "theme": ["string list from theme"],
    "tone": ["string list from tone"],
    "genre": ["string list from genre"]
  },
  "storyType": "story type e.g prose", // removing the novels, too long
  "proficiency": "beginner | intermediate | advanced",
  "summary": {
    "text": "summary in the language user is learning",
    "translation": "translation into user's language"
  },
  "pages": [{
    "audioUrl": "string url, will be added after generating from elevenlabs or azure tts",
    "chapterTitle": {
      "text": "chapter title in the language user is learning",
      "translation": "translation into user's language" // don't generate, let user generate optionally
    },
    "sentences": [{
      "text": "sentence in the language user is learning",
      "translation": "translation into user's language" // don't generate, let user generate optionally
    }], // chapterTitle and sentences will both be sent to elevenlabs/azure to generate audio
    "vocab": [{
      "text": "word/phrase/idiom in the language user is learning, if verb, it must be in the infinitive", //from the sentences in the current page that are either high utility words or words/idioms user is unlikely to know
      "pos": "part of speech (e.g noun, verb etc) | phrase | idiom",
      "translation": "translation into user's language",
      "sentence_context": "the first occuring sentence in which the word/phrase or idiom is used"
    }]
  }],
  "wordCount": "number", // word count
  "created_at": "timestamp" // auto generated by database
}]

type Story = {
  id: string;                        // uuid
  userId: string;
  title: string;
  targetLanguage: string;            // "es", "ja", ...
  nativeLanguage: string;            // "en", ...

  /* --- FORM INPUTS --- */
  storyType: "flash-fiction" | "short-story" | "prose-story" |
             "screenplay" | "stageplay" | "webnovel-chapter" | "novel-chapter";
  genre: string[];                   // "fantasy", "romance", ...
  tone: string[];                    // "dark", "funny", ...
  theme: string[];                   // "power", "family", ...
  prompt?: string;                   // formerly plot-line
  copiedText?: string;               // user-supplied story
  proficiency: "beginner" | "intermediate" | "advanced";

  /* --- GENERATED METADATA --- */
  tags: string[];                    // auto-filled from theme/tone/genre
  difficultyProfile: {
    cefr: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    vocabSize: number;
    grammarTags: string[];
  };
  audioSettings: {
    voiceId: string;
    speedWPM: number;
  };
  illustrationPolicy: {
    generateCover: boolean;
    generateIllustrations: boolean;
    stylePrompt?: string;
  };

  /* --- CONTENT --- */
  summary: {
    text: string;                    // learning language
    translation: string;
  };
  pages: Page[];

  /* --- STATS --- */
  timesRead: number;
  lastReadAt?: string;               // ISO date
  bookmarkedSentenceIdx?: number;

  /* --- OPTIONAL SERIES --- */
  seriesId?: string;
  chapterNumber?: number;

  createdAt: string;                 // server-side timestamp
};

type Page = {
  chapterTitle: {
    text: string;
    translation: string;
  };
  sentences: {
    text: string;
    translation: string;
  }[];
  vocab: {
    text: string;
    translation: string;
  }[];
  audioUrl?: string;                 // generated later
  illustrationUrl?: string;          // optional page image
};