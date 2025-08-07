"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock } from "lucide-react"
import { Footer } from "../../components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"
import { MenuIcon, XIcon } from "lucide-react"

async function refreshAccessToken() {
  const refreshToken =
    localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken")
  if (!refreshToken) return null

  try {
    const res = await fetch(
      "https://a2sv-application-platform-backend-team6.onrender.com/auth/token/refresh",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    )

    const data = await res.json()
    if (res.ok && data.success) {
      const newAccessToken = data.data.access
      if (localStorage.getItem("refreshToken")) {
        localStorage.setItem("accessToken", newAccessToken)
      } else {
        sessionStorage.setItem("accessToken", newAccessToken)
      }
      return newAccessToken
    } else {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("refreshToken")
      return null
    }
  } catch (error) {
    console.error("Error refreshing access token:", error)
    return null
  }
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link href="#" className="hover:text-indigo-600 transition-colors duration-200">
          The Journey
        </Link>
        <Link href="#" className="hover:text-indigo-600 transition-colors duration-200">
          About
        </Link>
        <Link href="#" className="hover:text-indigo-600 transition-colors duration-200">
          Testimonials
        </Link>
        <Link href="/auth/signup">
          <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 hover:scale-105">
            Sign In
          </Button>
        </Link>
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed top-5 right-5 z-[60] bg-white w-80 max-w-[90%] shadow-lg rounded-lg md:hidden"
          >
            <div className="flex flex-col gap-6 py-6 px-4">
              <button
                className="self-end text-gray-600 hover:text-gray-800 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="h-6 w-6" />
              </button>
              <nav className="flex flex-col gap-4 items-center">
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >
                  The Journey
                </Link>
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >
                  Testimonials
                </Link>
                <Link href="/auth/signup" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-md shadow-lg text-lg transition-transform duration-300 hover:scale-105">
                    Sign In
                  </Button>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team6.onrender.com/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await res.json()

      if (res.ok && data.success) {
        const { access, refresh, role } = data.data

        if (rememberMe) {
          localStorage.setItem("accessToken", access)
          localStorage.setItem("refreshToken", refresh)
        } else {
          sessionStorage.setItem("accessToken", access)
          sessionStorage.setItem("refreshToken", refresh)
        }

        toast.success("Login successful")

        if (role === "applicant") {
          router.push("/applicant/dashboard")
        } else if (role === "reviewer") {
          router.push("/reviewer/dashboard")
        } else if (role === "manager") {
          router.push("/manager/dashboard")
        } else if (role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/")
        }
      } else {
        setError(data.message || "Login failed. Please check your credentials.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md space-y-6 text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/images/a2sv-logo.svg"
              width={150}
              height={36}
              alt="A2SV Logo"
            />
            <h1 className="text-3xl font-bold text-black">Sign in to your account</h1>
            <div className="text-sm text-gray-600 flex gap-2">
              <Link href="/" className="text-indigo-500 hover:underline">
                Back to Home
              </Link>
              <span>|</span>
              <Link href="/auth/signup" className="text-indigo-500 hover:underline">
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
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      setRememberMe(checked)
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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

