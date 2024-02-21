import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CustomButton } from '../Button';
import { Container } from '../Container';

const Title = styled.h1`
  margin-bottom: 15px;
  font-weight: 800;
  font-size: 30px;
`;

const SubTitle = styled.p`
  text-align: center;
  margin-bottom: 55px;
  font-size: 15px;
  color: #B6B8C3;
`;

const EmailInput = styled.input`
  outline: none;
  width: 100%;
  padding: 28px;
  border-radius: 16px;
  border: 2px solid #36173D;
  background-color: #36173D;
  font-size: 16px;
  color: white;
  box-sizing: border-box;

  &::placeholder { 
    color: #B6B8C3;
  }

  &:not(:placeholder-shown) {
    border: 2px solid #D0006E;
  }
`;

const TermsText = styled.p`
  margin: 40px 0 70px 0;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #B6B8C3;
  & span {
    color: #E4229C;
  }
`;

const ErrorText = styled.span`
  color: red;
  display: block;
  margin-top: 7px;
`;

const Email = () => {
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate()

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsValid(event.target.checkValidity());
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/result')
  };

  return (
    <Container>
      <Title>Email</Title>
      <SubTitle>Enter your email to get full access</SubTitle>
      <form onSubmit={handleFormSubmit}>
        <EmailInput
          type='email'
          value={email}
          onChange={handleEmailChange}
          placeholder="Your email"
          required
        />
        {!isValid && <ErrorText>Invalid email</ErrorText>}
        <TermsText>
          By continuing I agree with <span>Privacy policy</span> and <span>Terms of use.</span>
        </TermsText>
        <CustomButton type='submit' disabled={!isValid || !email}>
          Next
        </CustomButton>
      </form>
    </Container>
  );
};

export default Email;
