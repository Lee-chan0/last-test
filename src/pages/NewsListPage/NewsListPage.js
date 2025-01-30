import { MainContainer } from "../../components/Container/ContainerStyle";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useParams } from "react-router-dom";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

function NewsListPage() {
  const { categoriesId } = useParams();

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar />
        <CategoriesList categoriesId={categoriesId} />
      </MainContainer>
      <Footer />
    </>
  )
}

export default NewsListPage;