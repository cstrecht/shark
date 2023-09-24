import { NextResponse } from "next/server";
import { createCommentOnPost } from "@/lib/dummy-api";

export async function POST(request: Request) {
  let data = await request.json();

  const response = await createCommentOnPost(data);

  return NextResponse.json({ response });
}
