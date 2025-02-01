import styled from "styled-components";
import lineIcon from '../../assets/lin.png';
import copyIcon from '../../assets/mingcute_copy-line.png';
import shareIcon from '../../assets/material-symbols_share-outline.png';
import { useEffect, useState } from "react";
import React from "react";

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

function ArticleActorDescription({ article }) {
  const [articleCreatedAt, setArticleCreatedAt] = useState(null);

  const changeCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  const handleHtmlCopy = async (articleContent) => {
    try {
      const blob = new Blob([articleContent], { type: "text/html" });
      const clipboardItem = new ClipboardItem({ "text/html": blob });
      await navigator.clipboard.write([clipboardItem]);

      alert("기사 내용과 이미지가 복사되었습니다!");
    } catch (e) {
      console.error("복사 실패:", e);
    }
  };

  useEffect(() => {
    if (article.length === 0) return;

    article.forEach((item) => setArticleCreatedAt(item.createdAt));
  }, [article]);

  return (
    <Container>
      <DescripContainer>
        {
          article.map((item) => {
            const { articleId, articleContent, User, Category } = item;
            const { userNamePosition } = User;
            const { categoryName } = Category;
            return (
              <React.Fragment key={articleId}>
                <DescripActor>{userNamePosition}</DescripActor>
                <LineIc src={lineIcon} alt="line-icon" />
                <DescripCategory>{categoryName}</DescripCategory>
                <LineIc src={lineIcon} alt="line-icon" />
                <DescripImgBox>
                  <img src={copyIcon} alt="copy" onClick={() => handleHtmlCopy(articleContent)} />
                  <img src={shareIcon} alt="share-icon" />
                </DescripImgBox>
              </React.Fragment>
            )
          })
        }
      </DescripContainer>
      <ArticleDate>{changeCreatedAt(articleCreatedAt)}</ArticleDate>
    </Container>
  )
}

export default ArticleActorDescription;