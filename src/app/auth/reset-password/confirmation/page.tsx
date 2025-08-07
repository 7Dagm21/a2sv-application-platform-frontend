"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "../../../components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { MenuIcon, XIcon, CheckCircle } from "lucide-react"

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

export default function ActionSuccessfulPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Integrated Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 mt-20 px-4 mb-12">
        <Card className="w-full max-w-md rounded-xl p-8 text-center shadow-2xl transition-all duration-300 hover:shadow-3xl bg-white border border-gray-200">
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4ade80]/20">
              <CheckCircle className="h-12 w-12 text-[#4ade80]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight sm:text-4xl">
              Action Successful!
            </h1>
            <p className="text-base text-[#4b5563] leading-relaxed max-w-xs mx-auto">
              Your password has been reset. You can now log in with your new password.
            </p>
            <Link href="/auth/login">
              <Button className="mt-4 w-full max-w-[200px] bg-[#4f46e5] text-white hover:bg-[#374151] focus:ring-2 focus:ring-[#4f46e5] focus:ring-offset-2 transition-colors duration-200 py-3 rounded-lg text-base font-semibold">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}
