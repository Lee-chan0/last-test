import { useQuery } from "@tanstack/react-query"
import { findUser } from "../../utils/api";

export const useFindUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: findUser
  })
}