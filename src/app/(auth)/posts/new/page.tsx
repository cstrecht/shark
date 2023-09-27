import { CreatePostForm } from "@/components/Forms";

export default async function NewPost() {
  return (
    <section className="flex justify-center">
      <div className="border bg-white w-1/2 p-8 border-shark-blue rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-shark-blue">
          What is happening? 💭
        </h1>
        <CreatePostForm />
      </div>
    </section>
  );
}
