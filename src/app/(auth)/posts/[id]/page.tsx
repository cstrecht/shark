import Link from "next/link";
import { CreateCommentForm } from "@/components/Forms";
import { DeleteButton, GoBackButton } from "@/components/Buttons";
import { getPostById, getCommentsFromPost } from "@/lib/dummy-api";
import { useUser } from "@/lib/auth";
import shark_default from "../../../../assets/shark_default.jpg";
import Image from "next/image";

type PageProps = { params: { id: string } };

export default async function Post({ params: { id } }: PageProps) {
  const currentUser = await useUser();
  const post = await getPostById(id);
  const paginatedComments = await getCommentsFromPost(id);

  return (
    <section>
      <div className="flex justify-between text-xl my-6">
        <div>
          <GoBackButton url="/" />
          <div className="flex">
            {currentUser.id === post.owner.id ? (
              <Image
                src={shark_default}
                alt="Default profile picture"
                width={20}
                height={20}
                className="rounded-full h-12 w-12"
              />
            ) : (
              <img
                src={post.owner.picture}
                alt="User Profile picture"
                className="rounded-full h-12 w-12"
              />
            )}

            <Link
              className="text-shark-blue pt-4 pl-4"
              href={`/users/${post.owner.id}`}
            >
              {post.owner.firstName} {post.owner.lastName}
            </Link>
          </div>
          <div className="text-2xl mt-2">
            {post.text === "" ? "-" : post.text}
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white rounded-lg">
        <img
          className="h-1/2 w-1/2 object-cover"
          src={post.image}
          alt="Post image"
        />
      </div>

      <div className="flex text-grey my-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 heart-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className="pt-1 pl-1 text-lg"> {post.likes}</span>
      </div>
      <CreateCommentForm post_id={post.id} />
      <ul>
        {paginatedComments.data.map((comment) => (
          <li key={comment.id} className="my-5">
            <div className="flex gap-4">
              {comment.owner.picture === undefined ? (
                <Image
                  src={shark_default}
                  alt="logo"
                  width={20}
                  height={20}
                  className="rounded-full w-10 h-10"
                />
              ) : (
                <img
                  className="rounded-full w-10 h-10"
                  src={comment.owner.picture}
                  alt="Profile picture"
                />
              )}

              <div className="bg-white flex gap-24 flex-between rounded-xl py-2 px-4">
                <div>
                  {currentUser.id === comment.owner.id ? (
                    <Link
                      className="text-orange-400 font-bold"
                      href={`/profile/${currentUser.firstName}`}
                    >
                      {comment.owner.firstName}
                    </Link>
                  ) : (
                    <Link
                      className="text-orange-400 font-bold"
                      href={`/users/${comment.owner.id}`}
                    >
                      {comment.owner.firstName}
                    </Link>
                  )}
                  <p className="font-light"> {comment.message}</p>
                </div>
                <div>
                  {currentUser.id === comment.owner.id && (
                    <DeleteButton
                      apiUrl={`/api/posts/${post.id}/comments/${comment.id}`}
                    />
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
