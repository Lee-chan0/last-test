import styled, { css } from "styled-components";
import { articles } from '../../mock';
import { ViewMoreBox } from "../ViewMore/ViewMoreStyle";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 24px;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  

  margin-bottom : 40px;
`;

const ArticleLists = styled.ul`
  width: 100%;

  a {
    text-decoration: none;
  }
`;

const ArticleItem = styled.li`
  width: 100%;
  height: 160px;
  margin-bottom : 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.gray.gray0};
  will-change: transform box-shadow background-color;
  transition: all 0.3s;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: space-evenly;

  &:hover {
    cursor: pointer;
    transform : scale(1.02);
    box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.gray.gray100};
  }
`;

const ArticleImgBox = styled.div`
  flex : 0 0 25%;

  margin : 16px 0;

  border-radius: 4px;

  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ArticleContents = styled.div`
  flex : 0 0 65%;

  width: 100%;

  display : flex;
  justify-content: center;
  flex-direction: column;
  gap : 16px;
`;

const textStyle = css`
  display : -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient : vertical;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticleTitle = styled.h2`
  width: 100%;
  ${textStyle};
  color : ${({ theme }) => theme.blue.blue700};
`;

const ArticleContent = styled.span`
  width: 100%;
  ${textStyle};
  -webkit-line-clamp: 4;

  color : ${({ theme }) => theme.gray.gray600};
`;

function CategoryByList({ categoriesId, entireArticleArr, plainText }) {

  return (
    <Container>
      <ArticleLists>
        {
          entireArticleArr.map((item) => {
            const { articleId, articleImageUrls, articleContent, articleTitle, Category } = item;
            const { categoryId } = Category;

            return (
              (+categoriesId === categoryId) &&
              <Link key={articleId} to={`/news-list/article/${articleId}`}>
                <ArticleItem >
                  <ArticleImgBox $src={JSON.parse(articleImageUrls)[0]} />
                  <ArticleContents>
                    <ArticleTitle>{articleTitle}</ArticleTitle>
                    <ArticleContent>{plainText(articleContent)}</ArticleContent>
                  </ArticleContents>
                </ArticleItem>
              </Link>
            )
          })
        }
      </ArticleLists>
      <ViewMoreBox><span>View More</span></ViewMoreBox>
    </Container>
  )
}


export default CategoryByList;