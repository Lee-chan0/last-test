import styled from "styled-components";
import CreateArticleForm from "../../components/CreateArticle/CreateArticleForm";
import SideNav from "../../components/SideNav/SideNav";
import { ArticleViewContainer, DescriptionBar } from "../../components/SideNav/SideNaveStyle";
import { useGetIncludeVideoArticles } from "../../hooks/Article/useGetIncludeVideoArticles";
import { useState } from "react";

const CreateArticleViewContainer = styled(ArticleViewContainer)`
  height: 100%;
`;

const MainContainerSub = styled.div`
  display : flex;
`;

function UpdateArticlePage() {
  const [filterArticles, setFilterArticles] = useState([]);
  const { data: articles } = useGetIncludeVideoArticles();
  const includeVideoArticles = articles?.articles || [];


  return (
    <MainContainerSub>
      <SideNav articlesArr={includeVideoArticles} setFilterArticles={setFilterArticles} isUpdate={true} />
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