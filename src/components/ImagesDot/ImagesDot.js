import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position : absolute;
  bottom : 10px;
  left: 0;

  display : flex;
  justify-content: center;
  gap : 8px;

  @media (max-width : 767px) {
    bottom : 4px;
  }
`;

const Dots = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ $index, $currentIndex }) => $index === $currentIndex ? '#0D50D7' : '#CCCCCC'};
  border-radius: 9999px;
`;

function ImagesDot({ imageUrls, currentIndex }) {

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