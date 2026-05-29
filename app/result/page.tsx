"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ScanLoader } from "@/components/ui/ScanLoader";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import { useOrder } from "@/hooks/useProducts";
import Image from "next/image";

interface Section {
  title: string;
  paras: string[];
}

function parseSections(text: string): Section[] {
  const lines = text.split("\n");
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const headerMatch = line.match(/^\*\*(.*?)\*\*$|^#{1,3}\s+(.*)/);
    if (headerMatch) {
      if (current) sections.push(current);
      current = { title: (headerMatch[1] || headerMatch[2]).trim(), paras: [] };
    } else {
      if (!current) current = { title: "", paras: [] };
      current.paras.push(line);
    }
  }
  if (current) sections.push(current);
  return sections.filter((s) => s.paras.length > 0);
}

function ResultPageInner() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { data: orderData } = useOrder(orderId);
  const order = orderData?.data;

  const [scanDone, setScanDone] = useState(false);
  const [visible, setVisible] = useState(false);

  const isCompleted = order?.status === "completed";
  const isFailed = order?.status === "failed";
  const isProcessing = !order || order.status === "processing";

  const handleScanComplete = () => {
    setScanDone(true);
    setTimeout(() => setVisible(true), 80);
  };


  if (!scanDone || isProcessing) {
    return (
      <ScanLoader
        onComplete={handleScanComplete}
        isComplete={isCompleted && !!order?.answer}
      />
    );
  }

  if (isFailed) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-6">
        <div className="text-center max-w-[400px]">
          <div className="mb-4 flex justify-center">
            <CosmicIcon name="warning" size={48} />
          </div>
          <h2 className="font-[family-name:var(--font-serif)] text-[22px] text-(--ink) mb-3">
            Уншлага амжилтгүй боллоо
          </h2>
          <p className="text-(--ink-muted) text-[14px] mb-6">
            Боловсруулалт явцад алдаа гарлаа. Дахин оролдоно уу.
          </p>
          <Link
            href="/reading"
            className="btn-primary px-6 py-3 rounded-xl text-[14px] font-bold no-underline inline-block"
          >
            Дахин оролдох
          </Link>
        </div>
      </div>
    );
  }

  if (!isCompleted || !order?.answer) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-4 flex justify-center float-y">
            <CosmicIcon name="orb" size={56} />
          </div>
          <p className="text-(--ink-muted) text-[14px]">Боловсруулж байна...</p>
        </div>
      </div>
    );
  }

  const sections = parseSections(order.answer);
  const namedSections = sections.filter((s) => s.title);
  const productTitle = order.product?.title ?? "Уншлага";
  const productPrice = order.product?.price;
  const dateStr = new Date(order.createdAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 280) 0%, oklch(0.18 0.08 290) 60%, oklch(0.20 0.12 300) 100%)",
          borderBottom: "1px solid var(--gold-18)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 20% 50%, oklch(from var(--gold) l c h / 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-[1100px] mx-auto px-6 py-10 md:py-14 flex items-center justify-between gap-8 relative z-10">
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] tracking-[0.25em] uppercase mb-3"
              style={{ color: "var(--gold-soft)" }}
            >
              Таны уншилгын үр дүн
            </p>
            <h1
              className="font-[family-name:var(--font-serif)] text-(--ink) leading-tight mb-3"
              style={{ fontSize: "clamp(26px, 5vw, 44px)" }}
            >
              Гарын мөрний{" "}
              <em className="gold-text not-italic">уншлага</em>
            </h1>
            <p className="text-(--ink-muted) text-[13px]">
              {dateStr}
              {" · "}
              <span className="text-(--gold)">{productTitle}</span>
              {productPrice ? ` · ${productPrice.toLocaleString()}₮` : ""}
            </p>
          </div>

          <div
            className="hidden sm:flex shrink-0 items-end justify-center opacity-60"
            style={{ filter: "drop-shadow(0 0 24px oklch(from var(--gold) l c h / 0.35))" }}
          >
            <Image src="/palm.png" alt="Palm" width={140} height={140} />
          </div>
        </div>
      </div>

      {/* ── Body: two-column ── */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="flex gap-8 items-start">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 space-y-10">
            {sections.map((section, idx) => {
              const sectionIdx = namedSections.indexOf(section);
              const num = sectionIdx + 1;

              return (
                <section
                  key={idx}
                  id={section.title ? `section-${sectionIdx}` : undefined}
                >
                  {section.title ? (
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold"
                        style={{
                          border: "1.5px solid var(--gold)",
                          color: "var(--gold)",
                          background: "var(--gold-5)",
                        }}
                      >
                        {num}
                      </span>
                      <h2
                        className="font-serif text-(--ink)"
                        style={{ fontSize: "clamp(18px, 3vw, 24px)" }}
                      >
                        {section.title}
                      </h2>
                    </div>
                  ) : null}

                  <div
                    className="rounded-2xl p-6 md:p-8 space-y-4"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid oklch(from var(--gold) l c h / 0.10)",
                    }}
                  >
                    {section.paras.map((para, pi) => (
                      <p
                        key={pi}
                        className="text-(--ink-soft) leading-[1.85]"
                        style={{ fontSize: "15px" }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* ── Sticky sidebar ── */}
          <aside
            className="hidden lg:flex flex-col gap-4 shrink-0 w-[280px] sticky top-6"
          >
            {/* Summary card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--gold-18)",
              }}
            >
              <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid var(--gold-10)" }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--gold-10)", border: "1px solid var(--gold-22)" }}
                >
                  <CosmicIcon name="orb" size={22} />
                </div>
                <div>
                  <p className="text-(--ink-muted) text-[10px] tracking-[0.08em] uppercase mb-0.5">
                    Уншилгын төрөл
                  </p>
                  <p className="text-(--gold) text-[14px] font-semibold leading-tight">
                    {productTitle}
                  </p>
                  <p className="text-(--ink-muted) text-[11px]">{dateStr}</p>
                </div>
              </div>

              {/* TOC */}
              {namedSections.length > 0 && (
                <div>
                  <p className="text-(--ink-muted) text-[10px] tracking-[0.12em] uppercase mb-3">
                    Энэ хуудсан дээр
                  </p>
                  <nav className="space-y-1">
                    {namedSections.map((s, i) => (
                      <a
                        key={i}
                        href={`#section-${i}`}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[13px] transition-colors no-underline text-(--ink-muted) hover:text-(--gold) hover:bg-(--gold-7)"
                      >
                        <span
                          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{ border: "1px solid oklch(from var(--gold) l c h / 0.3)", color: "inherit" }}
                        >
                          {i + 1}
                        </span>
                        {s.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Footer — full width below both columns */}
        <p className="text-center text-(--ink-muted) text-[11px] opacity-40 pt-10 pb-4">
          © 2026 Зурхайч · Энэхүү уншлага нь зөгнөлийн зориулалттай
        </p>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultPageInner />
    </Suspense>
  );
}
