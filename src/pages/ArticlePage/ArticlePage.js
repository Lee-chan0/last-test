import { MainContainer } from "../../components/Container/ContainerStyle";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useParams } from "react-router-dom";
import TopButton from "../../components/TopButton/TopButton";
import ArticlePost from "../../components/ArticlePost/ArticlePost";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";

function ArticlePage() {
  const { articleId } = useParams();

  return (
    <MainContainer>
      <LogoContainer />
      <MenuBar />
      <TopButton />
      <ArticlePost />
    </MainContainer>
  )
}

export default ArticlePage;