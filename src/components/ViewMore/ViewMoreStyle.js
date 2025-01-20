import styled from "styled-components";


const ViewMoreBox = styled.button`
  width: 100%;
  height: 60px;
  display : flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.blue.blue100};
  margin : 0;

  span {
    color : ${({ theme }) => theme.gray.gray400};
  }
`;

export { ViewMoreBox };