import styled from "styled-components";
import sectionLineIcon from '../../assets/ci_line-m.png';
import Board from "../Board/Board";
import React, { useEffect, useMemo, useState } from "react";
import FileUpload from "../FileUpload/FileUpload";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFindUser } from "../../hooks/User/useFindUser";
import { useCreateArticle } from "../../hooks/Article/useCreateArticle";
import { useFindArticle } from "../../hooks/Article/useFindArticle";
import { useUpdateArticle } from "../../hooks/Article/useUpdateArticle";
import { useDeleteArticle } from "../../hooks/Article/useDeleteArticle";
import { toast } from "react-toastify";

const InputContetImageContainer = styled.div`
  display : flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Description = styled.span`
  font-size : 0.8rem;
  color: ${({ theme }) => theme.gray.gray600};
`;

const InputFile = styled.label`
  width: 200px;
  height: 32px;
  background-color: ${({ theme }) => theme.blue.blue500};
  border-radius: 4px;
  color : ${({ theme }) => theme.gray.gray0};
  font-size : 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
  display : flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.4) inset;
  }
`;


const InputContentImageInput = styled.input`
  display : none;
`;

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

  ${({ $articleType }) => ($articleType === '동영상') && `cursor : pointer; color : blue;`}
`;

const formTextTitle = ['기사 형태', '카테고리', '이름', '제목', '소제목'];

const INITIAL_ARTICLE_CONTENT = {
  articleTitle: "",
  articleSubTitle: "",
  articleContent: "",
  articleType: "",
  categoryName: "",
}

