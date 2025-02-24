import styled, { css } from "styled-components";
import eyeIcon from '../../assets/eye-line.png';
import { useEffect, useState } from "react";
import { getVideoId } from "../VideoNews/VideoBox";
import noImg from '../../assets/thumnailEx.jpg';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Contexts/ThemeContext";
import { useNewestArticles } from "../../Contexts/NewestArticleContext";

const boxShadow = css`
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  width: 350px;
  height: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 24px;
  border-radius: 4px;
  ${boxShadow};
  margin : 40px 24px;
  margin-right : 0;

  position : sticky;
  top : 7px;

  ${({ $isTablet, $isVideo }) => ($isVideo && $isTablet) && `display : none`};

  @media (min-width: 768px) and (max-width: 1279px) {
    padding : 16px 24px 24px 24px;
  }

  @media (max-width : 767px) {
    display : none;
  }
`;

const SideTitle = styled.h1`
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 24px;
  display: flex;
  align-items: center;
  gap : 4px;
  margin-bottom : 24px;

  img {
    width: 28px;
    height: 28px;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 20px;
    margin-bottom : 16px;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

const SideLists = styled.ul`
  width: 100%;
`;

const SideItem = styled.li`
  width: 100%;
  height: 100px;
  margin-bottom : 16px;
  ${boxShadow};
  border-radius: 4px;

  background-color: ${({ $darkmode }) => $darkmode ? '#cccccc' : '#fff'};

  display : flex;
  justify-content: space-between;

  transition: transform 0.3s, box-shadow 0.3s;
  will-change: transform, box-shadow;

  &:hover {
    cursor: pointer;
    transform : scale(1.02);
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  }
`;

const SideImgBox = styled.div`
  flex : 0 0 40%;
  border-radius: 4px;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  margin : 8px 0 8px 8px;
`;

const SideContentsBox = styled.div`
  flex : 0 0 55%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  overflow: hidden;
  text-overflow: ellipsis;

  & > * {
    display : -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    text-overflow: ellipsis;
    overflow: hidden;

    margin : 4px;
  }
`;

const SideItemTitle = styled.h2`
  width: 90%;
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 16px;

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 14px;
    -webkit-line-clamp: 2;
  }
`;

const SideItemContent = styled.span`
  width: 90%;
  -webkit-line-clamp: 3;
  font-size : 13px;

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 11px;
  }
`;

const SideVideoItem = styled.li`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.gray.gray100};
  display : flex;
  padding : 8px;
  margin-bottom : 8px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  cursor: pointer;
  will-change: box-shadow, transform;
  transition : box-shadow 0.5s, transform 0.5s;

  &:hover {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5);
    transform : scale(1.01);
  }

  position: relative;
`;

const SideVideoImgBox = styled.div`
  background-image: url(${({ $src, $noImg }) => $src ? $src : $noImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex : 1 0 100%;
  border-radius: 4px;
`;

const SideVideoContentBox = styled.div`
  opacity:  ${({ $isHover, $videoIndex, $index }) =>
    (($isHover && $index === $videoIndex) ? 1 : 0)};
  transform:  ${({ $isHover, $videoIndex, $index }) =>
    (($isHover && $index === $videoIndex) ? 'translateX(0)' : 'translateX(-10px)')};
  position: absolute;
  width: 200px;
  background-color: ${({ theme }) => theme.blue.blue500};
  left: -105%;
  padding: 4px;
  border-radius: 4px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: ${({ $isHover, $videoIndex, $index }) =>
    (($isHover && $index === $videoIndex) ? 'auto' : 'none')};


  &::after {
    content: '';
    position: absolute;
    right : 9px;
    top: 70%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-left-color: ${({ theme }) => theme.blue.blue500};
    border-right: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-right: -20px;
  }
`;

const SideVideoTitleContainer = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  display : flex;
  align-items: center;
  padding : 0 4px;
  border-radius: 2px;
`;

const SideVideoTitle = styled.h2`
  width: 100%;
  word-wrap: break-word;
  font-size : 15px;
  height: 100%;
  color : ${({ theme }) => theme.blue.blue700};
`;

function SideSticky({ entireArticleArr, isVideo, recentVideo, isTablet }) {
  const [viewArticles, setViewArticles] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [videoIndex, setVideoIndex] = useState(null);
  const navigate = useNavigate();
  const { darkmode } = useTheme();
  const { newestArticle } = useNewestArticles();
  console.log(entireArticleArr);

  const handleClickArticle = (id, url) => {
    if (id) return navigate(`/news-list/article/${id}`);

    if (isVideo) return window.open(url);
  }

  const plainText = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  const handleMouseEnter = (idx) => {
    setIsHover(true);
    setVideoIndex(idx);
  }

  const handleMouseLeave = () => {
    setIsHover(false);
    setVideoIndex(null);
  }

  // useEffect(() => {
  //   const viewArticleArray = JSON.parse(localStorage.getItem("articles")) || [];

  //   if (entireArticleArr?.length === 0 || viewArticleArray?.length === 0) return;

  //   setViewArticles(() => {
  //     const filterArray = entireArticleArr?.filter((item) => {
  //       return viewArticleArray.includes(item.articleId);
  //     })
  //     return filterArray;
  //   })
  // }, [entireArticleArr]);

  useEffect(() => {
    if (!entireArticleArr ||
      entireArticleArr.length === 0 ||
      newestArticle.length === 0) return;

    setViewArticles(newestArticle);
  }, [entireArticleArr, newestArticle]);

  useEffect(() => {
    if (!isVideo) return;

    const viewVideo = JSON.parse(localStorage.getItem("video-articles")) || [];

    if (entireArticleArr?.length === 0 || viewVideo?.length === 0) return;

    setViewArticles(() => {
      const filterArray = entireArticleArr?.filter((item) => {
        return viewVideo.includes(item.articleId);
      })
      return filterArray;
    })
  }, [entireArticleArr, isVideo, recentVideo]);

  return (
    <Container $isVideo={isVideo} $isTablet={isTablet}>
      <SideLists>
        <SideTitle>
          <img src={eyeIcon} alt="viewIcon" />
          {!isVideo ? `최근 본 기사` : `최근 본 동영상`}
        </SideTitle>
        {
          viewArticles?.map((item, index) => {
            const { articleId, articleTitle, articleContent, articleImageUrls } = item;
            return (
              (!isVideo) ?
                (
                  <SideItem key={articleId} onClick={() => handleClickArticle(articleId)} $darkmode={darkmode}>
                    <SideImgBox $src={JSON.parse(articleImageUrls)[0]} />
                    <SideContentsBox>
                      <SideItemTitle>{articleTitle}</SideItemTitle>
                      <SideItemContent>{plainText(articleContent)}</SideItemContent>
                    </SideContentsBox>
                  </SideItem>
                )
                :
                (
                  <SideVideoItem
                    key={articleId}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClickArticle(null, articleContent)}
                  >
                    <SideVideoImgBox
                      $noImg={noImg}
                      $src={`https://img.youtube.com/vi/${getVideoId(articleContent)}/sddefault.jpg`}
                    />
                    <SideVideoContentBox $isHover={isHover} $videoIndex={videoIndex} $index={index}>
                      <SideVideoTitleContainer>
                        <SideVideoTitle>{articleTitle}</SideVideoTitle>
                      </SideVideoTitleContainer>
                    </SideVideoContentBox>
                  </SideVideoItem>
                )
            )
          })
        }
      </SideLists>
    </Container>
  )
}

export default SideSticky;