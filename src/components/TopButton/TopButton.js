import { useEffect, useState } from "react";
import styled from "styled-components";

const TopBtn = styled.button`
  font-family: "Roboto Condensed";
  font-size : 20px;
  font-weight: bold;
  color : ${({ theme }) => theme.gray.gray600};

  padding : 8px 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.gray.gray400};

  transition: opacity 0.5s, background-color 0.5s;

  opacity: ${({ $isScroll }) => $isScroll ? "0.5" : "0"};
  position : fixed;
  right : 50px;
  bottom : 50px;

  z-index: 5;
  
  &:hover {
    background-color: rgba(66, 66, 66, 0.3);
  }
`;

function TopButton() {
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1000) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  const handleClickButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [isScroll]);

  return (
    <TopBtn onClick={handleClickButton} $isScroll={isScroll}>TOP</TopBtn>
  )
}

export default TopButton;