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


const LogoContainer = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  padding : 40px 0 ;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding : 0 80px;

`;



export { CenterContainer, SideContainer, flexContainer, LogoContainer, MainContainer };