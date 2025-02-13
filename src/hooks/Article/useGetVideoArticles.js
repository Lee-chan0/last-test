import { useQuery } from "@tanstack/react-query"
import { getVideoArticles } from "../../utils/api"


export const useGetVideoArticles = () => {
  return useQuery({
    queryKey: ['all-video-articles'],
    queryFn: getVideoArticles
  })
}