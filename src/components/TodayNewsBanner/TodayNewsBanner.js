import styled from "styled-components";
import ArrowButton from "../ArrowButton/ArrowButton";
import bannerImage from '../../assets/eclipse-1492818_1920.jpg';
import bannerImage2 from '../../assets/mountain-7690893_1920.jpg';
import bannerImage3 from '../../assets/planet-581239_1920.jpg';
import { useState } from "react";

export const imageArr = [
  bannerImage, bannerImage2, bannerImage3
];

const BannerContainer = styled.div`
  margin : 0 -80px;
  position: relative;
  overflow: hidden;
  margin-bottom : 40px;
`;

const BannerImageBox = styled.div`
  width: 100%;
  height: 480px;
  border-radius: 4px;
  position : relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlurBackground = styled.div`
  width: 100%;
  height: 480px;
  transition: background-image 0.3s ease;
  background-image: url(${({ $imageIdx }) => imageArr[$imageIdx]});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(5px);
`;

const BannerImage = styled.img`
  width: 85%;
  height: 85%;
  position: absolute;
  z-index: 1;
  object-fit: cover;
`;

function TodayNewsBanner() {
  const [imageIdx, setImageIdx] = useState(0);


  const clickByImage = (direction) => {
    direction === 'right'
      ?
      setImageIdx((prev) => (prev < imageArr.length - 1 ? prev + 1 : prev))
      :
      setImageIdx((prev) => (prev !== 0 ? prev - 1 : prev));
  }

  return (
    <BannerContainer>
      <ArrowButton direction='left' onClick={clickByImage} />
      <ArrowButton direction='right' onClick={clickByImage} />
      <BannerImageBox>
        <BannerImage src={imageArr[imageIdx]} alt={`image-${imageIdx}`} />
        <BlurBackground $imageIdx={imageIdx} />
      </BannerImageBox>
    </BannerContainer>
  )
}



export default TodayNewsBanner;