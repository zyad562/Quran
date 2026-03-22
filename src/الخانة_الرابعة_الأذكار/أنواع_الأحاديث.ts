export interface Hadith {
  id: number;
  text: string;
  narrator: string;
  source: string;
  category: string;
  explanation?: string;
}

export interface HadithCategory {
  id: string;
  name: string;
  icon: string;
}
