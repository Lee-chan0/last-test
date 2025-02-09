import { useQuery } from "@tanstack/react-query";
import CreateVideoArticleForm from "../../components/CreateVideoArticle/CreateVideoArticleForm";
import { findUser, getCategories } from "../../utils/api";


function VideoEditorPage() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  const categoriesArr = categories?.categories || [];

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: findUser
  });
  const userArr = user?.userInfo || [];

  return (
    <>
      <CreateVideoArticleForm categoriesArr={categoriesArr} userArr={userArr} />
    </>
  )
}


export default VideoEditorPage;