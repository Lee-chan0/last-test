import { MainContainer } from "../../components/Container/ContainerStyle";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useParams } from "react-router-dom";
import TopButton from "../../components/TopButton/TopButton";
import ArticlePost from "../../components/ArticlePost/ArticlePost";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import Nav from "../../components/Nav/Nav";
import Footer from '../../components/Footer/Footer';
import { useQuery } from "@tanstack/react-query";
import { getArticles, getCategories } from "../../utils/api";

function ArticlePage() {
  const { articleId } = useParams();
  const { data: entireArticle } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
  const entireArticleArr = entireArticle?.articles || [];
  const categoryArr = categories?.categories || [];

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoryArr} />
        <TopButton />
        <ArticlePost entireArticleArr={entireArticleArr} articlesId={articleId} />
      </MainContainer>
      <Footer />
    </>

  )
}

export default ArticlePage;