//1
import { DeleteButton } from "@/components/Buttons";
import { getPosts } from "@/lib/dummy-api";
import Link from "next/link";

export default async function Home() {
  let paginatedPosts = await getPosts();

  return (
    <>
      <div>Home: Show list of posts here!</div>
      <Link className="bg-red-700 m-4" href="/posts/new">
        Create
      </Link>
      <ul>
        {paginatedPosts.data.map((post) => (
          <li
            className="text-black bg-purple-200 rounded-sm py-6 px-2 m-3"
            key={post.id}
          >
            {post.text}

            <Link className="text-red-700" href={`/users/${post.owner.id}`}>
              {post.owner.firstName}
            </Link>

            <div className="flex gap-3">
              <DeleteButton apiUrl={`/api/posts/${post.id}`} />

              <Link
                className="bg-orange-500 m-4 text-white"
                href={`/posts/${post.id}/edit`}
              >
                ✏️
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
