import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateArticle } from "../../utils/api"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const useUpdateArticle = (articleId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateArticleMutation = useMutation({
    mutationFn: (formData) => updateArticle(formData, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries(['article', articleId]);
      queryClient.invalidateQueries(['articles']);

      navigate('/truescope-administrator/editor-page');
      toast('수정이 완료되었습니다.', {
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
    },
    onError: (e) => {
      console.error(e);
    }
  })
  return updateArticleMutation;
}