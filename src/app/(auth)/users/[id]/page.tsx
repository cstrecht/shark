import Link from "next/link";
import { getPostsFromUser, getUserById } from "@/lib/dummy-api";
import { useUser } from "@/lib/auth";
import { LogOutButton } from "@/components/Buttons";
import shark_default from "../../../../assets/shark_default.jpg";
import Image from "next/image";

type PageProps = { params: { id: string } };

export default async function User({ params: { id } }: PageProps) {
  let user = await getUserById(id);
  let paginatedUserPosts = await getPostsFromUser(id);
  console.log(paginatedUserPosts);
  const currentUser = await useUser();

  return (
    <section className="profile-section">
      <div className="profile-card">
        {currentUser.picture === undefined ? (
          <Image
            src={shark_default}
            alt="Default profile picture"
            width={60}
            height={60}
            className="h-28 w-28 rounded-full"
          />
        ) : (
          <img
            src={user.picture}
            alt="User Profile picture"
            className="h-28 w-28 rounded-full"
          />
        )}

        <h1 className="profile-name">
          {user.firstName} {user.lastName}
        </h1>

        <div className="profile-info">
          {user.location?.city && user.location?.country && (
            <p>
              📍 {user.location?.city}, {user.location?.country}
            </p>
          )}
          {user.gender && (
            <p className="capitalize">{`💫 gender: ${user.gender}`}</p>
          )}
          {user.email && <p>{`📧 ${user.email}`}</p>}
          {user.phone && <p> {`📞 ${user.phone}`}</p>}
          {currentUser.id != user.id && (
            <p> {`🌎 ${user.location?.timezone}h away from me`}</p>
          )}
        </div>

        {currentUser.id === user.id && (
          <div>
            <LogOutButton />
          </div>
        )}
      </div>

      {/* Posts section */}

      <div className="profile-posts">
        <p className="text-center text-2xl text-shark-blue lg:text-left">
          {currentUser.id === user.id
            ? "My posts"
            : `What ${user.firstName} is posting lately`}
        </p>

        {paginatedUserPosts.data.length === 0 ? (
          <p className="text-sm font-light text-grey">No posts yet.</p>
        ) : (
          <ul>
            {paginatedUserPosts.data.map((post) => (
              <li key={post.id} className="profile-post">
                <Link href={`/posts/${post.id}`}>
                  <div>
                    <div className="my-6 flex justify-between text-xl">
                      <div>{post.text === "" ? "-" : post.text}</div>
                    </div>
                    <img
                      className="h-80 w-full rounded object-cover "
                      src={post.image}
                      alt="Posted image"
                    />
                  </div>
                </Link>
                <div className="my-6 flex text-grey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="heart-svg h-6 w-6"
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
        )}
      </div>
    </section>
  );
}
