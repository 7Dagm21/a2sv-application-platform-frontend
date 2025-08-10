"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    if (accessToken && role && role.toLowerCase() === "admin") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team6.onrender.com/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        const { access, refresh } = data.data;

        // Store tokens and explicitly store the role as "admin".
        if (rememberMe) {
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          localStorage.setItem("role", "admin");
        } else {
          sessionStorage.setItem("accessToken", access);
          sessionStorage.setItem("refreshToken", refresh);
          sessionStorage.setItem("role", "admin");
        }

        toast.success("Login successful");

        // Immediately replace the current route to admin dashboard.
        router.replace("/admin/dashboard");
      } else {
        toast.error(data.message || "Login failed. Check your credentials.");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="w-full py-4 px-6 shadow-sm border-b border-gray-100 bg-white/80 backdrop-blur-md"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/a2sv-logo.svg"
              width={150}
              height={36}
              alt="A2SV Logo"
            />
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 my-8">
        {/* Login Card */}
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
          <h1 className="text-3xl font-bold text-black">Admin Login</h1>

          <form className="space-y-4 text-left" onSubmit={handleLogin}>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      setRememberMe(checked);
                    }
                  }}
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Link href="/" className="text-sm text-indigo-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
