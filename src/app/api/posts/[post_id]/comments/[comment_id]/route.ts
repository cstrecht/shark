import { deleteCommentFromPost } from "@/lib/dummy-api";
import { NextResponse } from "next/server";

type Context = { params: { comment_id: string } };

export async function DELETE(
  request: Request,
  { params: { comment_id } }: Context
) {
  const data = await deleteCommentFromPost(comment_id);

  return NextResponse.json({ data });
}
