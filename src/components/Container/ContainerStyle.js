import styled from "styled-components";



const CenterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display : flex;
  justify-content: center;
  align-items: center;
`;

const SideContainer = styled.div`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
`;

const flexContainer = styled.div`
  display : flex;
`;

export { CenterContainer, SideContainer, flexContainer };