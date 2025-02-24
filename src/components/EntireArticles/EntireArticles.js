import styled, { css } from "styled-components";
import SideSticky from "../SideSticky/SideSticky";
import { ViewMoreBox } from "../ViewMore/ViewMoreStyle";
import entireIcon from '../../assets/icon-park_more-app.png';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import TopButton from '../TopButton/TopButton';
import { toast } from "react-toastify";
import { useTheme } from "../../Contexts/ThemeContext";
import { useMediaQuery } from "react-responsive";

const MainContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  width : 100%;
  height: 100%;

  margin-bottom : 40px;
`;

const EntireContainer = styled.div`
  background-color: ${({ theme }) => theme.blue.blue100};
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  height: 100%;

  padding : 40px;

  @media (min-width: 768px) and (max-width: 1279px) {
    padding : 24px;
  }

  @media (max-width : 767px) {
    padding : 8px;
  }
`;

const EntireLists = styled.ul`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display : flex;
  flex-direction: column;
  gap : 16px;

  @media (max-width : 767px) {
    gap : 8px;
  }
`;

const EntireItem = styled.li`
  width: 100%;
  height: 200px;
  background-color: ${({ $darkmode }) => $darkmode ? '#cccccc' : '#fff'};
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  padding : 24px;

  display : flex;
  justify-content: center;
  gap : 24px;

  will-change: transform, box-shadow;
  transition: transform 0.5s, box-shadow 0.5s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5);
  }

  @media (max-width : 767px) {
    height: 96px;
    padding : 8px 4px;
  }
`;

const EntireItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const EntireImageBox = styled.div`
  flex : 0 0 25%;
  flex-grow: 1;
  height: 150px;

  border-radius: 4px;
  background-image: url(${({ $src }) => $src ? $src : ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width : 767px) {
    height: 88px;
  }
`;

const EntireTextBox = styled.div`
  flex : 0 0 65%;
  flex-grow: 2;
  height: 150px;

  margin-left : 16px;

  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;

  display : flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width : 767px) {
    height: 88px;
    margin-left: 8px;
  }
`;

const textStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  text-overflow: ellipsis;
  overflow: hidden;

  margin : 0 8px;
`;

const EntireTitle = styled.h1`
  ${textStyle};
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 24px;
  margin-top : 8px;

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 20px;
  }

  @media (max-width : 767px) {
    font-size : 0.9rem;
    -webkit-line-clamp: 2;
    margin : 4px;
  }
`;

const EntireContent = styled.p`
  ${textStyle};
  -webkit-line-clamp: 4;
  color : ${({ theme }) => theme.gray.gray600};
  font-size : 14px;
  margin-bottom : 8px;

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 12px;
  }

  @media (max-width : 767px) {
    font-size : 0.65rem;
    -webkit-line-clamp: 3;
    margin : 4px;
  }
`;

const EntirePageTitle = styled.h1`
  width: 100%;
  font-size : 28px;
  color : ${({ $darkmode, theme }) => $darkmode ? `#fff` : `${theme.blue.blue700}`};

  display : flex;
  align-items: center;

  gap : 8px;

  margin-bottom : 40px;
  
  img {
    width: 28px;
    height: 28px;
  }

  p {
    font-size : 16px;
    color : ${({ theme }) => theme.gray.gray600};
    margin-left : 16px;
  }

  @media (min-width: 768px) and (max-width : 1279px) {
    font-size : 24px;

    img {
      width : 24px;
      height : 24px;
    }

    p {
      font-size : 14px;
    }
  }

  @media (max-width : 767px) {
    font-size : 1rem;
    margin-bottom : 16px;

    img {
      width : 18px;
      height : 18px;
    }

    p {
      font-size : 0.65rem;
    }
  }
`;

function EntireArticles({ entireArticleArr, fetchNextPage, hasNextPage, allArticles, getManyArticleArray }) {
  const navigate = useNavigate();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { darkmode } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const query = searchParams.get("query") || "";

  const plainText = (html) => {
    if (!html) return;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  const clickByArticle = (id) => {
    const viewArticleArr = JSON.parse(localStorage.getItem("articles")) || [];

    if (!viewArticleArr.includes(id)) {
      viewArticleArr.unshift(id);
      if (viewArticleArr.length > 5) {
        viewArticleArr.pop();
      }
      localStorage.setItem("articles", JSON.stringify(viewArticleArr));
    }
    navigate(`/news-list/article/${id}`);
  }

  useEffect(() => {
    if (!query) return;
    if (allArticles.length === 0) return;

    const filterArr = allArticles.filter((item) =>
      item.articleTitle.toLowerCase().includes(query.toLowerCase())
    );

    if (filterArr.length === 0) {
      if (!toast.isActive('searched')) {
        toast.error(`${query}에 대한 검색결과가 없습니다.`, {
          position: 'top-center',
          toastId: 'searched',
          style: !isMobile ? {
            color: '#fff',
            fontSize: '13px',
            minHeight: '30px',
            width: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            fontWeight: 'bold'
          } : {
            fontWeight: 'bold',
            fontSize: '0.7rem',
            color: '#fff',
            background: 'rgba(0, 0, 0, 0.7)',
            minHeight: '20px',
            width: 'fit-content',
            marginBottom: '8px',
            borderRadius: '2px',
            marginTop: '8px'
          }
        });
      }
    }

    setFilteredArticles(filterArr);

  }, [query, allArticles, isMobile]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['page-articles'])
    }
  }, [queryClient])

  return (
    <MainContainer>
      <Container>
        <EntirePageTitle $darkmode={darkmode}>
          <img src={entireIcon} alt="articles" />
          전체기사
          {
            (query && filteredArticles.length !== 0) &&
            <p>"{query}"에 대한 검색결과</p>
          }
        </EntirePageTitle>
        <EntireContainer>
          <EntireLists>
            {
              (filteredArticles.length === 0) ?
                (
                  entireArticleArr.map((item) => {
                    const { articleId, articleTitle, articleContent, articleImageUrls } = item;
                    return (
                      <EntireItem $darkmode={darkmode} key={articleId} onClick={() => clickByArticle(articleId)}>
                        <EntireItems>
                          <EntireImageBox $src={JSON.parse(articleImageUrls)[0]} />
                          <EntireTextBox>
                            <EntireTitle>{articleTitle}</EntireTitle>
                            <EntireContent>{plainText(articleContent)}</EntireContent>
                          </EntireTextBox>
                        </EntireItems>
                      </EntireItem>
                    )
                  })
                )
                :
                (
                  filteredArticles.map((item) => {
                    const { articleId, articleTitle, articleContent, articleImageUrls } = item;
                    return (
                      <EntireItem key={articleId} onClick={() => clickByArticle(articleId)}>
                        <EntireItems>
                          <EntireImageBox $src={JSON.parse(articleImageUrls)[0]} />
                          <EntireTextBox>
                            <EntireTitle>{articleTitle}</EntireTitle>
                            <EntireContent>{plainText(articleContent)}</EntireContent>
                          </EntireTextBox>
                        </EntireItems>
                      </EntireItem>
                    )
                  })
                )
            }
          </EntireLists>
          {(filteredArticles.length === 0) && <ViewMoreBox
            $hasNextPage={hasNextPage}
            onClick={() => fetchNextPage()}
            style={isMobile ? { marginTop: "16px" } : { marginTop: "40px" }}>
            <span>View More</span>
          </ViewMoreBox>}
          <TopButton />
        </EntireContainer>
      </Container>
      <SideSticky entireArticleArr={getManyArticleArray} />
    </MainContainer>
  )
}


export default EntireArticles;