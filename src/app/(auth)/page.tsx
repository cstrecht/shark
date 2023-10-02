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
            className="w-full px-10 my-4 pb-6 pt-3 bg-white rounded-lg shadow-md"
          >
            <div className="flex justify-between">
              <div>
                <div className="text-red-700 flex items-center text-sm text-grey mb-2">
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
                      className="rounded-full w-10 h-10"
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
                <Link href={`/posts/${post.id}`} className="text-2xl my-2">
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
              className="flex justify-center mt-3 rounded-lg"
            >
              <img
                className="h-52 w-11/12 object-none rounded-2xl"
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
