import styled, { css } from "styled-components";
import { ViewMoreBox } from "../ViewMore/ViewMoreStyle";
import { useNavigate } from "react-router-dom";

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

  &:hover {
    cursor: pointer;
    transform : scale(1.02);
    box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.gray.gray100};
  }
`;

const ArticleItems = styled.div`
  width: 100%;
  display : flex;
  justify-content: center;
  align-items: center;

  
  padding : 0 16px;

  gap : 16px;
`;

const ArticleImgBox = styled.div`
  flex : 0 0 25%;
  flex-grow: 1;
  height: 130px;

  border-radius: 4px;

  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ArticleContents = styled.div`
  flex : 0 0 65%;
  flex-grow: 2;
  height: 130px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.blue.blue100};

  display : flex;
  flex-direction: column;
  justify-content: space-around;
  gap : 8px;
`;

const textStyle = css`
  display : -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient : vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 8px;
`;

const ArticleTitle = styled.h2`
  ${textStyle};
  font-size : 22px;
  color : ${({ theme }) => theme.blue.blue700};
  margin-top : 8px;
`;

const ArticleContent = styled.span`
  ${textStyle};
  -webkit-line-clamp: 3;

  font-size : 14px;
  color : ${({ theme }) => theme.gray.gray600};
  margin-bottom : 8px;
`;

function CategoryByList({ categoriesId, entireArticleArr, plainText }) {
  const navigate = useNavigate();

  const handleClickArticle = (id) => {
    const viewArticleArray = JSON.parse(localStorage.getItem("articles")) || [];

    if (!viewArticleArray.includes(id)) {
      viewArticleArray.unshift(id);

      if (viewArticleArray.length > 5) {
        viewArticleArray.pop();
      }

      localStorage.setItem("articles", JSON.stringify(viewArticleArray))
    }

    navigate(`/news-list/article/${id}`);
  }

  return (
    <Container>
      <ArticleLists>
        {
          entireArticleArr.map((item) => {
            const { articleId, articleImageUrls, articleContent, articleTitle, Category } = item;
            const { categoryId } = Category;

            return (
              (+categoriesId === categoryId) &&
              <ArticleItem onClick={() => handleClickArticle(articleId)} key={articleId}>
                <ArticleItems>
                  <ArticleImgBox $src={JSON.parse(articleImageUrls)[0]} />
                  <ArticleContents>
                    <ArticleTitle>{articleTitle}</ArticleTitle>
                    <ArticleContent>{plainText(articleContent)}</ArticleContent>
                  </ArticleContents>
                </ArticleItems>
              </ArticleItem>
            )
          })
        }
      </ArticleLists>
      <ViewMoreBox><span>View More</span></ViewMoreBox>
    </Container>
  )
}


export default CategoryByList;