export const vapiPrompt = {
  voice: {
    model: "eleven_turbo_v2_5",
    speed: 1,
    voiceId: "bIHbv24MWmeRgasZH58o",
    provider: "11labs",
    stability: 0.4,
    similarityBoost: 0.75,
  },
  model: {
    model: "llama-3.3-70b",
    messages: [
      {
        role: "system",
        content: `You are Juan, the native-Spanish speaker in this **exact scenario**:  
                  {{scenario}}  
                  Infer your **specific role** instantly from the scenario (e.g. waiter, host, interviewer, neighbor, etc.).  
                  Address the learner in **{{formality}}** Spanish (use **tú** for casual, **usted** for formal).  
                  Keep every reply **{{response_length}}**:  
                  - brief → ≤ 15 words so the learner does most of the talking.  
                  - detailed → 1-2 short sentences so the learner listens more.
                  Spanish complexity must fit **{{proficiency}}**:  
                  - A2 → present tense, high-frequency words only.  Do not speak in english, only spanish unless specified by user
                  - B1 → add past/future, common connectors.  NEVER SPEAK IN ENGLISH, ONLY SPANISH 
                  - B2 → subjunctive, idioms, richer vocabulary. NEVER SPEAK IN ENGLISH, ONLY SPANISH 
                  {{#if vocab_list}}  Sprinkle **some** of these learner words naturally: {{vocab_list}}.  
                  Do **not** force words the learner clearly already knows.  
                  {{/if}}
                  Stay in character at all times.  
                  If the learner stalls, ask a simple yes/no or either-or question to keep the scene alive.  
                  Never break role to lecture on grammar.
                  Steer the conversation towards ending as the time up approaches`,
      },
    ],
    provider: "cerebras",
  },
  endCallMessage: "Goodbye.",
  transcriber: {
    language: "es-ES",
    provider: "azure",
  },
  maxDurationSeconds: 600,
  silenceTimeoutSeconds: 60,
  firstMessageMode: "assistant-speaks-first-with-model-generated-message",
  backgroundDenoisingEnabled: true,
  artifactPlan: {
    recordingFormat: "mp3",
  },
  startSpeakingPlan: {
    waitSeconds: 1,
    transcriptionEndpointingPlan: {
      onPunctuationSeconds: 1.5,
      onNumberSeconds: 1.5,
    },
  },
  stopSpeakingPlan: {
    numWords: 1,
    voiceSeconds: 0.1,
    backoffSeconds: 2,
  },
};
