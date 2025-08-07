"use client";
import { ArrowRight } from "lucide-react";

export function InterviewCard() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 sm:p-6 text-white">
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        Get Ready for the Interview!
      </h3>
      <p className="text-blue-100 text-sm sm:text-base mb-4 leading-relaxed">
        While you wait, it's a great time to prepare. Practice your
        problem-solving skills on platforms like LeetCode and Codeforces.
      </p>
      <button className="flex items-center space-x-2 text-sm font-medium hover:text-blue-200 transition-colors">
        <span>Read our interview prep guide</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
