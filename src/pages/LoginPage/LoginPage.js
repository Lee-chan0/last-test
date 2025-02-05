import styled from "styled-components";
import backImg from '../../assets/cherry-blossom-2423202_1280.jpg';
import OverLay from "./OverLay";
import { useState } from "react";

const LoginMainContainer = styled.div`
  background-image: url(${backImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;

  display: grid;
  place-items: center;
`;

function LoginPage() {
  const [slideState, setSlideState] = useState(true);
  const [btnState, setBtnState] = useState(true);

  const clickSlide = (e) => {
    const targetName = e.target.name;
    if (targetName === 'signup') {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
    setSlideState((prev) => !prev);
  }

  return (
    <LoginMainContainer>
      <OverLay
        slideState={slideState}
        onClick={clickSlide}
        btnState={btnState}
      />
    </LoginMainContainer>
  )
}

export default LoginPage;