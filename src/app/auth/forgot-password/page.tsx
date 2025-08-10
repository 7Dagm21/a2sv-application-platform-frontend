"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "../../components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { MenuIcon, XIcon } from "lucide-react"

// Local Header Component
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

      {/* Desktop Navigation */}
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
        <Link href="/auth/login">
          <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 hover:scale-105">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
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
              {/* Close Button */}
              <button
                className="self-end text-gray-600 hover:text-gray-800 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="h-6 w-6" />
              </button>
              {/* Mobile Navigation */}
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
                <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      const res = await fetch("https://a2sv-application-platform-backend-team6.onrender.com/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          callback_url: "http://localhost:3000/auth/reset-password"
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setMessage(data.message)
      } else {
        setError(data.message || "Failed to send reset link.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Integrated Header */}
      <Header />

      {/* Forgot Password Content */}
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
              Forgot your password?
            </h2>
            <p className="text-gray-500 text-base mb-6">
              Enter your email and we’ll send you a link to get back into your account.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-800 transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-md font-semibold shadow-md transition-all duration-200"
              >
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
            <Link
              href="/auth/login"
              className="mt-6 block text-sm text-indigo-600 hover:underline transition-colors"
            >
              Back to login
            </Link>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
