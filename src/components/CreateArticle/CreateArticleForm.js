import styled from "styled-components";
import sectionLineIcon from '../../assets/ci_line-m.png';
import Board from "../Board/Board";
import { queryClient } from "../../Main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createArticle, findUsers } from "../../utils/api";
import React, { useState } from "react";
import FileUpload from "../FileUpload/FileUpload";


const CreateForm = styled.form`
  display : flex;
  justify-content: center;
  flex-direction: column;
  gap : 16px;
  padding : 0 24px;
`;

const ButtonBox = styled.div`
  display : flex;
  justify-content: right;
  padding : 0 24px;
`;

const CreateArticleSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.blue.blue500};
  color : #fff;
  width: 80px;
  font-weight: bold;
  padding : 8px 4px;
  cursor: pointer;
  transition: background-color 0.5s;
  will-change: background-color;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
  }
`;

const CreateLabel = styled.label`
  display : flex;
  align-items: center;
  border-bottom : 2px solid ${({ theme }) => theme.gray.gray400};
  padding : 8px 0;
  font-weight: bold;
  height: 50px;
  gap : 16px;

  img {
  }

  div {
    display: flex;
    align-items: center;
    font-weight: normal;
    gap : 4px;
  }
`;

const CreateRadioInput = styled.input`
`;

const CreateInput = styled.input`
  border-radius: 4px;
  width: ${({ $name }) => $name === '이름' ? `30%` : `70%`};

  &:focus {
    border : none;
    outline: 2px solid ${({ theme }) => theme.blue.blue500};
  }
`;

const CreateSectionImage = styled.img`
  width: 24px;
  height: 24px;
`;

const TypeTextBox = styled.div`
  display: flex;
  gap : 4px;
`;

const TypeText = styled.span`
  font-weight: normal;
  font-size : 14px;
`;

const formTextTitle = ['기사 형태', '카테고리', '이름', '제목', '소제목'];

const INITIAL_ARTICLE_CONTENT = {
  articleTitle: "",
  articleSubTitle: "",
  articleContent: "",
  articleType: "",
  userNamePosition: "",
  categoryName: "",
}

function CreateArticleForm() {
  const [articleValues, setArticleValues] = useState(INITIAL_ARTICLE_CONTENT);
  const [fileList, setFileList] = useState([]);
  const createArticleMutation = useMutation({
    mutationFn: (articleInfo) => createArticle(articleInfo),
    onSuccess: () => {
      setArticleValues(INITIAL_ARTICLE_CONTENT);
    }
  })
  const { data: usersInfo } = useQuery({
    queryKey: ['users'],
    queryFn: findUsers
  });

  const handleChangeValue = (e) => {
    const domName = e.target.name;
    const domValue = e.target.value;

    setArticleValues((prev) => ({
      ...prev,
      [domName]: domValue,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    fileList.forEach((item) => {
      formData.append("files", item.file);
    });

    Object.keys(articleValues).forEach((key) => {
      formData.append(key, articleValues[key]);
    });

    createArticleMutation.mutate(formData);
  }

  return (
    <>
      <CreateForm onSubmit={handleSubmit}>
        {
          formTextTitle.map((labelText, index) => {
            return (
              <CreateLabel key={index}>
                {labelText}
                <CreateSectionImage src={sectionLineIcon} alt="sections" />
                {
                  (labelText === '기사 형태') &&
                  <>
                    <TypeTextBox>
                      <TypeText>일반</TypeText>
                      <CreateRadioInput type='radio' name="articleType" value={'일반'} onChange={handleChangeValue} />
                    </TypeTextBox>
                    <TypeTextBox>
                      <TypeText>TOP</TypeText>
                      <CreateRadioInput type='radio' name="articleType" value={'TOP'} onChange={handleChangeValue} />
                    </TypeTextBox>
                  </>
                }
                {
                  (labelText === '카테고리') &&
                  <>
                    <TypeTextBox>
                      <TypeText>정치</TypeText>
                      <CreateRadioInput type='radio' name="categoryName" value={'정치'} onChange={handleChangeValue} />
                    </TypeTextBox>
                    <TypeTextBox>
                      <TypeText>사회</TypeText>
                      <CreateRadioInput type='radio' name="categoryName" value={'사회'} onChange={handleChangeValue} />
                    </TypeTextBox>
                    <TypeTextBox>
                      <TypeText>국제</TypeText>
                      <CreateRadioInput type='radio' name="categoryName" value={'국제'} onChange={handleChangeValue} />
                    </TypeTextBox>
                  </>
                }
                {
                  (labelText === '이름') &&
                  <>
                    <select name="userNamePosition" onChange={handleChangeValue}>
                      {usersInfo?.users.map((item) => {
                        const { userId, userNamePosition } = item;
                        return (
                          <option
                            key={userId}
                            value={userNamePosition}
                          >
                            {userNamePosition}
                          </option>
                        )
                      })}
                    </select>
                  </>
                }
                {
                  (labelText === '제목') &&
                  <>
                    <CreateInput name="articleTitle" value={articleValues.articleTitle} onChange={handleChangeValue} />
                  </>
                }
                {
                  (labelText === '소제목') &&
                  <>
                    <CreateInput name="articleSubTitle" value={articleValues.articleSubTitle} onChange={handleChangeValue} />
                  </>
                }
              </CreateLabel>
            )
          })
        }
        <Board articleValues={articleValues} setArticleValues={setArticleValues} />
        <FileUpload fileList={fileList} setFileList={setFileList} />
        <ButtonBox>
          <CreateArticleSubmitButton type='submit'>업로드</CreateArticleSubmitButton>
        </ButtonBox>
      </CreateForm >
    </>
  )
}

export default CreateArticleForm;