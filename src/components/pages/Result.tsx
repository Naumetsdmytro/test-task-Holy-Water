import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import checkIcon from '../../images/checkmark.svg';
import downloadIcon from '../../images/download.svg';
import { CustomButton } from '../Button';
import { Container } from '../Container';

type AnswerObject = {
    id: number;
    answer: string[];
  }

const Title = styled.h1`
  font-family: "Niconne", cursive;
  margin: 0 0 15px;
  font-size: 36px;
  font-weight: 400;
  color: #ECECFB
`;

const Subtitle = styled.p`
  margin-bottom: 55px;
  font-size: 17px;
  font-weight: 600;
`;

const CheckMarkContainer = styled.div`
  width: 108px; 
  height: 108px; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 55px;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 32px;
  
  & img {
    margin-right: 8px;
  }
`;

const Result = () => {
    const navigate = useNavigate()

    const handleDownloadAnswers = () => {
        const answersJson = localStorage.getItem('answers');
        if (answersJson) {
          const answersArray: AnswerObject[] = JSON.parse(answersJson);
      
          const formattedAnswers = answersArray.map((answerObj: AnswerObject) => {
            const questionText = `Question ${answerObj.id}`;
            const answersText = answerObj.answer.join(", ");
            return `${questionText}: ${answersText}`;
          }).join("\n\n");
      
          const blob = new Blob([formattedAnswers], { type: 'text/plain;charset=utf-8' });
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.download = 'my_answers.txt';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      const handleButtonClick = () => {
        localStorage.removeItem('answers');
        navigate('/quiz/1')
      }
      

  return (
    <Container>
      <Title>Thank You</Title>
      <Subtitle>for supporting us and passing quiz</Subtitle>
      <CheckMarkContainer>
        <img src={checkIcon} alt="success result"/>
      </CheckMarkContainer>
      <DownloadButton onClick={handleDownloadAnswers}>
        <img src={downloadIcon} alt="download answers"/>
        Download my answers
      </DownloadButton>
      <CustomButton handleButtonClick={handleButtonClick}>Retake quiz</CustomButton>
    </Container>
  );
};

export default Result;
