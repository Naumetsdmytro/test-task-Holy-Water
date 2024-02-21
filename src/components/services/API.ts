import { QuestionItem } from "../../types/QuizTypes";
import { questions } from "../../data/questions";

// This function mimics an API call
export const fetchQuestions = async (): Promise<QuestionItem[]> => {
  // In the future, we can replace the line below with an actual API call(REST API)
  // e.g., const response = await fetch('https://your-api.com/questions');
  // const data = await response.json();
  // return data as QuestionItem[];

  return Promise.resolve(questions); // mimic async behavior
};
