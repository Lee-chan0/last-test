import styled from "styled-components";

const ArticleDescriptionLists = styled.ul`
  width: 100%;
  height: 40px;
  padding : 0 24px;
  background-color: #fff;
  display : flex;
  align-items: center;

  input {
    flex-grow: 0;

    width: 16px;
    height: 16px;
  }
`;

const ArticleDescriptionItem = styled.li`
  display : flex;
  justify-content: center;

  &.number {
    flex-grow: 1;
  }

  &.title {
    flex-grow : 3;
  }

  &.author {
    flex-grow : 2;
  }
  &.date {
    flex-grow : 1;
  }

  &.confirm {
    flex-grow : 1;
  }
`;

function ArticleDescription() {
  return (
    <ArticleDescriptionLists>
      <input type='checkbox' id='check' />
      <ArticleDescriptionItem className='number'>번호</ArticleDescriptionItem>
      <ArticleDescriptionItem className='title'>제목</ArticleDescriptionItem>
      <ArticleDescriptionItem className='author'>글쓴이</ArticleDescriptionItem>
      <ArticleDescriptionItem className='date'>날짜</ArticleDescriptionItem>
      <ArticleDescriptionItem className='confirm'>확인</ArticleDescriptionItem>
    </ArticleDescriptionLists>
  )
}

export default ArticleDescription;