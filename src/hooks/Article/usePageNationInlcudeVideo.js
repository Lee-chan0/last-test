import { useInfiniteQuery } from "@tanstack/react-query"
import { getIncludeVideoPagination } from "../../utils/api"




export const usePageNationIncludeVideo = () => {
  return useInfiniteQuery({
    queryKey: ['include-videos'],
    queryFn: getIncludeVideoPagination,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    }
  })
}