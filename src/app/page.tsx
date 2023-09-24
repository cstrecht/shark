//1
import { DeleteButton, PostButton } from "@/components/Buttons";
import { getPosts } from "@/lib/dummy-api";
import Link from "next/link";

export default async function Home() {
  let paginatedPosts = await getPosts();
  console.log(paginatedPosts);

  return (
    <section>
      <PostButton />
      <ul>
        {paginatedPosts.data.map((post) => (
          <div className="w-full px-10 my-4 py-6 bg-white rounded-lg shadow-md">
            <li key={post.id}>
              <div className="flex justify-between">
                <div>
                  <div className="text-red-700 text-sm text-grey">
                    <img
                      className="rounded-full w-10 h-10"
                      src={post.owner.picture}
                      alt="User"
                    />
                    Posted by{" "}
                    <Link
                      href={`/users/${post.owner.id}`}
                      className="text-shark-blue hover:underline"
                    >
                      {post.owner.firstName}
                    </Link>
                  </div>
                  <Link href={`/posts/${post.id}`} className="text-2xl my-2">
                    {post.text === "" ? "-" : post.text}
                  </Link>
                  <Link href={`/posts/${post.id}`} className="text-2xl my-2">
                    {post.text === "" ? "-" : post.text}
                  </Link>
                </div>

                <div>
                  <div className="flex gap-3">
                    <DeleteButton apiUrl={`/api/posts/${post.id}`} />
                    <Link
                      className="bg-orange-500 m-4"
                      href={`/posts/${post.id}/edit`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 ml-2 update-icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    <div className="flex gap-2 text-grey items-center">
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
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href={`/posts/${post.id}`}
                className="flex justify-center bg-white rounded-lg"
              >
                <img
                  className="h-52 w-4/5 object-none rounded-xl"
                  src={post.image}
                  alt="Post image"
                />
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </section>
  );
}
