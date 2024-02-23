import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import goBackIcon from "../../images/go-back.svg";

type ProgressBarProps = {
  step: number;
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box; 
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const GoBackButtonContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 100; 
`;


const ProgressBarContainer = styled.div`
  background-color: #eee;
  border-radius: 2px;
  width: 100%;
  box-sizing: border-box;
`;

const ProgressBar = styled.div<ProgressBarProps>`
  height: 5px;
  background-color: #E4229C;
  border-radius: 2px;
  width: ${({ step }) => (step / 5) * 100}%;
  transition: width 0.4s ease-in-out;
`;

const GoBackButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;

  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const GoBackImg = styled.img`
  width: 22px;
  height: 22px;
`;

const QuestionCounter = styled.p`
  font-size: 22px;
  color: white;
`;

const CurrentQuestion = styled.span`
  color: #E4229C;
`;

export const ProgressBarComponent = () => {
  const { id } = useParams<{ id: string }>();
  const step = parseInt(id || '1', 10);
  const navigate = useNavigate();

  return (
      <Header>
        <GoBackButtonContainer>
          {step > 2 && (
            <GoBackButton onClick={() => navigate(`/quiz/${step - 1}`)}>
              <GoBackImg src={goBackIcon} alt="go back" />
            </GoBackButton>
          )}
        </GoBackButtonContainer>
        <TopBar>
          <QuestionCounter><CurrentQuestion>{step}</CurrentQuestion>/5</QuestionCounter>
        </TopBar>
        <ProgressBarContainer>
          <ProgressBar step={step} />
        </ProgressBarContainer>
      </Header>
  );
};
