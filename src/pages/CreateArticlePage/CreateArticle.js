import { MainContainer } from "../../components/SideNav/SideNaveStyle";
import { ArticleViewContainer, DescriptionBar } from "../../components/SideNav/SideNaveStyle";
import SideNav from "../../components/SideNav/SideNav";
import CreateArticleForm from "../../components/CreateArticle/CreateArticleForm";
import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../utils/api";


const CreateArticleViewContainer = styled(ArticleViewContainer)`
  height: 100%;
`;

function CreateArticlePage() {
  const { data: allArticles } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });
  const articlesArr = allArticles?.articles || [];
  const [filterArticles, setFilterArticles] = useState([]);

  return (
    <MainContainer>
      <SideNav articlesArr={articlesArr} setFilterArticles={setFilterArticles} />
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