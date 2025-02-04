import styled from "styled-components";
import { SearchInput } from "../SearchInput/SearchInputStyle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MenuBarSearchInput = styled(SearchInput)`
  width: 300px;
  height: 32px;
  border-radius: 9999px;
  margin : 4px 4px;
  border : 2px solid rgba(81, 135, 244, 0.5);
  margin-right : 24px;
`;

const MenuBarContainer = styled.div`
  width: 100%;
  display : flex;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;
  gap : 16px;
  margin-bottom: 40px;


`;

const MenuBarLists = styled.ul`
  display : flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  & > * {
    flex : 0 0 20%;
  }
`;

const MenuBarItem = styled.li`
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position : relative;
  
  height: 100%;
  transform: rotate(0);
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;

  a {
    text-decoration: none;
    color : ${({ theme }) => theme.blue.blue700};
    font-weight: bold;
    width: 100%;
    height: 100%;
    display : flex;
    align-items: center;
    justify-content: center;

    transition: color 0.5s ease;
  }

  &::before,
  &::after {
    position: absolute;
    content: "";
    left: 0;
    z-index: -1;
    width: 100%;
    height: 50%;
    background-color: ${({ theme }) => theme.blue.blue700};
    transform: scaleX(0);
    transition: transform 0.5s;
  }

  &::before {
    top : 0;
    transform-origin: left;
  }

  &::after {
    top : 50%;
    transform-origin: right;
  }

  &:hover {
    background: transparent;

    a {
      color : ${({ theme }) => theme.blue.blue100};
    }

    &::before,
    &::after {
      transform: scaleX(1);
    }
  }
`;


function MenuBar({ categoryArr }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    setQuery("");
    navigate(`/news-list/articles/entireArticle?query=${encodeURIComponent(query)}`);
  }

  return (
    <MenuBarContainer>
      <MenuBarLists>
        {
          categoryArr?.map((item) => {
            const { categoryId, categoryName } = item;
            return (
              <MenuBarItem key={categoryId}>
                <Link to={`/news-list/category/${categoryId}`}>{categoryName}뉴스</Link>
              </MenuBarItem>
            )
          })
        }
        <MenuBarItem>
          <Link to={`/news-list/video/video-articles`}>동영상</Link>
        </MenuBarItem>
        <MenuBarItem>
          <Link to={`/news-list/articles/entireArticle`}>전체기사</Link>
        </MenuBarItem>
      </MenuBarLists>
      <MenuBarSearchInput
        onChange={handleChange}
        value={query}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </MenuBarContainer>
  )
}

export default MenuBar;