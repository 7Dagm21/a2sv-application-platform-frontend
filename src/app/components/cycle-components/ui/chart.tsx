"use client";

import * as React from "react";
import { cn } from "@/src/lib/redux/utils/util";

export type ChartConfig = {
  [key: string]: {
    label?: string;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
  };
};

type PayloadItem = {
  name?: string;
  dataKey?: string;
  color?: string;
  value?: number | string;
  payload?: Record<string, unknown>;
};

interface ChartTooltipProps {
  config: ChartConfig;
  payload?: PayloadItem[];
  label?: string;
  active?: boolean;
  className?: string;
}

export function ChartTooltip({
  config,
  payload,
  label,
  active,
  className,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-md border border-gray-200 bg-white p-3 shadow-md dark:border-gray-800 dark:bg-gray-900",
        className
      )}
    >
      {label && (
        <div className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((item, index) => {
          // Make sure the key is typed properly
          const key = (item.name || item.dataKey) as keyof ChartConfig;
          const itemConfig = config[key];

          return (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor:
                      item.color ||
                      itemConfig?.color ||
                      itemConfig?.theme?.light ||
                      "#ccc",
                  }}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {itemConfig?.label || key}
                </span>
              </div>
              <span className="text-gray-900 dark:text-gray-100">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
