"use client";

import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon, UserIcon, LayoutDashboardIcon } from "lucide-react";

export default function Header() {
  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "#" },
    { name: "Cycles", href: "/admin/cycle-dashboard" },
    { name: "Analytics", href: "/admin/analytics-dashboard" },
  ];

  const userLinks = [
    { name: "Your Profile", href: "#" },
    { name: "Admin User", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-200 bg-white">
      <div className="flex h-16 items-center px-4 md:px-8">
        {/* Sidebar toggle button (mobile only) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[250px] bg-gray-900 p-0 text-white"
          >
            <div className="flex h-16 items-center px-4">
              <Link href="#" className="flex items-center space-x-2">
                <Image
                  src="/images/a2sv-logo.svg"
                  alt="A2SV Logo"
                  width={32}
                  height={32}
                  className="h-8 w-30 ml-10 md:ml-50"
                />
              </Link>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 ml-0"
                >
                  <LayoutDashboardIcon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="mt-4 border-t border-gray-700 pt-4">
                {userLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo and desktop nav */}
        <Link href="#" className="flex items-center space-x-2 mr-6">
          <Image
            src="/images/a2sv-logo.svg"
            alt="A2SV Logo"
            width={32}
            height={32}
            className="h-8 w-30 ml-10 md:ml-50"
          />
        </Link>

        <nav className="hidden space-x-6 lg:flex md:ml-100 ">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium hover:text-blue-600  "
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User controls (desktop only) */}
        <div className="ml-auto hidden items-center  lg:flex">
          <Button
            className="flex items-center gap-2 text-sm font-medium text-black hover:text-blue-600"
            variant="ghost"
          >
            Your Profile
          </Button>
          <Button
            className="flex items-center gap-2 text-sm font-medium text-black hover:text-blue-600"
            variant="ghost"
          >
            Admin User
          </Button>
        </div>
      </div>
    </header>
  );
}
