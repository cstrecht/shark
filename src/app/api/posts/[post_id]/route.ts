import { deletePost, updatePost } from "@/lib/dummy-api";
import { NextResponse } from "next/server";

type Context = { params: { post_id: string } };

export async function DELETE(
  request: Request,
  { params: { post_id } }: Context
) {
  const data = await deletePost(post_id);

  return NextResponse.json({ data });
}

export async function PUT(request: Request, { params: { post_id } }: Context) {
  const data = await request.json();
  const response = await updatePost(post_id, data);

  return NextResponse.json({ response });
}
