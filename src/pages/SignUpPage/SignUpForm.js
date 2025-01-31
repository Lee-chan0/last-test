import { SignInFormVideoContainer, SignInCenterContainer } from '../SignInPage/SignInFromStyle';
import videoFile from '../../assets/0119.mp4';
import signUpImage from '../../assets/material-symbols_lock-outline-blue.png';
import {
  SignUpFormLabel, SignUpFormInputText, SignUpSpan, SignUpFormButton,
  SignUpFormMainContainer, SignUpFormformContainer, SignUpFormPtag
} from './SignUpFromStyle';
import { useMutation } from '@tanstack/react-query';
import { signupFunc } from '../../utils/api';
import { queryClient } from '../../Main';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_USERINFO = {
  loginId: "",
  password: "",
  userNamePosition: "",
}

function SignUpForm() {
  const signUpMutation = useMutation({
    mutationFn: (userInformation) => signupFunc(userInformation),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] })
  });
  const [userInformation, setUserInformation] = useState(INITIAL_USERINFO)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const targetId = e.target.id;
    const value = e.target.value;

    setUserInformation((prev) => ({
      ...prev,
      [targetId]: value,
    }))
  }

  const submitSignUp = (e) => {
    e.preventDefault();
    signUpMutation.mutate(userInformation);
    setUserInformation(INITIAL_USERINFO);
    alert("회원가입이 완료되었습니다.");
    navigate("/truescope-administrator/signin", { replace: true });
  }

  return (
    <SignInCenterContainer>
      <SignInFormVideoContainer loop autoPlay playsInline muted>
        <source src={videoFile} type='video/mp4' />
      </SignInFormVideoContainer>
      <SignUpFormMainContainer>
        <h1>
          <img src={signUpImage} alt='sign-up' width={'36px'} height={'36px'} />
          회원가입
        </h1>
        <SignUpFormformContainer onSubmit={submitSignUp}>
          <SignUpFormLabel htmlFor='loginId'>
            <SignUpSpan>ID</SignUpSpan>
            <SignUpFormInputText id='loginId' type='text' placeholder='ID' onChange={handleChange} />
          </SignUpFormLabel>
          <SignUpFormLabel htmlFor='password'>
            <SignUpSpan>비밀번호</SignUpSpan>
            <SignUpFormInputText id='password' type='password' placeholder='Password' onChange={handleChange} />
          </SignUpFormLabel>
          <SignUpFormLabel htmlFor='confirm-password'>
            <SignUpSpan>비밀번호 확인</SignUpSpan>
            <SignUpFormInputText id='confirm-password' type='password' placeholder='Confirm Password' />
          </SignUpFormLabel>
          <SignUpFormLabel htmlFor='userNamePosition'>
            <SignUpSpan>이름 및 직책</SignUpSpan>
            <SignUpFormInputText id='userNamePosition' type='text' placeholder='ex) 홍길동 기자' onChange={handleChange} />
          </SignUpFormLabel>
          <SignUpFormPtag>이용약관 동의<span>&#40;필수&#41;</span><input type='checkbox' /></SignUpFormPtag>
          <SignUpFormPtag>개인 정보 수집 및 이용 동의<span>&#40;필수&#41;</span><input type='checkbox' /></SignUpFormPtag>
          <SignUpFormPtag>이벤트 등 프로모션 메일 수신 동의<span>&#40;선택&#41;</span><input type='checkbox' /></SignUpFormPtag>
          <SignUpFormButton type='submit'><div>Complete</div></SignUpFormButton>
        </SignUpFormformContainer>
      </SignUpFormMainContainer>
    </SignInCenterContainer>
  )
}

export default SignUpForm;