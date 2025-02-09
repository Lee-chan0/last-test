import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { MainContainer } from "../../components/Container/ContainerStyle";
import Footer from "../../components/Footer/Footer";
import LogoContainer from "../../components/LogoCotainer/LogoContainer";
import MenuBar from "../../components/MenuBar/MenuBar";
import Nav from "../../components/Nav/Nav";
import { getCategories, getViewMoreArticles } from "../../utils/api";
import EntireArticles from "../../components/EntireArticles/EntireArticles";
import { useGetAllArticles } from "../../hooks/Article/useGetAllArticles";





function EntireArticlePage() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const categoryArr = categories?.categories || [];

  const { data: entireArticles, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['page-articles'],
    queryFn: getViewMoreArticles,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    }
  })
  const entireArticleArr = entireArticles?.pages.flatMap((page) => page.articles) || [];

  const { data: getAllArticles } = useGetAllArticles();
  const allArticles = getAllArticles?.articles || [];

  return (
    <>
      <Nav />
      <MainContainer>
        <LogoContainer />
        <MenuBar categoryArr={categoryArr} />
        <EntireArticles
          entireArticleArr={entireArticleArr}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          allArticles={allArticles}
        />
      </MainContainer>
      <Footer />
    </>
  )
}


export default EntireArticlePage;