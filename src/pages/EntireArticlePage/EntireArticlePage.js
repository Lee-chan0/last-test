import { useQuery } from "@tanstack/react-query";
import { MainContainer } from "../../components/Container/ContainerStyle";
import Footer from "../../components/Footer/Footer";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import MenuBar from "../../components/MenuBar/MenuBar";
import Nav from "../../components/Nav/Nav";
import { getArticles, getCategories } from "../../utils/api";
import EntireArticles from "../../components/EntireArticles/EntireArticles";





function EntireArticlePage() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const categoryArr = categories?.categories || [];

  const { data: entireArticle } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });
  const entireArticleArr = entireArticle?.articles || [];

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoryArr} />
        <EntireArticles entireArticleArr={entireArticleArr} />
      </MainContainer>
      <Footer />
    </>
  )
}


export default EntireArticlePage;