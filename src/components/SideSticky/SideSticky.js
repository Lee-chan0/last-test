import styled, { css } from "styled-components";
import eyeIcon from '../../assets/eye-line.png';
import { useEffect, useState } from "react";

const boxShadow = css`
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  width: 350px;
  height: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 24px;
  border-radius: 4px;
  ${boxShadow};
  margin : 40px 24px;
  margin-right : 0;

  position : sticky;
  top : 7px;
`;

const SideTitle = styled.h1`
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 24px;
  display: flex;
  align-items: center;
  gap : 4px;
  margin-bottom : 24px;

  img {
    width: 28px;
    height: 28px;
  }
`;

const SideLists = styled.ul`
  width: 100%;
`;

const SideItem = styled.li`
  width: 100%;
  height: 100px;
  margin-bottom : 16px;
  ${boxShadow};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.gray.gray0};

  display : flex;
  justify-content: space-between;

  transition: transform 0.3s, box-shadow 0.3s;
  will-change: transform, box-shadow;

  &:hover {
    background-color: ${({ theme }) => theme.gray.gray100};
    cursor: pointer;
    transform : scale(1.02);
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  }
`;

const SideImgBox = styled.div`
  flex : 0 0 40%;
  border-radius: 4px;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  margin : 8px;
`;

const SideContentsBox = styled.div`
  flex : 0 0 55%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  & > * {
    display : -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    text-overflow: ellipsis;
    overflow: hidden;

    margin : 4px;
  }
`;

const SideItemTitle = styled.h2`
  width: 90%;
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 16px;
`;

const SideItemContent = styled.span`
  width: 90%;
  -webkit-line-clamp: 3;
  font-size : 13px;
`;

function SideSticky({ entireArticleArr, isVideo }) {
  const [viewArticles, setViewArticles] = useState([]);

  const plainText = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  useEffect(() => {
    const viewArticleArray = JSON.parse(localStorage.getItem("articles")) || [];

    if (entireArticleArr?.length === 0 || viewArticleArray?.length === 0) return;

    setViewArticles(() => {
      const filterArray = entireArticleArr?.filter((item) => {
        return viewArticleArray.includes(item.articleId);
      })
      return filterArray;
    })
  }, [entireArticleArr]);

  return (
    <Container>
      <SideLists>
        <SideTitle>
          <img src={eyeIcon} alt="viewIcon" />
          {!isVideo ? `최근 본 기사` : `최근 본 동영상`}
        </SideTitle>
        {
          viewArticles?.map((item) => {
            const { articleId, articleTitle, articleContent, articleImageUrls } = item;
            return (
              <SideItem key={articleId}>
                <SideImgBox $src={JSON.parse(articleImageUrls)[0]} />
                <SideContentsBox>
                  <SideItemTitle>{articleTitle}</SideItemTitle>
                  <SideItemContent>{plainText(articleContent)}</SideItemContent>
                </SideContentsBox>
              </SideItem>
            )
          })
        }
      </SideLists>
    </Container>
  )
}

export default SideSticky;