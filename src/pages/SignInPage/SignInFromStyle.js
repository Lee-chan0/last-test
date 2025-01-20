import styled from "styled-components";
import { CenterContainer } from "../../components/Container/ContainerStyle";

const SignInCenterContainer = styled(CenterContainer)`
  position: relative;
`;

const SignInFormMainContainer = styled.div`
  width: 100%;
  display : flex;
  justify-content: center;
`;


const SignInFormButton = styled.button`
  border-radius: 4px;
  font-size : 20px;
  font-weight: bold;
  color : #ffffff;
  background-color: ${({ theme }) => theme.blue.blue500};
  transition: background-color 0.5s ease;
  height : 40px;
  line-height: 40px;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
  }
`;

const SignInFormVideoContainer = styled.video`
  position : absolute;
  width: 100%;
  height: 100%;
  left : 0;
  top : 0;
  object-fit: cover;
  z-index: -1;
`;

const SignInFormformContainer = styled.form`
  width: 50%;
  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap : 16px;

  & > * {
    width: 50%;
  }
`;

const SignInFormLogoImage = styled.img`
  width: 40%;
  margin-bottom : 24px;
`;

const SignInSpan = styled.span`
  display : flex;
  align-items: center;
  color : white;
  text-decoration: none;
`;

const SignInFormLabel = styled.label`
  position : relative;
  display : flex;
  align-items: center;

  div {
    position : absolute;
    left : 8px;
    line-height: 40px;
    font-size : 14px;
    color : ${({ theme }) => theme.gray.gray400};
    transition : transform 0.5s ease, left 0.5s ease, color 0.5s ease;

    &.move-left-id {
    transform: translateX(-25px);
    left : 0;
    color : ${({ theme }) => theme.gray.gray900};
  }

    &.move-left-password {
      transform: translateX(-85px);
      left : 0;
      color : ${({ theme }) => theme.gray.gray900};
    }
  }
`;

const SignInFormInputText = styled.input`
  border-radius: 4px;
  padding : 0 8px;
  border : 1px solid ${({ theme }) => theme.gray.gray400};
  height : 40px;
  width: 100%;
  line-height: 40px;


&:focus {
  outline: 1px solid ${({ theme }) => theme.blue.blue500};
}
`;


export { SignInSpan, SignInCenterContainer, SignInFormLabel, CenterContainer, SignInFormMainContainer, SignInFormVideoContainer, SignInFormformContainer, SignInFormLogoImage, SignInFormInputText, SignInFormButton };