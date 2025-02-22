import styled, { css } from "styled-components";
import noImg from '../../assets/thumnailEx.jpg';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Contexts/ThemeContext";
import { useMediaQuery } from "react-responsive";
import MobileTodayNews from "./MobileTodayNews";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
  position: relative;

  @media (max-width : 767px) {
    margin-bottom : 16px;
    overflow-x: hidden;
  }
`;

const TodayNewsDescriptionBox = styled.div`
  width: 100%;
  display : flex;
  justify-content: center;
`;

const TodayNewsDescription = styled.span`
  position : absolute;
  left : -2px;
  top : -4px;
  z-index: 2;


  font-weight: bold;
  color : ${({ theme }) => theme.gray.gray0};

  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  padding : 8px 16px;

  background-color: ${({ theme }) => theme.blue.blue500};

  @media (min-width: 768px) and (max-width : 1279px) {
    font-size : 14px;
  }

  @media (max-width : 767px) {
    font-size : 10px;
    font-weight: 500;
    padding : 4px 8px;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  gap: 8px;

  @media (min-width: 768px) and (max-width: 1279px) {
    display : grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width : 767px) {
    display : flex;
    height: 200px;
  }
`;

const BannerContainerItem = styled.div`
  flex : 1 1 0;
  transition: flex-grow 0.5s ease, opacity 0.5s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;


  display : flex;
  justify-content: center;

  &:hover {
    flex-grow: 4;
  }

  @media (min-width: 768px) and (max-width: 1279px) {

    &:hover {
      flex-grow : 1;
    }
  }
`;

const BannerMainImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    ${({ $focusIndex, $index, $isTablet }) =>
    ($focusIndex !== $index && !$isTablet) && `filter: brightness(70%) contrast(120%);`};

    @media (max-width : 767px) {
      filter : none;
    }
`;

const BannerTextBox = styled.div`
  width : 80%;
  height: 100%;
  position: absolute;
  bottom : 0;

  display : flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) and (max-width : 1279px) {
    width : 95%;
  }

  @media (max-width : 767px) {
    width : 95%;
  }
`;

const BannerDescriptionBox = styled.div`
  height: 100%;

  display : flex;
  flex-direction: column;
  justify-content: end;
  gap : 16px;
`;

const textStyle = css`
  display : -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;

  margin : 8px 16px;
`;

const BannerHelper = styled.div`
  background-image: ${({ $darkmode }) =>
    !$darkmode ? `linear-gradient(to right, rgba(51, 118, 253, 0.9)0%, rgba(0, 0, 0, 0)100%)`
      : `linear-gradient(to right, rgba(0, 0, 0, 0.9)0%, rgba(0, 0, 0, 0)100%)`
  };
  border-radius: 4px;
  margin-bottom : 8px;
`;

const BannerTitle = styled.h2`
  font-size : 20px;
  color : ${({ theme }) => theme.gray.gray100};
  ${textStyle};

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 16px;
  }

  @media (max-width : 767px) {
    font-size : 15px;
  }
`;


const BannerSubTitle = styled.span`
  color : ${({ theme }) => theme.gray.gray400};
  font-size : 14px;
  ${textStyle};
`;

const BannerCategoryTitle = styled(BannerTitle)`
  color : #fff;
  opacity: 0.6;
  font-weight: bold;
  font-size : 18px;

  @media (min-width: 768px) and (max-width : 1279px) {
    display :none;
  }

  @media (max-width : 767px) {
    display : none;
  }
`;




function TodayNewsBanner({ todayArticleArr }) {
  const [focusIndex, setFocusIndex] = useState(null);
  const navigate = useNavigate();
  const { darkmode } = useTheme();
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const visibleItemNumber = isTablet ? 4 : 5;

  const handleClickArticle = (id) => {
    const viewArticleArray = JSON.parse(localStorage.getItem("articles")) || [];

    if (!viewArticleArray.includes(id)) {
      viewArticleArray.unshift(id);

      if (viewArticleArray.length > 5) {
        viewArticleArray.pop();
      }

      localStorage.setItem("articles", JSON.stringify(viewArticleArray))
    }

    navigate(`news-list/article/${id}`);
  }

  return (
    <MainContainer>
      <TodayNewsDescriptionBox>
        {!isMobile && <TodayNewsDescription>최신 뉴스</TodayNewsDescription>}
      </TodayNewsDescriptionBox>
      {(!isMobile) ?
        (<BannerContainer>
          {todayArticleArr.slice(0, visibleItemNumber).map((item, index) => {
            const { articleId, articleImageUrls,
              articleTitle, articleSubTitle, Category } = item;
            const { categoryName } = Category;
            const imageUrl = articleImageUrls ? JSON.parse(articleImageUrls)[0] : noImg;
            return (
              <BannerContainerItem
                key={articleId}
                onMouseEnter={() => setFocusIndex(index)}
                onMouseLeave={() => setFocusIndex(null)}
                onClick={() => handleClickArticle(articleId)}
                $focusIndex={focusIndex}
                $index={index}
              >
                <BannerMainImage
                  src={imageUrl}
                  alt="main-image"
                  $index={index}
                  $focusIndex={focusIndex}
                  $isTablet={isTablet}
                  $isMobile={isMobile}
                />
                <BannerTextBox>
                  {
                    (isMobile) &&
                    <BannerDescriptionBox>
                      <BannerHelper $darkmode={darkmode}>
                        <BannerTitle>{articleTitle}</BannerTitle>
                      </BannerHelper>
                    </BannerDescriptionBox>
                  }
                  {
                    (!isMobile && isTablet) &&
                    <BannerDescriptionBox>
                      <BannerHelper $darkmode={darkmode}>
                        <BannerTitle>{articleTitle}</BannerTitle>
                      </BannerHelper>
                    </BannerDescriptionBox>
                  }
                  {
                    (!isTablet && index === focusIndex) ?
                      <BannerDescriptionBox>
                        <BannerHelper $darkmode={darkmode}>
                          <BannerTitle>{articleTitle}</BannerTitle>
                          <BannerSubTitle>{articleSubTitle}</BannerSubTitle>
                        </BannerHelper>
                      </BannerDescriptionBox>
                      :
                      <>
                        <BannerCategoryTitle>{categoryName}</BannerCategoryTitle>
                      </>
                  }
                </BannerTextBox>
              </BannerContainerItem>
            );
          })}
        </BannerContainer>)
        :
        (
          <MobileTodayNews todayArticleArr={todayArticleArr} />
        )
      }
    </MainContainer>
  );
}

export default TodayNewsBanner;
