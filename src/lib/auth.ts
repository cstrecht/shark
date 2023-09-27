import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { getUserById } from "./dummy-api";
import { redirect } from "next/navigation";

export async function useUser() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return session.user;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        session.user = user;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        userId: {
          label: "User ID",
          type: "text",
          placeholder: "User ID",
        },
      },
      async authorize(credentials) {
        if (credentials) {
          return await getUserById(credentials.userId);
        }

        return null;
      },
    }),
  ],
};
