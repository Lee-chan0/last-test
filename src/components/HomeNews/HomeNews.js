import styled from "styled-components";
import { imageArr } from "../TodayNewsBanner/TodayNewsBanner";
import ArrowButton from "../ArrowButton/ArrowButton";
import { useRef } from "react";

const HomeNewsMainContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;
  padding : 24px 40px;
  position : relative;
`;

const HomeNewsTitle = styled.span`
  color : ${({ theme }) => theme.blue.blue700};
  font-weight: bold;
  font-size : 20px;
`;

const HomeNewsLists = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  gap : 16px;
  padding : 4px;
  margin-top : 24px;
  overflow: hidden;
`;

const HomeNewsItems = styled.li`
  width: 20%;
  border-radius: 4px;
  margin : 4px 0;
  background-color: #ffffff;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.gray.gray100};
    cursor: pointer;
    transform: scale(1.03);
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4); /* 그림자 강조 */
  }

  img {
    width: 160px;
    height: 104px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
`;

const HomeNewsDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding : 4px 8px;
  justify-content: center;
  gap: 4px;
  height: 80px;


  & > .news-title {
    font-weight: bold;
    color : ${({ theme }) => theme.blue.blue700}
  }

  & > .news-content {
    font-size: 14px;
    color : ${({ theme }) => theme.gray.gray600};

    /* 텍스트 잘림 및 ellipsis 설정 */
    display: -webkit-box;      
    -webkit-line-clamp: 2;     
    -webkit-box-orient: vertical;
    overflow: hidden;            
    text-overflow: ellipsis;     
  }
`;

function HomeNews() {
  const arrowRef = useRef(null);



  const clickByArrow = (direction) => {
    // 방향키로 클릭했을 때 동작하는 함수. 'direction'은 'left' 또는 'right' 값을 가짐.
    if (!arrowRef.current) return; // arrowRef가 현재 존재하지 않으면 함수 실행을 중단.

    const container = arrowRef.current; // arrowRef를 통해 참조한 스크롤 가능한 ul 컨테이너를 가져옴.

    // 현재 스크롤 위치 및 최대 스크롤 가능 위치 계산
    const currentScroll = container.scrollLeft; // 현재 스크롤된 왼쪽 픽셀 수.
    const maxScroll = container.scrollWidth - container.offsetWidth;
    // 스크롤 가능한 최대 위치 (전체 스크롤 너비 - 화면에 보이는 너비).

    if (direction === 'left') { // 사용자가 왼쪽 화살표 버튼을 클릭한 경우.
      if (currentScroll <= 0) { // 현재 스크롤 위치가 가장 왼쪽일 때.
        // 첫 번째 위치에서 맨 끝으로 스크롤 이동.
        container.scrollTo({
          left: maxScroll, // 스크롤 위치를 가장 오른쪽으로 설정.
          behavior: "smooth", // 부드럽게 스크롤 이동.
        });
      } else { // 첫 번째 위치가 아닌 경우.
        // 왼쪽으로 400픽셀만큼 스크롤 이동.
        container.scrollBy({
          left: -400, // 현재 위치에서 왼쪽으로 400픽셀 이동.
          behavior: "smooth", // 부드럽게 스크롤 이동.
        });
      }
    } else if (direction === 'right') { // 사용자가 오른쪽 화살표 버튼을 클릭한 경우.
      if (currentScroll >= maxScroll) { // 현재 스크롤 위치가 가장 오른쪽일 때.
        // 마지막 위치에서 첫 번째 위치로 스크롤 이동.
        container.scrollTo({
          left: 0, // 스크롤 위치를 가장 왼쪽으로 설정.
          behavior: "smooth", // 부드럽게 스크롤 이동.
        });
      } else { // 마지막 위치가 아닌 경우.
        // 오른쪽으로 400픽셀만큼 스크롤 이동.
        container.scrollBy({
          left: 400, // 현재 위치에서 오른쪽으로 400픽셀 이동.
          behavior: "smooth", // 부드럽게 스크롤 이동.
        });
      }
    }
  };

  return (
    <HomeNewsMainContainer>
      <HomeNewsTitle>TOP 뉴스</HomeNewsTitle>
      <HomeNewsLists ref={arrowRef}>
        {
          [...imageArr, ...imageArr, ...imageArr, ...imageArr].map((item, index) => {
            return (
              <HomeNewsItems key={index}>
                <img src={item} alt="image-" />
                <HomeNewsDescription>
                  <span className="news-title">제목{index}</span>
                  <span className="news-content">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</span>
                </HomeNewsDescription>
              </HomeNewsItems>
            )
          })
        }
      </HomeNewsLists>
      <ArrowButton direction={'left'} onClick={clickByArrow} />
      <ArrowButton direction={'right'} onClick={clickByArrow} />
    </HomeNewsMainContainer>
  )
}

export default HomeNews;