export type VocabEntry = {
  text: string;
  pos: string;
  translation: string;
  context: string;
};

export type VocabHistory = {
  id: string;
  text: string;
  pos: string;
  translation: string;
  context: string;
  created_at: Date;
};
