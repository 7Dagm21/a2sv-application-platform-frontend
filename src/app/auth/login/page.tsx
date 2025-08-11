"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";
import { Footer } from "../../components/Footer";
import { signIn, useSession, getSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Only redirect if authenticated AND token exists
  useEffect(() => {
    if (status !== "authenticated") return;
    // @ts-ignore
    if (!session?.accessToken) return;
    const role = session?.user?.role;
    if (role === "applicant") {
      router.replace("/applicant/dashboard/welcome");
    } else if (role === "reviewer") {
      router.replace("/reviewer/dashboard");
    } else if (role === "manager") {
      router.replace("/manager/dashboard");
    } else if (role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      remember: rememberMe ? "true" : "false",
    });
    setLoading(false);

    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      return;
    }

    const fresh = await getSession();
    // @ts-ignore
    if (!fresh?.accessToken) {
      toast.error("Login failed: No access token.");
      return;
    }
    const role = fresh?.user?.role;
    if (role === "applicant") {
      router.replace("/applicant/dashboard/welcome");
    } else if (role === "reviewer") {
      router.replace("/reviewer/dashboard");
    } else if (role === "manager") {
      router.replace("/manager/dashboard");
    } else if (role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md space-y-6 text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/images/a2sv-logo.svg"
              width={150}
              height={36}
              alt="A2SV Logo"
            />
            <h1 className="text-3xl font-bold text-black">
              Sign in to your account
            </h1>
            <div className="text-sm text-gray-600 flex gap-2">
              <Link href="/" className="text-indigo-500 hover:underline">
                Back to Home
              </Link>
              <span>|</span>
              <Link
                href="/auth/signup"
                className="text-indigo-500 hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
          <form className="space-y-4 text-left" onSubmit={handleLogin}>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    typeof checked === "boolean" && setRememberMe(checked)
                  }
                />
                <label htmlFor="remember-me" className="text-gray-600">
                  Remember me
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-indigo-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Lock className="w-4 h-4" />
              {loading ? "Logging in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
