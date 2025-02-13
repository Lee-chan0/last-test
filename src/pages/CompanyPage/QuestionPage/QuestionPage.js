import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import bgimg from '../../../assets/masaaki-komori-iczsntduUyI-unsplash.jpg';
import QuestionText from './QuestionText';

const MainContainer = styled.div`
  height: 100vh;
  overflow: hidden;

  position: relative;

  background-image: url(${bgimg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ScrollCover = styled.div`
  width: 100vw;

  background-color: transparent;
  margin-top : 40px;
  transform: rotate(-2deg);
  overflow: hidden;

  display : flex;
  align-items: center;
`;

const ScrollText = styled.p`
  font-size: 28px;
  font-weight: 600;
  margin : 16px 0;
  color : #E94351;
  white-space: nowrap;
  letter-spacing: 1px;
  will-change: transform;

  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

  font-family: 'Roboto Condensed';
`;

const ScrollCoverSecond = styled(ScrollCover)`
  position : absolute;
  bottom : 10%;
  display: flex;
  flex-direction: row-reverse;

  transform: rotate(2deg);
`;

const ScrollTextSecond = styled(ScrollText)`
  color : #F7A8AD;
`;

const MainContentContainer = styled.div`
  width: 100%;

  display : flex;
  justify-content: center;

  position: relative;
`;

const MainContentBox = styled.div`
  width: 800px;
  height: 400px;
  background-color: transparent;
  overflow: hidden;

  h2 {
    padding : 8px 16px;
    background-color: lightpink;
    box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.5) inset;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }


  p {
    line-height: 1.5;
    font-size : 13px;
  }
`;

const PageBtnBox = styled.div`
  display : flex;
  justify-content: center;
  gap : 24px;

  position: absolute;
  bottom : 0;
  left: 50%;

  z-index: 5;
`;

const PageBtn = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.gray.gray400};

  ${({ $index, $pageNum }) => ($index === $pageNum) && `background-color : red`};

  cursor: pointer;
`;

const firstLineArray = 'Live as if you were to die tomorrow Live as if you were to die tomorrow Live as if you were to die tomorrow'.split(' ');
const finalLineArray = 'Past is just past Past is just past Past is just past Past is just past Past is just past'.split(' ');

function QuestionPage() {
  const pTag1 = useRef(null);
  const pTag2 = useRef(null);
  const countRef = useRef(0);
  const countRef2 = useRef(0);
  const animationId = useRef(null);
  const [pageNum, setPageNum] = useState(1);

  const initText = (element, arr) => {
    if (!element) return;

    const doubledArray = [...arr, ...arr];

    for (let i = 0; i < doubledArray.length; i++) {
      element.innerText += `${doubledArray[i]}\u00a0\u00a0\u00a0\u00a0`;
    }
  };

  const moveToText = (count, element, direction) => {

    if (count >= element.scrollWidth / 2) {
      element.style.transform = `translateX(0)`;
      if (direction === -1) {
        countRef.current = 0;
      } else {

        countRef2.current = 0;
      }
    }
    element.style.transform = `translateX(${count * direction}px)`;
  }


  const addCount = () => {
    countRef.current++;
    countRef2.current++;

    moveToText(countRef.current, pTag1.current, -1);
    moveToText(countRef2.current, pTag2.current, 1);

    animationId.current = requestAnimationFrame(addCount);
  }

  const scroll = () => {
    countRef.current += 15;
    countRef2.current += 15;
  }

  const clickBtn = (idx) => {
    setPageNum(idx);
  }

  useEffect(() => {
    initText(pTag1.current, firstLineArray);
    initText(pTag2.current, finalLineArray);

    addCount();

    return () => {
      cancelAnimationFrame(animationId.current);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    }
  }, []);

  return (
    <MainContainer>
      <ScrollCover>
        <ScrollText ref={pTag1} />
      </ScrollCover>
      <MainContentContainer>
        <MainContentBox>
          <h2
            style={{ color: '#D12A38', width: "100%", display: "flex", justifyContent: "center", fontSize: "20px" }}>
            자주 묻는 질문 (FAQ)
          </h2><br />
          <QuestionText num={pageNum} />
          <PageBtnBox>
            <PageBtn onClick={() => clickBtn(1)} $index={1} $pageNum={pageNum} />
            <PageBtn onClick={() => clickBtn(2)} $index={2} $pageNum={pageNum} />
            <PageBtn onClick={() => clickBtn(3)} $index={3} $pageNum={pageNum} />
          </PageBtnBox>
        </MainContentBox>
      </MainContentContainer>
      <ScrollCoverSecond>
        <ScrollTextSecond ref={pTag2} />
      </ScrollCoverSecond>
    </MainContainer>
  )
}

export default QuestionPage;