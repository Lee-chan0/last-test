import styled from "styled-components";
import { SearchInput } from "../SearchInput/SearchInputStyle";
import { Link } from "react-router-dom";
import { categories } from "../../mock";

const MenuBarSearchInput = styled(SearchInput)`
  width: 500px;
  height: 32px;
  border-radius: 9999px;
`;

const MenuBarContainer = styled.div`
  width: 100%;
  display : flex;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;
  padding : 4px 24px;
  gap : 16px;
  margin-bottom: 40px;
`;

const MenuBarLists = styled.ul`
  display : flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > * {
    flex : 0 0 20%;
  }
`;

const MenuBarItem = styled.li`
  text-align: center;
  
  a {
    text-decoration: none;
    color : ${({ theme }) => theme.blue.blue700};
    font-weight: bold;
  }
`;


function MenuBar({ categoryArr }) {

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
          <Link to={`/`}>동영상</Link>
        </MenuBarItem>
        <MenuBarItem>
          <Link to={`/`}>커뮤니티</Link>
        </MenuBarItem>
      </MenuBarLists>
      <MenuBarSearchInput />
    </MenuBarContainer>
  )
}

export default MenuBar;