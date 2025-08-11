"use client";

import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-start w-full">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}

interface WelcomeStatsProps {
  stats: { label: string; value: string | number }[];
}

export default function WelcomeStats({ stats }: WelcomeStatsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} label={stat.label} value={stat.value} />
      ))}
    </section>
  );
}
