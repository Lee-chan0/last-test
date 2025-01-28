import styled from "styled-components";
import logoImage from '../../assets/Group 1.png';
import { Link } from "react-router-dom";


const LogoCont = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  padding : 40px 0 ;
`;

function LogoContainer() {
  return (
    <LogoCont>
      <Link to="/"><img src={logoImage} alt="logo" /></Link>
    </LogoCont>
  )
}

export default LogoContainer;