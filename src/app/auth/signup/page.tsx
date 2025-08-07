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

interface FormData {
  full_name: string
  email: string
  password: string
  confirmPassword: string
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

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    try {
      setLoading(true)
      const res = await fetch("https://a2sv-application-platform-backend-team6.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Registration failed")
      }
      setSuccessMessage(data.message)
      setFormData({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(String(error))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Integrated Header */}
      <Header />

      {/* Sign Up Form */}
      <main className="flex-1 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-md p-8 shadow-lg rounded-xl bg-white border border-gray-200">
          <CardContent className="flex flex-col items-center justify-center gap-6 p-0">
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/images/a2sv-logo.svg"
                alt="A2SV Logo"
                width={600}
                height={600}
                className="h-40 w-40"
              />
              <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight">
                Create Account
              </h1>
              <p className="text-gray-600 text-base">
                Or{" "}
                <Link href="/auth/login" className="text-indigo-600 hover:underline font-medium">
                  sign in to your existing account
                </Link>
              </p>
            </div>
            <form className="w-full space-y-5" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="full_name"
                placeholder="Full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-semibold shadow-md"
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
