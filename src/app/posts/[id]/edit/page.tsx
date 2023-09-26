import { EditPostForm } from "@/components/Forms";
import { getPostById, updatePost } from "@/lib/dummy-api";

//4
type PageProps = { params: { id: string } };

export default async function EditPost({ params: { id } }: PageProps) {
  const post = await getPostById(id);

  return (
    <section className="flex justify-center">
      <div className="border bg-white w-1/2 p-8 border-light-grey rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-light-grey">Edit post 🔧</h1>
        <EditPostForm post={post} />
      </div>
    </section>
  );
}
