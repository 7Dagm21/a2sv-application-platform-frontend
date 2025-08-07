"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: ["easeOut"] },
    },
  };

  return (
    <motion.footer
      className="w-full py-12 px-6 md:px-10 bg-[#221f1f] text-[#9ca3af]"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-1 md:col-span-2 flex flex-col items-start">
          <Link href="#" className="mb-4">
            <Image
              src="/images/a2sv-logo-light.svg"
              width={120}
              height={40}
              alt="A2SV Logo"
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-sm">
            Preparing Africa&apos;s top tech talent for global opportunities.
          </p>
        </div>
        <div className="col-span-1">
          <h4 className="font-semibold text-white mb-4">Solutions</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Student Training
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Corporate Partnership
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Legal
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-[#374151] text-center text-sm">
        &copy; {"2023 A2SV. All rights reserved."}
      </div>
    </motion.footer>
  );
}
