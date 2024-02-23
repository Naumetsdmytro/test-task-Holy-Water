import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import checkIcon from '../../images/checkmark.svg';
import downloadIcon from '../../images/download.svg';
import { CustomButton } from '../Button';
import { Container } from '../Container';

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
    const { t, i18n } = useTranslation();


    const handleDownloadAnswers = () => {
        const answersJson = localStorage.getItem('answers');
        if (answersJson) {
          const answersObj = JSON.parse(answersJson);
      
          const answersArray = Object.keys(answersObj).map((questionId) => ({
            id: questionId,
            answer: answersObj[questionId],
          }));
      
          const formattedAnswers = answersArray.map((answerObj) => {
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
        localStorage.removeItem('language');
        i18n.changeLanguage('English');
        navigate('/quiz/1')
      }
      

      return (
        <Container>
          <Title>{t('screens.result.title')}</Title>
          <Subtitle>{t('screens.result.subTitle')}</Subtitle>
          <CheckMarkContainer>
            <img src={checkIcon} alt="success screens.result"/>
          </CheckMarkContainer>
          <DownloadButton onClick={handleDownloadAnswers}>
            <img src={downloadIcon} alt="download answers"/>
            {t('screens.result.download')}
          </DownloadButton>
          <CustomButton handleButtonClick={handleButtonClick}>{t('screens.result.retakeQuiz')}</CustomButton>
        </Container>
      );
    
};

export default Result;
