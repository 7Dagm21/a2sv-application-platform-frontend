import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        const res = await fetch("https://a2sv-application-platform-backend-team6.onrender.com/auth/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          return {
            id: data.data.userId,
            email: credentials?.email,
            role: data.data.role,
            accessToken: data.data.access,
            refreshToken: data.data.refresh,
            remember: credentials?.remember,
          };
        }
        throw new Error(data.message || "Login failed");
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Always 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.id = u.id;
        token.email = u.email as string;
        token.role = u.role as string;
        token.accessToken = u.accessToken as string;
        token.refreshToken = u.refreshToken as string;
        token.remember = u.remember; // store the "remember" flag
        token.accessTokenExpires =
          u.remember === "true" || u.remember === true
            ? Date.now() + 30 * 24 * 60 * 60 * 1000
            : Date.now() + 24 * 60 * 60 * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as any;
      session.user = {
        id: t.id,
        email: t.email,
        role: t.role,
      };
      (session as any).accessToken = t.accessToken;
      (session as any).remember = t.remember;
      (session as any).accessTokenExpires = t.accessTokenExpires;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
});