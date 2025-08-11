"use client";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-4 sm:py-6 bg-slate-800 text-center text-white flex flex-col items-center gap-2">
      <hr className="w-3/4 sm:w-1/2 border-t border-white opacity-30 pt-4 sm:pt-6" />
      <p className="text-xs sm:text-sm md:text-base">&copy; {year} A2SV. All rights reserved</p>
    </footer>
  );
};

export default Footer;
