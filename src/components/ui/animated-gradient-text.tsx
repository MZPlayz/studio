
"use client";

import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium text-gray-500 backdrop-blur-sm transition-shadow duration-200",
        className,
      )}
    >
      <div
        className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl`}
      />
      {children}
    </div>
  );
}
