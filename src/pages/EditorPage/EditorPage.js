import SideNav from "../../components/SideNav/SideNav";
import { ArticleViewContainer, DescriptionBar, SearchContainer, SearchBar, MainContainer } from "../../components/SideNav/SideNaveStyle";
import { WroteArticle } from "../../components/SideNav/SideNaveStyle";
import ArticleContents from "../../components/ArticleContents/ArticleContents";
import { useState } from "react";
import { useGetTotalArticles } from "../../hooks/Article/useGetTotalArticles";
import { useGetIncludeVideoArticles } from "../../hooks/Article/useGetIncludeVideoArticles";
import { usePageNationIncludeVideo } from "../../hooks/Article/usePageNationInlcudeVideo";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";


function EditorPage() {
  const [filterArticles, setFilterArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: articles } = useGetIncludeVideoArticles();
  const includeVideoArticles = articles?.articles || [];
  const [readQuery] = useSearchParams();
  const query = readQuery.get("category") || "";

  const { data: totalArticle } = useGetTotalArticles();
  const totalArticles = totalArticle?.totalArticles || 0;

  const { data: includeVideosPage, hasNextPage, fetchNextPage } = usePageNationIncludeVideo();
  const pageArticles = includeVideosPage?.pages.flatMap((item) => item.articles);

  const changeSearchText = (e) => {
    setSearchQuery(e.target.value);
  }

  const searchArticle = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim() === "") {
        if (!toast.isActive('empty-search')) {
          toast.info('검색어를 입력해주세요.', { position: 'top-center', toastId: 'empty-search' });
        }
        return;
      }
      const filterArray = includeVideoArticles.filter((item) => {
        return item.articleTitle.toLowerCase().includes(searchQuery.toLowerCase());
      })

      if (filterArray.length === 0) {
        if (!toast.isActive('no-result')) {
          toast.info('존재하지 않는 기사입니다.', { position: 'top-center', toastId: 'no-result' });
        }
      } else {
        setFilterArticles(filterArray);
      }
    }
  }

  return (
    <MainContainer>
      <SideNav articlesArr={includeVideoArticles} setFilterArticles={setFilterArticles} query={query} />
      <ArticleViewContainer>
        <DescriptionBar>
          <div>기사관리</div>
        </DescriptionBar>
        <SearchContainer>
          <WroteArticle>
            작성한 총 기사 수 : <strong>{totalArticles}</strong>개
          </WroteArticle>
          <SearchBar type='text' onChange={changeSearchText} value={searchQuery} onKeyDown={searchArticle} />
        </SearchContainer>
        <ArticleContents
          query={query}
          setFilterArticles={setFilterArticles}
          articlesArr={pageArticles}
          allArticles={includeVideoArticles}
          filterArticles={filterArticles}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </ArticleViewContainer>
    </MainContainer>
  )
}

export default EditorPage;