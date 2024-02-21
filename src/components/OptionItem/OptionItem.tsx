import React from 'react';
import styled from 'styled-components';

type OptionItemProps = {
  text: string;
  isSelected: boolean;
  onSelect: (text: string) => void;
  type: string
}

type ChackmarkProps = {
    isSelected: boolean;
  };

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

export const OptionItem = ({ text, isSelected, onSelect, type }: OptionItemProps) => (
  <StyledOptionItem
    onClick={() => onSelect(text)}
    className={isSelected ? 'selected' : ''}
  >
    {text}
    {type === 'multiple-select' && <Checkmark isSelected={isSelected}/>}
  </StyledOptionItem>
);
