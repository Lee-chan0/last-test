import styled from "styled-components";


const ViewMoreBox = styled.button`
  width: 100%;
  height: 60px;
  display : ${({ $hasNextPage }) => $hasNextPage ? `flex` : `none`};
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

  @media (min-width: 768px) and (max-width: 1279px) {
    height : 40px;

    box-shadow : none;

    border : 1px solid ${({ theme }) => theme.gray.gray400};

    &:hover {
      box-shadow : none;
    }
  }

  @media (max-width: 767px) {
    height : 32px;

    box-shadow : none;

    border : 1px solid ${({ theme }) => theme.gray.gray400};
    border-radius : 2px;

    &:hover {
      box-shadow : none;
    }

    span {
      font-size : 0.6rem;
    }
  }
`;

export { ViewMoreBox };