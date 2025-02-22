import styled from "styled-components";
import searchIcon from '../../assets/search3-rounded.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const StyleContainer = styled.div`
  position : fixed;
  width: 100vw;
  height: 100vh;
  background : rgba(0, 0, 0, 0.6);

  margin : 0 -16px;
  z-index: 99;

  transition : all 0.3s ease;

  opacity: ${({ $searchState }) => $searchState ? '1' : '0'};
  visibility: ${({ $searchState }) => $searchState ? 'visible' : 'hidden'};
`;

const MainContainer = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left : 52px;
  top : 50%;
  transform : translate(-50%, -50%);
  background-image: url(${searchIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display : ${({ $searchState }) => $searchState ? 'none' : 'block'};
`;

const SearchContainer = styled.label`
  position : absolute;
  left : 42px;
  width: 192px;
  height: 100%;
  transition: all 0.3s;
  transform  :${({ $searchState }) => $searchState ? 'translateX(0px)' : 'translateX(-20px)'};
  opacity: ${({ $searchState }) => $searchState ? '1' : '0'};
  visibility: ${({ $searchState }) => $searchState ? 'visible' : 'hidden'};
  display : flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  border-radius: 4px;
`;

const SearchIcon = styled.div`
  background-image: url(${searchIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  margin-left : 4px;
  background-color: ${({ theme }) => theme.gray.gray0};
  border-radius: 4px;
  border : 2px solid ${({ theme }) => theme.blue.blue500};
  padding : 10px;
`;

const SearchInput = styled.input`
  height: 20px;
  border : 1px solid ${({ theme }) => theme.blue.blue500};
  border-radius: 2px;
  padding : 0px 4px;
  font-size : 0.8rem;
`;

function MobileSearch() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [searchText, setSearchText] = useState("");
  const [searchState, setSearchState] = useState(false);
  const navigate = useNavigate();

  if (!isMobile) {
    return;
  }

  const changeSearchText = (e) => {
    setSearchText(e.target.value);
  }

  const handleClickIcon = () => {
    setSearchState(true);
  }

  const handleSearchingArticle = () => {
    if (searchText.trim() === "") {
      if (!toast.isActive('search')) {
        toast('검색어를 입력해주세요.', {
          position: 'bottom-right',
          toastId: 'search',
          style: {
            fontWeight: 'bold',
            fontSize: '0.7rem',
            color: '#fff',
            background: 'rgba(0, 0, 0, 0.7)',
            minHeight: '20px',
            width: 'fit-content',
            marginBottom: '8px',
            borderRadius: '2px',
            marginRight: '8px'
          }
        });
        return;
      }
    } else {
      navigate(`/news-list/articles/entireArticle?query=${encodeURIComponent(searchText)}`);
      setSearchState(false);
    }
  }

  return (
    <>
      <StyleContainer $searchState={searchState} onClick={() => setSearchState(false)} />
      <MainContainer onClick={handleClickIcon} $searchState={searchState} />
      <SearchContainer htmlFor="searching" $searchState={searchState}>
        <SearchInput id="searching" type="text" value={searchText} onChange={changeSearchText} />
        <SearchIcon onClick={handleSearchingArticle} />
      </SearchContainer>
    </>
  )
}

export default MobileSearch;