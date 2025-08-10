"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/app/components/analytics-components/ui/dropdown-menu";
import { Button } from "@/src/app/components/analytics-components/ui/button";
import { Separator } from "@/src/app/components/analytics-components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/app/components/analytics-components/ui/sheet";
import { MenuIcon, UserIcon, LayoutDashboardIcon } from "lucide-react";

export function Header() {
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
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Sidebar toggle button and logo (always together at left) */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
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
                  className="h-8 w-30 ml-2 md:ml-50"
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
              <div className="mt-4 border-t border-gray-700 pt-4 ">
                {userLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 "
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="/images/a2sv-logo.svg"
            alt="A2SV Logo"
            width={40}
            height={10}
            className="h-8 w-30 ml-2 md:ml-50"
          />
        </Link>
      </div>
      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-gray-600 hover:text-gray-900${
              link.name === "Analytics" ? " text-purple-600 font-semibold" : ""
            }`}
            prefetch={false}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {/* User controls */}
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {userLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-gray-900"
              prefetch={false}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Separator orientation="vertical" className="h-6 hidden md:block" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-8 h-8"
            >
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
