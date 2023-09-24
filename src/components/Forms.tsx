"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateCommentForm({ post_id }) {
  const router = useRouter();
  // TODO: change this whenever we have sessions implemented
  const owner = "650cce20f517400e64f56faa";

  const handleSubmit = async (event) => {
    // Avoid default redirect from form submission
    event.preventDefault();

    // Get the form data from the submit event
    const form = event.target;
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

    return router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="message" />
      <input type="submit" />
    </form>
  );
}

export function CreatePostForm() {
  const router = useRouter();
  // TODO: change this whenever we have sessions implemented
  const owner = "650cce20f517400e64f56faa";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

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
      className="flex flex-col w-1/2 gap-6 text-black"
      action=""
    >
      <input type="text" name="text" placeholder="text of the post" />
      <input type="text" name="image" placeholder="image URL" />
      <input type="text" name="tags" placeholder="select tags" />
      <input
        className="bg-purple-400 text-white"
        type="submit"
        value="Create"
      />
    </form>
  );
}

export function EditPostForm({ post }) {
  const router = useRouter();
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState(post.image);

  const handleTextChange = (event) => setText(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value);

  const handleSubmit = async (event) => {
    // Avoid default redirect from form submission
    event.preventDefault();

    // Get the form data from the submit event
    const form = event.target;
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
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleTextChange}
        className="text-black bg-purple-700"
        name="text"
        type="text"
        value={text}
      />
      <input
        onChange={handleImageChange}
        className="text-black"
        name="image"
        type="text"
        value={image}
      />
      <input
        className="bg-purple-400 text-white"
        type="submit"
        value="Update"
      />
    </form>
  );
}
