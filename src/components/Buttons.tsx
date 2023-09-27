"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type DeleteButtonProps = { apiUrl: string };

export function DeleteButton({ apiUrl }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(apiUrl, { method: "delete" });

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }

    return router.refresh();
  };

  return (
    <button onClick={() => handleDelete()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 trash-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  );
}

export function PostButton() {
  return (
    <div className="fixed bottom-0 right-0 mb-20 mr-12">
      <Link
        href="/posts/new"
        className="block bg-gradient-to-r text-white from-shark-blue to-cyan hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full text-lg font-bold px-8 py-5 text-center mb-2"
      >
        Create Post
      </Link>
    </div>
  );
}

export function LogOutButton() {
  const router = useRouter();

  const handleClick = async () => {
    const data = await signOut({ callbackUrl: "/login", redirect: false });

    router.push(data.url);
  };

  return (
    <button onClick={handleClick}>
      <svg
        className="w-8 h-8 p-1 rounded-lg text-light-grey bg-white "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
        />
      </svg>
    </button>
  );
}
