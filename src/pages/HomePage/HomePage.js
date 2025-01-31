import { MainContainer } from '../../components/Container/ContainerStyle';
import MenuBar from '../../components/MenuBar/MenuBar';
import TodayNewsBanner from '../../components/TodayNewsBanner/TodayNewsBanner';
import HomeNews from '../../components/HomeNews/HomeNews';
import BrandLists from '../../components/BrandLists/BrandLists';
import VideoBox from '../../components/VideoNews/VideoBox';
import LogoContainer from '../../components/LogoCotainer/LogoContainer';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { useQuery } from '@tanstack/react-query';
import { getArticles, getCategories } from '../../utils/api';

export const articleTypes = [
  {
    articleTypeName: "TOP 뉴스"
  },
  {
    articleTypeName: "동영상"
  }
]

function HomePage() {
  const { data: entireArticle } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    staleTime: 1000 * 60 * 5
  })
  const entireArticleArr = entireArticle?.articles || [];
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5
  });
  const categoryArr = categories?.categories || [];


  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoryArr} />
        <TodayNewsBanner />
        <HomeNews articleType={'TOP 뉴스'} entireArticleArr={entireArticleArr} />
        <BrandLists />
        <VideoBox articleType={'동영상'} />
      </MainContainer>
      <Footer />
    </>
  )
}

export default HomePage;