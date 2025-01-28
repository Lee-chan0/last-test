import { createGlobalStyle } from "styled-components";


const GlobalStyled = createGlobalStyle`
  * {
    margin : 0;
    padding : 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-size : 16px;
    font-family : 'Pretendard', sans-serif;
    color : ${({ theme }) => theme.gray.gray900};
    scroll-behavior: smooth;
  }

  .ql-toolbar.ql-snow {
    background-color: ${({ theme }) => theme.blue.blue500};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: white;
  }

  .ql-toolbar.ql-snow button {
    background-color: white;
    border-radius: 9999px;
  }

  .ql-editor {
    background-color: ${({ theme }) => theme.gray.gray100};
    color: #333;
  }

  ul , ol {
    list-style: none;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.blue.blue500};
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.blue.blue700};
      cursor: pointer;
    }
  }

  button {
    cursor: pointer;
    border : none;
  }

  input , textarea {
    border : none;
    outline: none;
  }
`;

export default GlobalStyled;