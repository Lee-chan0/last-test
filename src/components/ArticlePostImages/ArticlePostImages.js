import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.gray.gray100};
  margin-top : 40px;
  border-radius: 4px;

  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
`;

const ImgDescription = styled.span`
  color : ${({ theme }) => theme.blue.blue100};
  font-weight: bold;
  font-size : 18px;
  background-color: ${({ theme }) => theme.blue.blue700};
  padding : 8px 16px;

  border-radius: 4px;

  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
`;

function ArticlePostImages() {
  return (
    <Container>
      <ImgDescription>사진 모아보기</ImgDescription>
    </Container>
  )
}

export default ArticlePostImages;