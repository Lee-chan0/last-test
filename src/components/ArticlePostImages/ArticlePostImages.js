import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import closeBtn from '../../assets/ion_close.png';
import React from "react";
import leftButton from '../../assets/mingcute_left-fill.png'
import rightButton from '../../assets/mingcute_right-fill.png'
import ImagesDot from "../ImagesDot/ImagesDot";

const Container = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.gray.gray100};
  margin-top : 40px;
  border-radius: 4px;
  padding : 0 16px;

  display: flex;
  align-items: center;

  position : relative;

  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
`;

const ImgDescription = styled.span`
  color : ${({ theme }) => theme.blue.blue100};
  font-weight: bold;
  font-size : 18px;
  background-color: ${({ theme }) => theme.blue.blue700};
  padding : 8px 16px;

  position : absolute;
  top : -5%;

  border-radius: 4px;

  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
`;

const ImgMainContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.blue.blue100};
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
`;

const ImgContainer = styled.ul`
  width: 100%;
  margin : 8px 16px;
  overflow: auto;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;

  padding : 8px 16px;
  display: flex;
  align-items: center;
  gap : 16px;
`;

const Images = styled.div`
  flex : 0 0 152px;
  height: 100px;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  cursor: pointer;

  will-change: transform, box-shadow;

  transition: transform 0.5s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 2px 0 black;
  }
`;

const ModalMainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top : 0;
  left: 0;
  background : rgba(0, 0, 0, 0.8);
  z-index: 2;
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const ImageModalContainer = styled.div`
  width: 700px;
  height: 80vh;
  overflow: hidden;

  padding : 40px;

  border-radius: 4px;

  position: relative;

  background-color: ${({ theme }) => theme.gray.gray0};
`;

const ModalImageBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding : 0 24px;
  background-color: ${({ theme }) => theme.blue.blue100};
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  position : relative;

  display : flex;
  align-items: center;
`;

const ModalImageHelper = styled.div`
  width: 100%;
  height: 80%;

  display : flex;

  overflow: hidden;
`;

const ModalImage = styled.img`
  flex : 0 0 100%;
  height: 100%;
  object-fit: contain;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-image: url(${closeBtn});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 1;

  position: absolute;
  right: 0;
  top : 0;

  &:hover {
    opacity: 0.5;
  }
`;

const ArrowBtn = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;

  display : flex;
  align-items: center;
  justify-content: center;
  

  ${({ $direction }) => $direction === 'left' ? 'left : 0' : 'right : 0'};
  background-image: url(${({ $direction }) => $direction === 'left' ? `${leftButton}` : `${rightButton}`});
  background-position: center;
  background-size : contain;
  background-repeat: no-repeat;
  opacity : 1;

  &:hover {
    opacity : 0.5;
  }
`;

function ArticlePostImages({ article }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickImg = (index) => {
    setIsOpen(true);
    setCurrentIndex(index);
  }

  const closeClickImg = () => {
    setIsOpen(false);
  }

  const handleArrow = (direction) => {
    if (!direction) return;

    if (direction === 'right') {
      setCurrentIndex((prev) => {
        return prev === imageUrls.length - 1 ? 0 : prev + 1;
      });
    } else {
      setCurrentIndex((prev) => {
        return prev === 0 ? imageUrls.length - 1 : prev - 1;
      });
    }
  }

  const changeImagesString = (imgArr) => {
    const imgs = JSON.parse(imgArr);
    return imgs;
  }

  useEffect(() => {
    if (article.length === 0) return;
    article.forEach((item) => setImageUrls(changeImagesString(item.articleImageUrls)));
  }, [article])

  return (
    <>
      <Container>
        <ImgDescription>사진 모아보기</ImgDescription>
        <ImgMainContainer>
          <ImgContainer>
            <ImgBox>
              {
                imageUrls.map((item, index) => (
                  <Images key={index} $src={item} onClick={() => handleClickImg(index)} />
                ))
              }
            </ImgBox>
          </ImgContainer>
        </ImgMainContainer>
      </Container>

      {/* {모달} */}
      <ModalMainContainer $isOpen={isOpen}>
        <ImageModalContainer>
          <CloseBtn onClick={closeClickImg} />
          <ModalImageBox>
            <ArrowBtn $direction={'left'} onClick={() => handleArrow('left')} />
            <ArrowBtn $direction={'right'} onClick={() => handleArrow('right')} />
            <ModalImageHelper>
              <ModalImage src={imageUrls[currentIndex]} alt="preview" />
            </ModalImageHelper>
            <ImagesDot imageUrls={imageUrls} currentIndex={currentIndex} />
          </ModalImageBox>
        </ImageModalContainer>
      </ModalMainContainer>
    </>
  )
}

export default ArticlePostImages;