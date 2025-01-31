import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const DropDownContainer = styled.div`
  width: 100%;
`;

const DropDownOptions = styled.button`
  background-color: ${({ theme }) => theme.blue.blue100};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding : 0 24px;
  font-size : 18px;
  cursor: pointer;
`;

const DropDownOptionsLine = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.blue.blue500};
`;

function DropDown({ articlesArr, setFilterArticles }) {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const navigate = useNavigate();
  const categoryiesArr = categories?.categories || [];

  const handleClickFilter = (e) => {
    const value = e.target.value;
    if (value) {
      const filterArticles = articlesArr.filter((item) => item.Category.categoryName === value);
      setFilterArticles(filterArticles);
      navigate('/truescope-administrator/editor-page', { replace: true });
    } else {
      setFilterArticles([]);
    }
  }

  return (
    <DropDownContainer>
      {
        categoryiesArr.map((item) => {
          const { categoryId, categoryName } = item;
          return (
            <DropDownOptionsLine key={categoryId}>
              <DropDownOptions onClick={handleClickFilter} value={categoryName}>
                {categoryName}
              </DropDownOptions>
            </DropDownOptionsLine>
          )
        })
      }
      <DropDownOptionsLine>
        <DropDownOptions style={{ color: "rgba(0, 0, 0, 0.3)" }} onClick={handleClickFilter}>
          전체보기
        </DropDownOptions>
      </DropDownOptionsLine>
    </DropDownContainer>
  );
}

export default DropDown;