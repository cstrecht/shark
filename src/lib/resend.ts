import { Resend } from "resend";
import { SignupEmail } from "@/components/Emails";

// Change this when Resend approves my application, once they approve we should
// send the email to the newUser.email
const RECIPIENT = process.env.EMAIL_RECIPIENT as string;

const resend = new Resend(process.env.RESEND_KEY);

export async function sendSignupEmail(newUser: User) {
  return await resend.emails.send({
    from: process.env.EMAIL_SENDER as string,
    to: RECIPIENT,
    subject: "🦈 Your ID for SharkPool login",
    react: SignupEmail({ newUser }),
  });
}
