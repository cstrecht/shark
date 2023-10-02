import { GoBackButton } from "@/components/Buttons";
import { SignupForm } from "@/components/Forms";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <section className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-4 md:space-y-6">
        <GoBackButton url={`/login`} />
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-black md:text-2xl">
          Create your Shark Pool account! 🦈
        </h1>
        <p className="text-sm text-light-grey font-light text-center">
          Please provide your details to access in this pool full of sharks!
          Your unique ID number for log in will be sent to your email inbox!
        </p>
        <SignupForm />
      </div>
    </section>
  );
}
