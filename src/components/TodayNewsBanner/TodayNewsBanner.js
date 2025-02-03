import { useEffect, useState } from "react";
import styled from "styled-components";
import BannerTitleWrap from "../BannerTitleWrap/BannerTitleWrap";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display : flex;
  margin-bottom : 40px;
  flex-direction: column;

  gap : 24px;

  width: 100%;
  height: 560px;

  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 24px;
  border-radius: 4px;
  
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const BlurContainer = styled.div`
  width: 100%;
  height: 100%;
  position : relative;

  &::before {
    content : "";
    position : absolute;
    top : 0;
    left : 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ $src, $activeIndex }) => $src ? $src[$activeIndex] : ""});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    filter : blur(10px);
    z-index: 0;
  }
`;

const BannerArticleLists = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const BannerImgBox = styled.div`
  width: 100%;
  height: 80%;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transition : transform 0.5s;


`;

const BannerArticleItem = styled.li`
  flex : 0 0 100%;
  height: 100%;
  overflow: hidden;
  position : relative;

  display : flex;
  justify-content: center;
  align-items: center;

  will-change: transform;

  transition : transform 0.7s;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const BannerScaleControlBox = styled.div`
  width: 100%;
  display : flex;
  justify-content: center;
`;


const BannerTitles = styled.div`
  width: 90%;

  position : absolute;
  bottom : 16px;
  
  display: flex;
  justify-content: center;

  background-image : linear-gradient(to left, rgba(51,118,253, 0.1) 0%, rgba(51,118,253, 0.8) 100%);
  background-size: cover;
  background-position: center;

  border-radius: 8px;

  cursor: pointer;

  color : #fff;
`;

const BannerTitle = styled.h1`
  font-size : 28px;

  text-align: center;

  width: 80%;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient : vertical;

  overflow: hidden;
  text-overflow: ellipsis;

  margin : 16px 8px;

  line-height: 1.3;
`;



function TodayNewsBanner({ todayArticleArr }) {
  const [blurImg, setBlurImg] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexControl, setIndexControl] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (todayArticleArr.length === 0) return;

    const blurBannerImg = todayArticleArr.map((item) => {
      const { articleImageUrls } = item;
      const blurUrl = JSON.parse(articleImageUrls)[0];
      return blurUrl;
    });
    setBlurImg(blurBannerImg);

  }, [todayArticleArr]);

  useEffect(() => {
    if (indexControl) return;

    const count = setInterval(() => {
      if (activeIndex < todayArticleArr.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (activeIndex === todayArticleArr.length - 1) {
        setActiveIndex(0);
      }
    }, 3000);

    return () => clearInterval(count);
  }, [indexControl, todayArticleArr, activeIndex]);

  return (
    <MainContainer>
      <Container>
        <BlurContainer $src={blurImg} $activeIndex={activeIndex}>
          <BannerArticleLists>
            {
              todayArticleArr.map((i, index) => {
                const { articleId, articleTitle, articleImageUrls, articleType } = i;

                return (
                  (activeIndex === index) &&
                  <BannerArticleItem key={articleId} onClick={() => handleClickArticle(articleId)}>
                    <BannerImgBox $src={JSON.parse(articleImageUrls)[0]}>
                      <BannerScaleControlBox>
                        <BannerTitles>
                          <BannerTitle>{articleTitle}123</BannerTitle>
                        </BannerTitles>
                      </BannerScaleControlBox>
                    </BannerImgBox>
                  </BannerArticleItem>
                )
              })
            }
          </BannerArticleLists>
        </BlurContainer>
      </Container>
      <BannerTitleWrap
        setActiveIndex={setActiveIndex}
        setIndexControl={setIndexControl}
        activeIndex={activeIndex}
        todayArticleArr={todayArticleArr}
        onClick={handleClickArticle}
      />
    </MainContainer>
  )
}

export default TodayNewsBanner;