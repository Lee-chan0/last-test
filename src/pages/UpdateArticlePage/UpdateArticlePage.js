import styled from "styled-components";
import CreateArticleForm from "../../components/CreateArticle/CreateArticleForm";
import SideNav from "../../components/SideNav/SideNav";
import { ArticleViewContainer, DescriptionBar } from "../../components/SideNav/SideNaveStyle";

const CreateArticleViewContainer = styled(ArticleViewContainer)`
  height: 100%;
`;

const MainContainerSub = styled.div`
  display : flex;
`;

function UpdateArticlePage() {

  return (
    <MainContainerSub>
      <SideNav />
      <CreateArticleViewContainer>
        <DescriptionBar>
          <div>기사수정</div>
        </DescriptionBar>
        <CreateArticleForm isUpdate={true} />
      </CreateArticleViewContainer>
    </MainContainerSub>
  )
}


export default UpdateArticlePage;