import { SignInFormVideoContainer, SignInCenterContainer } from '../SignInPage/SignInFromStyle';
import videoFile from '../../assets/0119.mp4';
import signUpImage from '../../assets/material-symbols_lock-outline-blue.png';
import {
  SignUpFormLabel, SignUpFormInputText, SignUpSpan, SignUpFormButton,
  SignUpFormMainContainer, SignUpFormformContainer, SignUpFormPtag
} from './SignUpFromStyle';


function SignUpForm() {
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
        <SignUpFormformContainer>
          <SignUpFormLabel htmlFor='id'>
            <SignUpSpan>ID</SignUpSpan>
            <SignUpFormInputText id='id' type='text' placeholder='ID' />
          </SignUpFormLabel>
          <SignUpFormLabel htmlFor='password'>
            <SignUpSpan>비밀번호</SignUpSpan>
            <SignUpFormInputText id='password' type='password' placeholder='Password' />
          </SignUpFormLabel>
          <SignUpFormLabel htmlFor='confirm-password'>
            <SignUpSpan>비밀번호 확인</SignUpSpan>
            <SignUpFormInputText id='confirm-password' type='password' placeholder='Confirm Password' />
          </SignUpFormLabel>
          <SignUpFormLabel htmlFor='username'>
            <SignUpSpan>이름 및 직책</SignUpSpan>
            <SignUpFormInputText id='username' type='text' placeholder='ex) 홍길동 기자' />
          </SignUpFormLabel>
          <SignUpFormPtag>이용약관 동의<span>&#40;필수&#41;</span><input type='checkbox' /></SignUpFormPtag>
          <SignUpFormPtag>개인 정보 수집 및 이용 동의<span>&#40;필수&#41;</span><input type='checkbox' /></SignUpFormPtag>
          <SignUpFormPtag>이벤트 등 프로모션 메일 수신 동의<span>&#40;선택&#41;</span><input type='checkbox' /></SignUpFormPtag>
          <SignUpFormButton><div>Complete</div></SignUpFormButton>
        </SignUpFormformContainer>
      </SignUpFormMainContainer>
    </SignInCenterContainer>
  )
}

export default SignUpForm;