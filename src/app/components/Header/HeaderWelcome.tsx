"use client";

import React from "react";

interface WelcomeHeaderProps {
  username: string;
}

export default function HeaderWelcome({ username }: WelcomeHeaderProps) {
  return (
    <header className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between mb-8 px-2 sm:px-0">
      <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-900">
        Welcome, {username}!
      </h1>
      <p className="text-gray-600 text-sm sm:text-base sm:ml-4 sm:max-w-sm text-left sm:text-right">
        Your journey to a global tech career starts now.
      </p>
    </header>
  );
}
