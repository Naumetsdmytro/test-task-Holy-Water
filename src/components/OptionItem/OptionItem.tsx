import React from 'react';
import styled, { css } from 'styled-components';

interface OptionItemProps {
  text: string;
  isSelected: boolean;
  onSelect: (text: string) => void;
}

const StyledOptionItem = styled.li`
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

export const OptionItem = ({ text, isSelected, onSelect }: OptionItemProps) => (
  <StyledOptionItem
    onClick={() => onSelect(text)}
    className={isSelected ? 'selected' : ''}
  >
    {text}
  </StyledOptionItem>
);
