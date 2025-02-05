import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginFunc } from "../../utils/api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const logInMutation = useMutation({
    mutationFn: loginFunc,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      alert("로그인 되었습니다.");
    }
  });

  return logInMutation;
}