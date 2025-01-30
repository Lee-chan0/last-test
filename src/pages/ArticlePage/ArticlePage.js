import { MainContainer } from "../../components/Container/ContainerStyle";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useParams } from "react-router-dom";
import TopButton from "../../components/TopButton/TopButton";
import ArticlePost from "../../components/ArticlePost/ArticlePost";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import Nav from "../../components/Nav/Nav";
import Footer from '../../components/Footer/Footer';

function ArticlePage() {
  const { articleId } = useParams();

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar />
        <TopButton />
        <ArticlePost />
      </MainContainer>
      <Footer />
    </>

  )
}

export default ArticlePage;