import { LoginForm } from "@/components/Forms";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full text-center flex flex-col justify-center max-w-md bg-white rounded-lg shadow-md p-6 space-y-4 md:space-y-6">
        <h1 className="text-xl  font-bold leading-tight tracking-tight text-black md:text-2xl">
          Sign in to your account
        </h1>
        <LoginForm />
        <p>
          No account?{" "}
          <Link href="/signup" className="text-shark-blue hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
