import styled, { css } from "styled-components";
import { getVideoId } from "../VideoNews/VideoBox";
import { useQuery } from "@tanstack/react-query";
import { getVideoArticles } from "../../utils/api";
import { useNavigate } from "react-router-dom";


const MainContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 8px;
  border : 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;

  margin-bottom : 16px;

`;

const MainTitle = styled.h2`
  color : ${({ theme }) => theme.blue.blue700};
  font-size : 13px;

  margin-bottom : 8px;
`;

const NewsLists = styled.ul`
  width: 100%;
  display : flex;
  flex-direction: column;
  gap : 8px;
`;

const NewsItems = styled.li`
  width: 100%;
  height: 64px;

  border-radius: 2px;
`;

const NewsCardContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.gray.gray0};
  padding : 4px;
  display : flex;
  justify-content: space-between;

  border-radius: 2px;
  border : 1px solid rgba(0, 0, 0, 0.2);
`;

const NewsCardImage = styled.div`
  flex : 0 0 30%;
  margin-right : 4px;
  background-image: url(${({ $src }) => $src ? $src : ''});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 2px;
`;

const NewsCardContentBox = styled.div`
  flex : 0 0 65%;
  margin-right : 4px;

  overflow: hidden;
`;

const textStyle = css`
  display : -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  text-overflow: ellipsis;
  overflow: hidden;
`;

const NewsCardTitle = styled.h2`
  ${({ $isVideo }) => !$isVideo && textStyle};
  font-size : 14px;
  color : ${({ theme }) => theme.blue.blue700};
  margin : 4px 0;
`;

const NewsCardContent = styled.p`
  ${textStyle};
  font-size : 11px;
  color : ${({ theme }) => theme.gray.gray600};

  -webkit-line-clamp: 2;
`;

function MobileTopNews({ topNewsArticlesArr }) {
  const navigate = useNavigate();
  const { data: findVideoArticles } = useQuery({
    queryKey: ['homevideo'],
    queryFn: () => getVideoArticles(),
  })
  const homeVideoArticleArr = findVideoArticles?.videoArticles || [];

  const plainText = (html) => {
    if (!html) return;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  const handleClickArticle = (id, articleType, content) => {
    articleType !== '동영상'
      ?
      navigate(`news-list/article/${id}`)
      :
      window.open(`${content}`);
  }

  return (
    <MainContainer>
      <Container>
        <MainTitle>{'TOP 뉴스'}</MainTitle>
        <NewsLists>
          {
            topNewsArticlesArr?.map((item) => {
              const { articleId, articleContent, articleTitle, articleImageUrls, articleType } = item;
              return (
                <NewsItems key={articleId} onClick={() => handleClickArticle(articleId, articleType)}>
                  <NewsCardContainer>
                    <NewsCardImage $src={JSON.parse(articleImageUrls)[0]} />
                    <NewsCardContentBox>
                      <NewsCardTitle>{articleTitle}</NewsCardTitle>
                      <NewsCardContent>{plainText(articleContent)}</NewsCardContent>
                    </NewsCardContentBox>
                  </NewsCardContainer>
                </NewsItems>
              )
            })
          }
        </NewsLists>
      </Container>
      <Container>
        <MainTitle>{'동영상'}</MainTitle>
        <NewsLists>
          {
            homeVideoArticleArr?.slice(0, 10).map((item) => {
              const { articleId, articleContent, articleTitle, articleType } = item;
              return (
                <NewsItems key={articleId} onClick={() => handleClickArticle(articleId, articleType, articleContent)}>
                  <NewsCardContainer>
                    <NewsCardImage $src={`https://img.youtube.com/vi/${getVideoId(articleContent)}/mqdefault.jpg`} />
                    <NewsCardContentBox>
                      <NewsCardTitle style={{ margin: '0' }} $isVideo={true}>{articleTitle}</NewsCardTitle>
                    </NewsCardContentBox>
                  </NewsCardContainer>
                </NewsItems>
              )
            })
          }
        </NewsLists>
      </Container>
    </MainContainer >
  )
}

export default MobileTopNews;