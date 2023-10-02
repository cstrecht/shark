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
          className="text-dark-blue border border-light-grey rounded-xl w-full p-2"
          name="message"
          placeholder="Write a comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          className="block text-white bg-shark-blue focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-xl text-base font-bold px-8 py-2 text-center"
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
      className="flex flex-col text-black gap-8 my-4"
    >
      <textarea
        className="bg-grey2 rounded-md p-4 text-black"
        name="text"
        placeholder="Go ahead..."
      />
      <input
        className="bg-grey2 rounded-md p-4 text-black"
        type="url"
        pattern="https://.*"
        name="image"
        placeholder="https://example.com/example.png"
      />

      <input
        className="bg-gradient-to-r text-white from-shark-blue to-cyan hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full text-lg font-bold p-3 hover:cursor-pointer"
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
      className="flex flex-col text-black gap-8 my-4"
    >
      <textarea
        className="bg-grey2 rounded-md p-4 text-black"
        onChange={handleTextChange}
        name="text"
        value={text}
      />
      <input
        onChange={handleImageChange}
        className="bg-grey2 rounded-md p-4 text-black"
        name="image"
        type="text"
        value={image}
      />
      <input
        className="bg-light-grey rounded-full hover:bg-mostard text-white p-3 font-bold hover:cursor-pointer"
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
        className="bg-gray-50 border text-shark-blue border-grey2 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder="User ID *"
      />
      <button
        type="submit"
        className="w-full text-white bg-shark-blue focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:font-extrabold"
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
        className="border text-shark-blue border-grey2 text-md rounded-lg focus:ring-cyan focus:border-cyan block w-full p-2.5"
        placeholder="First name *"
        required
      />
      <input
        type="text"
        name="lastName"
        id="lastName"
        className="border text-shark-blue border-grey2 text-md rounded-lg focus:ring-cyan focus:border-cyan block w-full p-2.5"
        placeholder="Last name *"
        required
      />
      <input
        type="email"
        name="email"
        id="email"
        className="border text-shark-blue border-grey2 text-md rounded-lg focus:ring-cyan focus:border-cyan block w-full p-2.5"
        placeholder="Email address *"
        required
      />
      <input
        type="text"
        name="phone"
        id="phone"
        className="border text-shark-blue border-grey2 text-md rounded-lg focus:ring-cyan focus:border-cyan block w-full p-2.5"
        placeholder="Phone number"
        required
      />
      <input
        type="text"
        name="city"
        id="city"
        className="border text-shark-blue border-grey2 text-md rounded-lg focus:ring-cyan focus:border-cyan block w-full p-2.5"
        placeholder="City *"
        required
      />
      <input
        type="text"
        name="country"
        id="country"
        className="border text-shark-blue border-grey2 text-md rounded-lg focus:ring-cyan focus:border-cyan block w-full p-2.5"
        placeholder="Country *"
        required
      />
      <select
        defaultValue=""
        name="gender"
        id="gender"
        className="border text-light-grey bg-white border-grey2 text-md rounded-lg focus:ring-shark-blue focus:border-shark-blue block w-full p-2.5"
      >
        <option value="">I prefer not to share my gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        className="w-full text-white bg-cyan focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:font-extrabold"
      >
        Sign Up
      </button>
    </form>
  );
}
