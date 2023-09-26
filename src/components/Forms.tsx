"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type CreateCommentFormProps = { post_id: string };
type EditPostFormProps = { post: Post };

export function CreateCommentForm({ post_id }: CreateCommentFormProps) {
  const router = useRouter();
  // TODO: change this whenever we have sessions implemented
  const owner = "650cce20f517400e64f56faa";
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Avoid default redirect from form submission
    event.preventDefault();

    // Get the form data from the submit event
    const form = event.currentTarget;
    // Adjust the data for our needs.
    const data = {
      message: form.message.value,
      owner: owner,
      post: post_id,
    };

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
  // TODO: change this whenever we have sessions implemented
  const owner = "650cce20f517400e64f56faa";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const data = {
      text: form.text.value,
      image: form.image.value,
      owner: owner,
    };
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
        type="text"
        name="image"
        placeholder="Your image URL"
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
