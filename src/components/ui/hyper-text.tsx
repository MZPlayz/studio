
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HyperTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function HyperText({
  children,
  className,
  ...props
}: HyperTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileHover="visible"
      className={cn("relative z-10 block", className)}
      {...props}
    >
      <motion.span
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.08)_0%,rgba(124,58,237,0)_35%)] opacity-0"
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.9,
            x: "0",
            y: "0",
          },
          visible: {
            opacity: 1,
            scale: 1,
            x: "-5%",
            y: "-5%",
          },
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      ></motion.span>
      {children}
    </motion.div>
  );
}
