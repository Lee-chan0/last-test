import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position : absolute;
  bottom : 10px;
  left: 0;

  display : flex;
  justify-content: center;
  gap : 8px;
`;

const Dots = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ $index, $currentIndex }) => $index === $currentIndex ? '#0D50D7' : '#CCCCCC'};
  border-radius: 9999px;
`;

function ImagesDot({ imageUrls, currentIndex }) {
  const [imagesLength, setImagesLength] = useState(null);

  useEffect(() => {
    if (imageUrls.length === 0) return;

    setImagesLength(imageUrls.length);

  }, [imageUrls]);
  return (
    <Container>
      {
        imageUrls.map((item, index) => (
          <Dots key={index} $index={index} $currentIndex={currentIndex} />
        ))
      }
    </Container>
  )
}

export default ImagesDot;