"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // for hamburger icons

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/a2sv-logo.svg"
            alt="A2SV Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/dashboard"
            className="text-gray-900 border-b-2 border-indigo-600 pb-1"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Your Profile
          </Link>
          <Link
            href="/applicant"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Applicant Name
          </Link>
          <Link
            href="/logout"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Logout
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 space-y-3 text-sm font-medium">
            <Link
              href="/dashboard"
              className="text-gray-900 border-b-2 border-indigo-600 pb-1"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Your Profile
            </Link>
            <Link
              href="/applicant"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Applicant Name
            </Link>
            <Link
              href="/logout"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Logout
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
