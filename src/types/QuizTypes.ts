export interface QuestionOption {
    text: string;
    image?: string; 
  }
  
  export interface QuestionItem {
    id: number;
    title: string;
    subTitle?: string
    type: 'single-select' | 'single-select-image' | 'multiple-select' | 'bubble' | 'email';
    options: QuestionOption[];
  }
  