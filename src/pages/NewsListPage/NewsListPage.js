import { MainContainer } from "../../components/Container/ContainerStyle";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useParams } from "react-router-dom";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";

function NewsListPage() {
  const { categoriesId } = useParams();

  return (
    <MainContainer>
      <LogoContainer />
      <MenuBar />
      <CategoriesList categoriesId={categoriesId} />
    </MainContainer>
  )
}

export default NewsListPage;