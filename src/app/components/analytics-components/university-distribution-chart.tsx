"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { type UniversityDistributionData } from "../../../types/analytics";
import type { PieLabelRenderProps } from "recharts"; // ✅ Import the type

const COLORS = ["#6B46C1", "#805AD5", "#B794F4"]; // Shades of purple

type UniversityDistributionChartProps = {
  data: UniversityDistributionData[];
};

// Custom label renderer to show percentage inside each pie slice
function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: PieLabelRenderProps) {
  const RADIAN = Math.PI / 180;
  const radius =
    Number(innerRadius ?? 0) +
    (Number(outerRadius ?? 0) - Number(innerRadius ?? 0)) * 0.5;
  const x = Number(cx ?? 0) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy ?? 0) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={8}
      fontWeight="Normal"
    >
      {`${value}%`}
    </text>
  );
}

export function UniversityDistributionChart({
  data,
}: UniversityDistributionChartProps) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 text-sm mt-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
