import styled from "styled-components";
import ArrowButton from '../ArrowButton/ArrowButton';
import { articles } from '../../mock';
import { useEffect, useRef, useState } from "react";
import { getVideoId } from "../VideoNews/VideoBox";
import youtubeIcon from '../../assets/prime_youtube.png';

export const CarouselMainContainer = styled.div`
  width: 100%;
  overflow: hidden;
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
  overflow: hidden;
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
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: transform 0.3s ease;
`;

const AutoArrowControlBox = styled.div``;

const CarouselVideoItems = styled(CarouselItems)`
  border-radius: 0%;
  border-top-right-radius : 4px;
  border-top-left-radius : 4px;

  & > .thumbnail {
    border : 2px solid rgba(13,80,215, 0.5);
    border-top : none;
  }
`;

const CarouselVideoTitleBox = styled.div`
  display : flex;
  align-items: center;
  width: 100%;
  height: 30px;
  border : 2px solid rgba(13,80,215, 0.5);
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  img {
    margin : 0 8px;
  }

  & > ${CarouselTitle} {
    font-size : 16px;
    margin : 0;
    margin-right : 8px;

    display : -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function HomeNews({ articleType, videoUrls }) {
  const arrowRef = useRef(null);
  const [mousePause, setMousePause] = useState(false);
  const videoRef = useRef([]);

  const NewsArticleType = articleType.articleTypeName;

  const moveToScroll = (direction, autoAmount = 350) => {
    if (!direction) return;
    const amount = autoAmount;

    const container = arrowRef.current;

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
      const currentLocation = arrowRef.current.scrollLeft;
      const lastLocation = arrowRef.current.scrollWidth - arrowRef.current.offsetWidth;

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
      <CarouselTitle>{NewsArticleType}</CarouselTitle>
      <AutoArrowControlBox onMouseEnter={() => setMousePause(true)} onMouseLeave={() => setMousePause(false)}>
        <CarouselLists ref={arrowRef}>
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
            videoUrls?.map((videoItem) => {
              const { videoUrlId, videoTitle, videoUrl } = videoItem;
              return (
                <CarouselVideoItems
                  ref={(el) => videoRef.current[videoUrlId] = el}
                  key={videoUrlId}
                  id={`video-${videoUrlId}`}
                >
                  <CarouselVideoTitleBox>
                    <img src={youtubeIcon} alt="video-img" style={{ width: '24px', height: "24px" }} />
                    <CarouselTitle>{videoTitle}</CarouselTitle>
                  </CarouselVideoTitleBox>
                  <img
                    className="thumbnail"
                    src={`https://img.youtube.com/vi/${getVideoId(videoUrl)}/mqdefault.jpg`}
                    alt={`image-${videoUrlId}`}
                  />
                </CarouselVideoItems>
              )
            })
          }
        </CarouselLists>
        <ArrowButton direction={'left'} onClick={moveToScroll} />
        <ArrowButton direction={'right'} onClick={moveToScroll} />
      </AutoArrowControlBox>
    </CarouselMainContainer >
  )
};

export default HomeNews;