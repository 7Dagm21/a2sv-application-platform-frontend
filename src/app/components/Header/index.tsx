"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { MenuIcon, XIcon } from "lucide-react"

export function Header() {
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
            {/* Full-screen mobile container */}
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