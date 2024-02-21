import React from 'react'
import styled from 'styled-components';

type ContainerProps = {
  children: React.ReactNode
}

const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;

export const Container = ({ children }: ContainerProps) => {
  return <StyledContainer>{children}</StyledContainer>;
};
