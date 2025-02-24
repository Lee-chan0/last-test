import styled from "styled-components";
import { getVideoId } from "../VideoNews/VideoBox";
import videoIcon from '../../assets/ri_video-line222.png';
import SideSticky from "../SideSticky/SideSticky";
import noImage from '../../assets/thumnailEx.jpg';
import { SearchInput } from "../SearchInput/SearchInputStyle";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ViewMoreBox } from '../ViewMore/ViewMoreStyle';
import { useQueryClient } from "@tanstack/react-query";
import { useGetVideoArticles } from "../../hooks/Article/useGetVideoArticles";
import { useTheme } from "../../Contexts/ThemeContext";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

const MainContainer = styled.div`
  display : flex;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const PageTitleBox = styled.div`
  width: 100%;
  display : flex;
  align-items: center;
  gap : 4px;

  position: relative;

  & > .searched-description {
    color : ${({ theme }) => theme.gray.gray600};
    margin-left : 16px;
    font-weight: bold;

    @media (max-width : 767px) {
      font-size : 0.65rem;
      margin : 0;
    }
  }

  img {
    width: 32px;
    height: 32px;

    @media (min-width: 768px) and (max-width: 1279px) {
      width: 28px;
      height: 28px;
  }

    @media (max-width : 767px) {
      width: 20px;
      height: 20px;
    }
  }
`;

const PageTitle = styled.h1`
  font-size : 28px;
  color : ${({ $darkmode, theme }) => $darkmode ? `#fff` : `${theme.blue.blue700}`};

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 24px;
  }

  @media (max-width : 767px) {
    font-size : 1rem;
  }
`;

const VideosContainer = styled.div`
  width: 100%;
  height: 100%;
  display : grid;
  padding : 16px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap : 16px;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;

  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  margin: 40px 0;

  @media (max-width : 767px) {
    margin : 16px 0;
    padding : 8px;
    grid-template-columns: 1fr;
    gap : 8px;
  }
`;

const VideosCard = styled.div`
  width: 100%;
  height: 100%;
  display : flex;
  flex-direction: column;
  gap : 8px;
  background-color: ${({ theme }) => theme.gray.gray100};
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  overflow: hidden;
  will-change: box-shadow, transform;
  transition: box-shadow 0.3s, transform 0.3s;
  
  padding : 8px;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5);
    transform : scale(1.02);
  }

  @media (max-width : 767px) {

    border : 1px solid rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: none;
      transform: scale(1);
    }
  }
