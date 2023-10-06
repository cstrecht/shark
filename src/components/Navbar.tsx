import Link from "next/link";
import shark_logo from "../assets/shark_logo.png";
import Image from "next/image";

import { useUser } from "@/lib/auth";
import shark_default from "../assets/shark_default.jpg";

export default async function Navbar() {
  const currentUser = await useUser();

  return (
    <nav className="bg-transparent border-gray-200">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={shark_logo} alt="logo" width={100} height={100} />
          <div className="self-center whitespace-nowrap text-3xl font-bold leading-5 text-dark-blue">
            <h1>Shark Pool</h1>
            <p className="text-lg font-light">A dummy place to swim.</p>
          </div>
        </Link>
        <div className="flex w-auto gap-8" id="navbar-default">
          <Link
            href={`/users/${currentUser.id}`}
            className="border-gray-100 bg-gray-50 mt-4 flex flex-col items-center rounded-lg border p-1 font-medium md:mt-0 md:flex-row md:border-0 md:bg-white"
          >
            {currentUser.picture === undefined ? (
              <Image
                src={shark_default}
                alt="logo"
                width={35}
                height={35}
                className="rounded-full"
              />
            ) : (
              <img
                className="h-10 w-10 rounded-full"
                src={currentUser.picture}
                alt="Profile picture"
              />
            )}

            <div className="p-2 text-light-grey">
              {currentUser.firstName} {currentUser.lastName}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
