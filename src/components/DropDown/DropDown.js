import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import downIcon from '../../assets/formkit_down.png';
import { useState } from "react";
import { useGetImportantArticles } from "../../hooks/Article/useGetImportantArticles";
import { useGetMyArticles } from "../../hooks/Article/useGetMyArticles";

const DropDownContainer = styled.div`
  width: 100%;
`;

const DropDownOptions = styled.button`
  background-color: ${({ theme }) => theme.blue.blue100};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding : 0 24px;
  font-size : 18px;
  cursor: pointer;
`;

const DropDownOptionsLine = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.blue.blue500};
`;

const DropDownDescriptionOption = styled.div`
  background-color: ${({ theme }) => theme.blue.blue100};
  width: 100%;
  height: 50px;
  display : flex;
  align-items: center;
  padding : 0 24px;
  font-size : 18px;
  justify-content: space-between;
  cursor: pointer;

  img {
    width: 28px;
    padding : 0;
    opacity: 0.4;
    transition: transform 0.3s ease;

    transform: ${({ $isActiveDown }) => $isActiveDown ? `rotate(180deg)` : `rotate(0)`};
  }
`;

const DropDownDescription = styled.span`
  font-weight: bold;
`;

const DropDownMenus = styled.div`
  height: ${({ $isActiveDown }) => $isActiveDown ? `30px` : `0`};
  overflow: hidden;
  display : flex;
  align-items: center;
  padding : 0 24px;
  font-size : 13px;
  font-weight: 500;
  border-top: ${({ $isActiveDown, theme }) => $isActiveDown ? `1px solid ${theme.blue.blue500}` : `none`};
  cursor: pointer;
  transition : height 0.4s;

  &:hover {
    background-color: rgba(192, 239, 253, 0.5);
  }
`;

const menusItems = ['내가 쓴 기사', '중요한 기사'];

function DropDown({ articlesArr, setFilterArticles }) {
  const [isActiveDown, setIsActiveDown] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const { data: importantArticles } = useGetImportantArticles();
  const { data: myArticles } = useGetMyArticles();
  const navigate = useNavigate();
  const categoryiesArr = categories?.categories || [];

  const handleClickFilter = (e) => {
    const value = e.target.value;
    if (value) {
      const filterArticles = articlesArr.filter((item) => item.Category.categoryName === value);
      setFilterArticles(filterArticles);
      navigate('/truescope-administrator/editor-page', { replace: true });
    } else {
      setFilterArticles([]);
    }
  }

  const clickDropDown = () => {
    setIsActiveDown((prev) => !prev);
  }

  const clickDropDownMenu = (e) => {
    const domId = e.target.id;
    if (domId === 'importantArticles') {
      const filterArticleArray = importantArticles?.importantArticles || [];
      setFilterArticles(filterArticleArray);
    } else if (domId === 'myArticles') {
      const filterArticleArray = myArticles?.findMyArticles || [];
      setFilterArticles(filterArticleArray);
    } else if (domId === 'video') {
      const filterArticleArray = articlesArr.filter((item) => item.articleType === '동영상');
      setFilterArticles(filterArticleArray);
    } else {
      setFilterArticles(articlesArr);
    }
  }

  return (
    <DropDownContainer>
      {
        categoryiesArr.map((item) => {
          const { categoryId, categoryName } = item;
          return (
            <DropDownOptionsLine key={categoryId}>
              <DropDownOptions onClick={handleClickFilter} value={categoryName}>
                {categoryName}
              </DropDownOptions>
            </DropDownOptionsLine>
          )
        })
      }
      <DropDownOptionsLine>
        <DropDownDescriptionOption
          style={{ color: "rgba(0, 0, 0, 0.4)" }}
          $isActiveDown={isActiveDown}
          onClick={clickDropDown}>
          <DropDownDescription>전체메뉴</DropDownDescription>
          <img src={downIcon} alt="drop" />
        </DropDownDescriptionOption>
        {
          menusItems.map((item, idx) => (
            <DropDownMenus
              key={idx}
              id={item === '내가 쓴 기사' ? 'myArticles' : 'importantArticles'}
              $isActiveDown={isActiveDown}
              onClick={clickDropDownMenu}
            >
              {item}
            </DropDownMenus>
          ))
        }
        <DropDownMenus
          $isActiveDown={isActiveDown}
          onClick={clickDropDownMenu}
        >
          전체기사
        </DropDownMenus>
        <DropDownMenus
          $isActiveDown={isActiveDown}
          onClick={clickDropDownMenu}
          id="video"
        >
          동영상
        </DropDownMenus>
      </DropDownOptionsLine>
    </DropDownContainer>
  );
}

export default DropDown;