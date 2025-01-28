import styled from "styled-components";
import SideSticky from "../SideSticky/SideSticky";
import { articles } from "../../mock";
import ArticleActorDescription from "../ArticleActorDescription/ArticleActorDescription";
import ArticlePostImages from "../ArticlePostImages/ArticlePostImages";

const MainContainer = styled.div`
  display: flex;
`;

const ArticleContainer = styled.div`
  width: 65%;
  height: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 24px;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  margin-bottom : 40px;
`;

const ArticleDescriptionsBox = styled.div`
  display : flex;
  flex-direction: column;
  gap : 20px;
`;

const ArticleTitle = styled.h1`
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 28px;
`;

const ArticleSubTitle = styled.p`

`;

const ArticleContentContainer = styled.div`
  width: 100%;
  height: 1500px;

  margin-top : 24px;
  background-color: ${({ theme }) => theme.gray.gray100};
  border-radius: 4px;
  box-shadow : 0 0 5px 1px rgba(0, 0, 0, 0.3);
`;

function ArticlePost() {
  return (
    <MainContainer>
      <ArticleContainer>
        <ArticleDescriptionsBox>
          <ArticleTitle>기사 제목</ArticleTitle>
          <ArticleSubTitle>기사 소제목</ArticleSubTitle>
          <ArticleActorDescription />
        </ArticleDescriptionsBox>
        <ArticleContentContainer>

        </ArticleContentContainer>
        <ArticlePostImages />
      </ArticleContainer>
      <SideSticky />
    </MainContainer>
  )
}

export default ArticlePost;