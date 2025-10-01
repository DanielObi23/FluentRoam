type Text = {
  text: string;
  translation: string;
};

type VocabEntry = {
  text: string;
  pos: string;
  translation: string;
  sentence_context: string;
};

type StoryTags = {
  theme: string[];
  tone: string[];
  genre: string[];
};

type Page = {
  chapterTitle: string;
  sentences: Text[];
  vocab: VocabEntry[];
  numOfPages: number;
};

export type Story = {
  title: string;
  type: string;
  tags: StoryTags;
  plot: string;
  summary: Text;
  pages: Page[];
  numOfPages: number;
};

export type CurrentPage = {
  page: Page;
  numOfPages: number;
};

export type StoryHistory = {
  id: string;
  plot: string;
  type: string;
  proficiency: string;
  tags: StoryTags;
  createdAt: Date;
};
