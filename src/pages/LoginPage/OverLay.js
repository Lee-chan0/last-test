import styled from "styled-components";
import LoginForm from "./LoginForm";

const MainContainer = styled.div`
  width: 100%;
  max-width: 758px;
  height: 440px;

`;

const OverLayContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function OverLay({ slideState, onClick, btnState }) {
  return (
    <MainContainer>
      <OverLayContainer>
        <LoginForm slideState={slideState} onClick={onClick} btnState={btnState} />
      </OverLayContainer>
    </MainContainer>
  )
}

export default OverLay;