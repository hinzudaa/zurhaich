"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const STAGES = [
  "Шугамыг тогтоож байна...",
  "Зүрхний шугамыг ангилж байна...",
  "Хувь заяаны цэгийг тооцоолж байна...",
  "Гарагуудыг тулгаж байна...",
  "Уншилтыг бичиж байна...",
];

const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

function OrbitalRings({ size }: { size: number }) {
  const cx = size / 2;
  const cy = size / 2;

  const rings = [
    { r: size * 0.480, dash: undefined, sw: 0.8, op: 0.75 },
    { r: size * 0.405, dash: "5 9", sw: 0.5, op: 0.40 },
    { r: size * 0.335, dash: undefined, sw: 0.7, op: 0.55 },
    { r: size * 0.265, dash: "2 5", sw: 0.4, op: 0.30 },
    { r: size * 0.195, dash: undefined, sw: 0.6, op: 0.42 },
    { r: size * 0.130, dash: "1 4", sw: 0.3, op: 0.25 },
  ];

  const lines = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const R = size * 0.48;
    return { x1: r4(cx - Math.cos(a) * R), y1: r4(cy - Math.sin(a) * R), x2: r4(cx + Math.cos(a) * R), y2: r4(cy + Math.sin(a) * R) };
  });

  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const R = size * 0.48;
    const len = i % 18 === 0 ? 13 : i % 6 === 0 ? 8 : 4;
    return { x1: r4(cx + Math.cos(a) * (R - len)), y1: r4(cy + Math.sin(a) * (R - len)), x2: r4(cx + Math.cos(a) * R), y2: r4(cy + Math.sin(a) * R) };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {lines.map((l, i) => (
        <line key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="var(--gold)" strokeWidth="0.4" opacity="0.28" />
      ))}
      {rings.map((r, i) => (
        <circle key={`r${i}`} cx={cx} cy={cy} r={r.r} stroke="var(--gold)" strokeWidth={r.sw} strokeDasharray={r.dash} opacity={r.op} />
      ))}
      {ticks.map((t, i) => (
        <line key={`t${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--gold)" strokeWidth="0.5" opacity="0.6" />
      ))}
    </svg>
  );
}

interface ScanLoaderProps {
  onComplete?: () => void;
  /** When true, the progress bar rushes to 100% and fires onComplete */
  isComplete?: boolean;
}

export function ScanLoader({ onComplete, isComplete = false }: ScanLoaderProps) {
  const [progress, setProgress] = useState(0);
  const rushIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const done = useCallback(() => onComplete?.(), [onComplete]);

  // Derive stage from progress — no side effects inside state updaters
  const stage = isComplete || progress >= 90
    ? STAGES.length - 1
    : Math.min(STAGES.length - 1, Math.floor((progress / 90) * STAGES.length));

  // Slow ambient increment — caps at 90% so it never self-completes
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + 0.35));
    }, 60);
    return () => clearInterval(id);
  }, []);

  // Rush to 100% when isComplete flips true
  useEffect(() => {
    if (!isComplete) return;
    if (rushIdRef.current) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + 3);
        if (n >= 100) {
          clearInterval(id);
          rushIdRef.current = null;
          setTimeout(done, 500);
        }
        return n;
      });
    }, 30);
    rushIdRef.current = id;
    return () => { clearInterval(id); rushIdRef.current = null; };
  }, [isComplete, done]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden">

      <div className="absolute pointer-events-none scale-[0.57] sm:scale-[0.82] md:scale-100">
        <div className="spin-slow">
          <OrbitalRings size={560} />
        </div>
      </div>

      <div className="absolute pointer-events-none opacity-55 scale-[0.64] sm:scale-[0.86] md:scale-100">
        <div className="spin-slow-r">
          <OrbitalRings size={340} />
        </div>
      </div>

      <div className="absolute top-[60px] left-0 right-0 z-10 flex flex-col items-center pt-5 sm:pt-6 px-6">
        <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-sans text-(--gold) mb-2.5 sm:mb-3">
          Зурхайч
        </p>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-(--gold)"
            style={{ animation: "pulseGold 1.6s ease-in-out infinite", boxShadow: "0 0 6px var(--gold)" }}
          />
          <p className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-sans text-(--ink-muted) whitespace-nowrap">
            Гарын мөр уншиж байна
          </p>
        </div>
      </div>

      <div className="relative z-10 palm-pulse">
        <Image src="/palm.png" alt="Palm" width={260} height={260} className="w-[168px] sm:w-[224px] md:w-[260px] h-auto object-contain" />
        <div className="scan-line pointer-events-none" style={{
          height: 1.5,
          background: "linear-gradient(90deg, transparent 5%, rgba(212,168,67,0.9) 40%, var(--gold) 50%, rgba(212,168,67,0.9) 60%, transparent 95%)",
          boxShadow: "0 0 12px var(--gold), 0 0 4px var(--gold)",
        }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-[140px] sm:pb-[100px] px-6">

        <p className="font-serif text-[15px] sm:text-[21px] text-(--ink) whitespace-nowrap tracking-wide mb-1.5 sm:mb-2">
          {STAGES[stage]}
        </p>

        <p className="text-[10px] sm:text-[11px] text-(--ink-muted) tracking-[0.06em] whitespace-nowrap mb-5 sm:mb-7">
          Алгад тань 7 шугам, 14 уулзвар бүртгэгдлээ
        </p>

        <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-(--gold) font-sans whitespace-nowrap mb-2 sm:mb-2.5">
          {Math.round(progress)}% боловсруулж байна
        </p>

        <div className="overflow-hidden rounded-full w-[68%] sm:w-[52%] max-w-[400px]"
          style={{ height: 1, background: "rgba(255,255,255,0.08)" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, var(--gold-soft), var(--gold))",
            boxShadow: "0 0 8px var(--gold)",
            transition: "width 80ms linear",
          }} />
        </div>
      </div>
    </div>
  );
}
