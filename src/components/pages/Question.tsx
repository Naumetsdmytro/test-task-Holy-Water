import React from 'react';
import styled from 'styled-components';
import { useQuestionLogic } from '../../hooks/useQuestionLogic';
import { OptionItem } from '../OptionItem';
import { BubbleOption } from '../BubbleOption';
import { ProgressBarComponent } from '../ProgressBar';
import { CustomButton } from '../Button';
import { Loader } from '../Loader';

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

const Question = () => {
  const {
    selectedAnswers,
    questions,
    loading,
    navigate,
    updateLocalStorage,
    setLoading,
    id,
  } = useQuestionLogic();

  const handleAnswerSelect = (text: string) => {
    const questionIndex = questions.findIndex((q) => q.id.toString() === id);
    if (questionIndex === -1) return;

    const question = questions[questionIndex];
    let newSelectedAnswers = [...selectedAnswers];
    
    if (question.type === 'bubble') {
      if (newSelectedAnswers.includes(text)) {
        newSelectedAnswers = newSelectedAnswers.filter((answer) => answer !== text);
      } else if (newSelectedAnswers.length < 3) {
        newSelectedAnswers.push(text);
      }
    } else if (question.type === 'multiple-select') {
      const answerIndex = newSelectedAnswers.indexOf(text);
      if (answerIndex !== -1) {
        newSelectedAnswers.splice(answerIndex, 1);
      } else {
        newSelectedAnswers.push(text);
      }
    } else {
      newSelectedAnswers = [text];
    }

    updateLocalStorage(newSelectedAnswers);
    
    if (question.type === 'single-select') {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    const nextQuestionId = parseInt(id || '0', 10) + 1;
    if (nextQuestionId <= questions.length) {
      navigate(`/quiz/${nextQuestionId}`);
    } else {
      setLoading(true);
    }
  };

  const currentQuestion = questions.find((q) => q.id.toString() === id);

  if (!currentQuestion) return <div>Question not found</div>;

  return (
    loading ? <Loader handleComplete={() => navigate('/email')}/> :
    <>
      <ProgressBarComponent />
      <QuestionContainer>
        <QuestionTitle>{currentQuestion.title}</QuestionTitle>
        {currentQuestion.subTitle && <QuestionSubtitle>{currentQuestion.subTitle}</QuestionSubtitle>}
        <OptionList>
          {currentQuestion.options.map((option) => (
            currentQuestion.type === 'bubble' ? (
              <BubbleOption
                key={option.text}
                text={option.text}
                imageUrl={option.image}
                isSelected={selectedAnswers.includes(option.text)}
                onSelect={handleAnswerSelect}
              />
            ) : (
              <OptionItem
                key={option.text}
                text={option.text}
                isSelected={selectedAnswers.includes(option.text)}
                onSelect={handleAnswerSelect}
                type={currentQuestion.type}
              />
            )
          ))}
        </OptionList>
        {currentQuestion.type !== 'single-select' && (
          <CustomButton onClick={goToNextQuestion} disabled={selectedAnswers.length === 0}>
            Next
          </CustomButton>
        )}
      </QuestionContainer>
    </>
  );
};

export default Question;

