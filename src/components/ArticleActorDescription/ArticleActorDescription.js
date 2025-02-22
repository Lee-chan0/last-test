import styled from "styled-components";
import lineIcon from '../../assets/lin.png';
import copyIcon from '../../assets/mingcute_copy-line.png';
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

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

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 14px;
  }

  @media (max-width : 767px) {
    font-size : 0.8rem;
  }
`;

const DescripCategory = styled.span`
  color : ${({ theme }) => theme.gray.gray600};

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 14px;
  }

  @media (max-width : 767px) {
    font-size : 0.8rem;
  }
`;

const DescripImgBox = styled.div`
  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    cursor: pointer;

    @media (max-width : 767px) {
        width: 18px;
        height: 18px;
        margin-right : 4px;

    }

    &:hover {
      opacity: 0.5;
    }


  }

  @media (min-width: 768px) and (max-width: 1279px) {
    img {
      width : 20px;
      height: 20px;
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

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 13px;
  }

  @media (max-width : 767px) {
    font-size : 0.7rem;
  }
`;

function ArticleActorDescription({ article }) {
  const [articleCreatedAt, setArticleCreatedAt] = useState(null);

  const changeCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  const handleHtmlCopy = async (articleContent) => {
    try {
      if (!articleContent) return;
      const doc = new DOMParser().parseFromString(articleContent, 'text/html');
      const content = doc.body.textContent || "";
      await navigator.clipboard.writeText(content);
      if (!toast.isActive('clip-board')) {
        toast.info('기사내용이 복사되었습니다.', { position: 'top-center', toastId: 'clip-board' });
      }
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