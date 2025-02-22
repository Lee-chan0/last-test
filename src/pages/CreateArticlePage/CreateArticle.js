import { MainContainer } from "../../components/SideNav/SideNaveStyle";
import { ArticleViewContainer, DescriptionBar } from "../../components/SideNav/SideNaveStyle";
import SideNav from "../../components/SideNav/SideNav";
import CreateArticleForm from "../../components/CreateArticle/CreateArticleForm";
import styled from "styled-components";
import { useState } from "react";
import { useGetIncludeVideoArticles } from '../../hooks/Article/useGetIncludeVideoArticles';


const CreateArticleViewContainer = styled(ArticleViewContainer)`
  height: 100%;
`;

function CreateArticlePage() {
  const [filterArticles, setFilterArticles] = useState([]);
  const { data: articles } = useGetIncludeVideoArticles();
  const includeVideoArticles = articles?.articles || [];

  return (
    <MainContainer>
      <SideNav articlesArr={includeVideoArticles} setFilterArticles={setFilterArticles} isCreate={true} />
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