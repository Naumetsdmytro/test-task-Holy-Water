import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { Container } from "../Container";

type LoaderProps = {
  handleComplete: () => void;
};

const LoaderContainer = styled.div`
  position: relative;
  width: 252px; 
  height: 252px;
`;

const LoaderCircle = styled.circle`
  fill: none;
  stroke-width: 10;
  stroke-linecap: round;
  transform: rotate(-90deg); 
  transform-origin: 50% 50%;
`;

const Percentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 52px; 
  font-weight: 800;
`;

const Subtitle = styled.p`
  margin-top: 40px;
  font-size: 17px;
  font-weight: 600; 
`;

const BackgroundCircle = styled.circle`
  fill: none;
  stroke-width: 10; 
  stroke: #E8EAF2; 
`;

export const Loader = ({ handleComplete }: LoaderProps) => {
  const [percent, setPercent] = useState(0);
  const { t } = useTranslation()

  const radius = 121;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const intervalTime = 50; 
    const totalTime = 5000; 
    const increment = (intervalTime / totalTime) * 100;

    const interval = setInterval(() => {
      setPercent((oldPercent) => {
        const newPercent = oldPercent + increment;
        if (newPercent >= 100) {
          clearInterval(interval);
          setTimeout(() => handleComplete(), intervalTime); 
        }
        return newPercent;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [handleComplete]);

  const strokeDashoffset = circumference - (percent / 100) * circumference; 

  return (
    <Container>
      <LoaderContainer>
        <svg width="252" height="252" viewBox="0 0 252 252">
          <BackgroundCircle cx="126" cy="126" r={radius} />
          <LoaderCircle
            cx="126"
            cy="126"
            r={radius}
            stroke="#E4229C"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <Percentage>{Math.round(percent)}%</Percentage>
      </LoaderContainer>
      <Subtitle>{t('screens.loading')}</Subtitle>
    </Container>
  );
};
