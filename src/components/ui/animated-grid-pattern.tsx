
"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useMemo } from "react";

interface AnimatedGridPatternProps
  extends React.ComponentPropsWithoutRef<"div"> {
  // add any pattern props here
}

export const AnimatedGridPattern = forwardRef<
  HTMLDivElement,
  AnimatedGridPatternProps
>(({ className, ...props }, ref) => {
  const columns = useMemo(() => new Array(40).fill(0), []);
  const rows = useMemo(() => new Array(30).fill(0), []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20 md:shadow-xl",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 h-full w-full bg-background [background:linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] [background-size:4rem_4rem]",
        )}
      />
      <div className="relative z-10">{props.children}</div>
      <div
        className={cn(
          "animate-grid",
          "pointer-events-none absolute -top-1/2 left-0 z-0 flex h-[200%] w-full flex-wrap",
        )}
      >
        {columns.map((_, i) => (
          <div
            key={`col-${i}`}
            className="w-[2.45rem] border-l border-border/50"
          >
            {rows.map((_, j) => (
              <div
                key={`row-${j}`}
                className="h-[2.45rem] border-t border-border/50"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

AnimatedGridPattern.displayName = "AnimatedGridPattern";

export default AnimatedGridPattern;
