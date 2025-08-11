import React from "react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-gray-700 bg-gray-900 py-15 text-center text-sm text-gray-400 ">
      <p>&copy; {new Date().getFullYear()} A2SV. All rights reserved.</p>
    </footer>
  );
}
