interface RegionalVariation {
  country: string;
  word: string;
  part_of_speech: string;
  meaning: string[];
  example: {
    sentence: string;
    translation: string;
  };
}

export interface VocabEntry {
  vocab: string;
  part_of_speech: string;
  meaning: string[];
  tone: "Casual" | "Neutral" | "Formal" | string;
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

export type UserSession = {
  session_type: "chat" | "call";
  title: string;
  scenario: string;
  proficiency: "A2" | "B1" | "B2";
  feedback: string;
  vocabulary: VocabEntry[];
  audio: string;
  created_at: string;
};

export type SessionVocabTable = {
  vocab: VocabEntry;
  index: number;
};

export type UserHistory = {
  session_id: string;
  type: string;
  scenario: string;
};
