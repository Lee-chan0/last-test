import styled, { css } from "styled-components";
import { brandLogos } from "../../mock";
import { useState } from "react";

const boxStyles = css`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const BrandCardContainer = styled.div`
  ${boxStyles};
  background-color: ${({ theme }) => theme.gray.gray100};
  position : relative;
  backface-visibility: hidden;
  perspective : 800px;
  transform-style : preserve-3d;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
  transition: transform 1s;
  will-change: transform;

  &:hover {
    cursor: pointer;
    transform: rotateY(180deg);
  }
`;


const BrandCardFront = styled.div`
  ${boxStyles};
  position : absolute;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 64px;
`;


const BrandCardBack = styled.span`
  ${boxStyles};
  position : absolute;
  backface-visibility: hidden;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 48px;
  background-color: ${({ theme }) => theme.blue.blue500};
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);

  transform : rotateY(180deg);
`;

function BrandCard() {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      {brandLogos.map((item) => {
        const { brandLogoId, brandLogoImgUrl } = item;
        return (
          <BrandCardContainer
            key={brandLogoId}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            $isHover={isHover}
          >
            <BrandCardFront $src={brandLogoImgUrl} />
            <BrandCardBack $src={brandLogoImgUrl} />
          </BrandCardContainer>
        )
      })}
    </>
  )
}

export default BrandCard;