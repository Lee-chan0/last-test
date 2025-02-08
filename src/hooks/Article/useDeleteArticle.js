import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteArticle } from "../../utils/api"
import { toast } from "react-toastify"



export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      toast.success("삭제가 완료되었습니다.", {
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
    }
  })

  return deleteArticleMutation;
}