import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signupFunc } from '../../utils/api';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: signupFunc,
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      queryClient.invalidateQueries(["users"]);
    }
  })

  return createUserMutation;
}