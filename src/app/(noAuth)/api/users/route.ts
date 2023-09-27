import { NextResponse } from "next/server";
import { createUser } from "@/lib/dummy-api";

export async function POST(request: Request) {
  const data = await request.json();
  const newUser = await createUser(data);

  return NextResponse.json({ newUser });
}
