import styled from "styled-components";
import { getVideoId } from "../VideoNews/VideoBox";
import videoIcon from '../../assets/ri_video-line222.png';
import SideSticky from "../SideSticky/SideSticky";
import noImage from '../../assets/thumnailEx.jpg';
import { SearchInput } from "../SearchInput/SearchInputStyle";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ViewMoreBox } from '../ViewMore/ViewMoreStyle';

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
  }

  img {
    width: 32px;
    height: 32px;
  }
`;

const PageTitle = styled.h1`
  font-size : 28px;
  color : ${({ theme }) => theme.blue.blue700};
`;

const VideosContainer = styled.div`
  width: 100%;
  height: 100%;
  display : grid;
  padding : 16px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px;
  gap : 16px;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;

  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  margin: 40px 0;
`;

const VideosCard = styled.div`
  width: 100%;
  height: 150px;
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
`;


function VideoArticleList({ videoArticlesArr }) {
  const [searchContent, setSearchContent] = useState("");
  const [searchText] = useSearchParams();
  const navigate = useNavigate();
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [lastSearchText, setLastSearchText] = useState("");
  const word = searchText.get("searchword") || "";

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchContent.trim() === "") {
        alert("검색어를 입력해주세요.");
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
    window.open(url);
  }

  useEffect(() => {
    if (!word) return;

    const filterArticles = videoArticlesArr.filter((article) => {
      return article.articleTitle.toLowerCase().includes(word.toLowerCase());
    })

    if (filterArticles.length === 0) {
      alert(`${word}에 대한 검색결과가 없습니다.`);
      setSearchedArticles([]);
      setSearchContent("");
      navigate(`/news-list/video/video-articles`, { replace: true });
    } else {
      setSearchedArticles(filterArticles);
      setLastSearchText(word);
    }

  }, [videoArticlesArr, searchText, navigate, word]);

  return (
    <MainContainer>
      <Container>
        <PageTitleBox>
          <img src={videoIcon} alt="video-icon" />
          <PageTitle>동영상</PageTitle>
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
        <ViewMoreBox style={{ marginBottom: "40px" }}><span>View More</span></ViewMoreBox>
      </Container>
      <SideSticky entireArticleArr={videoArticlesArr} isVideo={true} />
    </MainContainer>
  )
}

export default VideoArticleList;