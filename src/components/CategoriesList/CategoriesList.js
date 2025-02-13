import styled from "styled-components";
import newsArticleIcon from '../../assets/newsArticleIcon.png';
import { useEffect, useState } from "react";
import CategoryByList from "../CategoryByList/CategoryByList";
import SideSticky from "../SideSticky/SideSticky";
import TopButton from "../TopButton/TopButton";
import React from "react";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
`;

const ArticleContainer = styled.div`
  width: 70%;
  height: 100%;
`;

const CategoryBannerTitleContainer = styled.div`
  margin-bottom : 40px;
`;

const CategoryTitle = styled.h1`
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 28px;
  display: flex;
  align-items: center;
  gap : 4px;

  img {
    width: 28px;
    height: 28px;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 480px;
  position: relative;
  transition: transform 0.5s;
  will-change: transform;
  margin-bottom : 40px;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const CategoryListNewestBanner = styled.div`
  width: 100%;
  height: 100%;
  background-image: 
  linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(155, 155, 155, 0.1)), url(${({ $src }) => $src ? $src : ""});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8px;

  position: relative;
`;

const NewestTitles = styled.div`
  width: 100%;


  position: absolute;
  left: 0;
  bottom : 0;

  display : flex;
  flex-direction: column;

  color : #fff;

  & > * {
    display : -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    text-overflow: ellipsis;
    overflow: hidden;
    
    margin : 8px 16px;
  }
`;

const CategoryListNewestBannerTitle = styled.h2`
  font-size: 28px;
`;

const CategoryListNewestBannerContent = styled.span`
    -webkit-line-clamp: 3;
    color : ${({ theme }) => theme.blue.blue100};
`;

function CategoriesList({ categoriesId, categoryArr, entireArticleArr }) {
  const [smallestId, setSmallestId] = useState(null);
  const navigate = useNavigate();

  const plainText = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  const handleClickArticle = (id) => {
    const viewArticleArr = JSON.parse(localStorage.getItem("articles")) || [];

    if (!viewArticleArr.includes(id)) {
      viewArticleArr.unshift(id);
      if (viewArticleArr.length > 5) {
        viewArticleArr.pop();
      }

      localStorage.setItem("articles", JSON.stringify(viewArticleArr));
    }
    navigate(`/news-list/article/${id}`);
  }

  useEffect(() => {
    if (entireArticleArr.length === 0) return;

    const filterCategoryId = entireArticleArr.filter((item) => {
      return item.Category.categoryId === +categoriesId
    });
    const findSmallestArticleId = filterCategoryId.map((item) => item.articleId);
    const smallest = Math.max(...findSmallestArticleId);
    setSmallestId(smallest);
  }, [entireArticleArr, categoriesId]);

  return (
    <MainContainer>
      <ArticleContainer>
        {
          categoryArr.map((item) => {
            const { categoryId, categoryName } = item;
            return (
              (+categoriesId === categoryId) &&
              <CategoryBannerTitleContainer key={categoryId}>
                <CategoryTitle>
                  <img src={newsArticleIcon} alt="article-icon" />
                  {categoryName}뉴스
                </CategoryTitle>
              </CategoryBannerTitleContainer>
            )
          })
        }
        <BannerContainer>
          {
            entireArticleArr.map((item) => {
              const { articleId, articleTitle, articleContent, articleImageUrls } = item;
              return (
                (articleId === smallestId) &&
                <React.Fragment key={articleId}>
                  <CategoryListNewestBanner $src={JSON.parse(articleImageUrls)[0]} onClick={() => handleClickArticle(articleId)} />
                  <NewestTitles>
                    <CategoryListNewestBannerTitle>{articleTitle}</CategoryListNewestBannerTitle>
                    <CategoryListNewestBannerContent>{plainText(articleContent)}</CategoryListNewestBannerContent>
                  </NewestTitles>
                </React.Fragment>
              )
            })
          }
        </BannerContainer>
        <CategoryByList
          categoriesId={categoriesId}
          categoryArr={categoryArr}
          plainText={plainText}
        />
      </ArticleContainer>
      <SideSticky entireArticleArr={entireArticleArr} />
      <TopButton />
    </MainContainer>
  )
}

export default CategoriesList;

