import { NextResponse } from "next/server";
import { createCommentOnPost } from "@/lib/dummy-api";
import { useUser } from "@/lib/auth";

export async function POST(request: Request) {
  const currentUser = await useUser();
  let data = await request.json();
  data.owner = currentUser.id;

  const response = await createCommentOnPost(data);

  return NextResponse.json({ response });
}
