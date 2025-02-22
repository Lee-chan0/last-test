import styled from "styled-components";



const CenterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display : flex;
  justify-content: center;
  align-items: center;
`;

const SideContainer = styled.div`
  width: 240px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;

const flexContainer = styled.div`
  display : flex;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding : 0 80px;

  @media (min-width: 768px) and (max-width: 1279px) {
    padding : 0 40px;
  }

  @media (max-width : 767px) {
    padding : 0 16px;
  }
`;



export { CenterContainer, SideContainer, flexContainer, MainContainer };