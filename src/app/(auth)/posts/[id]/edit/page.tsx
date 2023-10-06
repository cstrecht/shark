import { EditPostForm } from "@/components/Forms";
import { getPostById, updatePost } from "@/lib/dummy-api";
import { notFound } from "next/navigation";
import { useUser } from "@/lib/auth";

type PageProps = { params: { id: string } };

export default async function EditPost({ params: { id } }: PageProps) {
  const post = await getPostById(id);
  const currentUser = await useUser();

  if (currentUser.id != post.owner.id) notFound();

  return (
    <section className="flex justify-center">
      <div className="w-1/2 rounded-xl border border-light-grey bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-light-grey">Edit post 🔧</h1>
        <EditPostForm post={post} />
      </div>
    </section>
  );
}
