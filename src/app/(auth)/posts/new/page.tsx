import { GoBackButton } from "@/components/Buttons";
import { CreatePostForm } from "@/components/Forms";

export default async function NewPost() {
  return (
    <section className="flex justify-center">
      <div className="card-post border-shark-blue">
        <GoBackButton url="/" />
        <h1 className="card-post-title text-shark-blue">
          What is happening? 💭
        </h1>
        <CreatePostForm />
      </div>
    </section>
  );
}
