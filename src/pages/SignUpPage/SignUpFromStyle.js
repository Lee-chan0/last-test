import styled from "styled-components";
import {
  SignInFormMainContainer, SignInSpan,
  SignInFormformContainer, SignInFormInputText, SignInFormButton, SignInFormLabel,
} from '../SignInPage/SignInFromStyle';

const SignUpFormMainContainer = styled(SignInFormMainContainer)`
  border : 2px solid ${({ theme }) => theme.blue.blue500};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.blue.blue100};
  width : 400px;
  padding : 0 32px;
  display: flex;
  flex-direction: column;
  gap : 32px;
  opacity: 0.9;
  box-shadow: inset 0px 0px 3px 0px rgba(0,0,0,0.75);
  transition: opacity 0.4s ease;

  &:hover {
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
    opacity: 1;
  }

  h1 {
    display: flex;
    align-items: center;
    gap : 4px;
    color : ${({ theme }) => theme.blue.blue700};
    margin-top : 32px;
  }

`;

const SignUpFormformContainer = styled(SignInFormformContainer)`
  width: 100%;
  & > * {
    width: 100%;
  }
`;

const SignUpFormLabel = styled(SignInFormLabel)`
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap : 4px;


`;

const SignUpFormInputText = styled(SignInFormInputText)`
  transition: none;
`;

const SignUpSpan = styled(SignInSpan)`
  color : ${({ theme }) => theme.blue.blue700};
  font-size: 14px;
  display: flex;
  width: 100%;
  font-weight: 500;
`;

const SignUpFormButton = styled(SignInFormButton)`
  margin-bottom : 32px;
  
`;

const SignUpFormPtag = styled.p`
  display: flex;
  align-items: center;
  font-size : 12px;
  gap: 4px;
  height: 12px;

  span {
    color : ${({ theme }) => theme.blue.blue700};
    font-weight: 700;
  }

  input {
    width: 12px;
    height: 12px;
  }
`;

export { SignUpFormPtag, SignUpFormLabel, SignUpFormInputText, SignUpSpan, SignUpFormMainContainer, SignUpFormformContainer, SignUpFormButton };