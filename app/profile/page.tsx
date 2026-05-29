"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import { useLogout, useMe } from "@/hooks/useAuth";
import { useMyOrders } from "@/hooks/useProducts";
import type { OrderStatus } from "@/types/product";

const STATUS_META: Record<OrderStatus, { label: string; cls: string }> = {
  pending_payment: { label: "Төлбөр хүлээж байна", cls: "text-(--warn)" },
  paid: { label: "Төлбөр баталгаажсан", cls: "text-(--gold)" },
  processing: { label: "Боловсруулж байна", cls: "text-(--gold)" },
  completed: { label: "Дууссан", cls: "text-(--success)" },
  failed: { label: "Амжилтгүй", cls: "text-(--error,oklch(0.6 0.2 25))" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("mn-MN", { year: "numeric", month: "long", day: "numeric" });
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useMe();
  const { data: ordersData, isLoading: ordersLoading } = useMyOrders();
  const { trigger: triggerLogout } = useLogout();
  const [activeTab, setActiveTab] = useState<"history" | "info">("history");

  const handleLogout = async () => {
    await triggerLogout();
    ["_rs", "_rf", "_rp"].forEach((k) => sessionStorage.removeItem(k));
    router.push("/");
  };

  // Redirect if definitely not logged in
  if (!userLoading && !user) {
    router.push("/login");
    return null;
  }

  const displayName = user?.name || String(user?.phone ?? "");
  const initial = displayName.charAt(0).toUpperCase();
  const memberYear = user?.createdAt ? new Date(user.createdAt).getFullYear() : "";
  const allOrders = ordersData?.data ?? [];
  const orders = allOrders.filter((o) => o.status === "completed");
  const completedCount = orders.length;

  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-12">
      <div className="max-w-[720px] mx-auto space-y-6 fade-in">

        {/* ── Profile hero ── */}
        <div className="card-surface rounded-2xl p-7 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-(--gold-5) blur-3xl pointer-events-none" />

          {userLoading ? (
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-(--bg-soft) animate-pulse shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-40 rounded bg-(--bg-soft) animate-pulse" />
                <div className="h-4 w-28 rounded bg-(--bg-soft) animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-[linear-gradient(135deg,var(--bg-soft),var(--gold-soft))] border-2 border-(--gold-30) flex items-center justify-center pulse-gold">
                  <span className="font-[family-name:var(--font-serif)] text-[26px] font-bold gold-text select-none">
                    {initial}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-(--success) border-2 border-(--bg-card) flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-[family-name:var(--font-serif)] text-[22px] font-bold text-(--ink) mb-1">
                  {displayName}
                </h2>
                {user?.email && (
                  <p className="text-[13px] text-(--ink-muted) mb-1">{user.email}</p>
                )}
                <p className="text-[13px] text-(--ink-muted) mb-3">
                  <span className="mr-1">📞</span>{user?.phone}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--gold-8) border border-(--gold-20) text-[11px] text-(--gold-soft) font-medium">
                  <CosmicIcon name="star" size={11} />
                  Гишүүн{memberYear ? ` · ${memberYear} оноос` : ""}
                </div>
              </div>

              {/* Logout — desktop */}
              <button
                onClick={handleLogout}
                className="btn-outline px-4 py-2 rounded-lg text-[12px] font-medium cursor-pointer hidden sm:flex items-center gap-1.5 shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Гарах
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mt-6 pt-5 border-t border-(--hairline) grid grid-cols-2 gap-4">
            {[
              { label: "Нийт уншлага", value: ordersLoading ? "—" : String(completedCount) },
              { label: "Нийт зарцуулсан", value: ordersLoading ? "—" : `${orders.reduce((s, o) => s + (o.qpayAmount ?? 0), 0).toLocaleString()}₮` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-[22px] font-bold gold-text font-[family-name:var(--font-serif)]">{value}</div>
                <div className="text-[11px] text-(--ink-muted) mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 p-1 rounded-xl bg-(--bg-card) border border-(--hairline)">
          {(["history", "info"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer border-none ${activeTab === tab ? "step-active" : "bg-transparent text-(--ink-muted) hover:text-(--ink)"
                }`}
            >
              {tab === "history" ? "Уншилгын түүх" : "Миний мэдээлэл"}
            </button>
          ))}
        </div>

        {/* ── History tab ── */}
        {activeTab === "history" && (
          <div className="space-y-3">
            {ordersLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="card-surface rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-(--bg-soft) animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 rounded bg-(--bg-soft) animate-pulse" />
                    <div className="h-3 w-20 rounded bg-(--bg-soft) animate-pulse" />
                  </div>
                </div>
              ))
            ) : orders.length === 0 ? (
              <div className="card-surface rounded-xl p-10 text-center">
                <CosmicIcon name="orb" size={36} />
                <p className="text-[14px] text-(--ink-muted) mt-3">Уншлага байхгүй байна</p>
                <Link
                  href="/reading"
                  className="btn-primary inline-block mt-4 px-5 py-2.5 rounded-lg text-[13px] font-bold no-underline"
                >
                  Уншлага авах
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const meta = STATUS_META[order.status];
                const isCompleted = order.status === "completed";
                return (
                  <div
                    key={order._id}
                    className="card-surface rounded-xl p-4 flex items-center gap-4 hover:border-(--gold-30) transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-full bg-(--gold-8) border border-(--gold-20) flex items-center justify-center shrink-0">
                      <CosmicIcon name="orb" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-semibold text-(--ink) truncate">
                          {order.product?.title ?? "Уншлага"}
                        </span>
                      </div>
                      <p className="text-[12px] text-(--ink-muted) mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-[11px] font-medium shrink-0 ${meta.cls}`}>
                      {isCompleted ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <CosmicIcon name="spinner" size={12} />
                      )}
                      {meta.label}
                    </div>
                    {isCompleted && (
                      <Link
                        href={`/result?id=${order._id}`}
                        className="ml-1 text-[11px] text-(--gold) no-underline font-semibold hover:underline shrink-0"
                      >
                        Харах →
                      </Link>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "info" && (
          <div className="card-surface rounded-2xl p-6 space-y-4">
            <h3 className="text-[15px] font-semibold text-(--ink)">Бүртгэлийн мэдээлэл</h3>

            {[
              { label: "Нэр", value: user?.name || "—" },
              { label: "Утас", value: user?.phone ? String(user.phone) : "—" },
              { label: "Имэйл", value: user?.email || "—" },
              { label: "Бүртгүүлсэн", value: user?.createdAt ? formatDate(user.createdAt) : "—" },
              { label: "Эрх", value: user?.role || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-3 border-b border-(--hairline) last:border-none">
                <span className="text-[12px] text-(--ink-muted) uppercase tracking-[0.07em] font-medium">{label}</span>
                <span className="text-[14px] text-(--ink-soft) font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
