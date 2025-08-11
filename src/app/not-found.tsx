"use client";
import React from "react";

export default function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
