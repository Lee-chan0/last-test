import { useQuery } from "@tanstack/react-query"
import { getIncludeVideoArticles } from "../../utils/api"



export const useGetIncludeVideoArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getIncludeVideoArticles
  })
}