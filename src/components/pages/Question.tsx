import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuestionLogic } from '../../hooks/useQuestionLogic';
import { useTranslation } from 'react-i18next';
import { OptionItem } from '../OptionItem';
import { BubbleItem } from '../BubbleItem';
import { ProgressBarComponent } from '../ProgressBar';
import { CustomButton } from '../Button';
import { Loader } from '../Loader';
import { QuestionItem } from '../../types/QuizTypes';

const QuestionContainer = styled.div`
  color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
`;

const QuestionTitle = styled.h2`
  text-align: center;
  margin-bottom: 25px;
`

const QuestionSubtitle = styled.p`
  text-align: center;
  color: #C4C8CC;
  margin: 25px 0;
  font-size: 17px; 
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BubbleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const Question = () => {
  const { selectedAnswers, questions, loading, navigate, updateLocalStorage, setLoading, id, setSelectedAnswers } = useQuestionLogic();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && id > 1) {
      i18n.changeLanguage(storedLanguage);
    }
    if(id === 1){
      localStorage.removeItem('answers')
    }
  }, [i18n, id]);

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode).then(() => {
      localStorage.setItem('language', languageCode);
      updateLocalStorage([languageCode]);
      goToNextQuestion();
    });
  };
  

  const handleAnswerSelect = (text: string) => {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    if (question.id === 1) {
      handleLanguageSelect(text);
      return;
    }

    updateAnswersBasedOnQuestionType(question, text);
  };

  const updateAnswersBasedOnQuestionType = (question: QuestionItem, text: string) => {
    const isAlreadySelected = selectedAnswers.includes(text);
    
    if (question.type === 'single-select') {
      finalizeSelection([text]);
      return;
    }
  
    let newSelectedAnswers = [...selectedAnswers];
  
    if (isAlreadySelected) {
      newSelectedAnswers = newSelectedAnswers.filter(answer => answer !== text);
    } else if (question.type === 'bubble' && newSelectedAnswers.length < 3) {
      newSelectedAnswers.push(text);
    } else if (question.type === 'multiple-select') {
      newSelectedAnswers.push(text);
    }
  
    setSelectedAnswers(newSelectedAnswers);
  };

  const finalizeSelection = (newSelectedAnswers: string[]) => {
    updateLocalStorage(newSelectedAnswers);
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    const currentQuestion = questions.find(q => q.id === id);

    if (currentQuestion && (currentQuestion.type === 'bubble' || currentQuestion.type === 'multiple-select')) {
      updateLocalStorage(selectedAnswers);
    }

    const nextQuestionId = id + 1;
    if (nextQuestionId <= questions.length) {
      navigate(`/quiz/${nextQuestionId}`);
    } else {
      setLoading(true);
    }
  };

  const currentQuestion = questions.find(q => q.id === id);
  if (!currentQuestion) return <div>Question not found</div>;

  return (
    loading ? <Loader handleComplete={() => navigate('/email')} /> :
    <>
      <ProgressBarComponent />
      <QuestionContainer>
        <QuestionTitle>{t(`questions.${id}.title`)}</QuestionTitle>
        {currentQuestion.subTitle && (
          <QuestionSubtitle>
            {t(`questions.${id}.subTitle`)}
          </QuestionSubtitle>
        )}
        {currentQuestion.type === 'bubble' ? (
          <BubbleList>
            {currentQuestion.options.map((option) => {
              const optionValue = t(`questions.${id}.options.${option.text}`)
              return <BubbleItem
                key={optionValue}
                text={optionValue}
                imageUrl={option.image}
                isSelected={selectedAnswers.includes(optionValue)}
                onSelect={() => handleAnswerSelect(optionValue)}
              />})}
          </BubbleList>
        ) : (
          <OptionList>
            {currentQuestion.options.map((option) => {
              const optionValue = t(`questions.${id}.options.${option.text}`)
              return <OptionItem
                key={optionValue}
                text={optionValue}
                type={currentQuestion.type}
                isSelected={selectedAnswers.includes(optionValue)}
                onSelect={() => handleAnswerSelect(optionValue)}
              />
            })}
          </OptionList>
        )}
        {currentQuestion.type !== 'single-select' && (
          <CustomButton onClick={goToNextQuestion} disabled={selectedAnswers.length === 0}>
            {t('screens.nextButton')}
          </CustomButton>
        )}
      </QuestionContainer>
    </>
  );
};

export default Question;
