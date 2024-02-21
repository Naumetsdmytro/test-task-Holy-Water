import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import styled from 'styled-components';
import { fetchQuestions } from '../services/API';
import { QuestionItem } from '../../types/QuizTypes';
import { ProgressBarComponent } from '../ProgressBar';
import { CustomButton } from '../Button';
import { Loader } from '../Loader';

type ChackmarkProps = {
  isSelected: boolean;
};

const QuestionContainer = styled.div`
  color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
`;

const QuestionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
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

const OptionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #36173D;
  border: 1px solid #36173D;
  color: white;
  margin-bottom: 12px;
  padding: 20px 20px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 700;
  
  &:hover {
    background-color: #660066; 
  }

  &.selected {
    background-color: rgba(228, 34, 155, 0.2);
    border-color: #E4229B
  }
`;

const BubbleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const BubbleOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #36173D;
  border: 3px solid transparent;
  transition: border-color 0.2s;

  &.selected {
    border-color: #E4229B;
  }

  img {
    width: 25px;
    height: 25px;
  }

  span {
    color: white;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    margin-top: 5px;
  }
`;


const Checkmark = styled.span<ChackmarkProps>`
  width: 22px; 
  height: 22px;
  border-radius: 6px; 
  border: 2px solid #E4229B;
  background-color: ${props => (props.isSelected ? '#E4229B' : '#6D4376')}; 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: ' ';
    position: absolute;
    display: ${props => (props.isSelected ? 'block' : 'none')};
    left: 50%;
    top: 50%;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const Question = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || '1', 10);
  const question = questions.find(q => q.id === questionId);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAnswers = localStorage.getItem('answers');
    const allAnswers: { id: number; answer: string[] }[] = savedAnswers ? JSON.parse(savedAnswers) : [];
  
    const currentAnswers = allAnswers.find((ans: { id: number; answer: string[] }) => ans.id === questionId)?.answer || [];
    setSelectedAnswers(currentAnswers);
  
    fetchQuestions().then(setQuestions);
  }, [questionId]);
  
  const updateLocalStorage = (newSelectedAnswers: string[]) => {
    const savedAnswers = localStorage.getItem('answers');
    const allAnswers: { id: number; answer: string[] }[] = savedAnswers ? JSON.parse(savedAnswers) : [];
    
    const answerIndex = allAnswers.findIndex((ans: { id: number; answer: string[] }) => ans.id === questionId);
    if (answerIndex !== -1) {
      allAnswers[answerIndex].answer = newSelectedAnswers;
    } else {
      allAnswers.push({ id: questionId, answer: newSelectedAnswers });
    }
    localStorage.setItem('answers', JSON.stringify(allAnswers));
  };
  

  const handleAnswerSelect = (optionText: string) => {
    let newSelectedAnswers = [...selectedAnswers];
    const isBubbleType = question?.type === 'bubble';
    const isMultiOrBubbleType = question?.type === 'bubble' || question?.type === 'multiple-select';
    const isSingleSelectType = question?.type === 'single-select';
    
    if (isMultiOrBubbleType) {
      if (newSelectedAnswers.includes(optionText)) {
        newSelectedAnswers = newSelectedAnswers.filter(answer => answer !== optionText);
      } else if (isBubbleType && newSelectedAnswers.length < 3) {
        newSelectedAnswers.push(optionText);
      } else if (!isBubbleType) {
        newSelectedAnswers.push(optionText);
      }
      setSelectedAnswers(newSelectedAnswers);
      updateLocalStorage(newSelectedAnswers);
    } else if (isSingleSelectType) {
      newSelectedAnswers = [optionText];
      setSelectedAnswers(newSelectedAnswers);
      updateLocalStorage(newSelectedAnswers);
      goToNextQuestionOrEnd();
    }
  };
  

  const renderOptions = () => {
    if (!question) return null;
  
    if (question.type === 'bubble') {
      return (
        <BubbleContainer>
          {question.options.map(option => {
            const isSelected = selectedAnswers.includes(option.text);
            return (
              <BubbleOption
                key={option.text}
                className={isSelected ? 'selected' : ''}
                onClick={() => handleAnswerSelect(option.text)}
              >
                <img src={option.image} alt={option.text} />
                <span>{option.text}</span>
              </BubbleOption>
            );
          })}
        </BubbleContainer>
      );
    }
  
    // For other types of questions
    return question.options.map(option => {
      const isSelected = selectedAnswers.includes(option.text);
      return (
        <OptionItem
          key={option.text}
          onClick={() => handleAnswerSelect(option.text)}
          className={isSelected ? 'selected' : ''}
        >
          {option.text}
          {question.type === 'multiple-select' && <Checkmark isSelected={isSelected} />}
        </OptionItem>
      );
    });
  };

  const goToNextQuestionOrEnd = () => {
    const nextQuestionId = questionId + 1;
    if (nextQuestionId <= questions.length) {
      navigate(`/quiz/${nextQuestionId}`);
    } else {
      setLoading(true);
      setTimeout(() => {
        navigate('/email');
      }, 5000);
    }
  };

  const handleNextButtonClick = () => {
    updateLocalStorage(selectedAnswers);
    goToNextQuestionOrEnd();
  };

  const shouldShowNextButton = () => {
    return question?.type === 'multiple-select' || question?.type === 'bubble';
  };

  return (
    loading ? (
      <Loader handleComplete={() => navigate('/email')} />
    ) : (
      <>
        <ProgressBarComponent />
        <QuestionContainer>
          <QuestionTitle>{question?.title}</QuestionTitle>
          {question?.subTitle && <QuestionSubtitle>{question.subTitle}</QuestionSubtitle>}
          <OptionList>{renderOptions()}</OptionList>
          {shouldShowNextButton() && (
            <CustomButton disabled={!selectedAnswers.length} onClick={handleNextButtonClick}>
              Next
            </CustomButton>
          )}
        </QuestionContainer>
      </>
    )
  );
  };

export default Question;

