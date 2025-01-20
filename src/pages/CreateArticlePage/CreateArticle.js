import { MainContainer } from "../../components/SideNav/SideNaveStyle";
import { ArticleViewContainer, DescriptionBar } from "../../components/SideNav/SideNaveStyle";
import SideNav from "../../components/SideNav/SideNav";
import CreateArticleForm from "../../components/CreateArticle/CreateArticleForm";




function CreateArticlePage() {
  return (
    <MainContainer>
      <SideNav />
      <ArticleViewContainer>
        <DescriptionBar>
          <div>기사작성</div>
        </DescriptionBar>
        <CreateArticleForm />
      </ArticleViewContainer>
    </MainContainer>
  )
}


export default CreateArticlePage;