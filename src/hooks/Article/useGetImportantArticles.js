import { useQuery } from "@tanstack/react-query"
import { getImportantArticles } from "../../utils/api"

export const useGetImportantArticles = () => {
  return useQuery({
    queryKey: ['importantArticles'],
    queryFn: getImportantArticles
  })
}