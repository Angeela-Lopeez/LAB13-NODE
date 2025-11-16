import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  findUserByEmail,
  verifyPassword,
  recordFailedAttempt,
  resetAttempts,
  isBlocked,
} from "@/lib/userStore";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      id: "credentials",   // 🔥 IMPORTANTE 🔥
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email;

        if (isBlocked(email)) {
          throw new Error(
            "Too many failed attempts. Please try again in a few minutes."
          );
        }

        const user = await findUserByEmail(email);
        if (!user) {
          recordFailedAttempt(email);
          return null;
        }

        const isValid = await verifyPassword(user, credentials.password);
        if (!isValid) {
          recordFailedAttempt(email);
          return null;
        }

        resetAttempts(email);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (!session.user) session.user = {} as any;

      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string | null;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
