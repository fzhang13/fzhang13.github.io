"use client";

import { useEffect, useRef } from "react";

export default function FaviconPulse() {
  const originalTitleRef = useRef("");

  useEffect(() => {
    originalTitleRef.current = document.title;

    const handleVisibility = () => {
      if (document.hidden) {
        originalTitleRef.current = document.title;
        document.title = "👋 Come back!";

        const link = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
        if (link) {
          link.dataset.original = link.href;
          link.href = createPulseFavicon();
        }
      } else {
        document.title = originalTitleRef.current;

        const link = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
        if (link?.dataset.original) {
          link.href = link.dataset.original;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return null;
}

function createPulseFavicon(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Draw a simple blue circle with a wave emoji feel
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fillStyle = "#3b91ff";
  ctx.fill();

  ctx.font = "bold 14px sans-serif";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FZ", 16, 17);

  return canvas.toDataURL("image/png");
}
