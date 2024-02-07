import { GoBackButton } from "@/components/Buttons";
import { SignupForm } from "@/components/Forms";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <section className="no-auth-section">
      <div className="card-no-auth">
        <GoBackButton url={`/login`} />
        <h1 className="text-xl font-semibold sm:text-2xl">
          Create your Shark Pool account! 🦈
        </h1>
        <p className="text-center text-xs font-light text-light-grey sm:text-sm">
          Please provide your details to access this pool full of sharks! Your
          unique ID number for log in will be sent to your email inbox.
        </p>
        <SignupForm />
      </div>
    </section>
  );
}
