import styled from "styled-components";
import addImageIcon from '../../assets/ri_image-add-fill.png';
import { useEffect } from "react";
import React from "react";

const FileMainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding : 0 24px;
  display: flex;
  gap : 8px;
  flex-wrap: wrap;
`;


const FileInput = styled.input`
  display : none;
`;

const FileUpdateBox = styled.div`
  width: 139px;
  height: 120px;
  display : flex;
  flex-direction: column;
  gap : 4px;
`;


const FileSelectBtn = styled.label`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue500};
  cursor: pointer;
  color : #fff;
  font-size : 14px;
  font-weight: bold;
  text-align: center;
  padding : 4px 4px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
  }
`;

const FilePreviewBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.gray.gray400};
  display : flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  & > .add-image {
    width: 24px;
    height: 24px;
    opacity: 0.5;
  }
`;

function FileUpload({ fileList, setFileList, isUpdate, articleInfo }) {

  const handleChangeFile = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    if (index === undefined) {
      setFileList((prev) => [...prev, { file, preview }]);
    } else {
      setFileList((prev) => prev.map((item, i) => index === i ? { file, preview } : item));
    }
    e.target.value = "";
  }

  useEffect(() => {
    return () => {
      fileList.forEach((item) => URL.revokeObjectURL(item.preview));
    }
  }, [fileList]);

  useEffect(() => {
    if (!isUpdate) return;

    if (articleInfo.articleImageUrls) {
      const files = JSON.parse(articleInfo.articleImageUrls);
      files.forEach((item) => setFileList((prev) => [...prev, { file: null, preview: item }]));
    }
  }, [isUpdate, setFileList, articleInfo]);

  return (
    <FileMainContainer>
      {
        fileList.map((item, index) => {
          const { preview } = item;
          return (
            <React.Fragment key={index}>
              <FileInput type="file" id={`file-${index}`} onChange={(e) => handleChangeFile(e, index)} />
              <FileUpdateBox>
                <FileSelectBtn htmlFor={`file-${index}`}>파일 선택</FileSelectBtn>
                <FilePreviewBox>
                  <img src={preview} alt="add-image" />
                </FilePreviewBox>
              </FileUpdateBox>
            </React.Fragment>
          )
        })
      }
      <FileInput type="file" id={`file-upload`} onChange={handleChangeFile} />
      <FileUpdateBox>
        <FileSelectBtn htmlFor={`file-upload`}>파일 선택</FileSelectBtn>
        <FilePreviewBox>
          <img src={addImageIcon} alt="add-image" className="add-image" />
        </FilePreviewBox>
      </FileUpdateBox>
    </FileMainContainer>
  )
}

export default FileUpload;