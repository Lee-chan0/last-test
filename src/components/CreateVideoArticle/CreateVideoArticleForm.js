import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { createArticle } from "../../utils/api";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.blue.blue100};

  & > strong {
    margin-bottom : 4px;
  }
`;

const VideoForm = styled.form`
  width: 80%;
  height: 90%;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap : 16px;
  border : 3px solid ${({ theme }) => theme.blue.blue500};
`;

const VideoLabel = styled.label`
  width: 100%;
  display : flex;
  align-items: center;
  justify-content: center;
  gap : 4px;

  & > .user-names {
    width: 50%;
  }
`;

const VideoLabelTitle = styled.span`
  font-weight: bold;
  width: 20%;
`;

const RadioContainer = styled.div`
  display : flex;
  width: 50%;
  justify-content: space-evenly;
`;

const RadioTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap : 4px;
`;

const VideoRadioTItle = styled.span`

`;

const VideoInput = styled.input`
  border : 1px solid cyan;
  box-shadow: 0px 0px 3px cyan;
  border-radius: 4px;
  width: 50%;
  padding: 4px 4px;
`;

const VideoRadioInput = styled.input`
`;

const SubmitBtn = styled.button`
  padding : 8px 16px;
  font-weight: bold;
  color : ${({ theme }) => theme.blue.blue100};
  background-color: ${({ theme }) => theme.blue.blue500};
  border-radius: 4px;
  width: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
  }
`;

const titleArr = ['제목'];

const INITIAL_ARTICLE_CONTENT = {
  articleTitle: "",
  articleSubTitle: "",
  articleContent: "",
  articleType: "",
  userNamePosition: "",
  categoryName: "",
}

function CreateVideoArticleForm({ categoriesArr, usersArr }) {
  const [articleContents, setArticleContents] = useState(INITIAL_ARTICLE_CONTENT);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const videoMutation = useMutation({
    mutationFn: (articleContents) => createArticle(articleContents),
    onSuccess: () => {
      setArticleContents(INITIAL_ARTICLE_CONTENT);
    }
  })

  const onChangeValues = (e) => {
    const domName = e.target.name;
    const domValue = e.target.value;

    setArticleContents((prev) => ({
      ...prev,
      articleType: query,
      [domName]: domValue
    }))
  }

  const submutVideoForm = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(articleContents).forEach((key) => {
      formData.append(key, articleContents[key]);
    });
    videoMutation.mutate(articleContents, {
      onSuccess: () => {
        alert("동영상등록이 완료되었습니다.");
        window.close();
      }
    });
  }

  console.log(articleContents);
  return (
    <Container>
      <strong>Youtube링크만 넣어주세요.</strong>
      <VideoForm onSubmit={submutVideoForm}>
        <VideoLabel>
          <VideoLabelTitle>카테고리</VideoLabelTitle>
          <RadioContainer>
            {
              categoriesArr.map((item) => {
                const { categoryName, categoryId } = item;
                return (
                  <RadioTitleContainer key={categoryId}>
                    <VideoRadioInput type="radio" name="categoryName" value={`${categoryName}`} onChange={onChangeValues} />
                    <VideoRadioTItle>{categoryName}</VideoRadioTItle>
                  </RadioTitleContainer>
                )
              })
            }
          </RadioContainer>
        </VideoLabel>
        <VideoLabel>
          <VideoLabelTitle>이름</VideoLabelTitle>
          <select name="userNamePosition" className="user-names" onChange={onChangeValues}>
            {
              usersArr.map((item) => {
                const { userId, userNamePosition } = item;
                return (
                  <option key={userId} value={`${userNamePosition}`}>{userNamePosition}</option>
                )
              })
            }
          </select>
        </VideoLabel>
        {
          titleArr.map((item, index) => {
            return (
              <VideoLabel key={index}>
                <VideoLabelTitle>{item}</VideoLabelTitle>
                <VideoInput type="text"
                  name={`articleTitle`}
                  value={articleContents.articleTitle}
                  onChange={onChangeValues}
                />
              </VideoLabel>
            )
          })
        }
        <VideoLabel className="url-input">
          <VideoLabelTitle>URL </VideoLabelTitle>
          <VideoInput type="url" required name="articleContent" value={articleContents.articleContent} onChange={onChangeValues} />
        </VideoLabel>
        <SubmitBtn type='submit'>등록</SubmitBtn>
      </VideoForm>
    </Container>
  )
}


export default CreateVideoArticleForm;