function CreateArticleForm({ isUpdate }) {
  const [articleValues, setArticleValues] = useState(INITIAL_ARTICLE_CONTENT);
  const [fileList, setFileList] = useState([]);
  const [insideFileList, setInsideFileList] = useState([]);
  const [articleIdState, setArticleIdState] = useState(null);
  const [prevFileLength, setPrevFileLength] = useState(null);

  const createArticleMutation = useCreateArticle();
  const updateArticleMutation = useUpdateArticle(articleIdState);
  const deleteArticleMutation = useDeleteArticle();
  const { data: userInformation } = useFindUser();
  const { data: findArticle } = useFindArticle(articleIdState);

  const [articleParam] = useSearchParams();
  const navigate = useNavigate();

  const myInfo = userInformation?.userInfo || {};
  const articleInfo = useMemo(() => {
    return findArticle?.article || {};
  }, [findArticle])

  const handleChangeVideo = (articleType) => {

    const newWindow = window.open(
      `/truescope-administrator/video-editor?query=${encodeURIComponent(articleType)}`,
      "videoEditorWindow",
      "width=540, height=400"
    );

    if (!newWindow) {
      alert("팝업이 차단되었습니다. 브라우저 설정을 확인하세요.");
    }
  }

  const handleChangeValue = (e) => {
    const domName = e.target.name;
    const domValue = e.target.value;

    setArticleValues((prev) => ({
      ...prev,
      [domName]: domValue,
    }))
  }

  const handleSubmit = (e) => {

    if (!isUpdate) {
      e.preventDefault();
      const formData = new FormData();

      if (fileList.length === 0) {
        toast.error('추가 이미지는 필수 항목입니다.');
        return;
      }

      fileList.forEach((item) => {
        if (item.file) {
          formData.append("files", item.file);
        }
      });

      Object.keys(articleValues).forEach((key) => {
        formData.append(key, articleValues[key]);
      });

      createArticleMutation.mutate(formData, {
        onSuccess: () => {
          setArticleValues(INITIAL_ARTICLE_CONTENT);
          navigate('/truescope-administrator/editor-page', { replace: true });
        }
      });
    } else if (isUpdate) {
      e.preventDefault();
      const formData = new FormData();

      if (fileList.length === 0) {
        toast.error('추가 이미지는 필수 항목입니다.');
        return;
      }

      fileList.forEach((item, idx) => {
        if (item.isNew) {
          if (idx < prevFileLength) {
            formData.append("updateFiles", item.file);
            formData.append("changeIndex", idx);
          } else {
            formData.append("updateFiles", item.file);
          }
        }
      })

      Object.keys(articleValues).forEach((key) => {
        formData.append(key, articleValues[key]);
      });

      updateArticleMutation.mutate(formData, {
        onSuccess: () => {
          setArticleValues(INITIAL_ARTICLE_CONTENT);
          navigate('/truescope-administrator/editor-page', { replace: true });
        },
        onError: (e) => {
          console.log(e);
        }
      })
    }
  }

  const handleDelete = () => {
    deleteArticleMutation.mutate(articleIdState);
    navigate('/truescope-administrator/editor-page', { replace: true });
  }

  useEffect(() => {
    if (!isUpdate) return;
    const query = articleParam.get("article");
    setArticleIdState(query);

  }, [isUpdate, articleParam]);

  useEffect(() => {
    if (!isUpdate) return;

    setArticleValues({
      articleTitle: articleInfo.articleTitle || '',
      articleSubTitle: articleInfo.articleSubTitle || '',
      articleContent: articleInfo.articleContent || '',
      articleType: articleInfo.articleType || '',
      categoryName: articleInfo.Category?.categoryName || '',
    })
  }, [articleInfo, isUpdate]);



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
                      <CreateRadioInput
                        type='radio' name="articleType" value={'일반'} onChange={handleChangeValue}
                        checked={(isUpdate && articleValues.articleType === '일반')}
                      />
                    </TypeTextBox>
                    <TypeTextBox>
                      <TypeText>TOP</TypeText>
                      <CreateRadioInput
                        type='radio' name="articleType" value={'TOP'} onChange={handleChangeValue}
                        checked={(isUpdate && articleValues.articleType === 'TOP')}
                      />
                    </TypeTextBox>
                    <TypeTextBox>
                      <TypeText $articleType="동영상" onClick={() => handleChangeVideo('동영상')}>동영상</TypeText>
                    </TypeTextBox>
                  </>
                }
                {
                  (labelText === '카테고리') &&
                  <>
                    <TypeTextBox>
                      <TypeText>정치</TypeText>
                      <CreateRadioInput
                        type='radio' name="categoryName" value={'정치'} onChange={handleChangeValue}
                        checked={(isUpdate &&
                          articleValues.categoryName === '정치')}
                      />
                    </TypeTextBox>
                    <TypeTextBox>
                      <TypeText>사회</TypeText>
                      <CreateRadioInput
                        type='radio' name="categoryName" value={'사회'} onChange={handleChangeValue}
                        checked={(isUpdate &&
                          articleValues.categoryName === '사회')}
                      />
                    </TypeTextBox>
                    <TypeTextBox>
                      <TypeText>국제</TypeText>
                      <CreateRadioInput
                        type='radio' name="categoryName" value={'국제'} onChange={handleChangeValue}
                        checked={(isUpdate &&
                          articleValues.categoryName === '국제')}
                      />
                    </TypeTextBox>
                  </>
                }
                {
                  (labelText === '이름') &&
                  <>
                    <span style=
                      {{ fontSize: '14px', color: "blue", cursor: "text" }}
                    >
                      {myInfo?.userNamePosition}
                    </span>
                  </>
                }
                {
                  (labelText === '제목') &&
                  <>
                    <CreateInput name="articleTitle"
                      value={articleValues.articleTitle}
                      onChange={handleChangeValue} />
                  </>
                }
                {
                  (labelText === '소제목') &&
                  <>
                    <CreateInput name="articleSubTitle"
                      value={articleValues.articleSubTitle}
                      onChange={handleChangeValue} />
                  </>
                }
              </CreateLabel>
            )
          })
        }
        <Board articleValues={articleValues} setArticleValues={setArticleValues} isUpdate={isUpdate} />
        <InputContetImageContainer>
          <Description>'추가 이미지'의 첫번째 사진은 기사의 메인배너 이미지로 들어갑니다.</Description>
          <InputFile>
            <InputContentImageInput type="file" />
            <span>본문에 이미지 삽입</span>
          </InputFile>
        </InputContetImageContainer>
        <FileUpload
          fileList={fileList} setFileList={setFileList}
          isUpdate={isUpdate}
          articleInfo={articleInfo}
          prevFileLength={prevFileLength}
          setPrevFileLength={setPrevFileLength}
        />
        <ButtonBox>
          <CreateArticleSubmitButton type='submit'>{!isUpdate ? '업로드' : '수정'}</CreateArticleSubmitButton>
          {isUpdate &&
            <CreateArticleSubmitButton
              type='button'
              onClick={handleDelete}
              style={{ marginLeft: "8px" }}
            >삭제</CreateArticleSubmitButton>
          }
        </ButtonBox>
      </CreateForm >
    </>
  )
}

export default CreateArticleForm;