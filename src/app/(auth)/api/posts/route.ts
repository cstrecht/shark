import { NextResponse } from "next/server";
import { createPost } from "@/lib/dummy-api";
import { useUser } from "@/lib/auth";

export async function POST(request: Request) {
  // We need to get the current user here and not on the form to avoid showing
  // on the client side (browser network) the user that is logged in.
  const currentUser = await useUser();
  let data = await request.json();
  data.owner = currentUser.id;

  const response = await createPost(data);

  return NextResponse.json({ response });
}
