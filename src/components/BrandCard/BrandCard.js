import styled, { css } from "styled-components";
import { brandLogos } from "../../mock";

function BrandCard() {
  return (
    <>
      {brandLogos.map((logos) => {
        const { brandLogoId, brandLogoImgUrl } = logos;
        return;
      })}
    </>
  )
}

export default BrandCard;