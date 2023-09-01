export interface CreateQuestion {
  type: number;
  title: string;
  content: string;
  options?: any[];
  note?: string;
  creator: string;
  language?: number;
  initialCode?: string;
  answerCode?: string;
  testCode?: string;
  answer?: string;
  tags?: string[];
  teamId: string
}