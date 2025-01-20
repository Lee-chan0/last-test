import styled from "styled-components";
import addImageIcon from '../../assets/ri_image-add-fill.png';
import { useEffect, useState } from "react";

const UploadFileMainContainer = styled.div`
  width: 100%;
  display : flex;
  justify-content: center;
  gap : 16px;
  flex-wrap: wrap-reverse;
`;

const UploadFileForm = styled.form`
  width: 128px;
  display: flex;
  flex-direction: column;
  gap : 4px;
`;

const UploadFileLabel = styled.label`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue500};
  font-size : 14px;
  color : #fff;
  padding : 4px 8px;
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.blue.blue700};
    cursor: pointer;
  }
`;

const UploadFileInput = styled.input`
  display : none;
`;

const UploadFilePreviewImage = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  display : flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 128px;
  height: 80px;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  & > .add-image-icon {
    width: 24px;
    height: 24px;
    opacity: 0.5;
  }
`;

function FileUpload() {
  const [fileLists, setFileLists] = useState([]);

  const uploadFileChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const blobFile = URL.createObjectURL(file);

      index !== undefined ?
        setFileLists((prev) => {
          const updateFileLists = [...prev].map((item, idx) => (
            idx === index ? { file, preview: blobFile } : item
          ))
          return updateFileLists;
        }) : setFileLists((prev) => [...prev, { file, preview: blobFile }]);
    }
    e.target.value = "";
  }

  useEffect(() => {
    return () => {
      fileLists.forEach((item) => URL.revokeObjectURL(item.preview));
    }
  }, [fileLists]);


  return (
    <UploadFileMainContainer>
      {
        fileLists.map((item, index) => (
          <UploadFileForm key={index}>
            <UploadFileLabel htmlFor={`image-${index}`}>
              <UploadFileInput type="file" id={`image-${index}`} onChange={(e) => uploadFileChange(e, index)} />
              파일 선택
            </UploadFileLabel>
            <UploadFilePreviewImage>
              <img src={item.preview} alt={`img-${index}`} />
            </UploadFilePreviewImage>
          </UploadFileForm>
        ))
      }
      <UploadFileForm>
        <UploadFileLabel>
          <UploadFileInput type="file" onChange={(e) => uploadFileChange(e)} />
          파일 선택
        </UploadFileLabel>
        <UploadFilePreviewImage>
          <img src={addImageIcon} alt="add-image" className="add-image-icon" />
        </UploadFilePreviewImage>
      </UploadFileForm>
    </UploadFileMainContainer>
  )
}

export default FileUpload;