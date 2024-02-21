import React from "react";
import styled from 'styled-components';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    handleButtonClick?: () => void
};

const Button = styled.button`
  width: 100%;  
  background-color: #E4229C;
  color: white;
  border: none;
  padding: 16px 0;
  border-radius: 30px;
  font-size: 22px;
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #E4227C;
  }

  &:disabled {
    background-color: rgba(228, 34, 156, 0.6);
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CustomButton = ({ children, handleButtonClick, ...props }: ButtonProps) => {
    return <Button onClick={handleButtonClick} {...props}>{children}</Button>
}
