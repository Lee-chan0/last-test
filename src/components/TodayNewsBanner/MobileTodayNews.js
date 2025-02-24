import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../Contexts/ThemeContext";
import MobileSlideDot from "./MobileSlideDot";
import { useNavigate } from "react-router-dom";

const SliderContainer = styled.section`
  width: 100%;
  height: 200px;
  position : relative;
  
`;

const SliderWrap = styled.div`
  display : flex;
  width: 100%;
  height: 100%;
  will-change: transform;
`;

const SliderItem = styled.article`
  flex-shrink: 0;
  width: 100%;

  background-image: url(${({ $src }) => $src ? $src : ''});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position : relative;
`;

const SlideTitleBox = styled.div`
  width: 100%;
  position : absolute;
  bottom : 0;
  background: ${({ $darkmode }) => $darkmode ?
    `linear-gradient(to right, rgba(0, 0, 0, 1)0%, rgba(0, 0, 0, 0.1)100%)`
    :
    `linear-gradient(to right, rgba(51,118,253, 1)0%, rgba(51,118,253, 0.1)100%)`
  };
  padding : 4px 8px;
  margin : 8px 4px;
  border-radius: 3px;
  display : flex;
  justify-content : center;
`;

const SlideTitle = styled.h1`
  font-size : 1.1rem;
  color : ${({ theme }) => theme.gray.gray0};
  margin : 4px;

  display : -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  text-overflow: ellipsis;
  overflow: hidden;
`;

const MobileTodayNews = ({ todayArticleArr }) => {
  const { darkmode } = useTheme();
  const [todayMobileArr, setTodayMobileArr] = useState([]);
  const [isMove, setIsMove] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [deltaX, setDeltaX] = useState(0);
  const [amountX, setAmountX] = useState(0);
  const [dotsWidth, setDotsWidth] = useState(0);

  const navigate = useNavigate();

  const transitionRef = useRef(false);
  const widthRef = useRef(0);
  const startXRef = useRef(0);
  const deltaXRef = useRef(0);

  const resizeEvent = () => {
    window.location.reload();
    setAmountX(widthRef.current.getBoundingClientRect().width);
  }

  const handleStart = (e) => {
    setIsMove(true);
    setDeltaX(0);
    transitionRef.current = false;

    startXRef.current = e.touches[0].clientX;
  }

  const handleMove = (e) => {
    const moveX = startXRef.current - e.touches[0].clientX;
    deltaXRef.current = moveX;

    requestAnimationFrame(() => {
      setDeltaX(moveX);
    });
  };

  const handleEnd = () => {
    const width = widthRef.current.getBoundingClientRect().width;
    const MAX_INDEX = todayMobileArr.length - 1;
    const new_deltaX = deltaX;

    if (Math.abs(new_deltaX) > width / 4) {
      if (new_deltaX > 0) {
        setActiveIndex((prev) => (prev < MAX_INDEX ? prev + 1 : prev));
        setAmountX((prev) => (prev < (width * MAX_INDEX)) ? prev + width : prev);
      } else {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        setAmountX((prev) => (prev > 0) ? prev - width : prev);
      }
    }
    setIsMove(false);
  }

  const handleClickArticle = (id) => {
    if (id) {
      navigate(`/news-list/article/${id}`);
    }
  }

  useEffect(() => {
    if (todayArticleArr.length === 0) return;

    const fakeFirstItem = todayArticleArr[0];
    const fakeLastItem = todayArticleArr[todayArticleArr.length - 1];

    setTodayMobileArr([fakeLastItem, ...todayArticleArr, fakeFirstItem]);

  }, [todayArticleArr]);

  useEffect(() => {
    const width = widthRef.current.getBoundingClientRect().width;

    setDotsWidth(width);
    setAmountX(width);
  }, []);

  useEffect(() => {
    const width = widthRef.current.getBoundingClientRect().width;

    if (activeIndex === 0) {
      setTimeout(() => {
        setActiveIndex(todayMobileArr.length - 2);
        setAmountX(width * (todayMobileArr.length - 2));
        transitionRef.current = true;
      }, 50);
    } else if (activeIndex === todayMobileArr.length - 1) {
      setTimeout(() => {
        setActiveIndex(1);
        setAmountX(width);
        transitionRef.current = true;
      }, 50);
    }
  }, [activeIndex, todayMobileArr]);

  useEffect(() => {
    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
    }
  }, []);

  return (
    <SliderContainer>
      <MobileSlideDot
        mobileSlideArray={todayMobileArr}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setAmountX={setAmountX}
        width={dotsWidth}
      />
      <SliderWrap
        ref={widthRef}
        style={{
          transform: !isMove ? `translateX(${-activeIndex * 100}%)` : `translateX(-${amountX + deltaX}px)`,
          transition: (!isMove && transitionRef.current) ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {
          todayMobileArr.length !== 0 &&
          todayMobileArr.map((item, index) => {
            const { articleImageUrls, articleId, articleTitle } = item;
            return (
              <SliderItem
                key={index}
                $src={JSON.parse(articleImageUrls)[0]}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onClick={() => handleClickArticle(articleId)}
              >
                <SlideTitleBox $darkmode={darkmode}>
                  <SlideTitle>{articleTitle}</SlideTitle>
                </SlideTitleBox>
              </SliderItem>
            )
          })
        }
      </SliderWrap>
    </SliderContainer>
  );
};


export default MobileTodayNews;