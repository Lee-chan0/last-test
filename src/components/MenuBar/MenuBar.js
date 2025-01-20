import styled from "styled-components";
import { SearchInput } from "../SearchInput/SearchInputStyle";
import { Link } from "react-router-dom";

const MenuBarSearchInput = styled(SearchInput)`
  width: 240px;
  height: 32px;
  border-radius: 9999px;
`;

const MenuBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.blue.blue100};
  border-radius: 4px;
  justify-content: space-between;
  padding : 4px 24px;
  gap : 16px;
  margin-bottom: 40px;
`;

const MenuBarLists = styled.ul`
  display : flex;
  align-items: center;
  width: 100%;

  & > * {
    flex-grow: 1;
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

const menuBarObj = {
  title: ['정치뉴스', '사회뉴스', '국제뉴스', '동영상', '커뮤니티']
}


function MenuBar() {
  return (
    <MenuBarContainer>
      <MenuBarLists>
        {
          menuBarObj.title.map((item, index) => {
            return <MenuBarItem key={index}><Link>{item}</Link></MenuBarItem>
          })
        }
      </MenuBarLists>
      <MenuBarSearchInput />
    </MenuBarContainer>
  )
}

export default MenuBar;