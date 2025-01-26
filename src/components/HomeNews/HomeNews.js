import styled, { css } from "styled-components";
import { articles } from '../../mock';
import { useEffect, useRef, useState } from "react";
import { getVideoId } from "../VideoNews/VideoBox";
import youtubeIcon from '../../assets/prime_youtube.png';
import PreviewYouTube from "../PreviewYoutube/PreviewYouTube";

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
  overflow: auto;
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
  position : relative;
`;

const CarouselVideoTitleBox = styled.div`
  display : flex;
  align-items: center;
  height: 30px;
  border : 1px solid ${({ theme }) => theme.gray.gray100};
  ${borderRadius};
  overflow: auto;

  img {
    width: 24px;
    height: 24px;
    margin-left : 8px;
  }

  & > ${CarouselTitle} {
    font-size : 16px;
    margin : 0 8px;

    display : -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient : vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function HomeNews({ articleType, videoUrls }) {
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const [mousePause, setMousePause] = useState(false);
  const [videoBoxId, setVideoBoxId] = useState(null);
  const [showVideoBox, setShowVideoBox] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const topNewsArticleType = articleType[0].articleTypeName;
  const videoNewsArticleType = articleType[1].articleTypeName;

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }

  const handleVideoMouseHover = (id) => {
    if (id === null) return;
    setVideoBoxId(id);

    videoRef.current = setTimeout(() => {
      setShowVideoBox(true)
    }, 1500);
  }

  const handleVideoMouseLeave = () => {
    setVideoBoxId(null);
    setShowVideoBox(false);
    clearTimeout(videoRef.current);
  }

  const moveToScroll = (direction, autoAmount) => {
    if (!direction) return;
    const amount = autoAmount;

    const container = scrollRef.current;

    const currentLocation = container.scrollLeft;
    const lastLocation = container.scrollWidth - container.offsetWidth;

    if (direction === 'right') {
      if (currentLocation >= lastLocation - 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
      else {
        container.scrollBy({ left: amount, behavior: "smooth" });
      };
    } else if (direction === 'left') {
      if (currentLocation === 0) {
        container.scrollTo({ left: lastLocation, behavior: "smooth" });
      }
      else {
        container.scrollBy({ left: -amount, behavior: "smooth" });
      };
    }
  }

  useEffect(() => {
    if (mousePause) return;

    let animate;
    let autoDirection = 'right';

    const autoMove = () => {
      const autoAmount = 3;
      const currentLocation = scrollRef.current.scrollLeft;
      const lastLocation = scrollRef.current.scrollWidth - scrollRef.current.offsetWidth;

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
      <CarouselTitle>{!videoUrls ? topNewsArticleType : videoNewsArticleType}</CarouselTitle>
      <AutoArrowControlBox onMouseEnter={() => setMousePause(true)} onMouseLeave={() => setMousePause(false)}>
        <CarouselLists ref={scrollRef}>
          {!videoUrls ?
            articles.map((item) => {
              const { articleId, articleTitle, articleContent, articleImgUrl } = item;
              return (
                <CarouselItems key={articleId}>
                  <CarouselImageBox $imgSrc={articleImgUrl} />
                  <CarouselTitle>{articleTitle}</CarouselTitle>
                  <CarouselContent>{articleContent}</CarouselContent>
                </CarouselItems>
              )
            })
            :
            videoUrls.map((videoItem) => {
              const { videoUrlId, videoTitle, videoUrl } = videoItem;
              return (
                <CarouselVideoItems
                  key={videoUrlId}
                  onMouseEnter={() => handleVideoMouseHover(videoUrlId)}
                  onMouseLeave={handleVideoMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  {videoBoxId === videoUrlId && showVideoBox &&
                    <PreviewYouTube x={mousePosition.x} y={mousePosition.y} videoUrl={videoUrl} />
                  }
                  <CarouselVideoTitleBox>
                    <img src={youtubeIcon} alt="video-Icon" />
                    <CarouselTitle>{videoTitle}</CarouselTitle>
                  </CarouselVideoTitleBox>
                  <img src={`https://img.youtube.com/vi/${getVideoId(videoUrl)}/mqdefault.jpg`} alt={`thumbnail-${videoUrlId}`} />
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