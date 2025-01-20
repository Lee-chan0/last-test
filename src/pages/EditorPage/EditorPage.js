import SideNav from "../../components/SideNav/SideNav";
import { ArticleViewContainer, DescriptionBar, SearchContainer, SearchBar, MainContainer } from "../../components/SideNav/SideNaveStyle";
import { WroteArticle } from "../../components/SideNav/SideNaveStyle";
import { ViewMoreBox } from "../../components/ViewMore/ViewMoreStyle";
import ArticleDescription from "../../components/ArticleDescription/ArticleDescription";



const totalArticle = [{
  dataTotal: 0,
}];




function EditorPage() {
  return (
    <MainContainer>
      <SideNav />
      <ArticleViewContainer>
        <DescriptionBar>
          <div>기사관리</div>
        </DescriptionBar>
        <SearchContainer>
          <WroteArticle>
            작성한 총 기사 수 : {
              totalArticle.map((item) => (
                item?.dataTotal
              ))
            }개
          </WroteArticle>
          <SearchBar type='text' />
        </SearchContainer>
        <ArticleDescription />
        <ViewMoreBox><span>View More</span></ViewMoreBox>
      </ArticleViewContainer>
    </MainContainer>
  )
}

export default EditorPage;