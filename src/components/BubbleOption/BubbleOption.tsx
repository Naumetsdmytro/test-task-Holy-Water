import React from 'react';
import styled from 'styled-components';

type BubbleOptionProps = {
    text: string
    imageUrl: string
    isSelected: true
    onSelect: (text: string) => void
}

const StyledBubbleOption = styled.div`
  // Your BubbleOption styles here
`;

export const BubbleOption = ({ text, imageUrl, isSelected, onSelect }: BubbleOptionProps) => (
  <StyledBubbleOption onClick={() => onSelect(text)} className={isSelected ? 'selected' : ''}>
    <img src={imageUrl} alt={text} />
    <span>{text}</span>
  </StyledBubbleOption>
);
