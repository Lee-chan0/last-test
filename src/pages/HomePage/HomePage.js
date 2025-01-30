import { MainContainer } from '../../components/Container/ContainerStyle';
import MenuBar from '../../components/MenuBar/MenuBar';
import TodayNewsBanner from '../../components/TodayNewsBanner/TodayNewsBanner';
import HomeNews from '../../components/HomeNews/HomeNews';
import BrandLists from '../../components/BrandLists/BrandLists';
import VideoBox from '../../components/VideoNews/VideoBox';
import LogoContainer from '../../components/LogoCotainer/LogoContainer';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

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
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar />
        <TodayNewsBanner />
        <HomeNews articleType={articleTypes} />
        <BrandLists />
        <VideoBox articleType={articleTypes} />
      </MainContainer>
      <Footer />
    </>
  )
}

export default HomePage;