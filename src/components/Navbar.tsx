import Link from "next/link";
import shark_logo from "../assets/shark_logo.png";
import Image from "next/image";

import { useUser } from "@/lib/auth";
import shark_default from "../assets/shark_default.jpg";

export default async function Navbar() {
  const currentUser = await useUser();

  return (
    <nav className="bg-transparent border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={shark_logo} alt="logo" width={100} height={100} />
          <div className="self-center leading-5 font-bold text-3xl text-dark-blue whitespace-nowrap">
            <h1>Shark Pool</h1>
            <p className="text-lg font-light">A dummy place to swim.</p>
          </div>
        </Link>
        <div className="flex gap-8 w-auto" id="navbar-default">
          <Link
            href={`/users/${currentUser.id}`}
            className="font-medium flex items-center flex-col p-1 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white"
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
                className="rounded-full h-10 w-10"
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
