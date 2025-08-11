"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const navItems = [
    { name: "Dashboard", href: "/Admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Cycles", href: "admin/cycles" },
    { name: "Analytics", href: "admin/analytics" },
];

const userItems = [
  { name: "Your Profile", href: "/profile" },
  { name: "Admin User", href: "/admin" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-xl border-none sticky top-0 z-50 w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nav */}
          <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-12 md:ml-24 lg:ml-32">
            <Link href="/admin/dashboard" className="flex-shrink-0">
              <Image
                src="/images/a2sv-logo.svg"
                alt="A2SV Logo"
                width={136}
                height={80}
                className="w-12 h-12 sm:w-[90px] sm:h-[90px]"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-4 sm:space-x-6 ml-2 sm:ml-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs sm:text-sm font-medium pb-1 transition-colors duration-200 ${
                    item.name === "Users"
                      ? (pathname?.startsWith('/admin/users')
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600")
                      : (pathname === item.href
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-blue-200")
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Right: Avatar + dropdown */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center gap-2 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900">
                <Image
                  src="/images/a2sv logo.svg"
                  alt="A2SV Logo"
                  width={40}
                  height={40}
                  className="h-8 w-8 sm:h-8 sm:w-auto"
                />
                <ChevronDownIcon className="h-4 w-4" />
              </Menu.Button>

          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
                <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {/* Profile and Admin User */}
                  <div className="py-1">
                    {userItems.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }: { active: boolean }) => (
                          <Link
                            href={item.href}
                            className={`$${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  {/* Logout separated */}
                  <div className="py-1 border-t">
                    <Menu.Item>
                      {({ active }: { active: boolean }) => (
                        <Link
                          href="/logout"
                          className={`$${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-red-600`}
                        >
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 border-t pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium px-2 ${
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-2" />
            {userItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium px-2 text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
