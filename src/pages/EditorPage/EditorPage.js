import SideNav from "../../components/SideNav/SideNav";
import { ArticleViewContainer, DescriptionBar, SearchContainer, SearchBar, MainContainer } from "../../components/SideNav/SideNaveStyle";
import { WroteArticle } from "../../components/SideNav/SideNaveStyle";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../utils/api";
import ArticleContents from "../../components/ArticleContents/ArticleContents";
import { useState } from "react";



function EditorPage() {
  const { data: allArticles } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    staleTime: 1000 * 60 * 5
  });
  const articlesArr = allArticles?.articles || [];
  const [filterArticles, setFilterArticles] = useState([]);

  return (
    <MainContainer>
      <SideNav articlesArr={articlesArr} setFilterArticles={setFilterArticles} />
      <ArticleViewContainer>
        <DescriptionBar>
          <div>기사관리</div>
        </DescriptionBar>
        <SearchContainer>
          <WroteArticle>
            작성한 총 기사 수 : <strong>{articlesArr.length}</strong>개
          </WroteArticle>
          <SearchBar type='text' />
        </SearchContainer>
        <ArticleContents articlesArr={articlesArr} filterArticles={filterArticles} />
      </ArticleViewContainer>
    </MainContainer>
  )
}

export default EditorPage;