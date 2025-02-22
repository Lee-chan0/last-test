import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import downIcon from '../../assets/formkit_down.png';
import { useState } from "react";

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

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 16px;
    height: 40px;
  }
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

  @media (min-width: 768px) and (max-width: 1279px) {
    height : 40px;

    img {
      width : 24px;
    }
  }
`;

const DropDownDescription = styled.span`
  font-weight: bold;

  @media (min-width: 768px) and (max-width: 1279px) {
    font-size : 16px;
  }
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

function DropDown({ articlesArr, setFilterArticles, isUpdate, isCreate }) {
  const [isActiveDown, setIsActiveDown] = useState(false);
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategories });
  const categoryiesArr = categories?.categories || [];

  const navigate = useNavigate();

  const clickCategory = (e) => {
    const value = e.target.value;
    navigate(`/truescope-administrator/editor-page?category=${value}`);
  }

  const clickDropDown = () => {
    setIsActiveDown((prev) => !prev);
  }

  const clickDropDownItem = (e) => {
    const domId = e.target.id;
    navigate(`/truescope-administrator/editor-page?category=${domId}`);
  }

  return (
    <DropDownContainer>
      {
        categoryiesArr.map((item) => {
          const { categoryId, categoryName } = item;
          return (
            <DropDownOptionsLine key={categoryId}>
              <DropDownOptions value={categoryName} onClick={clickCategory}>
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
              onClick={clickDropDownItem}
            >
              {item}
            </DropDownMenus>
          ))
        }
        <DropDownMenus
          $isActiveDown={isActiveDown}
          id="entire"
          onClick={clickDropDownItem}
        >
          전체기사
        </DropDownMenus>
        <DropDownMenus
          $isActiveDown={isActiveDown}
          id="video"
          onClick={clickDropDownItem}
        >
          동영상
        </DropDownMenus>
      </DropDownOptionsLine>
    </DropDownContainer>
  );
}

export default DropDown;