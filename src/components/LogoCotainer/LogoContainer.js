import styled, { keyframes } from "styled-components";
import logoImage from '../../assets/Group 1.png';
import logoImage2 from '../../assets/Frame 93.png';
import { Link } from "react-router-dom";
import sakura from '../../assets/thumb_d_2585BEDB390ADAC6CEB0FF3482B0D396.png';
import { useTheme } from "../../Contexts/ThemeContext";
import lightLogoImg from '../../assets/Frame 101.png';
import car from '../../assets/joy-1667_256.gif';
import devil from '../../assets/fxemoji_devilhorns.png';

const petalAnime = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(0);
    opacity: 1;
  }
  25% {
    transform : translateX(10px) translateY(20vh) rotate(23deg);
  }
  50% {
    transform : translateX(25px) translateY(40vh) rotate(-95deg);
    opacity: 0.7;
  }
  75% {
    transform : translateX(0px) translateY(60vh) rotate(90deg);
  }
  100% {
    transform: translateX(-25px) translateY(80vh) rotate(-45deg);
    opacity: 0;
  }
`;


// 벚꽃잎 스타일
const SakuraPetal = styled.div`
  background-image: url(${sakura});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  transform: rotate(30deg);

  width : ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  position : absolute;
  top : 0;
  left : ${({ $left }) => $left}%;

  opacity: 1;

  z-index: 2;

  animation : ${petalAnime} ${({ $delay }) => $delay}s linear infinite;
`;


const bounce = keyframes`
  0% {
    transform: translateX(0) rotateY(0) translateY(0);
  }
  49% {
    transform: translateX(30vw);
  }
  50% {
    transform : translateX(30vw) translateY(-10px) ;
  }
  51% {
    transform : translateX(30vw) translateY(-20px) rotateY(180deg);
  }
  53% {
    transform : translateX(30vw) translateY(0px) rotateY(180deg);
    animation-timing-function: ease;
  }

  100% {
    transform : translateX(0) rotateY(180deg);
  }
`;

const Devil = styled.div`
  background-image: url(${devil});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;

  position : absolute;
  left : 35vw;
  bottom : 0;

  @media (min-width: 768px) and (max-width: 1279px) {
    left : 40vw;
  }

  opacity: 0;

  animation : ${keyframes`
    0%, 47% {opacity : 0;},
    48%, 80% {opacity: 1;},
    81%, 100% {opacity: 0;}
  `} 20s linear infinite;

  @media (max-width : 767px) {
    display : none;
  }
`;

const Bear = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${car});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 9999px;
  position: absolute;

  left : 20px;
  bottom : -10px;

  animation: ${bounce} 20s linear infinite;

  @media (max-width : 767px) {
    display : none;
  }
`;

const BearText = styled.span`
  position: absolute;
  top: -10px;

  animation : ${keyframes`
    0%, 47% {opacity : 0;},
    48%, 50% {opacity: 1;},
    51%, 100% {opacity: 0;}
  `} 20s linear infinite;

  @media (max-width : 767px) {
    display : none;
  }
`;

const LogoCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  position: relative;

  @media (min-width: 768px) and (max-width: 1279px) {
    a {
    img {
      width: 232px;
      height: 64px;
      }
    }
  }

  @media (max-width: 767px) {
    padding : 16px 0;
    a {
      img {
        width : 144px;
        height: 40px;
      }
    }
    }
`;

const IntroduceLogoCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: pink;
  overflow: hidden;
  
  img {
    position: relative;
    width: 280px;
    height: 80px;

    @media (min-width: 768px) and (max-width: 1279px) {
      width : 232px;
      height: 64px;
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    height: 100px;
  }
`;

function LogoContainer({ isIntroducePage }) {
  const { darkmode } = useTheme();

  const fallingArray = new Array(25).fill(0).map((_, idx) => {
    return (
      {
        id: idx,
        size: Math.random() * 10 + 20,
        left: Math.random() * 100,
        delay: Math.random() * 10 + 5,
      }
    )
  })

  return (
    (!isIntroducePage)
      ? (
        <LogoCont>
          <Devil />
          <Bear>
            <BearText>‼️</BearText>
          </Bear>
          <Link to="/"><img src={darkmode ? lightLogoImg : logoImage} alt="logo" /></Link>
        </LogoCont>
      )
      : (
        <IntroduceLogoCont>
          {
            fallingArray.map((item) => {
              const { size, id, left, delay, rotate } = item;
              return (
                <SakuraPetal key={id} $size={size} $left={left} $delay={delay} $rotate={rotate} />
              )
            })
          }
          <Link to="/"><img src={logoImage2} alt="logo" /></Link>
        </IntroduceLogoCont>
      )
  );
}

export default LogoContainer;
