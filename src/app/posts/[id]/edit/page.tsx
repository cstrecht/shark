import { EditPostForm } from "@/components/Forms";
import { getPostById, updatePost } from "@/lib/dummy-api";

//4
type PageProps = { params: { id: string } };

export default async function EditPost({ params: { id } }: PageProps) {
  const post = await getPostById(id);

  return (
    <>
      <div>update post page caralho</div>
      <EditPostForm post={post} />
    </>
  );
}
