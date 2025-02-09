import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateArticleStar } from "../../utils/api"


export const useUpdateStar = () => {
  const queryClient = useQueryClient();

  const updateStarMutation = useMutation({
    mutationFn: updateArticleStar,
    onSuccess: () => {
      queryClient.invalidateQueries(['Allarticles'])
    }
  })

  return updateStarMutation;
}