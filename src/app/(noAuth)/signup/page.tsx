import { GoBackButton } from "@/components/Buttons";
import { SignupForm } from "@/components/Forms";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <section className="bg-gray-50 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md md:space-y-6">
        <GoBackButton url={`/login`} />
        <h1 className="text-black text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
          Create your Shark Pool account! 🦈
        </h1>
        <p className="text-center text-sm font-light text-light-grey">
          Please provide your details to access in this pool full of sharks!
          Your unique ID number for log in will be sent to your email inbox!
        </p>
        <SignupForm />
      </div>
    </section>
  );
}
