
"use client";

import { cn } from "@/lib/utils";

const RetroGrid = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden opacity-75 [perspective:200px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            // Light-mode: Increased opacity from 0.3 to 0.5
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_0)]",
            // Dark-mode: Increased opacity from 0.3 to 0.5
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_0)]",
          )}
        ></div>
      </div>

      {/* Fader */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%"></div>
    </div>
  );
};

export default RetroGrid;
