import { deleteCommentFromPost } from "@/lib/dummy-api";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params: { comment_id } }) {
  const data = await deleteCommentFromPost(comment_id);

  return NextResponse.json({ data });
}
