"use client";

import React from "react";

export default function HeaderProgress() {
  return (
    <header className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Your Application Progress
      </h1>
      <p className="text-gray-500 mt-1 text-sm sm:text-base">
        You are on your way! Here is a summary of your application status.
      </p>
    </header>
  );
}
