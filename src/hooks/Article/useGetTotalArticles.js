import { useQuery } from "@tanstack/react-query"
import { getTotalArticles } from "../../utils/api"




export const useGetTotalArticles = () => {
  return useQuery({
    queryKey: ['total-articles'],
    queryFn: getTotalArticles
  });
}