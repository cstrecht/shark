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
    <section className="no-auth-section">
      <div className="card-no-auth">
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-4">
            <Image
              src={shark_logo}
              alt="SharkPool logo"
              width={120}
              height={120}
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-shark-blue sm:text-4xl">
                Shark Pool
              </h1>
              <p className="text-xs sm:text-sm">A dummy place to swim.</p>
            </div>
          </div>
        </div>
        <div className="text-xl font-semibold sm:text-2xl">
          Sign in to your account!
        </div>
        <LoginForm />
        <p className="text-xs text-light-grey">
          For testing this app, use the following ID: 6543d239baf2fffacb407dea
        </p>
        <p className="mt-4 text-xs sm:mt-0 sm:text-sm">
          No account?{" "}
          <Link href="/signup" className="text-shark-blue hover:underline">
            Create one.
          </Link>
        </p>
      </div>
    </section>
  );
}
