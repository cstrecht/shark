import { NextResponse } from "next/server";
import { createUser } from "@/lib/dummy-api";
import { sendSignupEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const data = await request.json();
  const newUser = await createUser(data);
  sendSignupEmail(newUser);

  return NextResponse.json({ newUser });
}
