import styled from "styled-components";
import addImageIcon from '../../assets/ri_image-add-fill.png';
import { useEffect, useState } from "react";

const UploadFileMainContainer = styled.div`
  width: 100%;
  display : flex;
  gap : 16px;
  flex-wrap: wrap;
`;

const UploadFileForm = styled.form`
  width: 120px;
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
  width: 120px;
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

  // 오늘 배운것 : 
  // URL.revoke어쩌고 하면 메모리 누수를 방지할 수 있다.
  // onChnage는 인풋태그에 해야한다.
  // 파일업로드시, 업로드 로직이 다 끝나고 나면, e.target.value = ""와 같이 초기화 해주어야 
  // 브라우저가 같은값이 들어와도 다른값이라고 인식하고 onChange이벤트를 트리거한다.

  // 1. URL.revoke어쩌고 해결
  // 2. 파일 업데이트 및 파일 업로드 코드 리팩토링
  // 3. 사이드 네브바 fixed안먹히는듯 수정


  const uploadFileChange = (e, index) => {
    const file = e.target.files[0];
    console.log(index);

    if (file) {
      const blobFile = URL.createObjectURL(file);
      if (index !== undefined) {
        setFileLists((prev) => {
          const updateFileLists = [...prev];
          const result = updateFileLists.map((item, idx) => (
            idx === index ? { file, preview: blobFile } : item
          ))
          return result;
        })
      } else {
        setFileLists((prev) => [...prev, { file, preview: blobFile }])
      }
    }
    e.target.value = "";
  }

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