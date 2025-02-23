import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { createArticle } from "../../utils/api";



export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  const createArticleMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      toast("기사 등록이 완료되었습니다.", {
        position: "bottom-right",
        style: {
          width: "100%",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          margin: "0",
          minHeight: "32px",
          fontSize: "13px"
        }
      })
    },
    onError: (error) => {
      toast(`${error.response?.data.message}`);
    }
  })

  return createArticleMutation;
}