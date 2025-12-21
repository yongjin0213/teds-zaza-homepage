import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowlist = (process.env.ADMIN_EMAIL_ALLOWLIST || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!allowlist.length) return false;
      const email = user.email?.toLowerCase() ?? "";
      return allowlist.includes(email);
    },
    async session({ session }) {
      return session;
    },
  },
});
