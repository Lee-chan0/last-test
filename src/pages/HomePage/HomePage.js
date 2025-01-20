import { LogoContainer, MainContainer } from '../../components/Container/ContainerStyle';
import logoImage from '../../assets/Group 1.png';
import MenuBar from '../../components/MenuBar/MenuBar';
import TodayNewsBanner from '../../components/TodayNewsBanner/TodayNewsBanner';
import HomeNews from '../../components/HomeNews/HomeNews';

function HomePage() {
  return (
    <MainContainer>
      <LogoContainer>
        <img src={logoImage} alt="logo" />
      </LogoContainer>
      <MenuBar />
      <TodayNewsBanner />
      <HomeNews />
    </MainContainer>
  )
}

export default HomePage;