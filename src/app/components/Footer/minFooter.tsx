"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-700 pt-4">
        <p>© {new Date().getFullYear()} A2SV. All rights reserved.</p>
      </div>
    </footer>
  );
}
