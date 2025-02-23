import styled from "styled-components";
import { ViewMoreBox } from "../ViewMore/ViewMoreStyle";
import { useNavigate } from "react-router-dom";
import ImportantStar from "../ImportantStar/ImportantStar";
import eyeIcon from '../../assets/eye-line.png';
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetImportantArticles } from "../../hooks/Article/useGetImportantArticles";
import { useGetMyArticles } from "../../hooks/Article/useGetMyArticles";
import { useGetVideoArticles } from "../../hooks/Article/useGetVideoArticles";
import videoIcon from '../../assets/ri_video-line.png';

const ArticleContentMainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 16px;
`;

const ArticleLists = styled.ul`
  padding : 8px 24px;
  display : grid;
  grid-template-columns : 40px 10% 1fr 10% 10% 10% 5%;
  background-color: ${({ theme }) => theme.gray.gray0};
  overflow: hidden;

  &:hover {
    background-color: ${({ $description }) => $description ? `#fff` : `#f0f3fa`};
  }
`;

const ArticleItem = styled.div`
  text-align: center;
  display : flex;
  align-items: center;
  justify-content: center;
  font-size : 14px;

  &.category {
    color : ${({ theme }) => theme.gray.gray600};
  }

  &.article-title {
    font-weight: bold;

    display : -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient : vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    height: 20px;

    span {
      height: 100%;
    }
    

    a {
      text-decoration: none;
      color : ${({ theme }) => theme.blue.blue700};
    }
  }

  &.user-name-position {
    color : ${({ theme }) => theme.blue.blue700};
  }

  &.date {
    color : ${({ theme }) => theme.gray.gray600};
  }

  input {
    width: 16px;
    height: 16px;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    &.category {
      font-size : 13px;
  }

  &.article-title {
    span {
      font-size : 13px;
    }
  }

  &.user-name-position {
    font-size : 13px;
  }

  &.date {
    font-size : 11px;
  }
  }
`;

function changeCreatedAt(createdAt) {
  return new Date(createdAt).toISOString().split("T")[0];
}

function ArticleContents({ articlesArr, filterArticles, hasNextPage,
  fetchNextPage, query, setFilterArticles, allArticles }) {
  const navigate = useNavigate();
  const { data: importantArticles } = useGetImportantArticles();
  const { data: myArticles } = useGetMyArticles();
  const { data: videoArticles } = useGetVideoArticles();
  const queryClient = useQueryClient();
  const clickArticleTitle = (id, type) => {
    if (type === '동영상') {
      navigate(`/truescope-administrator/video-editor?query=${encodeURIComponent(type)}&update=true&articleId=${id}`)
    } else {
      navigate(`/truescope-administrator/update-article?article=${id}`);
    }
  }

  const clickConfirm = (id, articleType) => {
    articleType !== '동영상'
      ?
      window.open(`/news-list/article/${id}`, '_blank')
      :
      window.open(`/news-list/video/video-articles`, '_blank');
  }

  useEffect(() => {
    queryClient.removeQueries(['include-videos']);
  }, [queryClient]);

  useEffect(() => {
    if (!query) return;

    const filterQuery = {
      'myArticles': myArticles?.findMyArticles || [],
      'importantArticles': importantArticles?.importantArticles || [],
      'video': videoArticles?.videoArticles || [],
      'entire': allArticles,
    };

    if (['정치', '국제', '사회'].includes(query)) {
      const queryByArticles = allArticles?.filter(({ Category }) => Category.categoryName === query);
      setFilterArticles(queryByArticles);
    } else {
      setFilterArticles(filterQuery[query]);
    }

  }, [query, allArticles, importantArticles, myArticles, setFilterArticles, videoArticles]);

  return (
    <ArticleContentMainContainer>
      <ArticleLists
        $description={true}
        style={{
          borderBottom: "2px solid #3376FD",
          borderTop: "2px solid #3376FD"
        }}
      >
        <ArticleItem><strong>중요</strong></ArticleItem>
        <ArticleItem><strong>번호</strong></ArticleItem>
        <ArticleItem><strong>제목</strong></ArticleItem>
        <ArticleItem><strong>카테고리</strong></ArticleItem>
        <ArticleItem><strong>글쓴이</strong></ArticleItem>
        <ArticleItem><strong>날짜</strong></ArticleItem>
        <ArticleItem><strong>확인</strong></ArticleItem>
      </ArticleLists>
      {
        (filterArticles.length === 0) ?
          [].map((item) => {
            const { articleId, articleTitle, createdAt,
              User, Category, isImportant, articleType } = item;
            const { userNamePosition } = User;
            const { categoryName } = Category;
            return (
              <ArticleLists key={articleId}>
                <ArticleItem>
                  <ImportantStar isImportant={isImportant} articleId={articleId} />
                </ArticleItem>
                <ArticleItem className="article-number">{articleId}</ArticleItem>
                <ArticleItem className="article-title">
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => clickArticleTitle(articleId, articleType)}>
                    {articleTitle}
                  </span>
                </ArticleItem>
                <ArticleItem className="category">{categoryName}</ArticleItem>
                <ArticleItem className="user-name-position">{userNamePosition}</ArticleItem>
                <ArticleItem className="date">{changeCreatedAt(createdAt)}</ArticleItem>
                <ArticleItem
                  onClick={() => clickConfirm(articleId, articleType)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {
                    articleType === '동영상' ?
                      <img src={videoIcon} alt="view-article" style={{ width: "20px", height: "20px" }} />
                      :
                      <img src={eyeIcon} alt="view-article" style={{ width: "20px", height: "20px" }} />
                  }
                </ArticleItem>
              </ArticleLists>
            )
          })
          :
          filterArticles.map((item) => {
            const { articleId, articleTitle, createdAt,
              articleType, isImportant, User, Category } = item;
            const { userNamePosition } = User;
            const { categoryName } = Category;
            return (
              <ArticleLists key={articleId}>
                <ArticleItem>
                  <ImportantStar isImportant={isImportant} articleId={articleId} />
                </ArticleItem>
                <ArticleItem className="article-number">{articleId}</ArticleItem>
                <ArticleItem className="article-title">
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => clickArticleTitle(articleId, articleType)}>
                    {articleTitle}
                  </span>
                </ArticleItem>
                <ArticleItem className="category">{categoryName}</ArticleItem>
                <ArticleItem className="user-name-position">{userNamePosition}</ArticleItem>
                <ArticleItem className="date">{changeCreatedAt(createdAt)}</ArticleItem>
                <ArticleItem
                  onClick={() => clickConfirm(articleId, articleType)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {
                    articleType === '동영상' ?
                      <img src={videoIcon} alt="view-article" style={{ width: "20px", height: "20px" }} />
                      :
                      <img src={eyeIcon} alt="view-article" style={{ width: "20px", height: "20px" }} />
                  }
                </ArticleItem>
              </ArticleLists>
            )
          })
      }
      {
        (filterArticles.length === 0) &&
        <ViewMoreBox
          $hasNextPage={hasNextPage}
          style={{ marginTop: "8px" }}
          onClick={fetchNextPage}>
          <span>View More</span>
        </ViewMoreBox>
      }
    </ArticleContentMainContainer>
  )
}

export default ArticleContents;