import styled from "styled-components";
import dropboxImage from "../../assets/formkit_down.png";
import { useRef, useState } from "react";

const DropDownContainer = styled.div`
  width: 100%;
`;

const DropDownOptions = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding : 0 24px;
  font-size : 18px;
  cursor: pointer;
  
  img {
    transition: transform 0.3s ease;
    transform: ${({ $activeItemIndex }) => $activeItemIndex ? 'rotate(180deg)' : 'rotate(0deg)'};
    padding : 0;
    width: 28px;
    height: 12px;
  }
`;

const DropDownOptionsLine = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.blue.blue500};
`;

const DropDownLists = styled.ul`
  width: 100%;
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  transition : height 0.3s ease;
`;

const DropDownItem = styled.li`
  width: 100%;
  height: 25px;
  font-size: 14px;
  display : flex;
  align-items: center;
  padding : 0 24px;
  border-bottom : 1px solid ${({ theme }) => theme.gray.gray400};
  background-color: #fff;

  &:hover {
    background-color: blanchedalmond;
    cursor: pointer;
  }
`;

const DropDownObject = [
  {
    title: '정치',
    options: ['정치 일반', '외교']
  },
  {
    title: '국제',
    options: ['일본', '일본 경제', '일본 정치']
  },
  {
    title: '사회',
    options: ['노동']
  }
]


function DropDown() {
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [heights, setHeights] = useState([]);
  const DropDownRef = useRef([]);

  const handleClick = (index) => {
    const newHeights = DropDownRef.current.map((item) => (item ? item.scrollHeight : 0));
    setActiveItemIndex((prev) => (prev === index ? null : index));
    setHeights(newHeights);
  };

  return (
    <DropDownContainer>
      {
        DropDownObject.map((item, index) => (
          <DropDownOptionsLine key={index}>
            <DropDownOptions onClick={() => handleClick(index)} $activeItemIndex={activeItemIndex === index ? true : false}>
              {item?.title}
              <img src={dropboxImage} alt="drop-image" />
            </DropDownOptions>
            <DropDownLists ref={(dom) => (DropDownRef.current[index] = dom)} $height={activeItemIndex === index ? heights[index] : 0} >
              {item?.options.map((objItem, index) => (
                <DropDownItem key={index}>{objItem}</DropDownItem>
              ))}
            </DropDownLists>
          </DropDownOptionsLine>
        ))
      }
    </DropDownContainer>
  );
}

export default DropDown;