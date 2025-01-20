import styled from "styled-components";
import searchImage from '../../assets/search.png';


const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding : 0 48px 0 24px;
  border-radius: 4px;
  background-image: url(${searchImage});
  background-repeat : no-repeat;
  background-size: 24px;
  background-position: 95% 50%;
`;



export { SearchInput };