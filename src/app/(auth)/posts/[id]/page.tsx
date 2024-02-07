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
      <div className="post-page">
        <div>
          <GoBackButton url="/" />
          <div className="flex">
            {currentUser.id === post.owner.id ? (
              <Image
                src={shark_default}
                alt="Default profile picture"
                width={20}
                height={20}
                className="profile-pic"
              />
            ) : (
              <img
                src={post.owner.picture}
                alt="User Profile picture"
                className="profile-pic"
              />
            )}
            <Link className="post-name" href={`/users/${post.owner.id}`}>
              {post.owner.firstName} {post.owner.lastName}
            </Link>
          </div>
          <div className="post-text">{post.text === "" ? "-" : post.text}</div>
        </div>
      </div>
      <div className="post-image-container">
        <img className="post-image" src={post.image} alt="Post image" />
      </div>
      <div className="my-6 flex text-grey">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="heart-svg h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className="pl-1 pt-1 text-base md:text-lg">{post.likes}</span>
      </div>
      <CreateCommentForm post_id={post.id} />
      <ul>
        {paginatedComments.data.map((comment) => (
          <li key={comment.id} className="my-5">
            <div className="flex gap-2 sm:gap-4">
              {comment.owner?.picture === undefined ? (
                <Image
                  src={shark_default}
                  alt="logo"
                  width={20}
                  height={20}
                  className="user-picture"
                />
              ) : (
                <img
                  className="user-picture"
                  src={comment.owner?.picture}
                  alt="Profile picture"
                />
              )}
              <div className="comment-container">
                <div>
                  {currentUser.id === comment.owner?.id ? (
                    <Link
                      className="comment-username"
                      href={`/profile/${currentUser.firstName}`}
                    >
                      {comment.owner?.firstName}
                    </Link>
                  ) : (
                    <Link
                      className="comment-username"
                      href={`/users/${comment.owner?.id}`}
                    >
                      {comment.owner?.firstName}
                    </Link>
                  )}
                  <p className="comment">{comment.message}</p>
                </div>
                <div>
                  {currentUser.id === comment.owner?.id && (
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
