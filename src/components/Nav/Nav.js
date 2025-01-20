import styled, { css } from "styled-components";
import { flexContainer } from '../Container/ContainerStyle';
import temperatureIcon from '../../assets/device_thermostat.png';
import { useState } from "react";


const BlueColor = css`
  background-color: ${({ theme }) => theme.blue.blue500};
`;

const BlackColor = css`
  background-color: ${({ theme }) => theme.gray.gray600};
`;

const NavigationContainer = styled(flexContainer)`
  height: 40px;
  flex-direction: row-reverse;
  border-bottom: 2px solid ${({ theme }) => theme.gray.gray400};
  padding : 0 80px;
`;

const NavigationMenus = styled(flexContainer)`
  align-items: center;
  gap : 16px;
`;

const NavigationTemperature = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
  }
`;

const DarkModeMenu = styled.div`
  ${({ $darkModeToggle }) => $darkModeToggle ? BlackColor : BlueColor};
  border-radius: 9999px;
  width: 48px;
  height: 24px;
  display: flex;
  align-items: center;
  padding : 0 4px;
`;

const DarkModeMenuToggle = styled.div`
  background-color: #d9d9d9;
  border-radius: 9999px;
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  transform: ${({ $darkModeToggle }) => $darkModeToggle ? 'translateX(24px)' : 'translateX(0)'};

  &:hover {
    cursor: pointer;
  }
`;

function Nav() {
  const [darkModeToggle, setDarkModeToggle] = useState(false);

  const clickByDarkmode = () => {
    setDarkModeToggle((prev) => !prev);
  }

  return (
    <NavigationContainer>
      <NavigationMenus>
        <NavigationTemperature>
          <img src={temperatureIcon} alt="temperature" />
          <div>11.8°C</div>
        </NavigationTemperature>
        <DarkModeMenu $darkModeToggle={darkModeToggle}>
          <DarkModeMenuToggle $darkModeToggle={darkModeToggle} onClick={clickByDarkmode} />
        </DarkModeMenu>
      </NavigationMenus>
    </NavigationContainer>
  )
}


export default Nav;