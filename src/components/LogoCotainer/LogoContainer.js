import styled from "styled-components";
import logoImage from '../../assets/Group 1.png';
import logoImage2 from '../../assets/Frame 93.png';
import { Link } from "react-router-dom";


const LogoCont = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  padding : 40px 0 ;
`;


const IntroduceLogoCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: #e8647b57;
  
  img {
    width: 280px;
    height: 80px;
  }
`;

function LogoContainer({ isIntroducePage }) {
  return (

    (!isIntroducePage)
      ?
      (
        <LogoCont>
          <Link to="/"><img src={logoImage} alt="logo" /></Link>
        </LogoCont>
      )
      :
      (
        <IntroduceLogoCont>
          <Link to="/"><img src={logoImage2} alt="logo" /></Link>
        </IntroduceLogoCont>
      )


  )
}

export default LogoContainer;