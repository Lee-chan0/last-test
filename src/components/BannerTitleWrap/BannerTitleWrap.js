import styled, { css } from "styled-components";
import { bannerObj } from "../../mock";



const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const WrapLists = styled.ul`
  width: 95%;
  display : flex;
  gap : 8px;

  border-radius: 4px;
`;

const WrapTitles = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;

  height: 80px;

  gap : 8px;
  margin : 8px;
`;

const WrapItem = styled.li`
  width: 25%;
  border-right : 1px solid ${({ theme }) => theme.gray.gray0};
  border-radius: 4px;

  will-change: transform;

  transition: all .5s;

  background-color : ${({ $activeIndex, $bannerId }) => $activeIndex === $bannerId ? `rgba(51,118,253, 0.8)` : ``};
  color : ${({ $activeIndex, $bannerId }) => $activeIndex === $bannerId ? `#fff` : `#000`};

  &:hover {
    cursor: pointer;
    background-color : rgba(51,118,253, 0.8);
    transform: scale(1.02);

    ${WrapTitles} {
      color : #fff;
    }
  }
`;

const titleStyle = css`
  display : -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient : vertical;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const WrapTitle = styled.h1`
  font-size : 18px;
  ${titleStyle};
`;

const WrapSubTitle = styled.p`
  font-size : 13px;
  ${titleStyle};
`;

function BannerTitleWrap({ setActiveIndex, activeIndex, setIndexControl }) {

  const handleMouseHover = (id) => {
    setActiveIndex(id);
    setIndexControl(true);
  }

  const handleMouseLeave = () => {
    setIndexControl(false);
  }

  return (
    <Container>
      <WrapLists>
        {
          bannerObj.map((item) => {
            const { bannerId, bannerTitle, bannerSubTitle } = item;
            return (
              <WrapItem
                key={bannerId}
                onMouseEnter={() => handleMouseHover(bannerId)}
                onMouseLeave={handleMouseLeave}
                $activeIndex={activeIndex}
                $bannerId={bannerId}
              >
                <WrapTitles>
                  <WrapTitle>{bannerTitle}</WrapTitle>
                  <WrapSubTitle>{bannerSubTitle}</WrapSubTitle>
                </WrapTitles>
              </WrapItem>
            )
          })
        }
      </WrapLists>
    </Container>
  )
}

export default BannerTitleWrap;