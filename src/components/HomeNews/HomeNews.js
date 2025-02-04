import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { getVideoId } from "../VideoNews/VideoBox";
import youtubeIcon from '../../assets/prime_youtube.png';
import { Link, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import closeBtn from '../../assets/whiteClose.png';

const borderRadius = css`
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

export const CarouselMainContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 24px 40px;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  position : relative;
  margin-bottom : 40px;
`;

export const CarouselTitle = styled.h1`
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 20px;
  margin-left : 16px;
`;

const CarouselLists = styled.ul`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  a {
    text-decoration: none;
  }
`;

const CarouselItems = styled.li`
  display : flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  margin : 24px 8px;
  transition : transform 0.3s ease;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  will-change: box-shadow, transform;

  &:hover {
    background-color: ${({ theme }) => theme.gray.gray100};
    cursor: pointer;
    transform : scale(1.05);
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.5);
  }

  &:nth-child(1) {
    margin : 24px 8px 24px 16px;
  }

  &:last-child {
    margin : 24px 16px 24px 8px;
  }

  & > ${CarouselTitle} {
    font-size : 15px;

    margin : 4px;

    display: -webkit-box;
    -webkit-line-clamp : 2;
    -webkit-box-orient : vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CarouselContent = styled.span`
  font-size : 13px;
  color : ${({ theme }) => theme.gray.gray600};

  margin : 4px;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient : vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CarouselImageBox = styled.div`
  background-color: black;
  width: 144px;
  height: 88px;
  background-image: url(${({ $imgSrc }) => $imgSrc ? $imgSrc : 'https://i.namu.wiki/i/M9DUOeJIn3If7FU7QlF6mfB2SEF3ecNWrQk0RiC1b6w59SLthwswxt2sFO3_86gyKVEn-DknunO-6pxJcR44tg.webp'});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${borderRadius};
  transition: transform 0.3s ease;
`;

const AutoArrowControlBox = styled.div``;

const CarouselVideoItems = styled(CarouselItems)`
  width: 300px;
  height: 200px;

  & > .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const CarouselVideoTitleBox = styled.div`
  display : flex;
  width: 300px;
  height: 30px;
  align-items: center;
  padding : 0 8px;
  

  ${CarouselTitle} {
    text-overflow: ellipsis;
    font-size : 16px;
    line-height: 30px;
    margin : 0;
    width: 100%;

    display : -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient : vertical;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const YoutubeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position : fixed;
  top : 0;
  left: 0;
  z-index: 1;
  background-color : rgba(0, 0, 0, 0.5);

  display : ${({ $isFocus }) => $isFocus ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const YoutubePreviewContainer = styled.div`
  width: 500px;
  height: 350px;
  display : flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PreviewBox = styled.div`
  width: 100%;
  position : absolute;
  top : -10%;
  left: 0;
  z-index: -1;
  display : flex;
  justify-content: space-between;
  align-items: center;
`;

const PreviewDescription = styled.span`
  color : ${({ theme }) => theme.gray.gray100};
  background-color: ${({ theme }) => theme.blue.blue700};
  padding : 8px 16px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  font-weight: bold;
`;

const CloseYoutubeBtn = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  background-color: ${({ theme }) => theme.blue.blue700};
  background-image: url(${closeBtn});
  background-position: center;
  background-size: 24px;
  background-repeat: no-repeat;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue500};
  }
`;

function HomeNews({ articleType, isVideo, topNewsArticlesArr, homeVideoArticleArr }) {
  const scrollRef = useRef(null);
  const [mousePause, setMousePause] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const timeOutRef = useRef(null);


  const navigate = useNavigate();

  const videoMouseEnter = (url) => {
    setVideoUrl(url);

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      setIsFocus(true);
    }, 1500);

  }

  const handleCloseClick = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    setIsFocus(false);
  }

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

  const plainText = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const moveToScroll = (direction, autoAmount) => {
    if (!direction) return;
    const amount = autoAmount;

    const container = scrollRef?.current;

    const currentLocation = container?.scrollLeft;
    const lastLocation = container?.scrollWidth - container?.offsetWidth;

    if (direction === 'right') {
      if (currentLocation >= lastLocation - 1) {
        container?.scrollTo({ left: 0, behavior: "smooth" });
      }
      else {
        container?.scrollBy({ left: amount, behavior: "smooth" });
      };
    } else if (direction === 'left') {
      if (currentLocation === 0) {
        container?.scrollTo({ left: lastLocation, behavior: "smooth" });
      }
      else {
        container?.scrollBy({ left: -amount, behavior: "smooth" });
      };
    }
  }

  useEffect(() => {
    const body = document.querySelector("body");
    if (isFocus) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [isFocus]);

  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === "Escape") {
        setIsFocus(false);
      }
    }
    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    }
  }, []);

  useEffect(() => {
    if (mousePause) return;

    let animate;
    let autoDirection = 'right';

    const autoMove = () => {
      const autoAmount = 1;
      const currentLocation = scrollRef?.current?.scrollLeft;
      const lastLocation = scrollRef?.current?.scrollWidth - scrollRef?.current?.offsetWidth;

      if (currentLocation === 0) autoDirection = 'right';
      else if (currentLocation >= lastLocation - 1) autoDirection = 'left';


      moveToScroll(autoDirection, autoAmount);
      animate = requestAnimationFrame(autoMove);
    }
    autoMove();

    return () => {
      cancelAnimationFrame(animate);
    }
  }, [mousePause]);

  return (
    <CarouselMainContainer>
      <YoutubeContainer $isFocus={isFocus}>
        <YoutubePreviewContainer>
          <PreviewBox>
            <PreviewDescription>미리보기</PreviewDescription>
            <CloseYoutubeBtn onClick={handleCloseClick} />
          </PreviewBox>
          <YouTube
            videoId={getVideoId(videoUrl)}
            opts={{
              width: "500",
              height: "350",
              playerVars: {
                rel: 0,
                modestbranding: 1,
              }
            }}
          />
        </YoutubePreviewContainer>
      </YoutubeContainer>
      {
        (isVideo)
          ?
          <Link
            to={'/news-list/video/video-articles'}
            style={{ textDecoration: "none" }}
          >
            <CarouselTitle>{'동영상'}</CarouselTitle>
          </Link>
          :
          <CarouselTitle>{'TOP 뉴스'}</CarouselTitle>
      }
      <AutoArrowControlBox onMouseEnter={() => setMousePause(true)} onMouseLeave={() => setMousePause(false)}>
        <CarouselLists ref={scrollRef}>
          {(!isVideo) ?
            topNewsArticlesArr?.map((item) => {
              const { articleId, articleTitle, articleContent, articleImageUrls } = item;
              return (
                <CarouselItems key={articleId} onClick={() => handleClickArticle(articleId)}>
                  <CarouselImageBox $imgSrc={JSON.parse(articleImageUrls)[0]} />
                  <CarouselTitle>{articleTitle}</CarouselTitle>
                  <CarouselContent>{plainText(articleContent)}</CarouselContent>
                </CarouselItems>
              )
            })
            :
            homeVideoArticleArr.map((videoItem) => {
              const { articleId, articleContent, articleTitle } = videoItem;
              return (
                <CarouselVideoItems
                  key={articleId}
                  onMouseEnter={() => videoMouseEnter(articleContent)}
                  onMouseLeave={() => {
                    if (timeOutRef.current) {
                      clearTimeout(timeOutRef.current);
                      timeOutRef.current = null;
                    }
                  }}
                >
                  <CarouselVideoTitleBox>
                    <img src={youtubeIcon} alt="video-Icon" />
                    <CarouselTitle>{articleTitle}</CarouselTitle>
                  </CarouselVideoTitleBox>
                  <img
                    src={`https://img.youtube.com/vi/${getVideoId(articleContent)}/mqdefault.jpg`}
                    alt={`thumbnail-${articleId}`}
                    className="thumbnail"
                  />
                </CarouselVideoItems>
              )
            })
          }
        </CarouselLists>
      </AutoArrowControlBox>
    </CarouselMainContainer >
  )
};

export default HomeNews;