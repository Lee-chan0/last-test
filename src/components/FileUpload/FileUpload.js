import styled from "styled-components";
import addImageIcon from '../../assets/ri_image-add-fill.png';
import React, { useEffect } from "react";

const FileLibraryContainer = styled.div`
  width: 100%;
  border : 2px solid rgb(51, 118, 253);
  display: flex;
  flex-direction: column;
  gap : 4px;
  padding : 4px;
  border-radius: 2px;

  position : relative;
`;

const FileLibrayStyleBox = styled.div`
  border : 1px solid ${({ theme }) => theme.blue.blue500};
  height: 100%;
  padding : 8px;
  gap : 8px;
  display : grid;
  align-content: center;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 150px;

  border-radius: 2px;

  @media (min-width: 768px) and (max-width: 1279px) {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 140px;
  }
`;

const NoEditorImageBox = styled.div`
  flex : 0 0 15%;
  display : flex;
  align-items: center;
`;

const NoEditorInfo = styled.span`
    height: 20%;
    display: block;
    white-space: nowrap;
    text-align: center;
    background-color: ${({ theme }) => theme.blue.blue500};
    padding : 4px 16px;
    border-radius: 3px;
    font-size : 13px;
    font-weight: bold;
    color : ${({ theme }) => theme.gray.gray0};
    transition: background-color 0.3s;
    display : flex;
    align-items: center;
    justify-content: center;

    margin-top : 4px;

    &:hover {
      background-color: ${({ $isDelete, theme }) => $isDelete ? 'red' : theme.blue.blue700};
    }
`;

const NoEditorLabel = styled.label`
  width: 100%;
  height: 100%;
  display : flex;
  flex-direction: column;
  cursor: pointer;
`;

const NoEditorImageContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.gray.gray400};
`;

const NoEditorImage = styled.div`
  background-image: url(${({ $src, $noImg }) => $src ? $src : $noImg});
  background-repeat: no-repeat;
  background-size: ${({ $src }) => $src ? `cover` : `24px`};
  background-position: center;
  width: 100%;
  height: 100%;
  opacity: ${({ $src }) => $src ? `1` : `0.5`};
`;

const NoEditorImageInput = styled.input`
  display: none;
`;

const NoEditorImageDescription = styled.span`
  display : flex;
  width: 100px;
  font-size: 13px;
  justify-content: center;
  font-weight: bold;
  color : #fff;
  align-items: center;
  padding : 8px 16px;
  background-color: ${({ theme }) => theme.blue.blue500};
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);

  position : absolute;
  pointer-events: none;
  top : -10px;
  left: -10px;
`;

function FileUpload({ fileList, setFileList,
  isUpdate, articleInfo, setPrevFileLength }) {

  const uploadFile = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file.name);
    console.log(file.type);

    const preview = URL.createObjectURL(file);

    if (index === undefined) {
      setFileList((prev) => [...prev, { file: file, preview: preview, isNew: true }]);
    } else {
      setFileList((prev) => {
        const updateArr = [...prev].map((item, i) => {
          return i === index ? { file: file, preview: preview, isNew: true } : item;
        })
        return updateArr;
      })
    }

    e.target.vlaue = "";
  }

  const handleDelete = (e, index) => {
    const deleteFile = fileList.filter((_, i) => i !== index);
    setFileList(deleteFile);
  }

  useEffect(() => {
    return () => {
      fileList.forEach((item) => URL.revokeObjectURL(item.preview));
    }
  }, [fileList]);

  useEffect(() => {
    if (!isUpdate || !articleInfo) return;

    try {
      JSON.parse(articleInfo.articleImageUrls).forEach((item) => {
        setFileList((prev) => [...prev, { file: null, preview: item, isNew: false }])
      })
    } catch (e) {
      return;
    }

  }, [isUpdate, articleInfo, setFileList])

  useEffect(() => {
    if (!isUpdate) return;

    try {
      setPrevFileLength(JSON.parse(articleInfo.articleImageUrls).length);
    } catch (e) {
      return;
    }

  }, [isUpdate, setPrevFileLength, articleInfo.articleImageUrls]);

  return (
    <FileLibraryContainer>
      <NoEditorImageDescription>추가 이미지</NoEditorImageDescription>
      <FileLibrayStyleBox>
        {
          (fileList.length !== 0) &&
          fileList.map((item, index) => {
            const { preview } = item;
            return (
              <NoEditorImageBox key={index}>
                <NoEditorImageInput type="file" id={`file_${index}`} onChange={(e) => uploadFile(e, index)} />
                <NoEditorLabel htmlFor={`file_${index}`}>
                  <NoEditorImageContainer>
                    <NoEditorImage $src={preview} $noImg={addImageIcon} />
                  </NoEditorImageContainer>
                  <NoEditorInfo>파일 선택</NoEditorInfo>
                  <NoEditorInfo $isDelete={true} onClick={(e) => handleDelete(e, index)}>삭제</NoEditorInfo>
                </NoEditorLabel>
              </NoEditorImageBox>
            )
          })
        }
        <NoEditorImageBox>
          <NoEditorImageInput type="file" id={`file-${fileList.length}`} onChange={(e) => uploadFile(e)} />
          <NoEditorLabel htmlFor={`file-${fileList.length}`}>
            <NoEditorImageContainer>
              <NoEditorImage $noImg={addImageIcon} />
            </NoEditorImageContainer>
            <NoEditorInfo>파일 선택</NoEditorInfo>
          </NoEditorLabel>
        </NoEditorImageBox>
      </FileLibrayStyleBox>
    </FileLibraryContainer>
  )
}

export default FileUpload;