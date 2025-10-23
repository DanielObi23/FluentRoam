const maleVoice = "/spanish_voices/spanish_male";
const femaleVoice = "/spanish_voices/spanish_female";
export const spanishVoices = {
  male: [
    {
      name: "José",
      accent: "Generic",
      voiceId: "bIHbv24MWmeRgasZH58o",
      sampleUrl: `${maleVoice}/jose_spanish.mp3`,
    },
    {
      name: "Mauricio",
      accent: "Latin",
      voiceId: "94zOad0g7T7K4oa7zhDq",
      sampleUrl: `${maleVoice}/mauricio_spanish.mp3`,
    },

    {
      name: "Jesus",
      accent: "Castilian",
      voiceId: "5IDdqnXnlsZ1FCxoOFYg",
      sampleUrl: `${maleVoice}/jesus_spanish.mp3`,
    },
    {
      name: "Samuel",
      accent: "Mexican",
      voiceId: "nmvA11Y688M5reLqDsVm",
      sampleUrl: `${maleVoice}/samuel_spanish.mp3`,
    },
    {
      name: "Cristian",
      accent: "Colombian",
      voiceId: "o2vbTbO3g4GrKUg7rehy",
      sampleUrl: `${maleVoice}/cristian_spanish.mp3`,
    },
    {
      name: "Agustin",
      accent: "Argentinian",
      voiceId: "ByVRQtaK1WDOvTmP1PKO",
      sampleUrl: `${maleVoice}/agustin_spanish.mp3`,
    },
  ],
  female: [
    {
      name: "Sarah",
      accent: "Generic",
      voiceId: "EXAVITQu4vr4xnSDxMaL",
      sampleUrl: `${femaleVoice}/sarah_spanish.mp3`,
    },
    {
      name: "Norah",
      accent: "Latin",
      voiceId: "kcQkGnn0HAT2JRDQ4Ljp",
      sampleUrl: `${femaleVoice}/norah_spanish.mp3`,
    },
    {
      name: "Alejandra",
      accent: "Castilian",
      voiceId: "kwNLkNjbQHMw9YUFZsHI",
      sampleUrl: `${femaleVoice}/alejandra_spanish.mp3`,
    },
    {
      name: "Monica",
      accent: "Mexican",
      voiceId: "1VQaMRazTeAqnqdb5C33",
      sampleUrl: `${femaleVoice}/monica_spanish.mp3`,
    },
    {
      name: "Sofía",
      accent: "Colombian",
      voiceId: "b2htR0pMe28pYwCY9gnP",
      sampleUrl: `${femaleVoice}/sofia_spanish.mp3`,
    },
  ],
};

export const feedbackPromptSpanish = `
        You are a bilingual Spanish teacher. After every conversation, output ONLY a JSON object with EXACTLY these keys:
        {
            "feedback": "markdown string with headings/formatting",
            "vocabulary": [{
                "vocab": "string",
                "part_of_speech": "string",
                "meaning": ["string"],
                "tone": "Casual|Neutral|Formal",
                "regional_variations": [{
                                    "country":"string", 
                                    "word":"string", 
                                    "part_of_speech": "string", 
                                    "tone": "Casual|Neutral|Formal", 
                                    "meaning": ["string"], 
                                    "example": {"sentence": "string", "translation": "string"}
                                    }] || [],
                "examples": [{"sentence": "string", "translation": "string"}],
                "idioms": [{
                        "phrase":"string", 
                        "meaning":"string", 
                        "region": "string of location where the idiom is used"
                        }] || [],
                "synonyms": ["string"],
                "antonyms": ["string"]
            }]
        }

        RULES:
        - ALWAYS include ALL top-level keys
        - Arrays must have minimum items (target_vocabulary: 4+, examples: 1+)
        - For empty arrays, use []
        - NEVER add extra keys or explanations
        - title - short, realistic, instantly-identifiable title for the learner (max 10 words).  
        - feedback - long, natural, teacher-style feedback in markdown with:
            • the feedback is about grammar as this is a language role play for the user to practice spanish
            • start with a quick encouragement, e.g "You did great but there are key areas you should improve on", 
                then only talk about mistakes in friendly tone, don't spend time listing what they did write
            • Refer to "the user" as "you"  
            • Feedback must always be relevant to the transcript
            • Error highlighting (❌ / ✅)  
            • Cultural insights (bullet list)  
            • Pronunciation tips (IPA) only if it changes the meaning of the word/sentence
            • Suggestions for improvement (bullet list)  
            • Must be properly formatted, proper heading, proper spacing and proper highlighting etc
        - target_vocabulary - array of 7-20 vocab objects (It must be at least 7, first get from the conversation, which words/phrases are high-utility words or user struggled with); each object must include:
            • vocab (infinitive form) or phrase
            • part_of_speech or write phrase if vocab is a phrase
            • meaning (array of 1-3 English glosses)  
            • tone: Casual | Neutral | Formal  
            • regional_variations (array or [])  
            • examples (array; first example must show ❌ vs ✅ usage from the conversation, ignore if it doesn't apply)  
            • idioms (array of {phrase, meaning, region})  
            • synonyms and antonyms arrays  

        Return **only** the JSON object—no explanations, no markdown fences.
    `;
