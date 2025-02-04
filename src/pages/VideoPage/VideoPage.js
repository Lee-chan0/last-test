import { useQuery } from "@tanstack/react-query";
import { MainContainer } from "../../components/Container/ContainerStyle";
import Footer from "../../components/Footer/Footer";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import MenuBar from "../../components/MenuBar/MenuBar";
import Nav from "../../components/Nav/Nav";
import { getCategories, getVideoArticles } from "../../utils/api";
import VideoArticleList from "../../components/VideoArticleList/VideoArticleList";


function VideoPage() {
  const { data: videoArticles } = useQuery({
    queryKey: ['videoArticles'],
    queryFn: () => getVideoArticles(null)
  })
  const videoArticlesArr = videoArticles?.videoArticles || [];

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const categoriesArr = categories?.categories || [];

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoriesArr} />
        <VideoArticleList videoArticlesArr={videoArticlesArr} />
      </MainContainer>
      <Footer />
    </>
  )
}


export default VideoPage;