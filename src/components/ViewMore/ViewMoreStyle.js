import styled from "styled-components";


const ViewMoreBox = styled.button`
  width: 100%;
  height: 60px;
  display : flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.blue.blue100};
  margin : 0;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);

  transition: box-shadow 0.3s;

  will-change: box-shadow;

  &:hover {
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.4);
  }

  span {
    color : ${({ theme }) => theme.gray.gray400};
  }
`;

export { ViewMoreBox };