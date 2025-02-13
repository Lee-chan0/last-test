import { MainContainer } from "../../components/Container/ContainerStyle";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useParams } from "react-router-dom";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../utils/api";
import { useGetAllArticles } from '../../hooks/Article/useGetAllArticles';

function NewsListPage() {
  const { categoriesId } = useParams();
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categoryArr = categories?.categories || [];

  const { data: entireArticle } = useGetAllArticles();
  const entireArticleArr = entireArticle?.articles || [];

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoryArr} />
        <CategoriesList
          categoriesId={categoriesId}
          categoryArr={categoryArr}
          entireArticleArr={entireArticleArr}
        />
      </MainContainer>
      <Footer />
    </>
  )
}

export default NewsListPage;