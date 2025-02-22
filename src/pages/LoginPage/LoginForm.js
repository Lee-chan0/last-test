import styled from "styled-components";
import backImg from '../../assets/cherry-blossom-2423202_1280.jpg';
import { useRef, useState } from "react";
import { useCreateUser } from "../../hooks/User/useCreateUser";
import { useLogin } from "../../hooks/User/useLogin";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../Main";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginFormBox = styled.div`
  width: 100%;
  height: 100%;
  position : relative;
  overflow: hidden;
  
  border-radius: 4px;

  & > .signup {
    left : 50%;
    transform: ${({ $slideState }) => $slideState ? `translateX(100%)` : `translateX(0)`};
  }

  & > .signin {
    left : 0;
    transform: ${({ $slideState }) => $slideState ? `translateX(0)` : `translateX(-100%)`};
  }
`;


const LoginFormCurtain = styled.div`
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position : absolute;
  z-index: 3;
  transition: all 0.8s ease-in-out;
  box-shadow: ${({ $slideState }) => $slideState ? `-3px 0 5px 1px rgba(0, 0, 0, 0.5)` : `3px 0 5px 1px rgba(0, 0, 0, 0.5)`};
  
  transform: ${({ $slideState }) => $slideState ? `translateX(50%)` : `translateX(-50%)`};

  display : flex;
  align-items : center;

`;

const IsSignUp = styled.button`
  position: absolute;

  padding : 8px 24px;
  font-weight: 400;
  text-transform: uppercase;
  color : ${({ theme }) => theme.blue.blue100};
  background-color: ${({ theme }) => theme.blue.blue500};
  border-radius: 4px;
  font-size : 15px;
  transition: transform 50ms ease, background-color 0.3s ease, opacity 0.5s ease;
  will-change: transform, background-color;
  box-shadow: 3px 3px 4px 2px rgba(0, 0, 0, 0.5);
  opacity : 1;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
  }

  &:active {
    transform: scale(1.02);
  }

  ${({ className }) => className === 'sign-up' ? `left : 20%` : `left : 70%`};

`;

const LoginFormStyle = styled.form`
  width: 50%;
  height: 100%;
  position: absolute;

  transform: translateX(0);
  transition: transform 0.8s ease-in-out;


  background-color: #e9e9e9;

  display : flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > * {
    margin-bottom : 24px;
  }
`;

const LoginTitle = styled.h2`
  font-weight: 300;
`;

const LoginInputLabel = styled.label`
  width: 40%;
  position: relative;
  display : flex;
  align-items: center;
`;

const PlaceHorderContainer = styled.div`
  position : absolute;
  color : ${({ theme }) => theme.gray.gray600};
  font-size : 12px;
  margin-left : 8px;
  transition: transform 0.5s ease;
  cursor: text;

  ${({ $loginValues, $name, $focusValues, $index, $offsetWidthArray, theme }) =>
    ($loginValues[$name] || $focusValues[$name]) && (
      `transform : translate(-${$offsetWidthArray[$index]?.offsetWidth + 16}px);
       color : ${theme.gray.gray900};`
    )};
`;

const LoginInput = styled.input`
  width: 100%;
  border : 1px solid ${({ theme }) => theme.blue.blue500};
  border-radius: 3px;
  height: 30px;
  font-size: 0.7rem;

  padding : 0 8px;

  &::placeholder{
    font-size : 0.7rem;
  }
`;

const LoginBtn = styled.button`
  width: 50%;
  padding : 8px 16px;
  font-weight: 400;
  text-transform: uppercase;
  color : ${({ theme }) => theme.blue.blue100};
  background-color: ${({ theme }) => theme.blue.blue500};
  border-radius: 4px;
  font-size : 14px;
  transition: transform 50ms ease, background-color 0.3s ease;
  will-change: transform, background-color;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
  }

  &:active {
    transform: scale(1.02);
  }
`;

const LoginLink = styled.a`
  text-decoration: none;
  font-size : 13px;

  &:hover {
    color : blue;
  }
