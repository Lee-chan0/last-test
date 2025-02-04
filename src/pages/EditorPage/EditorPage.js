import SideNav from "../../components/SideNav/SideNav";
import { ArticleViewContainer, DescriptionBar, SearchContainer, SearchBar, MainContainer } from "../../components/SideNav/SideNaveStyle";
import { WroteArticle } from "../../components/SideNav/SideNaveStyle";
import { useQuery } from "@tanstack/react-query";
import { getIncludeVideoArticles } from "../../utils/api";
import ArticleContents from "../../components/ArticleContents/ArticleContents";
import { useState } from "react";



function EditorPage() {
  const [filterArticles, setFilterArticles] = useState([]);
  const { data: articles } = useQuery({
    queryKey: ['Allarticles'],
    queryFn: getIncludeVideoArticles
  })
  const includeVideoArticles = articles?.articles || [];

  return (
    <MainContainer>
      <SideNav articlesArr={includeVideoArticles} setFilterArticles={setFilterArticles} />
      <ArticleViewContainer>
        <DescriptionBar>
          <div>기사관리</div>
        </DescriptionBar>
        <SearchContainer>
          <WroteArticle>
            작성한 총 기사 수 : <strong>{includeVideoArticles.length}</strong>개
          </WroteArticle>
          <SearchBar type='text' />
        </SearchContainer>
        <ArticleContents articlesArr={includeVideoArticles} filterArticles={filterArticles} />
      </ArticleViewContainer>
    </MainContainer>
  )
}

export default EditorPage;