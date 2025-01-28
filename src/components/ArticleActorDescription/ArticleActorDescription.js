import styled from "styled-components";
import lineIcon from '../../assets/lin.png';
import copyIcon from '../../assets/mingcute_copy-line.png';
import shareIcon from '../../assets/material-symbols_share-outline.png';

const Container = styled.div`
  display : flex;
  justify-content: space-between;
  align-items: center;
`;

const DescripContainer = styled.div`
  width: 50%;
  display : flex;
  align-items: center;
`;

const DescripActor = styled.span`
  font-weight: bold;
  color : ${({ theme }) => theme.blue.blue700};
`;

const DescripCategory = styled.span`
  color : ${({ theme }) => theme.gray.gray600};
`;

const DescripImgBox = styled.div`

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const LineIc = styled.img`
  width: 24px;
  height: 24px;
`;

const ArticleDate = styled.span`
  font-size : 14px;
  color : ${({ theme }) => theme.gray.gray600};
`;

function ArticleActorDescription() {
  return (
    <Container>
      <DescripContainer>
        <DescripActor>기자 이름</DescripActor>
        <LineIc src={lineIcon} alt="line-icon" />
        <DescripCategory>카테고리 이름</DescripCategory>
        <LineIc src={lineIcon} alt="line-icon" />
        <DescripImgBox>
          <img src={copyIcon} alt="copy-icon" />
          <img src={shareIcon} alt="share-icon" />
        </DescripImgBox>
      </DescripContainer>
      <ArticleDate>2025 / 1 / 30</ArticleDate>
    </Container>
  )
}

export default ArticleActorDescription;