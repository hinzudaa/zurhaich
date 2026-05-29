"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { PageLoaderCtx } from "./PageLoaderContext";

export function PageLoader() {
  const { ready } = useContext(PageLoaderCtx);
  const [timerFired, setTimerFired] = useState(false);
  const [gone, setGone] = useState(false);

  const fading = ready || timerFired;

  useEffect(() => {
    const t = setTimeout(() => setTimerFired(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => setGone(true), 600);
    return () => clearTimeout(t);
  }, [fading]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "var(--bg-deep)",
        opacity: fading ? 0 : 1,
        transition: "opacity 580ms ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div className="relative z-10 palm-pulse">
        <Image
          src="/palm.png"
          alt="Palm"
          width={240}
          height={240}
          className="w-[148px] sm:w-[200px] md:w-[240px] h-auto object-contain"
          priority
        />
        <div
          className="scan-line pointer-events-none"
          style={{
            height: 1.5,
            background: "linear-gradient(90deg, transparent 5%, rgba(212,168,67,0.85) 40%, var(--gold) 50%, rgba(212,168,67,0.85) 60%, transparent 95%)",
            boxShadow: "0 0 10px var(--gold), 0 0 4px var(--gold)",
          }}
        />
      </div>
    </div>
  );
}
