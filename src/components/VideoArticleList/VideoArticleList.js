import styled from "styled-components";
import { getVideoId } from "../VideoNews/VideoBox";
import videoIcon from '../../assets/ri_video-line222.png';
import SideSticky from "../SideSticky/SideSticky";
import { useNavigate } from "react-router-dom";

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
  grid-template-rows : repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
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
  background-image: url(${({ $src }) => $src ? $src : ""});
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
  overflow: hidden;
  text-overflow: ellipsis;
  font-size : 13px;
  font-weight: bold;
  color : ${({ theme }) => theme.blue.blue700};
`;

function VideoArticleList({ videoArticlesArr }) {
  const navigate = useNavigate();

  const handleClickArticle = (id) => {
    const viewArticleArray = JSON.parse(localStorage.getItem("video-articles")) || [];

    if (!viewArticleArray.includes(id)) {
      viewArticleArray.unshift(id);

      if (viewArticleArray.length > 5) {
        viewArticleArray.pop();
      }

      localStorage.setItem("video-articles", JSON.stringify(viewArticleArray));
    }

    navigate(`/news-list/video/video-articles/${id}`);
  }

  return (
    <MainContainer>
      <Container>
        <PageTitleBox>
          <img src={videoIcon} alt="video-icon" />
          <PageTitle>동영상</PageTitle>
        </PageTitleBox>
        <VideosContainer>
          {
            videoArticlesArr.map((item) => {
              const { articleId, articleTitle, articleContent } = item;
              return (
                <VideosCard key={articleId} onClick={() => handleClickArticle(articleId)}>
                  <VideoImgBox $src={`https://img.youtube.com/vi/${getVideoId(articleContent)}/sddefault.jpg`} />
                  <VideoTitleBox>
                    <VideoTitle>{articleTitle}</VideoTitle>
                  </VideoTitleBox>
                </VideosCard>
              )
            })
          }
        </VideosContainer>
      </Container>
      <SideSticky entireArticleArr={videoArticlesArr} isVideo={true} />
    </MainContainer>
  )
}

export default VideoArticleList;