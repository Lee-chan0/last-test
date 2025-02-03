import { useQuery } from "@tanstack/react-query";
import CreateVideoArticleForm from "../../components/CreateVideoArticle/CreateVideoArticleForm";
import { findUsers, getCategories } from "../../utils/api";


function VideoEditorPage() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const categoriesArr = categories?.categories || [];

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: findUsers
  });
  const usersArr = users?.users || [];

  return (
    <>
      <CreateVideoArticleForm categoriesArr={categoriesArr} usersArr={usersArr} />
    </>
  )
}


export default VideoEditorPage;