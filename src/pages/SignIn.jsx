import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin: 50px auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--padding);
  background-color: #c4dfff;
  border-radius: 7px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1.2em;
  border: none;
  margin-bottom: 25px;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 1.2em;
  border: none;
  background-color: #ffe4c4;
  color: #547fb2;
  border-radius: 4px;
`;

const SignUpBox = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #86acd9;
  display: flex;
  justify-content: center;
  align-items: center;
  top: var(--padding);
  right: -35px;
  cursor: pointer;
  transition: all 500ms ease-in-out;

  &.active {
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 30px;
    cursor: default;
    border-radius: 7px;
  }

  &.active input,
  &.active button {
    padding: 15px;
    font-size: 1.2em;
    border: none;
    margin: 0;
  }

  &.active input {
    margin-bottom: 10px;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  top: 5px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #547fb2;
  font-weight: 700;
  cursor: pointer;
`;

const Icon = styled.i`
  font-size: 1.9em;
  color: #fff;
`;

const SignIn = () => {
  const [signUpActive, setSignUpActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpNickname, setSignUpNickname] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleClick = () => {
    if (signUpActive) return;
    setSignUpActive(true);
  };

  const removeActive = () => {
    setSignUpActive(false);
  };

  const handleSignUp = () => {
    if (signUpNickname === '' || signUpEmail === '' || signUpPassword === '') {
      return;
    }
    removeActive();
  };

  return (
    <Container>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button>로그인</Button>

      <SignUpBox className={signUpActive ? 'active' : ''} onClick={handleClick}>
        {signUpActive ? (
          <>
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                removeActive();
              }}
            >
              X
            </CloseButton>
            <Input
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={signUpNickname}
              onChange={(e) => setSignUpNickname(e.target.value)}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSignUp();
              }}
            >
              가입하기
            </Button>
          </>
        ) : (
          <Icon className="material-icons">가입</Icon>
        )}
      </SignUpBox>
    </Container>
  );
};

export default SignIn;
