import {
  SignInFormMainContainer, SignInFormVideoContainer, SignInFormLogoImage, SignInSpan,
  SignInFormformContainer, SignInFormInputText, SignInFormButton, SignInFormLabel, SignInCenterContainer
} from './SignInFromStyle';
import logoImage from '../../assets/Group 1.png';
import videoFile from '../../assets/0119.mp4';
import userImage from '../../assets/mdi_user-outline.png';
import { useState } from 'react';



function SignInForm() {
  const [focusState, setFocusState] = useState({
    id: false,
    password: false,
  });

  const [inputContent, setInputContent] = useState({
    id: '',
    password: ''
  });

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
  return (
    <SignInCenterContainer>
      <SignInFormVideoContainer loop autoPlay playsInline muted>
        <source src={videoFile} type='video/mp4' />
      </SignInFormVideoContainer>
      <SignInFormMainContainer>
        <SignInFormformContainer>
          <SignInFormLogoImage src={logoImage} alt='logo' />
          <SignInFormLabel htmlFor='id'>
            <img src={userImage} width={'20px'} height={'20px'} alt="adminImage" />
            관리자 로그인
          </SignInFormLabel>
          <SignInFormLabel>
            <div className={focusState.id || inputContent.id ? "move-left-id" : ''}>ID</div>
            <SignInFormInputText id='id' type='text' onFocus={() => handleFocus("id")}
              onBlur={() => handleBlur("id")} onChange={handleChange} />
          </SignInFormLabel>
          <SignInFormLabel>
            <div className={focusState.password || inputContent.password ? "move-left-password" : ''}>PASSWORD</div>
            <SignInFormInputText id='password' type='password' onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")} onChange={handleChange} />
          </SignInFormLabel>
          <SignInFormButton><div>LOGIN</div></SignInFormButton>
          <SignInSpan as='a' href='/truescope-administrator/signup'>회원가입</SignInSpan>
        </SignInFormformContainer>
      </SignInFormMainContainer>
    </SignInCenterContainer>
  )
}


export default SignInForm;