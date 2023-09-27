import Link from "next/link";
import { getPostsFromUser, getUserById } from "@/lib/dummy-api";
import { useUser } from "@/lib/auth";

type PageProps = { params: { id: string } };

export default async function User({ params: { id } }: PageProps) {
  let user = await getUserById(id);
  let paginatedUserPosts = await getPostsFromUser(id);
  const currentUser = await useUser();

  return (
    <section className="flex justify-around gap-12">
      <div className="bg-white h-fit w-1/2 p-4 rounded-xl shadow flex flex-col items-center justify-center">
        <img
          className="w-20 h-20 my-2 rounded-full ring-2 ring-shark-blue "
          src={user.picture}
          alt="Profile pic"
        />

        <h1 className="text-3xl text-shark-blue font-medium text-gray-700">
          {user.firstName} {user.lastName}
        </h1>
        <p className="font-light text-grey">
          📍 {user.location?.city}, {user.location?.country}
        </p>
        <div className="text-center flex flex-col gap-2 my-6 text-sm">
          <p>{user.gender}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.location?.timezone}h away from me</p>
        </div>
      </div>
      {/* Posts section */}
      <div className="bg-white w-full h-[750px] overflow-y-scroll overflow-auto p-4 rounded-xl shadow">
        <p className="text-lg text-shark-blue text-gray-700">
          What {user.firstName} is posting lately
        </p>
        <ul>
          {paginatedUserPosts.data.map((post) => (
            <li
              key={post.id}
              className="w-full border border-light-grey px-10 my-4 bg-white rounded-lg shadow-md"
            >
              <Link href={`/posts/${post.id}`}>
                <div className="flex justify-between text-xl my-6">
                  <div>{post.text === "" ? "-" : post.text}</div>
                </div>
                <div>
                  <img
                    className="h-80 w-full object-cover rounded"
                    src={post.image}
                    alt=""
                  />
                </div>
              </Link>
              <div className="flex text-grey my-6">
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
                {post.likes}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
