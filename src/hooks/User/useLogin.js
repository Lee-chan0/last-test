import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginFunc } from "../../utils/api";
import { toast } from "react-toastify";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const logInMutation = useMutation({
    mutationFn: loginFunc,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']);
      toast(`${data.userInfo.userNamePosition}님 환영합니다.`, {
        style: {
          minHeight: "32px",
          width: "100%",
          borderRadius: "2px",
          fontSize: "13px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          margin: "0"
        }
      });
    }
  });

  return logInMutation;
}