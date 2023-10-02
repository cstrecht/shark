import { LoginForm } from "@/components/Forms";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import shark_logo from "../../../assets/shark_logo.png";
import Image from "next/image";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full text-center gap-8 items-center flex flex-col justify-center max-w-md bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between">
          <div className="flex gap-4 justify-center items-center">
            <Image
              src={shark_logo}
              alt="SharkPool logo"
              width={120}
              height={120}
            />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-shark-blue">Shark Pool</h1>
              <p className="text-sm">A dummy place to swim.</p>
            </div>
          </div>
        </div>
        <div className="text-2xl font-semibold">Sign in to your account!</div>
        <LoginForm />
        <p>
          No account?{" "}
          <Link href="/signup" className="text-shark-blue hover:underline">
            Create one.
          </Link>
        </p>
      </div>
    </section>
  );
}
