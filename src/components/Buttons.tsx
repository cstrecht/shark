"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type DeleteButtonProps = { apiUrl: string };
type EditButtonProps = { href: string };
type LikeButtonProps = { likes: number };
type GoBackButtonProps = { url: string };

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

export function EditButton({ href }: EditButtonProps) {
  return (
    <button>
      <Link href={href}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 update-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </Link>
    </button>
  );
}

export function LikeButton({ likes }: LikeButtonProps) {
  return (
    <button className="flex gap-2 text-grey items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 heart-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span>{likes}</span>
    </button>
  );
}

export function PostButton() {
  return (
    <button className="fixed bottom-0 right-0 mb-20 mr-12">
      <Link
        href="/posts/new"
        className="block bg-gradient-to-r text-white from-shark-blue to-cyan hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full text-lg font-bold px-8 py-5 text-center mb-2"
      >
        Create Post
      </Link>
    </button>
  );
}

export function LogOutButton() {
  const router = useRouter();

  const handleClick = async () => {
    const data = await signOut({ callbackUrl: "/login", redirect: false });

    router.push(data.url);
  };

  return (
    <button
      className="ring ring-shark-blue py-2 px-6 text-shark-blue text-xs rounded-xl hover:bg-shark-blue hover:text-white"
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}

export function GoBackButton({ url }: GoBackButtonProps) {
  return (
    <button>
      <Link href={url}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </Link>
    </button>
  );
}
