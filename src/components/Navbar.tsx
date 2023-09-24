import Link from "next/link";
import shark_logo from "../assets/shark_logo.png";
import Image from "next/image";

export default function Navbar() {
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          {/* TODO: Link button that goes to the logged profile */}
          <Link
            href=""
            className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#7b7b7d"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
