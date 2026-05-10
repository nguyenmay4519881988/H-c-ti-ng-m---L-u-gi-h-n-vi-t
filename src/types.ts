export interface CultureDetail {
  id: string;
  title: string;
  ethnicTitle?: string;
  phoneticEthnicTitle?: string;
  subtitle: string;
  description: string;
  category: string;
  ethnic: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  content: {
    origin?: string;
    meaning?: string;
    features?: string[];
    usage?: string;
  };
}

export interface Vocabulary {
  id: string;
  vietnamese: string;
  ethnic: string;
  phonetic: string;
  image: string;
  audioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  type: 'text' | 'image' | 'audio';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  vocabularies: Vocabulary[];
  quiz: QuizQuestion[];
  unlocked: boolean;
  stars?: number;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
  isLocked: boolean;
}

export interface Language {
  id: string;
  name: string;
  ethnic: string;
  icon: string;
  color: string;
  progress: number;
  levels: Level[];
}
