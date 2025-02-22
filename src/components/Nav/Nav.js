import styled from "styled-components";
import { flexContainer } from '../Container/ContainerStyle';
import temperatureIcon from '../../assets/device_thermostat.png';
import lightTemperature from '../../assets/hugeicons_temperature.png';
import sun from '../../assets/light_mode_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.png';
import moon from '../../assets/dark_mode_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.png';
import { useTheme } from "../../Contexts/ThemeContext";
import menuIcon from '../../assets/ri_menu-line.png';
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import MenuBox from "./MenuBox";
import MobileSearch from "../MobileSearch/MobileSearch";

const NavigationContainer = styled(flexContainer)`
  height: 40px;
  flex-direction: row-reverse;
  border-bottom: 2px solid ${({ theme }) => theme.gray.gray400};
  padding : 0 80px;

  @media (min-width: 768px) and (max-width : 1279px) {
    padding : 0 40px;
  }

  @media (max-width : 767px) {
    padding : 0 16px;
    height: 32px;
    position : relative;
  }
`;

const NavigationMenus = styled(flexContainer)`
  align-items: center;
  gap : 16px;
  @media (max-width : 767px) {
    width : 100%;
    justify-content: space-between;
  }

`;

const NavigationTemperature = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;

    @media (min-width: 768px) and (max-width: 1279px) {
      width: 18px;
      height: 18px;
    }
  }

  div {
    @media (min-width: 768px) and (max-width: 1279px) {
      font-size: 14px;
    }
  }

  @media (max-width : 767px) {
    display : none;
  }
`;

const LightOrDarkContainer = styled.div`
  position : relative;
  width: 55px;
  height: 24px;
  display: flex;
  justify-content: center;

  overflow: hidden;

  
  @media (min-width: 768px) and (max-width: 1279px) {
    width : 45px;
    height : 20px;
  }

  @media (max-width : 767px) {
    width : 30px;
    height: 16px;
  }
`;

const LightImg = styled.div`
  position: absolute;
  left: 0;
  width: 24px;
  height: 24px;
  background-image: url(${sun});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  opacity: ${({ $darkmode }) => $darkmode ? `1` : `0`};
  pointer-events: ${({ $darkmode }) => !$darkmode && 'none'};
  transition : opacity 0.1s;

  cursor: pointer;

  @media (min-width: 768px) and (max-width: 1279px) {
    width : 20px;
    height : 20px;
  }

  @media (max-width : 767px) {
    width : 16px;
    height : 16px;
  }

`;

const DarkImg = styled.div`
  position: absolute;
  right : 0;
  width: 24px;
  height: 24px;
  background-image: url(${moon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  pointer-events: ${({ $darkmode }) => $darkmode && 'none'};
  transition : opacity 0.5s;

  opacity: ${({ $darkmode }) => !$darkmode ? `1` : `0`};

  cursor: pointer;


  @media (min-width: 768px) and (max-width: 1279px) {
    width : 20px;
    height : 20px;
  }

  @media (max-width : 767px) {
    width : 16px;
    height : 16px;
  }
`;


const MenuBarContainer = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  gap : 4px;

  img {
    width : 16px;
    height: 16px;
  }

  span {
    font-size : 13px;
    font-weight: 300;
    color : ${({ theme }) => theme.blue.blue500};
  }
`;


function Nav() {
  const { darkmode, setDarkmode } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [menuBoxState, setMenuBoxState] = useState(false);


  const clickToggle = () => {
    setDarkmode((prev) => !prev);
  }

  const handleClickMenu = () => {
    setMenuBoxState((prev) => !prev);
  }

  return (
    <NavigationContainer>
      <MenuBox menuBoxState={menuBoxState} onClick={handleClickMenu} setMenuBoxState={setMenuBoxState} />
      <MobileSearch />
      <NavigationMenus>
        {
          (isMobile) &&
          <MenuBarContainer onClick={handleClickMenu} >
            <img src={menuIcon} alt="menu-icon" />
          </MenuBarContainer>
        }
        <NavigationTemperature>
          <img src={darkmode ? lightTemperature : temperatureIcon} alt="temperature" />
          <div style={darkmode ? { color: '#fff' } : { color: '#1a1a1a' }}>11.8°C</div>
        </NavigationTemperature>
        <LightOrDarkContainer>
          <LightImg onClick={clickToggle} $darkmode={darkmode} />
          <DarkImg onClick={clickToggle} $darkmode={darkmode} />
        </LightOrDarkContainer>
      </NavigationMenus>
    </NavigationContainer>
  )
}


export default Nav;