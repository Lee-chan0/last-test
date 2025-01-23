import leftArrow from '../../assets/mingcute_left-fill.png'
import rightArrow from '../../assets/mingcute_right-fill.png'
import styled from 'styled-components';
import { useMemo, useEffect } from 'react';
import { throttle } from 'lodash';



const ArrowBtn = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${({ $direction }) => $direction === 'left' ? `${leftArrow}` : `${rightArrow}`});
  background-position : center;
  background-size : 48px;
  background-repeat: no-repeat;
  position : absolute;
  z-index: 2;
  top : 50%;
  transform: translateY(-50%);
  ${({ $direction }) => $direction === 'left' ? 'left : 20px' : 'right : 20px'};
  transition : opacity 0.3s ease;

  cursor: pointer;

  &:hover {
    opacity : 0.6;
  }
`;



function ArrowButton({ direction, onClick }) {

  const throttleOnClick = useMemo(() => {
    return throttle((direction) => {
      onClick(direction);
    }, 1000)
  }, [onClick]);

  useEffect(() => {
    return () => {
      throttleOnClick.cancel();
    }
  }, [throttleOnClick]);


  return (
    <ArrowBtn
      $direction={direction} src={direction === 'left' ? leftArrow : rightArrow}
      onClick={() => throttleOnClick(direction)}
    />
  )
}
export default ArrowButton;