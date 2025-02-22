import styled from "styled-components";
import { useTheme } from "../../Contexts/ThemeContext";
import { useEffect, useState } from "react";



const DotsContainer = styled.div`
  position : absolute;
  bottom : 4px;
  left : 0;
  width : 100%;
  height: 8px;
  display : flex;
  justify-content: center;
  gap : 8px;
  z-index: 1;

  :nth-child(1) {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  :nth-last-child(1) {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

const Dots = styled.div`
  background-color: ${({ $activeIndex, $index, theme, $darkmode }) => {
    if ($darkmode) {
      return $activeIndex === $index ? `${theme.gray.gray900}` : `${theme.gray.gray400}`
    } else {
      return $activeIndex === $index ? `${theme.blue.blue700}` : `${theme.gray.gray400}`
    }
  }
  };
  height: 8px;
  width: 8px;
  border-radius: 9999px;
  opacity : 0.8;
`;



function MobileSlideDot({ mobileSlideArray, activeIndex,
  setActiveIndex, width, setAmountX }) {
  const { darkmode } = useTheme();

  const handleClickDot = (idx) => {
    const amount = idx - activeIndex;

    setActiveIndex(idx);
    setAmountX((prev) => prev + (width * amount));
  }

  return (
    <DotsContainer>
      {
        mobileSlideArray.map((_, index) => {
          return (
            <Dots
              key={index}
              $activeIndex={activeIndex}
              $index={index}
              $darkmode={darkmode}
              onClick={() => handleClickDot(index)}
            />
          )
        })
      }
    </DotsContainer>
  )
}

export default MobileSlideDot;