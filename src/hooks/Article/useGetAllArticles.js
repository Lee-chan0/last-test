import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getArticles } from "../../utils/api";





export const useGetAllArticles = () => {

  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })
}