"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo + Navigation */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <Image
            src="/images/A2sv_logo.svg"
            alt="A2SV Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <Link
            href="/"
            className="text-gray-900 font-medium border-b-2 border-blue-600 pb-1"
          >
            Dashboard
          </Link>
        </div>

        {/* Right-side links (stay horizontal on all screen sizes) */}
        <div className="flex flex-row items-center space-x-4 mt-4 sm:mt-0">
          <Link
            href="/profile"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Your Profile
          </Link>
          <Link
            href="/applicant"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Applicant Name
          </Link>
          <Link
            href="/logout"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
