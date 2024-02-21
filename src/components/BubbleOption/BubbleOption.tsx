import React from 'react';
import styled from 'styled-components';

type BubbleOptionProps = {
  text: string;
  imageUrl?: string;
  isSelected: boolean;
  onSelect: (text: string) => void;
}

const StyledBubbleOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
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

// const BubbleContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 15px;
// `;

// const BubbleOption = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 90px;
//   height: 90px;
//   border-radius: 50%;
//   background-color: #36173D;
//   border: 3px solid transparent;
//   transition: border-color 0.2s;

//   &.selected {
//     border-color: #E4229B;
//   }

//   img {
//     width: 25px;
//     height: 25px;
//   }

//   span {
//     color: white;
//     font-size: 13px;
//     font-weight: 600;
//     text-align: center;
//     margin-top: 5px;
//   }
// `;

export const BubbleOption = ({ text, imageUrl, isSelected, onSelect }: BubbleOptionProps) => (
  <StyledBubbleOption onClick={() => onSelect(text)} className={isSelected ? 'selected' : ''}>
    <img src={imageUrl} alt={text} />
    <span>{text}</span>
  </StyledBubbleOption>
);
