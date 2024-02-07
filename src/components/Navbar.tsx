import Link from "next/link";
import shark_logo from "../assets/shark_logo.png";
import Image from "next/image";

import { useUser } from "@/lib/auth";
import shark_default from "../assets/shark_default.jpg";

export default async function Navbar() {
  const currentUser = await useUser();

  return (
    <nav>
      <section className="navbar-section">
        <Link href="/" className="flex items-center gap-2">
          <Image src={shark_logo} alt="logo" width={100} height={100} />
          <div className="navbar-logo">
            <h1>Shark Pool</h1>
            <p className="navbar-slogan">A dummy place to swim.</p>
          </div>
        </Link>
        <div className="flex w-auto gap-8">
          <Link href={`/users/${currentUser.id}`} className="navbar-user">
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
            <div className="navbar-user-name">
              {currentUser.firstName} {currentUser.lastName}
            </div>
          </Link>
        </div>
      </section>
    </nav>
  );
}
