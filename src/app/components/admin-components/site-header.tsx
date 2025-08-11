"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/app/components/admin-components/ui/sheet";
import { Button } from "@/src/app/components/admin-components/ui/button";
import {
  MenuIcon,
  LogOutIcon,
  UserIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import Image from "next/image";

export function SiteHeader() {
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
    <header className="sticky top-0 z-40 w-full border-b border-white bg-white text-black">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        {/* Sidebar toggle button (only visible on mobile) */}
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
                  className="h-10 w-30"
                />
              </Link>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-6 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full justify-start hover:bg-gray-800 hover:text-white"
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <Link href="/">Logout</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* A2SV Logo */}
        <Link href="#" className="mr-6 flex items-center space-x-2">
          <Image
            src="/images/a2sv-logo.svg"
            alt="A2SV Logo"
            width={32}
            height={32}
            className="h-10 w-30"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden space-x-6 lg:flex ml-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium hover:text-gray-500"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User controls (only shown on lg+) */}
        <div className="ml-auto hidden items-center space-x-4 lg:flex">
          {userLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center space-x-1 font-medium hover:text-gray-500"
            >
              <UserIcon className="h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          ))}
          <Button variant="ghost" size="sm" className="hover:text-gray-500">
            <LogOutIcon className="mr-2 h-4 w-4" />
            <Link href="/">Logout</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
