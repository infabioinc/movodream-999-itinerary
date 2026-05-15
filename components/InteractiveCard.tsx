"use client";

import { useCallback, useState } from "react";
import type { PointerEvent } from "react";

export function usePointerReactiveCard() {
  const [pointerStyle, setPointerStyle] = useState<Record<string, string | number>>({
    transform: "perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.08s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 0.08s cubic-bezier(0.23, 1, 0.320, 1)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
  });

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    const rotateY = px * 15;
    const rotateX = -py * 15;
    const translateZ = 20;

    setPointerStyle({
      transform: `perspective(1000px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`,
      transition: "transform 0.06s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 0.06s cubic-bezier(0.23, 1, 0.320, 1)",
      boxShadow: `0 ${20 + Math.abs(rotateX) + Math.abs(rotateY)}px ${60 + Math.abs(rotateX) + Math.abs(rotateY)}px rgba(0,0,0,0.15)`,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointerStyle({
      transform: "perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.3s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 0.3s cubic-bezier(0.23, 1, 0.320, 1)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    });
  }, []);

  return { pointerStyle, handlePointerLeave, handlePointerMove };
}
