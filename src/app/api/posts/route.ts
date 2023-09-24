import { NextResponse } from "next/server";
import { createPost } from "@/lib/dummy-api";

export async function POST(request: Request) {
  const data = await request.json();
  const response = await createPost(data);

  return NextResponse.json({ response });
}
