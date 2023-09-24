//3
import Link from "next/link";
import { CreateCommentForm } from "@/components/Forms";
import { DeleteButton } from "@/components/Buttons";
import { getPostById, getCommentsFromPost } from "@/lib/dummy-api";

type PageProps = { params: { id: string } };

export default async function Post({ params: { id } }: PageProps) {
  let post = await getPostById(id);
  let paginatedComments = await getCommentsFromPost(id);

  return (
    <section>
      <div>
        Post from{" "}
        <Link className="text-blue-600" href={`/users/${post.owner.id}`}>
          {post.owner.firstName}
        </Link>
        : {post.text}
      </div>

      <p>Comments:</p>
      <ul>
        {paginatedComments.data.map((comment) => (
          <li key={comment.id}>
            <p>
              {" "}
              <Link
                className="text-orange-400"
                href={`/users/${comment.owner.id}`}
              >
                {comment.owner.firstName}{" "}
              </Link>
              : {comment.message}
            </p>

            <DeleteButton
              apiUrl={`/api/posts/${post.id}/comments/${comment.id}`}
            />
          </li>
        ))}
      </ul>
      <CreateCommentForm post_id={post.id} />
    </section>
  );
}
