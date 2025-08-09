"use client";

import React from "react";

interface WelcomeHeaderProps {
  username: string;
}

export default function HeaderWelcome({ username }: WelcomeHeaderProps) {
  return (
    <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6 px-4">
      <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
        Welcome, {username}!
      </h1>
      <p className="text-gray-500 text-sm sm:text-base max-w-xs sm:max-w-none">
        Your journey to a global tech career starts now.
      </p>
    </header>
  );
}
