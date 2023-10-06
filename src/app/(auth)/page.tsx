import Link from "next/link";
import {
  DeleteButton,
  EditButton,
  LikeButton,
  PostButton,
} from "@/components/Buttons";
import { getPosts } from "@/lib/dummy-api";
import { useUser } from "@/lib/auth";
import shark_default from "../../assets/shark_default.jpg";
import Image from "next/image";

export default async function Home() {
  const currentUser = await useUser();
  const paginatedPosts = await getPosts();

  console.log(currentUser.picture);

  return (
    <section>
      <PostButton />
      <ul>
        {paginatedPosts.data.map((post) => (
          <li
            key={post.id}
            className="my-4 w-full rounded-lg bg-white px-10 pb-6 pt-3 shadow-md"
          >
            <div className="flex justify-between">
              <div>
                <div className="text-red-700 mb-2 flex items-center text-sm text-grey">
                  {post.owner.picture === undefined ? (
                    <Image
                      src={shark_default}
                      alt="logo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post.owner.picture}
                      alt="Profile picture"
                    />
                  )}

                  <div className="pl-2">
                    Posted by{" "}
                    {currentUser.id === post.owner.id ? (
                      <Link
                        href={`/users/${currentUser.id}`}
                        className="text-shark-blue hover:underline"
                      >
                        {post.owner.firstName}
                      </Link>
                    ) : (
                      <Link
                        href={`/users/${post.owner.id}`}
                        className="text-shark-blue hover:underline"
                      >
                        {post.owner.firstName}
                      </Link>
                    )}
                  </div>
                </div>
                <Link href={`/posts/${post.id}`} className="my-2 text-2xl">
                  {post.text === "" ? "-" : post.text}
                </Link>
              </div>
              <div className="flex flex-row gap-7">
                {currentUser.id === post.owner.id && (
                  <div className="flex flex-row gap-8">
                    <DeleteButton apiUrl={`/api/posts/${post.id}`} />
                    <EditButton href={`/posts/${post.id}/edit`} />
                  </div>
                )}
                <LikeButton likes={post.likes} />
              </div>
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="mt-3 flex justify-center rounded-lg"
            >
              <img
                className="h-52 w-11/12 rounded-2xl object-none"
                src={post.image}
                alt="Post image"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
