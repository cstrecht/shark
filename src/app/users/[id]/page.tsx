import { getPostsFromUser, getUserById } from "@/lib/dummy-api";
import Link from "next/link";

//5
type PageProps = { params: { id: string } };

export default async function User({ params: { id } }: PageProps) {
  let user = await getUserById(id);
  let paginatedUserPosts = await getPostsFromUser(id);

  return (
    <>
      <h1> {user.firstName}'s profile:</h1>

      <p>What {user.firstName} is posting lately:</p>
      <ul>
        {paginatedUserPosts.data.map((post) => (
          <li
            key={post.id}
            className="text-black bg-slate-50 rounded-sm m-4 w-fit"
          >
            <Link href={`/posts/${post.id}`}>
              <p>
                Post: {post.text === "" ? "This post has no text" : post.text}
              </p>
              <p>Published at: {post.publishDate}</p>
              <p>Likes: {post.likes}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
