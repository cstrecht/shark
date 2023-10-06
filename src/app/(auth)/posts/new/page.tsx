import { CreatePostForm } from "@/components/Forms";

export default async function NewPost() {
  return (
    <section className="flex justify-center">
      <div className="w-1/2 rounded-xl border border-shark-blue bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-shark-blue">
          What is happening? 💭
        </h1>
        <CreatePostForm />
      </div>
    </section>
  );
}
