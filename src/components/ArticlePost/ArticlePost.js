import styled from "styled-components";
import SideSticky from "../SideSticky/SideSticky";
import ArticleActorDescription from "../ArticleActorDescription/ArticleActorDescription";
import ArticlePostImages from "../ArticlePostImages/ArticlePostImages";
import { useEffect, useState } from "react";
import React from "react";
import DOMPurify from 'dompurify';

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

const ArticleSubTitle = styled.p``;

const ArticleContentContainer = styled.div`
  width: 100%;
  height: 100%;

  padding : 40px;

  display : flex;
  justify-content: center;

  margin-top : 24px;
  background-color: ${({ theme }) => theme.gray.gray100};
  border-radius: 4px;
  box-shadow : 0 0 5px 1px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    margin-bottom : 8px;
  }

  p {
    font-size : 14px;
  }
`;

function ArticlePost({ entireArticleArr, articlesId }) {
  const [article, setArticle] = useState([]);

  const createMarkUp = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  }

  useEffect(() => {
    if (entireArticleArr.length === 0) return;

    const filterArticles = entireArticleArr.filter((item) => item.articleId === +articlesId);
    setArticle(filterArticles);

  }, [entireArticleArr, articlesId]);

  return (
    <MainContainer>
      <ArticleContainer>
        <ArticleDescriptionsBox>
          {
            article.map((item) => {
              const { articleId, articleSubTitle, articleTitle } = item;
              return (
                <React.Fragment key={articleId}>
                  <ArticleTitle>{articleTitle}</ArticleTitle>
                  <ArticleSubTitle>{articleSubTitle}</ArticleSubTitle>
                </React.Fragment>
              )
            })
          }
          <ArticleActorDescription article={article} />
        </ArticleDescriptionsBox>
        <ArticleContentContainer>
          {
            article.map((item) => {
              const { articleContent, articleId } = item;
              return (
                <React.Fragment key={articleId}>
                  <div dangerouslySetInnerHTML={createMarkUp(articleContent)} />
                </React.Fragment>
              )
            })
          }
        </ArticleContentContainer>
        <ArticlePostImages article={article} />
      </ArticleContainer>
      <SideSticky />
    </MainContainer>
  )
}

export default ArticlePost;