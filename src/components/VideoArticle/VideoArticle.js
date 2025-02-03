import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function VideoArticle({ videoArticleArr, videoArticleId }) {
  const { articleId, articleTitle, articleSubTitle, createdAt, User } = videoArticleArr;
  const { userNamePosition } = User;

  return (
    <Container>
    </Container>
  )
}

export default VideoArticle;