import React from 'react';
import styled from 'styled-components';

type BubbleOptionProps = {
  text: string;
  imageUrl?: string;
  isSelected: boolean;
  onSelect: (text: string) => void;
}

const BubbleOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
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

export const BubbleItem = ({ text, imageUrl, isSelected, onSelect }: BubbleOptionProps) => (
  <BubbleOption onClick={() => onSelect(text)} className={isSelected ? 'selected' : ''}>
    <img src={imageUrl} alt={text} />
    <span>{text}</span>
  </BubbleOption>
);
