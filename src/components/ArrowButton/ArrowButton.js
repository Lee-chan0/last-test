import leftArrow from '../../assets/mingcute_left-fill.png'
import rightArrow from '../../assets/mingcute_right-fill.png'
import styled from 'styled-components';


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
  ${({ $direction }) => $direction === 'left' ? 'left : 20px' : 'right : 20px'};
  transform: translateY(-50%);

  cursor: pointer;
`;



function ArrowButton({ direction, onClick }) {

  return (
    <ArrowBtn $direction={direction} src={direction === 'left' ? leftArrow : rightArrow} onClick={() => onClick(direction)} />
  )
}
export default ArrowButton;