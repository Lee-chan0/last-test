import { useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import { MainContainer } from "../../components/Container/ContainerStyle";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import MenuBar from "../../components/MenuBar/MenuBar";
import VideoArticleList from "../../components/VideoArticleList/VideoArticleList";
import Footer from "../../components/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getVideoArticle, getVideoArticles } from "../../utils/api";
import VideoArticle from "../../components/VideoArticle/VideoArticle";


function VideoArticlePage() {
  const { videoArticleId } = useParams();
  const { data: videoArticle } = useQuery({
    queryKey: ['videoArticle', videoArticleId],
    queryFn: () => getVideoArticle(videoArticleId)
  })
  const videoArticleArr = videoArticle?.videoArticle || [];

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
        <VideoArticle videoArticleArr={videoArticleArr} videoArticleId={videoArticleId} />
      </MainContainer>
      <Footer />
    </>
  )
}

export default VideoArticlePage;