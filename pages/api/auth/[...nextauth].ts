import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


interface CustomUser {
  id: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  remember: string | boolean;
}

interface CustomToken {
  id: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  remember: string | boolean;
  accessTokenExpires: number;
}

// Extend the NextAuth Session to include our custom properties
interface ExtendedSession extends Session {
  accessToken: string;
  remember: string | boolean;
  accessTokenExpires: number;
}

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
        const res = await fetch(
          "https://a2sv-application-platform-backend-team6.onrender.com/auth/token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        const data = await res.json();
        if (res.ok && data.success) {
          return {
            id: data.data.userId,
            email: credentials?.email,
            role: data.data.role,
            accessToken: data.data.access,
            refreshToken: data.data.refresh,
            remember: credentials?.remember,
          } as CustomUser;
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
        const u = user as CustomUser;
        token.id = u.id;
        token.email = u.email;
        token.role = u.role;
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        token.remember = u.remember;
        token.accessTokenExpires =
          u.remember === "true" || u.remember === true
            ? Date.now() + 30 * 24 * 60 * 60 * 1000
            : Date.now() + 24 * 60 * 60 * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as unknown as CustomToken; // Cast token safely
      // Construct a new session object with the extra properties.
      const extendedSession: ExtendedSession = {
        ...session,
        user: {
          ...session.user,
          id: t.id,
          email: t.email,
          role: t.role,
        },
        accessToken: t.accessToken,
        remember: t.remember,
        accessTokenExpires: t.accessTokenExpires,
      };
      return extendedSession;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
});