`;

const signUpArr = ['ID', 'PASSWORD', 'NAME_POSITION', 'CMS_CODE'];
const signInArr = ['ID', 'PASSWORD'];
const INITIAL_LOGINVALUES = {
  loginId: "",
  password: "",
  userNamePosition: "",
  signUpCode: "",
}

function LoginForm({ slideState, onClick, btnState, setBtnState, setSlideState }) {
  const [focusValues, setfocusValues] = useState({
    loginId: false,
    password: false,
    userNamePosition: false,
    signUpCode: false,
  });
  const [loginValues, setLoginValues] = useState(INITIAL_LOGINVALUES);
  const placeHolderRef = useRef([]);
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();
  const logInMutation = useLogin();

  const focusBlurInput = (e, isFocus) => {
    setfocusValues((prev) => ({
      ...prev,
      [e.target.name]: isFocus
    }))
  }

  const changeValue = (e) => {
    setLoginValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const createUserSubmit = (e) => {
    e.preventDefault();
    createUserMutation.mutate(loginValues, {
      onSuccess: () => {
        setLoginValues(INITIAL_LOGINVALUES);
        setBtnState((prev) => !prev);
        setSlideState((prev) => !prev);
      }
    });
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    logInMutation.mutate(loginValues, {
      onSuccess: (data) => {
        const { token } = data;
        localStorage.setItem('token', `Bearer ${token}`);
        setLoginValues(INITIAL_LOGINVALUES);

        queryClient.removeQueries('islogin');

        navigate('/truescope-administrator/editor-page', { replace: true });
      }
    });
  }

  return (
    <MainContainer>
      <LoginFormBox $slideState={slideState}>
        <LoginFormCurtain $slideState={slideState}>
          <IsSignUp className="sign-up" name="signup"
            onClick={(e) => onClick(e)}
            $slideState={slideState}
            $btnState={btnState}
            style={btnState ? { opacity: "1" } : { opacity: "0" }}
          >SignUp</IsSignUp>
          <IsSignUp className="sign-in" name="signin"
            onClick={(e) => onClick(e)}
            $slideState={slideState}
            $btnState={btnState}
            style={btnState ? { opacity: "0" } : { opacity: "1" }}
          >SignIn</IsSignUp>
        </LoginFormCurtain>
        <LoginFormStyle className="signup" $slideState={slideState} onSubmit={createUserSubmit}>
          <LoginTitle>Sign Up</LoginTitle>
          {
            signUpArr.map((item, index) => {
              return (
                <LoginInputLabel key={index}>
                  <PlaceHorderContainer
                    ref={(dom) => placeHolderRef.current[index] = dom}
                    $index={index}
                    $offsetWidthArray={placeHolderRef.current}
                    $loginValues={loginValues}
                    $focusValues={focusValues}
                    $name={
                      item === 'ID' ? 'loginId' :
                        item === 'PASSWORD' ? 'password' :
                          item === 'NAME_POSITION' ? 'userNamePosition' : 'signUpCode'
                    }>
                    {item}
                  </PlaceHorderContainer>
                  <LoginInput
                    value={loginValues[
                      item === 'ID' ? 'loginId' :
                        item === 'PASSWORD' ? 'password' :
                          item === 'NAME_POSITION' ? 'userNamePosition' : 'signUpCode'
                    ]}
                    type={(item === 'PASSWORD' ? "password" : "text")}
                    name={
                      item === 'ID' ? 'loginId' :
                        item === 'PASSWORD' ? 'password' :
                          item === 'NAME_POSITION' ? 'userNamePosition' : 'signUpCode'
                    }
                    placeholder={
                      (item === 'NAME_POSITION' && focusValues.userNamePosition && !loginValues.userNamePosition)
                        ?
                        "ex) 홍길동 기자"
                        :
                        undefined
                    }
                    onChange={changeValue}
                    onFocus={(e) => focusBlurInput(e, true)}
                    onBlur={(e) => focusBlurInput(e, false)}
                  />
                </LoginInputLabel>
              )
            })
          }
          <LoginBtn type='submit'>Sign Up</LoginBtn>
        </LoginFormStyle>
        <LoginFormStyle className="signin" onSubmit={loginSubmit}>
          <LoginTitle>Sign In</LoginTitle>
          {
            signInArr.map((item, index) => {
              return (
                <LoginInputLabel key={index}>
                  <PlaceHorderContainer
                    ref={(dom) => placeHolderRef.current[index] = dom}
                    $index={index}
                    $offsetWidthArray={placeHolderRef.current}
                    $loginValues={loginValues}
                    $focusValues={focusValues}
                    $name={item === 'ID' ? "loginId" : "password"}
                  >
                    {item}
                  </PlaceHorderContainer>
                  <LoginInput
                    value={loginValues[
                      item === 'ID' ? "text" : "password"
                    ]}
                    type={(item === 'ID' ? "text" : "password")}
                    name={item === 'ID' ? "loginId" : "password"}
                    onChange={changeValue}
                    onFocus={(e) => focusBlurInput(e, true)}
                    onBlur={(e) => focusBlurInput(e, false)}
                  />
                </LoginInputLabel>
              )
            })
          }
          <LoginLink href="/" >비밀번호를 잊으셨나요?</LoginLink>
          <LoginBtn type='submit'>Sign In</LoginBtn>
        </LoginFormStyle>
      </LoginFormBox>
    </MainContainer >
  )
}

export default LoginForm;