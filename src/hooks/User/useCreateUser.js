import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signupFunc } from '../../utils/api';
import { toast } from "react-toastify";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: signupFunc,
    onSuccess: () => {
      toast("회원가입이 완료되었습니다.", {
        style: {
          minHeight: "32px",
          color: "#fff",
          width: "100%",
          borderRadius: "2px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          fontSize: "13px",
          margin: "0",
        }
      });
      queryClient.invalidateQueries(["users"]);
    },
    onError: (e) => {
      alert(e.response.data.message);
    }
  })

  return createUserMutation;
}