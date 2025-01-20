import styled from "styled-components";
import sectionLineIcon from '../../assets/ci_line-m.png';
import Board from "../Board/Board";


const CreateForm = styled.form`
  display : flex;
  justify-content: center;
  flex-direction: column;
  gap : 16px;
  padding : 0 24px;
  `;

const CreateLabel = styled.label`
  display : flex;
  align-items: center;
  gap : 16px;
  border-bottom : 2px solid ${({ theme }) => theme.gray.gray400};
  padding : 8px 0;
  font-weight: bold;
  height: 50px;

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
  border : 1px solid black;

  &:focus {
    border : none;
    outline: 2px solid ${({ theme }) => theme.blue.blue500};
  }
`;

const CreateSectionImage = styled.img`
  width: 24px;
  height: 24px;
`;

const formRadioObject = [
  {
    title: '기사 형태',
    options: ['일반', 'TOP']
  },
  {
    title: '카테고리',
    options: ['정치', '사회', '국제']
  }
]

const formTextObject = [
  {
    title: ['이름', '제목', '소제목']
  }
]

function CreateArticleForm() {
  return (
    <>
      <CreateForm>
        {
          formRadioObject.map((item, index) => (
            <CreateLabel key={index}>
              {item.title}
              <CreateSectionImage src={sectionLineIcon} alt="section" />
              {item.options.map((optItem, index) => (
                <div key={index}>
                  {optItem}
                  <CreateRadioInput type="radio" name={item.title} value={optItem} />
                </div>
              ))}
            </CreateLabel>
          ))
        }
        {
          formTextObject.map((item) => (
            item.title.map((text, index) => (
              <CreateLabel key={index}>
                {text}
                <CreateSectionImage src={sectionLineIcon} alt="section" />
                <CreateInput type="text" style={text === '이름' ? { width: '160px', padding: '4px 8px' } : { width: '50%' }}></CreateInput>
              </CreateLabel>
            ))
          ))
        }
      </CreateForm >
      <Board />
    </>
  )
}

export default CreateArticleForm;