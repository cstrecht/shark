import { SignupForm } from "@/components/Forms";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <section className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
          Create your account! 🦈
        </h1>
        <SignupForm />
      </div>
    </section>
  );
}
