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
import { getCategories, getTodayArticle, getTopArticles, getVideoArticles } from '../../utils/api';

export const articleTypes = [
  {
    articleTypeName: "TOP 뉴스"
  },
  {
    articleTypeName: "동영상"
  }
]

function HomePage() {
  const videoLimit = 10;
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const categoryArr = categories?.categories || [];

  const { data: todayArticle } = useQuery({
    queryKey: ['todayArticle'],
    queryFn: (limit) => getTodayArticle(limit = 5),
  });
  const todayArticleArr = todayArticle?.todayArticle || [];

  const { data: topNewsArticles } = useQuery({
    queryKey: ['topNews'],
    queryFn: (limit) => getTopArticles(limit = 10),
  })
  const topNewsArticlesArr = topNewsArticles?.topArticles || [];

  const { data: findVideoArticles } = useQuery({
    queryKey: ['homevideo'],
    queryFn: () => getVideoArticles(videoLimit),
  })
  const homeVideoArticleArr = findVideoArticles?.videoArticles || [];

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoryArr} />
        <TodayNewsBanner todayArticleArr={todayArticleArr} />
        <HomeNews articleType={'TOP 뉴스'} topNewsArticlesArr={topNewsArticlesArr} />
        <BrandLists />
        <VideoBox articleType={'동영상'} homeVideoArticleArr={homeVideoArticleArr} />
      </MainContainer>
      <Footer />
    </>
  )
}

export default HomePage;