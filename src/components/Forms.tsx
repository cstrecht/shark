"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type CreateCommentFormProps = { post_id: string };
type EditPostFormProps = { post: Post };

export function CreateCommentForm({ post_id }: CreateCommentFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = { message: form.message.value, post: post_id };
    const response = await fetch(`/api/posts/${post_id}/comments`, {
      method: "post",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create comment");
    }
    setMessage("");
    return router.refresh();
  };

  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <div className="flex gap-8">
        <textarea
          className="w-full rounded-xl border border-light-grey p-2 text-dark-blue"
          name="message"
          placeholder="Write a comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          className="focus:ring-cyan-300 block rounded-xl bg-shark-blue px-8 py-2 text-center text-base font-bold text-white focus:outline-none focus:ring-4"
          type="submit"
        />
      </div>
    </form>
  );
}

export function CreatePostForm() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = { text: form.text.value, image: form.image.value };
    const response = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    router.push("/");
    return router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black my-4 flex flex-col gap-8"
    >
      <textarea
        className="text-black rounded-md bg-grey2 p-4"
        name="text"
        placeholder="Go ahead..."
      />
      <input
        className="text-black rounded-md bg-grey2 p-4"
        type="url"
        pattern="https://.*"
        name="image"
        placeholder="https://example.com/example.png"
      />

      <input
        className="focus:ring-cyan-300 rounded-full bg-gradient-to-r from-shark-blue to-cyan p-3 text-lg font-bold text-white hover:cursor-pointer hover:bg-gradient-to-bl focus:outline-none focus:ring-4"
        type="submit"
        value="Post"
      />
    </form>
  );
}

export function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState(post.image);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setText(event.currentTarget.value);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) =>
    setImage(event.currentTarget.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Avoid default redirect from form submission
    event.preventDefault();

    // Get the form data from the submit event
    const form = event.currentTarget;
    // Adjust the data for our needs.
    const data = {
      id: post.id,
      text: form.text.value,
      image: form.image.value,
    };

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "put",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to edit post");
    }

    router.push("/");
    return router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black my-4 flex flex-col gap-8"
    >
      <textarea
        className="text-black rounded-md bg-grey2 p-4"
        onChange={handleTextChange}
        name="text"
        value={text}
      />
      <input
        onChange={handleImageChange}
        className="text-black rounded-md bg-grey2 p-4"
        name="image"
        type="text"
        value={image}
      />
      <input
        className="rounded-full bg-light-grey p-3 font-bold text-white hover:cursor-pointer hover:bg-mostard"
        type="submit"
        value="Edit"
      />
    </form>
  );
}

export function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await signIn("credentials", {
      userId: data.get("userId"),
      redirect: false,
    });

    if (response && !response.error) {
      router.push("/");
    } else {
      return new Error("Failed to loggin!");
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <input
        required
        pattern="^(?!\s*$).+"
        type="text"
        name="userId"
        id="userId"
        className="bg-gray-50 focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-grey2 p-2.5 text-shark-blue sm:text-sm"
        placeholder="User ID *"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-shark-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:font-extrabold focus:outline-none focus:ring-4"
      >
        Sign in
      </button>
    </form>
  );
}

export function SignupForm() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      gender: form.gender.value,
      phone: form.phone.value,
      location: {
        city: form.city.value,
        country: form.country.value,
      },
    };

    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return router.push("/login");
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        id="firstName"
        className="text-md block w-full rounded-lg border border-grey2 p-2.5 text-shark-blue focus:border-cyan focus:ring-cyan"
        placeholder="First name *"
        required
      />
      <input
        type="text"
        name="lastName"
        id="lastName"
        className="text-md block w-full rounded-lg border border-grey2 p-2.5 text-shark-blue focus:border-cyan focus:ring-cyan"
        placeholder="Last name *"
        required
      />
      <input
        type="email"
        name="email"
        id="email"
        className="text-md block w-full rounded-lg border border-grey2 p-2.5 text-shark-blue focus:border-cyan focus:ring-cyan"
        placeholder="Email address *"
        required
      />
      <input
        type="text"
        name="phone"
        id="phone"
        className="text-md block w-full rounded-lg border border-grey2 p-2.5 text-shark-blue focus:border-cyan focus:ring-cyan"
        placeholder="Phone number"
        required
      />
      <input
        type="text"
        name="city"
        id="city"
        className="text-md block w-full rounded-lg border border-grey2 p-2.5 text-shark-blue focus:border-cyan focus:ring-cyan"
        placeholder="City *"
        required
      />
      <input
        type="text"
        name="country"
        id="country"
        className="text-md block w-full rounded-lg border border-grey2 p-2.5 text-shark-blue focus:border-cyan focus:ring-cyan"
        placeholder="Country *"
        required
      />
      <select
        defaultValue=""
        name="gender"
        id="gender"
        className="text-md block w-full rounded-lg border border-grey2 bg-white p-2.5 text-light-grey focus:border-shark-blue focus:ring-shark-blue"
      >
        <option value="">I prefer not to share my gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        className="w-full rounded-lg bg-cyan px-5 py-2.5 text-center text-sm font-medium text-white hover:font-extrabold focus:outline-none focus:ring-4"
      >
        Sign Up
      </button>
    </form>
  );
}
