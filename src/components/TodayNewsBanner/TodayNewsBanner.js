import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import ArrowButton from '../ArrowButton/ArrowButton';
import { bannerObj } from '../../mock';
import BannerTitleWrap from "../BannerTitleWrap/BannerTitleWrap";



const MainContainer = styled.div`
  overflow: hidden;
  display : flex;
`;

const Container = styled.div`
  width: 640px;
  height: 320px;
  position : relative;
  margin : 0 auto;
  margin-bottom : 40px;
  display : flex;
  justify-content: center;
  align-items: center;
`;

const BannerBlurContainer = styled.div`
  width: 100%;
  height: 90%;
  display : flex;
  justify-content: center;

  position: relative;



  &::before {
    content : "";
    position: absolute;
    top: 0;
    left : 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ $src, $activeIndex }) => $src ? $src[$activeIndex] : ""});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter : blur(10px);
  }
`;

const ListContainer = styled.ul`
  width: 50%;
  height: 100%;
  display : flex;
  align-items: center;
  perspective: 400px;
`;

const prevStyle = css`
    ${({ $amount }) => `transform : translateX(-${$amount}px)  scale(0.8)`};
`;

const nextStyle = css`
    ${({ $amount }) => `transform : translateX(-${$amount}px)  scale(0.8)`};
`;

const ListItemContainer = styled.li`
  flex : 0 0 100%;
  height: 80%;
  margin-right: 40px;

  will-change: transform;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;

  opacity: .5;
  ${({ $amount }) => `transform : translateX(-${$amount}px)`};

  &:nth-child(${({ $prevIndex }) => $prevIndex + 1}) {
    ${prevStyle};
  }

  &:nth-child(${({ $nextIndex }) => $nextIndex + 1}) {
    ${nextStyle};
  }

  &:nth-child(${({ $activeIndex }) => $activeIndex + 1 ? $activeIndex + 1 : ""}) {
    opacity : 1;
  }
`;


const BannerTitlesBox = styled.div`
  width: 100%;
  position: absolute;
  bottom : 0;
  display : flex;
  flex-direction: column;
  gap : 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color : ${({ theme }) => theme.blue.blue100};

  padding : 8px 16px;
  border-radius: 4px;
`;

const BannerTitle = styled.h1`

`;

const BannerSubTitle = styled.p`
  color : ${({ theme }) => theme.gray.gray400};
`;

const BannerImgBox = styled.img`

  position : relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;



function TodayNewsBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(activeIndex - 1);
  const [nextIndex, setNextIndex] = useState(activeIndex + 1);
  const domRef = useRef(null);
  const [amount, setAmount] = useState(0);
  const [blurImg, setBlurImg] = useState([]);

  const handleArrowClick = (direction) => {
    if (!direction) return;

    const container = domRef.current;
    const listAmount = container.offsetWidth;

    if (direction === 'right') {
      if (activeIndex === bannerObj.length - 1) return;

      setAmount((prev) => prev + listAmount + 40); //margin값 40
      setActiveIndex((prev) => prev < bannerObj.length - 1 ? prev + 1 : prev);

    } else if (direction === 'left') {
      if (activeIndex === 0) return;

      setAmount((prev) => prev - listAmount - 40);
      setActiveIndex((prev) => prev > 0 ? prev - 1 : prev);
    }
  }

  useEffect(() => {
    const blurImg = bannerObj.map((item) => {
      const { bannerImgUrl } = item;
      return bannerImgUrl;
    })

    setBlurImg(blurImg);
  }, []);

  useEffect(() => {
    setPrevIndex(activeIndex - 1);
    setNextIndex(activeIndex + 1);
  }, [activeIndex]);

  return (
    <MainContainer>
      <Container>
        <BannerBlurContainer $src={blurImg} $activeIndex={activeIndex}>
          <ListContainer ref={domRef}>
            {
              bannerObj.map((item) => {
                const { bannerId, bannerTitle, bannerSubTitle, bannerImgUrl } = item;
                return (
                  <ListItemContainer
                    key={bannerId}
                    $activeIndex={activeIndex}
                    $prevIndex={prevIndex}
                    $nextIndex={nextIndex}
                    $amount={amount}
                  >
                    <BannerImgBox src={bannerImgUrl} alt="" />
                    <BannerTitlesBox>
                      <BannerTitle>{bannerTitle}</BannerTitle>
                      <BannerSubTitle>{bannerSubTitle}</BannerSubTitle>
                    </BannerTitlesBox>
                  </ListItemContainer>
                )
              })
            }
          </ListContainer>
        </BannerBlurContainer>
        <ArrowButton direction={'right'} onClick={handleArrowClick} />
        <ArrowButton direction={'left'} onClick={handleArrowClick} />
      </Container>
      <BannerTitleWrap />
    </MainContainer>
  )
}

export default TodayNewsBanner;