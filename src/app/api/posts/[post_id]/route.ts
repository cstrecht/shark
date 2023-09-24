import { deletePost, updatePost } from "@/lib/dummy-api";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params: { post_id } }) {
  const data = await deletePost(post_id);

  return NextResponse.json({ data });
}

export async function PUT(request: Request, { params: { post_id } }) {
  const data = await request.json();
  const response = await updatePost(post_id, data);

  return NextResponse.json({ response });
}
