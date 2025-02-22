import styled, { css } from "styled-components";
import { brandLogos } from "../../mock";

const boxSizes = css`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const boxShadow = css`
  box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.4);
`;

const CardMainContainer = styled.div`
  width: 160px;
  height: 88px;
  perspective: 400px;

  &:hover > * {
    transform : rotateY(180deg);
    cursor: pointer;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    width: 120px;

  &:hover > * {
    transform : rotateY(0);
  }
}
`;

const CardMainPositionBox = styled.div`
  ${boxSizes};
  background-color : ${({ theme }) => theme.gray.gray0};
  transform-style: preserve-3d;
  transition : transform 1s;
  position : relative;
  transform : rotateY(0deg);
  will-change: transition;
`;

const CardFront = styled.div`
  ${boxSizes};
  ${boxShadow};
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 64px;
  position : absolute;
  backface-visibility: hidden;
  border : 2px double rgba(51, 118, 253, 0.5);
`;

const CardBack = styled.div`
  ${boxSizes};
  ${boxShadow};
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 48px;
  position : absolute;
  backface-visibility: hidden;
  background-color: ${({ theme }) => theme.blue.blue500};
  border : 2px solid rgba(255, 255, 255, 0.5);

  transform : rotateY(180deg);
`;

function BrandCard() {
  return (
    <>
      {brandLogos.map((logos) => {
        const { brandLogoId, brandLogoImgUrl } = logos;
        return (
          <CardMainContainer key={brandLogoId}>
            <CardMainPositionBox>
              <CardFront $src={brandLogoImgUrl} />
              <CardBack $src={brandLogoImgUrl} />
            </CardMainPositionBox>
          </CardMainContainer>
        )
      })}
    </>
  )
}

export default BrandCard;