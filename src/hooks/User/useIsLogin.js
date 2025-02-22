import { useQuery } from "@tanstack/react-query"
import { verifyToken } from "../../utils/api"

export const useIsLogin = () => {
  return useQuery({
    queryKey: ['islogin'],
    queryFn: verifyToken,
  });
}