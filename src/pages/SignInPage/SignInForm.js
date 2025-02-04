import {
  SignInFormMainContainer, SignInFormLogoImage, SignInSpan,
  SignInFormformContainer, SignInFormInputText, SignInFormButton,
  SignInFormLabel, SignInCenterContainer
} from './SignInFromStyle';
import logoImage from '../../assets/Group 1.png';
import userImage from '../../assets/mdi_user-outline.png';
import { useState } from 'react';
import { queryClient } from '../../Main';
import { useMutation } from '@tanstack/react-query';
import { loginFunc } from '../../utils/api';
import { useNavigate } from 'react-router-dom';


function SignInForm() {
  const [focusState, setFocusState] = useState({
    loginId: false,
    password: false,
  });
  const [inputContent, setInputContent] = useState({
    loginId: '',
    password: ''
  });
  const loginMutation = useMutation({
    mutationFn: (userInfo) => loginFunc(userInfo),
    onSuccess: (data) => {
      localStorage.setItem('token', `Bearer ${data.token}`);
      queryClient.invalidateQueries(['userInfo']);
      setInputContent({
        loginId: '',
        password: ''
      })
      setFocusState({
        loginId: false,
        password: false
      })
    }
  })
  const navigate = useNavigate();

  const handleFocus = (field) => {
    setFocusState((prev) => ({
      ...prev,
      [field]: true,
    }));
  }

  const handleBlur = (field) => {
    setFocusState((prev) => ({
      ...prev,
      [field]: false,
    }))
  }

  const handleChange = (e) => {
    const content = e.target.value;
    const htmlId = e.target.id;
    setInputContent((prev) => ({
      ...prev,
      [htmlId]: content,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(inputContent, {
      onSuccess: () => {
        navigate('/truescope-administrator/editor-page', { replace: true });
      }
    });
  }

  return (
    <SignInCenterContainer>
      <SignInFormMainContainer>
        <SignInFormformContainer onSubmit={handleSubmit}>
          <SignInFormLogoImage src={logoImage} alt='logo' />
          <SignInFormLabel htmlFor='id'>
            <img src={userImage} width={'20px'} height={'20px'} alt="adminImage" />
            관리자 로그인
          </SignInFormLabel>
          <SignInFormLabel>
            <div className={focusState.loginId || inputContent.loginId ? "move-left-id" : ''}>ID</div>
            <SignInFormInputText id='loginId' value={inputContent.loginId} type='text' onFocus={() => handleFocus("loginId")}
              onBlur={() => handleBlur("loginId")} onChange={handleChange} />
          </SignInFormLabel>
          <SignInFormLabel>
            <div className={focusState.password || inputContent.password ? "move-left-password" : ''}>PASSWORD</div>
            <SignInFormInputText id='password' value={inputContent.password} type='password' onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")} onChange={handleChange} />
          </SignInFormLabel>
          <SignInFormButton type='submit'><div>LOGIN</div></SignInFormButton>
          <SignInSpan as='a' href='/truescope-administrator/signup'>회원가입</SignInSpan>
        </SignInFormformContainer>
      </SignInFormMainContainer>
    </SignInCenterContainer>
  )
}


export default SignInForm;