import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { articles } from "../../mock";
import ArrowButton from "../ArrowButton/ArrowButton";

const CarouselMainContainer = styled.div`
  width: 100%;
  height: 350px;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;
  overflow: hidden;
  padding: 24px 40px;
  position: relative;
`;

const CarouselTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.blue.blue700};
  margin-bottom: 12px;
`;

const CarouselLists = styled.ul`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const CarouselItems = styled.li`
  flex: 0 0 20%;
  margin: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    margin-bottom: 8px;
    width: 100%;
    height: 104px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    object-fit: cover;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.gray.gray100};
    transform: scale(1.03);
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.4);
  }

  & > ${CarouselTitle} {
    margin: 0 4px 8px 4px;
    font-size: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CarouselContent = styled.span`
  margin: 0 4px 8px 4px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function HomeNews() {
  const arrowRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollCarousel = (direction) => {
    const amount = 400;
    const container = arrowRef.current;

    const currentLocation = container.scrollLeft;
    const lastWidth = container.scrollWidth - container.offsetWidth;

    if (direction === "left") {
      if (currentLocation === 0) {
        container.scrollTo({ left: lastWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -amount, behavior: "smooth" });
      }
    } else if (direction === "right") {
      if (currentLocation >= lastWidth - 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: amount, behavior: "smooth" });
      }
    }
  };

  const handleArrowClick = (direction) => {
    setIsPaused(true);
    scrollCarousel(direction);
    setTimeout(() => setIsPaused(false), 5000);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      scrollCarousel("right");
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <CarouselMainContainer>
      <CarouselTitle>TOP 뉴스</CarouselTitle>
      <CarouselLists
        ref={arrowRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {articles.map((item) => {
          const { articleId, articleTitle, articleContent, articleImgUrl } = item;
          return (
            <CarouselItems key={articleId}>
              <img src={articleImgUrl} alt={`image-${articleId}`} />
              <CarouselTitle>{articleTitle}</CarouselTitle>
              <CarouselContent>{articleContent}</CarouselContent>
            </CarouselItems>
          );
        })}
      </CarouselLists>
      <ArrowButton direction={"left"} onClick={() => handleArrowClick("left")} />
      <ArrowButton direction={"right"} onClick={() => handleArrowClick("right")} />
    </CarouselMainContainer>
  );
}

export default HomeNews;
