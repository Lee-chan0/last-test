import styled from "styled-components";
import { categories, articles } from "../../mock";
import newsArticleIcon from '../../assets/newsArticleIcon.png';
import { useEffect, useState } from "react";
import CategoryByList from "../CategoryByList/CategoryByList";
import SideSticky from "../SideSticky/SideSticky";
import TopButton from "../TopButton/TopButton";

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
    color : ${({ theme }) => theme.gray.gray400};
`;


function CategoriesList({ categoriesId }) {
  const [bannerObject, setBannerObject] = useState({
    articleTItle: '',
    articleContent: '',
    articleImgUrl: '',
    articleId: null,
    articleCategory: ''
  })

  const mathMin = (arr) => {
    const smallest = Math.min(...arr);

    const resultObj = articles.find((item) => item.articleId === smallest);

    if (resultObj) {
      setBannerObject((prev) => ({
        ...prev,
        articleTItle: resultObj.articleTitle,
        articleContent: resultObj.articleContent,
        articleImgUrl: resultObj.articleImgUrl,
        articleId: resultObj.articleId,
        articleCategory: resultObj.articleCategory
      }));
    }
  }

  useEffect(() => {
    const bannerIdArray = articles.map((articleItem) => articleItem.articleId);
    mathMin(bannerIdArray);
  }, []);

  return (
    <MainContainer>
      <ArticleContainer>
        {
          categories.map((item) => {
            const { categoryId, categoryTitle } = item;
            return (
              +categoriesId === categoryId &&
              <CategoryBannerTitleContainer key={categoryId}>
                <CategoryTitle>
                  <img src={newsArticleIcon} alt="article-icon" />
                  {categoryTitle}
                </CategoryTitle>
              </CategoryBannerTitleContainer>
            )
          })
        }
        <BannerContainer>
          <CategoryListNewestBanner $src={bannerObject.articleImgUrl} />
          <NewestTitles>
            <CategoryListNewestBannerTitle>{bannerObject.articleTItle}</CategoryListNewestBannerTitle>
            <CategoryListNewestBannerContent>{bannerObject.articleContent}</CategoryListNewestBannerContent>
          </NewestTitles>
        </BannerContainer>
        <CategoryByList />
      </ArticleContainer>
      <SideSticky />
      <TopButton />
    </MainContainer>
  )
}

export default CategoriesList;