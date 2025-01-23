import styled from "styled-components";
import { CarouselMainContainer, CarouselTitle } from '../HomeNews/HomeNews';
import BrandCard from "../BrandCard/BrandCard";


const BrandListsContainer = styled(CarouselMainContainer)`
  margin-top : 40px;
`;

const BrandListsTitle = styled(CarouselTitle)`
`;

const BrandListsBox = styled.div`
  display : grid;
  grid-template : repeat(2, 88px) / repeat(6, 1fr);
  gap : 16px;
  margin: 24px 0;
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