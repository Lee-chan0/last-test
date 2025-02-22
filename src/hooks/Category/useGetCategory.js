import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../utils/api"




export const useGetCategory = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}