`;

const VideoImgBox = styled.div`
  flex : 0 0 75%;
  flex-grow: 2;
  border-radius: 4px;
  background-image: url(${({ $src, $noimage }) => $src ? $src : $noimage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const VideoTitleBox = styled.div`
  height: 30px;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3) inset;
  display : flex;
  align-items: center;
  padding : 0 8px;
`;

const VideoTitle = styled.span`
  width: 100%;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  font-size : 13px;
  font-weight: bold;
  color : ${({ theme }) => theme.blue.blue700};
`;

const VideoSearchInput = styled(SearchInput)`
  border : 2px solid rgba(81, 135, 244, 0.5);
  height: 100%;
  padding : 8px 12px;
  position : absolute;
  right : 0;

  @media (max-width : 767px) {
    width: 152px;
    height: 16px;
    background-size: 16px;
    font-size : 0.7rem;
  }
`;


function VideoArticleList({ videoArticlesArr, fetchNextPage, hasNextPage }) {
  const [searchContent, setSearchContent] = useState("");
  const [searchText] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: allVideos } = useGetVideoArticles();
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [lastSearchText, setLastSearchText] = useState("");
  const [recentVideo, setRecentVideo] = useState(false);
  const word = searchText.get("searchword") || "";
  const { darkmode } = useTheme();
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchContent.trim() === "") {
        if (!toast.isActive('hasText')) {
          toast('검색어를 입력해주세요.', {
            position: 'top-center',
            toastId: 'hasText',
            style: {
              position: 'relative',
              top: '12px',
              minHeight: '24px',
              padding: '8px 16px',
              fontSize: '0.7rem',
              background: `rgba(0, 0, 0, 0.8)`,
              color: `#fff`,
              borderRadius: `3px`,
              width: 'fit-content',
              whiteSpace: 'nowrap',
              marginBottom: '8px',
              fontWeight: 'bold'
            }
          });
        }
        return;
      }
      navigate(`?searchword=${encodeURIComponent(searchContent)}`, { replace: true });
      setSearchContent("");
    }
  }

  const handleClickArticle = (id, url) => {
    const viewArticleArray = JSON.parse(localStorage.getItem("video-articles")) || [];

    if (!viewArticleArray.includes(id)) {
      viewArticleArray.unshift(id);

      if (viewArticleArray.length > 5) {
        viewArticleArray.pop();
      }

      localStorage.setItem("video-articles", JSON.stringify(viewArticleArray));
    }
    setRecentVideo((prev) => !prev);
    window.open(url);
  }

  useEffect(() => {
    if (!word) return;

    const filterArticles = allVideos?.videoArticles.filter((item) => (
      item.articleTitle.toLowerCase().includes(word.toLowerCase())
    ))

    if (filterArticles) {
      if (filterArticles.length === 0) {
        if (!toast.isActive('searching')) {
          toast(`${word}에 대한 검색결과가 없습니다.`, {
            toastId: 'searching',
            position: 'top-center'
            , style: {
              position: 'relative',
              top: '12px',
              minHeight: '24px',
              padding: '8px 16px',
              fontSize: '0.7rem',
              background: `rgba(0, 0, 0, 0.8)`,
              color: `#fff`,
              borderRadius: `3px`,
              width: 'fit-content',
              whiteSpace: 'nowrap',
              marginBottom: '8px',
              fontWeight: 'bold'
            }
          });
        }
        setSearchedArticles([]);
        setSearchContent("");
        navigate(`/news-list/video/video-articles`, { replace: true });
      } else {
        setSearchedArticles(filterArticles);
        setLastSearchText(word);
      }
    }


  }, [allVideos, searchText, navigate, word]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['page-video-articles'])
    }
  }, [queryClient]);

  return (
    <MainContainer>
      <Container>
        <PageTitleBox>
          <img src={videoIcon} alt="video-icon" />
          <PageTitle $darkmode={darkmode}>동영상</PageTitle>
          {searchedArticles.length !== 0 &&
            <p className="searched-description">"{lastSearchText}"에 대한 검색결과</p>
          }
          <VideoSearchInput
            type="text"
            value={searchContent}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchContent(e.target.value)}
          />
        </PageTitleBox>
        <VideosContainer>
          {
            (searchedArticles.length === 0) ?
              (
                videoArticlesArr.map((item) => {
                  const { articleId, articleTitle, articleContent } = item;
                  return (
                    <VideosCard key={articleId} onClick={() => handleClickArticle(articleId, articleContent)}>
                      <VideoImgBox $noimage={noImage} $src={`https://img.youtube.com/vi/${getVideoId(articleContent)}/sddefault.jpg`} />
                      <VideoTitleBox>
                        <VideoTitle>{articleTitle}</VideoTitle>
                      </VideoTitleBox>
                    </VideosCard>
                  )
                })
              )
              :
              (
                searchedArticles.map((item) => {
                  const { articleId, articleTitle, articleContent } = item;
                  return (
                    <VideosCard key={articleId} onClick={() => handleClickArticle(articleId, articleContent)}>
                      <VideoImgBox $noimage={noImage} $src={`https://img.youtube.com/vi/${getVideoId(articleContent)}/sddefault.jpg`} />
                      <VideoTitleBox>
                        <VideoTitle>{articleTitle}</VideoTitle>
                      </VideoTitleBox>
                    </VideosCard>
                  )
                })
              )
          }
        </VideosContainer>
        <ViewMoreBox
          $hasNextPage={hasNextPage}
          onClick={fetchNextPage}
          style={{ marginBottom: "40px" }}>
          <span>View More</span>
        </ViewMoreBox>
      </Container>
      <SideSticky entireArticleArr={allVideos?.videoArticles} isVideo={true} recentVideo={recentVideo} isTablet={isTablet} />
    </MainContainer>
  )
}

export default VideoArticleList;