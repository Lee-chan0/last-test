import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MainContainer } from "../../components/Container/ContainerStyle";
import Footer from "../../components/Footer/Footer";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import MenuBar from "../../components/MenuBar/MenuBar";
import Nav from "../../components/Nav/Nav";
import { getCategories, getPageVideos, getVideoArticles } from "../../utils/api";
import VideoArticleList from "../../components/VideoArticleList/VideoArticleList";


function VideoPage() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const categoriesArr = categories?.categories || [];

  const { data: videoArticles, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['page-video-articles'],
    queryFn: getPageVideos,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    }
  });

  const videoArticlesArr = videoArticles?.pages.flatMap((item) => item.videoArticles) || [];

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoriesArr} />
        <VideoArticleList videoArticlesArr={videoArticlesArr} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
      </MainContainer>
      <Footer />
    </>
  )
}


export default VideoPage;