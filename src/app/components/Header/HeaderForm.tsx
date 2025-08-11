"use client";
// import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileLinkerProps {
  username: string;
}
export function Header({ username }: ProfileLinkerProps) {
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
        <Link
          href="/applicant/profile"
          className="hover:text-indigo-600 transition-colors duration-200"
        >
          {username}
        </Link>
        <Link
          href="/app"
          className="hover:text-indigo-600 transition-colors duration-200"
        >
          Logout
        </Link>
      </nav>
    </motion.header>
  );
}
