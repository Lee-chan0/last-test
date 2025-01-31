import styled from "styled-components";
import { SideContainer, flexContainer } from "../Container/ContainerStyle";
import { SearchInput } from "../SearchInput/SearchInputStyle";



const MainContainer = styled(flexContainer)`
`;



const ArticleViewContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  margin-left: 264px;

  & > * {
    margin-bottom : 40px;
  }
`;

const DescriptionBar = styled.div`
  width: 100%;
  padding : 24px;
  border : 3px solid ${({ theme }) => theme.blue.blue500};

  div {
    font-size :24px;
    font-weight: bold;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  padding : 0 24px;
  display : flex;
  align-items: center;
  justify-content: space-between;
  padding : 8px 24px;
  margin : 0;
  margin-top: -24px;
`;

const WroteArticle = styled.span`
  color : ${({ theme }) => theme.gray.gray600};
`;

const SearchBar = styled(SearchInput)`
  height: 30px;
  padding : 0 48px 0 16px;
  &:focus
   {outline: 2px solid ${({ theme }) => theme.blue.blue500};}
`;

const NavigationSideBarContainer = styled(SideContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border : 3px solid ${({ theme }) => theme.blue.blue500};
  border-bottom: none;

  background-color: ${({ theme }) => theme.blue.blue100};
`;

const SideNavMainContainer = styled.div`
  width: 100%;

  img {
    padding : 40px;
  }
`;

const AddButton = styled.button`
  background-color: gray;
  font-size : 18px;
  display : flex;
  align-items: center;
  justify-content: center;
  gap : 4px;
  padding : 13px 0;
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue700};
  position : absolute;
  bottom : 0;
  left: 0;
  text-decoration: none;

  div {
    display: flex;
    align-items: center;
    color : #fff;
    font-weight: bold;
  }

  img {
    width: 22px;
    height: 22px;
  }
`;



export {
  SearchContainer, WroteArticle, SearchBar,
  NavigationSideBarContainer, SideNavMainContainer,
  AddButton, MainContainer, ArticleViewContainer,
  DescriptionBar,
};