import { useQuery } from "@tanstack/react-query"
import { getMyArticles } from "../../utils/api"

export const useGetMyArticles = () => {
  return useQuery({
    queryKey: ['myArticles'],
    queryFn: getMyArticles
  })
}