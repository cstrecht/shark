import { NextResponse } from "next/server";
import { deleteCommentFromPost } from "@/lib/dummy-api";

type Context = { params: { comment_id: string } };

export async function DELETE(
  request: Request,
  { params: { comment_id } }: Context
) {
  const data = await deleteCommentFromPost(comment_id);

  return NextResponse.json({ data });
}
