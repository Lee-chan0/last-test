import styled from "styled-components";
import { bannerObj } from "../../mock";

const Container = styled.div`

`;

const WrapLists = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const WrapListsItem = styled.li`
`;

const BannerTitles = styled.div`

`;

const BanenrMainTitle = styled.h1`
  font-size : 24px;
`;

const BannerSubTitle = styled.p`
  font-size : 14px;
`;

function BannerTitleWrap() {
  return (
    <Container>
      <WrapLists>
        {
          bannerObj.map((item) => {
            const { bannerId, bannerTitle, bannerSubTitle } = item;
            return (
              <WrapListsItem key={bannerId}>
                <BannerTitles>
                  <BanenrMainTitle>{bannerTitle}</BanenrMainTitle>
                  <BannerSubTitle>{bannerSubTitle}</BannerSubTitle>
                </BannerTitles>
              </WrapListsItem>
            )
          })
        }
      </WrapLists>
    </Container>
  )
}

export default BannerTitleWrap;