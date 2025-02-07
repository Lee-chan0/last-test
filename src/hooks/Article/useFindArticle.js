import { useQuery } from "@tanstack/react-query"
import { getArticle } from "../../utils/api"



export const useFindArticle = (id) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticle(id),
    enabled: !!id
  })
}