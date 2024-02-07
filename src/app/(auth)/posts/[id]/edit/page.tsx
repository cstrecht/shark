import { EditPostForm } from "@/components/Forms";
import { getPostById } from "@/lib/dummy-api";
import { notFound } from "next/navigation";
import { useUser } from "@/lib/auth";
import { GoBackButton } from "@/components/Buttons";

type PageProps = { params: { id: string } };

export default async function EditPost({ params: { id } }: PageProps) {
  const post = await getPostById(id);
  const currentUser = await useUser();

  if (currentUser.id != post.owner.id) notFound();

  return (
    <section className="flex justify-center">
      <div className="card-post border-light-grey">
        <GoBackButton url="/" />
        <h1 className="card-post-title text-light-grey">Edit post 🔧</h1>
        <EditPostForm post={post} />
      </div>
    </section>
  );
}
