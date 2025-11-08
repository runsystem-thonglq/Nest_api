export class Toeic {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  //
  explanation: {
    vi?: Record<string, any>;
    en?: Record<string, any>;
  };
}
