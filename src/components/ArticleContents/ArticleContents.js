import styled from "styled-components";
import { ViewMoreBox } from "../ViewMore/ViewMoreStyle";

const ArticleContentMainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 16px;
`;

const ArticleLists = styled.ul`
  padding : 8px 24px;
  display : grid;
  grid-template-columns : 40px 10% 1fr 10% 10% 10% 5%;
  background-color: ${({ theme }) => theme.gray.gray0};

  &:hover {
    background-color: ${({ $description }) => $description ? `#fff` : `#f0f3fa`};
  }
`;

const ArticleItem = styled.div`
  text-align: center;
  display : flex;
  align-items: center;
  justify-content: center;
  font-size : 14px;

  &.article-number {

  }

  &.category {
    color : ${({ theme }) => theme.gray.gray600};
  }

  &.article-title {
    color : ${({ theme }) => theme.blue.blue700};
    font-weight: bold;
  }

  &.user-name-position {
    color : ${({ theme }) => theme.blue.blue700};
  }

  &.date {
    color : ${({ theme }) => theme.gray.gray600};
  }

  input {
    width: 16px;
    height: 16px;
  }
`;

function changeCreatedAt(createdAt) {
  return new Date(createdAt).toISOString().split("T")[0];
}

function ArticleContents({ articlesArr, filterArticles }) {

  return (
    <ArticleContentMainContainer>
      <ArticleLists
        $description={true}
        style={{
          borderBottom: "2px solid #3376FD",
          borderTop: "2px solid #3376FD"
        }}
      >
        <ArticleItem><input type="checkbox" /></ArticleItem>
        <ArticleItem><strong>번호</strong></ArticleItem>
        <ArticleItem><strong>제목</strong></ArticleItem>
        <ArticleItem><strong>카테고리</strong></ArticleItem>
        <ArticleItem><strong>글쓴이</strong></ArticleItem>
        <ArticleItem><strong>날짜</strong></ArticleItem>
        <ArticleItem><strong>확인</strong></ArticleItem>
      </ArticleLists>
      {
        (filterArticles.length === 0) ?
          articlesArr.map((item) => {
            const { articleId, articleTitle, createdAt, User, Category } = item;
            const { userNamePosition } = User;
            const { categoryName } = Category;
            return (
              <ArticleLists key={articleId}>
                <ArticleItem>
                  <input
                    type="checkbox"
                  />
                </ArticleItem>
                <ArticleItem className="article-number">{articleId}</ArticleItem>
                <ArticleItem className="article-title">{articleTitle}</ArticleItem>
                <ArticleItem className="category">{categoryName}</ArticleItem>
                <ArticleItem className="user-name-position">{userNamePosition}</ArticleItem>
                <ArticleItem className="date">{changeCreatedAt(createdAt)}</ArticleItem>
                <ArticleItem>0</ArticleItem>
              </ArticleLists>
            )
          })
          :
          filterArticles.map((item) => {
            const { articleId, articleTitle, createdAt, User, Category } = item;
            const { userNamePosition } = User;
            const { categoryName } = Category;
            return (
              <ArticleLists key={articleId}>
                <ArticleItem>
                  <input
                    type="checkbox"
                  />
                </ArticleItem>
                <ArticleItem className="article-number">{articleId}</ArticleItem>
                <ArticleItem className="article-title">{articleTitle}</ArticleItem>
                <ArticleItem className="category">{categoryName}</ArticleItem>
                <ArticleItem className="user-name-position">{userNamePosition}</ArticleItem>
                <ArticleItem className="date">{changeCreatedAt(createdAt)}</ArticleItem>
                <ArticleItem>0</ArticleItem>
              </ArticleLists>
            )
          })
      }
      <ViewMoreBox style={{ marginTop: "8px" }}><span>View More</span></ViewMoreBox>
    </ArticleContentMainContainer>
  )
}

export default ArticleContents;