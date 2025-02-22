import styled from "styled-components";
import { CarouselMainContainer, CarouselTitle } from '../HomeNews/HomeNews';
import BrandCard from "../BrandCard/BrandCard";


const BrandListsContainer = styled(CarouselMainContainer)`

  @media (min-width: 768px) and (max-width : 1279px) {
    padding: 24px 0 4px 0;
  }

  @media (max-width: 767px) {
    display : none;
  }
`;

const BrandListsTitle = styled(CarouselTitle)`
  @media (min-width: 768px) and (max-width: 1279px) {
    margin-left : 24px;
    font-size : 18px;
  }
`;

const BrandListsBox = styled.div`
  display : grid;
  grid-template: repeat(2, 88px) / repeat(6, 1fr);
  gap : 16px;
  margin : 24px 0;

  @media (min-width: 768px) and (max-width : 1279px) {
    grid-template-columns : repeat(12, 120px);
    grid-template-rows: none;

    padding : 0 0 24px 0;

    margin : 24px 24px;
    overflow-x: scroll;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.blue.blue500};
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.blue.blue700};
      cursor: pointer;
    }
  }
`;


function BrandLists() {
  return (
    <BrandListsContainer>
      <BrandListsTitle>브랜드 별 보기</BrandListsTitle>
      <BrandListsBox>
        <BrandCard />
      </BrandListsBox>
    </BrandListsContainer>
  )
}


export default BrandLists;