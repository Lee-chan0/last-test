import styled from "styled-components";
import emptyStar from '../../assets/material-symbols-light_star-outline-rounded.png';
import fullStar from '../../assets/material-symbols-light_star-rounded.png';
import { useUpdateStar } from "../../hooks/Article/useUpdateStar";

const MainContainer = styled.div`
  width: 24px;
  height: 24px;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ $full, $empty, $isActiveStar }) => $isActiveStar ? $full : $empty});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

function ImportantStar({ isImportant, articleId }) {
  const updateStarMutation = useUpdateStar();

  const handleClickStar = (e) => {
    const changeValues = isImportant ?
      { articleId: +articleId, isActiveStar: false }
      :
      { articleId: +articleId, isActiveStar: true }

    updateStarMutation.mutate(changeValues);
  }



  return (
    <MainContainer>
      <ImgBox $isActiveStar={isImportant} $full={fullStar} $empty={emptyStar} onClick={handleClickStar} />
    </MainContainer>
  )
}

export default ImportantStar;