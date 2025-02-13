import { useInfiniteQuery } from "@tanstack/react-query"
import { getCategoryByArticles } from "../../utils/api"




export const useCategoryByArticles = (id) => {
  return useInfiniteQuery({
    queryKey: [`category-by-articles-${id}`],
    queryFn: ({ pageParam }) => getCategoryByArticles(pageParam, id),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    }
  })
}