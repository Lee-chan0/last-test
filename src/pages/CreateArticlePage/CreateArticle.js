import { MainContainer } from "../../components/SideNav/SideNaveStyle";
import { ArticleViewContainer, DescriptionBar } from "../../components/SideNav/SideNaveStyle";
import SideNav from "../../components/SideNav/SideNav";
import CreateArticleForm from "../../components/CreateArticle/CreateArticleForm";
import styled from "styled-components";


const CreateArticleViewContainer = styled(ArticleViewContainer)`
  height: 100%;
`;



function CreateArticlePage() {
  return (
    <MainContainer>
      <SideNav />
      <CreateArticleViewContainer>
        <DescriptionBar>
          <div>기사작성</div>
        </DescriptionBar>
        <CreateArticleForm />
      </CreateArticleViewContainer>
    </MainContainer>
  )
}


export default CreateArticlePage;