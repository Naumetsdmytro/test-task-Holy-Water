import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchQuestions } from '../services/API';
import { QuestionItem } from '../types/QuizTypes';

type UseQuestionLogicReturn = {
  selectedAnswers: string[];
  questions: QuestionItem[];
  loading: boolean;
  navigate: ReturnType<typeof useNavigate>;
  updateLocalStorage: (newSelectedAnswers: string[]) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  id: number
  setSelectedAnswers: React.Dispatch<React.SetStateAction<string[]>>
}

export const useQuestionLogic = (): UseQuestionLogicReturn => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || '1', 10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetQuestions = async () => {
        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions);
    };

    fetchAndSetQuestions();
  }, []);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers') || '{}');
    const currentAnswers = savedAnswers[questionId] ? savedAnswers[questionId] : [];
    setSelectedAnswers(currentAnswers);
  }, [questionId]);

  const updateLocalStorage = (newSelectedAnswers: string[]) => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers') || '{}');
    savedAnswers[questionId] = newSelectedAnswers;
    localStorage.setItem('answers', JSON.stringify(savedAnswers));
    setSelectedAnswers(newSelectedAnswers);
  };

  return { selectedAnswers, setSelectedAnswers, questions, loading, navigate, updateLocalStorage, setLoading, id: questionId };
};
