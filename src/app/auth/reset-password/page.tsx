"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "../../components/Footer";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50"
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/a2sv-logo.svg"
          width={100}
          height={32}
          alt="A2SV Logo"
          className="h-8 w-auto"
        />
      </Link>
    </motion.header>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      return setError("Please fill in both fields.");
    }
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!token) {
      return setError("Invalid or missing token.");
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team6.onrender.com/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            new_password: newPassword,
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(
          data.message || "Your password has been successfully reset."
        );
        setTimeout(() => {
          router.replace("/auth/reset-password/confirmation");
        }, 1000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Integrated Header */}
      <Header />
      {/* Reset Password Content */}
      <main className="flex-1 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-md p-6 md:p-8 space-y-6 bg-white rounded-lg shadow-xl text-center border border-gray-200">
          <CardContent className="p-0">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/a2sv-logo.svg"
                width={150}
                height={48}
                alt="A2SV Logo"
                className="h-12 w-auto"
              />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Reset your password
            </h2>
            <p className="text-gray-500 text-base mb-6">
              Please choose a strong, new password for your account.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full"
                required
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-md font-semibold shadow-md transition-all duration-200"
              >
                {loading ? "Submitting..." : "Update Password"}
              </Button>
            </form>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            {message && (
              <p className="mt-4 text-sm text-green-600">{message}</p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
