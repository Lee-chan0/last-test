import styled, { css } from "styled-components";
import { ViewMoreBox } from "../ViewMore/ViewMoreStyle";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCategoryByArticles } from "../../hooks/Article/useCategoryByArticles";
import { useTheme } from "../../Contexts/ThemeContext";

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 24px;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  margin-bottom : 40px;

  @media (max-width : 767px) {
    padding : 8px;
    margin-bottom : 16px;
  }
`;

const ArticleLists = styled.ul`
  width: 100%;

  a {
    text-decoration: none;
  }
`;

const ArticleItem = styled.li`
  width: 100%;
  height: 160px;
  margin-bottom : 24px;
  border-radius: 4px;
  background-color: ${({ $darkmode }) => $darkmode ? '#cccccc' : '#ffffff'};

  will-change: transform box-shadow background-color;
  transition: all 0.3s;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);

  display: flex;

  &:hover {
    cursor: pointer;
    transform : scale(1.02);
    box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.3);
    background-color: ${({ $darkmode }) => $darkmode ? '#cccccc' : '#ffffff'};
  }

  @media (max-width : 767px) {
    height: 88px;
    margin-bottom : 8px;

    &:hover {
      transform : scale(1);
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
    }
  }
`;

const ArticleItems = styled.div`
  width: 100%;
  display : flex;
  justify-content: center;
  align-items: center;
  gap : 16px;
  
  padding : 0 16px;

  @media (max-width : 767px) {
    padding : 0 8px;
    gap : 8px;
  }
`;

const ArticleImgBox = styled.div`
  flex : 0 0 25%;
  flex-grow: 1;
  height: 130px;

  border-radius: 4px;

  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width : 767px) {
    height: 72px;
  }
`;

const ArticleContents = styled.div`
  flex : 0 0 65%;
  flex-grow: 2;
  height: 130px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.blue.blue100};

  display : flex;
  flex-direction: column;
  justify-content: space-around;
  gap : 8px;

  @media (max-width : 767px) {
    height: 72px;
    gap : 0;
  }
`;

const textStyle = css`
  display : -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient : vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 8px;
`;

const ArticleTitle = styled.h2`
  ${textStyle};
  font-size : 22px;
  color : ${({ theme }) => theme.blue.blue700};
  margin-top : 8px;

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 18px;
  }

  @media (max-width : 767px) {
    font-size : 0.9rem;
    margin : 4px;
    -webkit-line-clamp: 1;
  }
`;

const ArticleContent = styled.span`
  ${textStyle};
  -webkit-line-clamp: 3;

  font-size : 14px;
  color : ${({ theme }) => theme.gray.gray600};
  margin-bottom : 8px;

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 12px;
  }

  @media (max-width : 767px) {
    font-size : 0.6rem;
    margin : 4px;
  }
`;

function CategoryByList({ categoriesId, plainText }) {
  const navigate = useNavigate();
  const { data: viewMoreArticles, hasNextPage, fetchNextPage, isFetchingNextPage } = useCategoryByArticles(categoriesId);
  const categoryByArticles = viewMoreArticles?.pages.flatMap((item) => item.articles) || [];
  const queryClient = useQueryClient();
  const { darkmode } = useTheme();


  const handleClickArticle = (id) => {
    const viewArticleArray = JSON.parse(localStorage.getItem("articles")) || [];

    if (!viewArticleArray.includes(id)) {
      viewArticleArray.unshift(id);

      if (viewArticleArray.length > 5) {
        viewArticleArray.pop();
      }

      localStorage.setItem("articles", JSON.stringify(viewArticleArray))
    }
    navigate(`/news-list/article/${id}`);
  }

  useEffect(() => {
    return () => {
      queryClient.removeQueries([`category-by-articles-${categoriesId}`])
    }
  }, [queryClient, categoriesId]);

  return (
    <Container>
      <ArticleLists>
        {
          categoryByArticles.map((item) => {
            const { articleId, articleImageUrls, articleContent, articleTitle, Category } = item;
            const { categoryId } = Category;

            return (
              (+categoriesId === categoryId) &&
              <ArticleItem $darkmode={darkmode} onClick={() => handleClickArticle(articleId)} key={articleId}>
                <ArticleItems>
                  <ArticleImgBox $src={JSON.parse(articleImageUrls)[0]} />
                  <ArticleContents>
                    <ArticleTitle>{articleTitle}</ArticleTitle>
                    <ArticleContent>{plainText(articleContent)}</ArticleContent>
                  </ArticleContents>
                </ArticleItems>
              </ArticleItem>
            )
          })
        }
        <ViewMoreBox disabled={isFetchingNextPage} onClick={fetchNextPage} $hasNextPage={hasNextPage}><span>View More</span></ViewMoreBox>
      </ArticleLists>
    </Container>
  )
}


export default CategoryByList;