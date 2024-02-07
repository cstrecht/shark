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
      <div className="flex gap-2 md:gap-8">
        <textarea
          className="comment-area"
          name="message"
          placeholder="Write a comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input className="comment-submit" type="submit" value="Comment" />
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
    <form onSubmit={handleSubmit} className="post-form">
      <textarea className="post-input" name="text" placeholder="Go ahead..." />
      <input
        className="post-input"
        type="url"
        pattern="https://.*"
        name="image"
        placeholder="https://example.com/example.png"
      />

      <input className="btn-create" type="submit" value="Post" />
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
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        className="post-input"
        onChange={handleTextChange}
        name="text"
        value={text}
      />
      <input
        onChange={handleImageChange}
        className="post-input"
        name="image"
        type="text"
        value={image}
      />
      <input className="btn-edit" type="submit" value="Edit" />
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
    <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
      <input
        required
        pattern="^(?!\s*$).+"
        type="text"
        name="userId"
        id="userId"
        className="no-auth-input"
        placeholder="User ID *"
      />
      <button type="submit" className="btn-login">
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
    <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        id="firstName"
        className="no-auth-input"
        placeholder="First name *"
        required
      />
      <input
        type="text"
        name="lastName"
        id="lastName"
        className="no-auth-input"
        placeholder="Last name *"
        required
      />
      <input
        type="email"
        name="email"
        id="email"
        className="no-auth-input"
        placeholder="Email address *"
        required
      />
      <input
        type="text"
        name="phone"
        id="phone"
        className="no-auth-input"
        placeholder="Phone number"
        required
      />
      <input
        type="text"
        name="city"
        id="city"
        className="no-auth-input"
        placeholder="City *"
        required
      />
      <input
        type="text"
        name="country"
        id="country"
        className="no-auth-input"
        placeholder="Country *"
        required
      />
      <select
        defaultValue=""
        name="gender"
        id="gender"
        className="no-auth-select"
      >
        <option value="">I prefer not to share my gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <button type="submit" className="btn-signup">
        Sign Up
      </button>
    </form>
  );
}

// 6516f06997edc09b3fe4bb38
