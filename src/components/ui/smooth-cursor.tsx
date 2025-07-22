
"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface SmoothCursorProps {
  className?: string;
  style?: CSSProperties;
}

export default function SmoothCursor({ className, style }: SmoothCursorProps) {
  const mousePosition = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);

  const [cursorStyle, setCursorStyle] = useState({
    left: "0px",
    top: "0px",
  });

  useEffect(() => {
    const updateCursor = () => {
      if (cursorRef.current) {
        const { x, y } = mousePosition;
        setCursorStyle({
          left: `${x}px`,
          top: `${y}px`,
        });
      }
    };
    const animationFrameId = requestAnimationFrame(updateCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  return (
    <div
      ref={cursorRef}
      className={cn(
        "pointer-events-none fixed z-[9999] h-6 w-6 rounded-full bg-primary/20 backdrop-blur-sm transition-transform, duration-100 ease-out",
        className,
      )}
      style={{
        ...cursorStyle,
        ...style,
      }}
    />
  );
}
