import { LogoContainer, MainContainer } from '../../components/Container/ContainerStyle';
import logoImage from '../../assets/Group 1.png';
import MenuBar from '../../components/MenuBar/MenuBar';
import TodayNewsBanner from '../../components/TodayNewsBanner/TodayNewsBanner';
import HomeNews from '../../components/HomeNews/HomeNews';
import BrandLists from '../../components/BrandLists/BrandLists';
import VideoBox from '../../components/VideoNews/VideoBox';

export const articleTypes = [
  {
    articleTypeName: "TOP 뉴스"
  },
  {
    articleTypeName: "동영상"
  }
]

function HomePage() {
  return (
    <MainContainer>
      <LogoContainer>
        <img src={logoImage} alt="logo" />
      </LogoContainer>
      <MenuBar />
      <TodayNewsBanner />
      <HomeNews articleType={articleTypes[0]} />
      <BrandLists />
      <VideoBox articleType={articleTypes[1]} />
    </MainContainer>
  )
}

export default HomePage;