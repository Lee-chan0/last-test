import styled from "styled-components";
import { useGetCategory } from "../../hooks/Category/useGetCategory";
import politics from '../../assets/a.png';
import society from '../../assets/b.png';
import international from '../../assets/c.png';
import { useTheme } from "../../Contexts/ThemeContext";
import closeIcon from '../../assets/ion_close.png';
import videoIcon from '../../assets/prime_youtube.png';
import home from '../../assets/material-symbols_home-outline-rounded.png';
import entireArticle from '../../assets/material-symbols-light_article-rounded.png';
import { useNavigate } from "react-router-dom";

const MenuStyleContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  margin: 0 -16px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;

  opacity: ${({ $menuState }) => ($menuState ? "1" : "0")};
  visibility: ${({ $menuState }) => ($menuState ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;


const MenuContainer = styled.nav`
  position: fixed;
  left: 0;
  top : 0;
  bottom : 0;
  width: 160px;
  background-color: ${({ theme }) => theme.blue.blue100};
  z-index: 9999;

  transition: transform 0.3s ease;

  transform : ${({ $menuState }) => $menuState ? `translateX(0px)` : `translateX(-160px)`};

  border-right : 2px solid ${({ theme }) => theme.blue.blue500};
`;

const MenuTitle = styled.h1`
  margin-top: 30px;

  border-bottom: 2px solid ${({ theme }) => theme.blue.blue500};
  border-top: 2px solid ${({ theme }) => theme.blue.blue500};
  text-align: center;

  font-weight: 500;
  font-size : 1.2rem;

  position: relative;
`;

const MenuLists = styled.ul`
  display : flex;
  flex-direction: column;
`;

const MenuItems = styled.li`
  border-bottom : 1px solid black;
`;

const ItemBox = styled.div`
  display : flex;
  align-items: center;
  gap : 8px;
  margin : 8px;

  img {
    width: 16px;
    height: 16px;
  }

  span {
    font-size : 0.8rem;
    font-weight: 300;
    ${({ $darkmode }) => $darkmode && `color : #fff`};
    ${({ $darkmode }) => $darkmode && `font-weight : 400`};
  }
`;

const CloseIcon = styled.div`
  background-image: url(${closeIcon});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;

  position : absolute;
  right : 0;
  top : -30px;

  opacity: 0.5;
`;

const Home = styled.div`
  position: absolute;
  bottom : 20px;
  left : 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;

  background-image: url(${home});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const itemsArray = ['동영상', '전체뉴스'];

function MenuBox({ menuBoxState, onClick, setMenuBoxState }) {
  const { data: categories } = useGetCategory();
  const { darkmode } = useTheme();
  const navigate = useNavigate();
  const categoryArray = categories?.categories || [];

  const clickItem = (e, categoryId) => {
    const domId = e.currentTarget.id;

    if (['정치', '국제', '사회'].includes(domId)) {
      navigate(`/news-list/category/${categoryId}`);
    } else {
      domId === '동영상'
        ? navigate('/news-list/video/video-articles')
        : navigate('/news-list/articles/entireArticle');
    }
    setMenuBoxState(false);
  }

  return (
    <>
      <MenuStyleContainer $menuState={menuBoxState} onClick={onClick} />
      <MenuContainer $menuState={menuBoxState}>
        <MenuTitle>
          MENU
          <CloseIcon onClick={onClick} />
        </MenuTitle>
        <MenuLists>
          {
            categoryArray.map(({ categoryName, categoryId }) => (
              <MenuItems key={categoryId} id={categoryName} onClick={(e) => clickItem(e, categoryId)}>
                <ItemBox $darkmode={darkmode}>
                  <img
                    src={
                      categoryName === '정치' ?
                        politics : categoryName === '국제' ?
                          society : international
                    }
                    alt={`${categoryName}-icon`}
                  />
                  <span>{categoryName}</span>
                </ItemBox>
              </MenuItems>
            ))
          }
          {
            itemsArray.map((item, idx) => (
              <MenuItems key={idx} id={item} onClick={clickItem}>
                <ItemBox $darkmode={darkmode}>
                  <img src=
                    {item === '동영상' ? videoIcon : entireArticle}
                    alt={`${item}-icon`}
                  />
                  <span>{item}</span>
                </ItemBox>
              </MenuItems>
            ))
          }
        </MenuLists>
        <Home onClick={() => navigate('/')} />
      </MenuContainer>
    </>
  )
}

export default MenuBox;