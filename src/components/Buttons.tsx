"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ apiUrl }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(apiUrl, { method: "delete" });

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }

    return router.refresh();
  };

  return <button onClick={() => handleDelete()}>🗑️</button>;
}
