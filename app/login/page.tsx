"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import { useLogin } from "@/hooks/useAuth";
import type { LoginBody } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { trigger, isMutating } = useLogin();

  const [form, setForm] = useState<LoginBody>({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const set = (k: keyof LoginBody) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger(form);
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Нэвтрэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px] fade-in">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-[linear-gradient(135deg,var(--bg-soft),var(--gold-soft))] border border-(--hairline) pulse-gold">
            <CosmicIcon name="orb" size={28} />
          </div>
          <h1 className="font-[family-name:var(--font-serif)] text-[28px] font-bold gold-text mb-2">
            Нэвтрэх
          </h1>
          <p className="text-[13px] text-(--ink-muted)">
            Таны нууц ертөнц хүлээж байна
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-surface rounded-2xl p-7 space-y-5">

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-(--ink-soft) mb-2 tracking-[0.06em] uppercase">
                Утасны дугаар
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  type="number"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="99119911"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--bg-soft) border border-(--hairline) text-[14px] text-(--ink) placeholder:text-(--ink-muted) outline-none transition-all duration-200 focus:border-(--gold) focus:shadow-[0_0_0_3px_var(--gold-10)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-(--ink-soft) mb-2 tracking-[0.06em] uppercase">
                Нууц үг
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-(--bg-soft) border border-(--hairline) text-[14px] text-(--ink) placeholder:text-(--ink-muted) outline-none transition-all duration-200 focus:border-(--gold) focus:shadow-[0_0_0_3px_var(--gold-10)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted) hover:text-(--ink) transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isMutating}
            className="btn-primary w-full py-3 rounded-xl text-[14px] font-bold cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isMutating ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>
        </form>

        <p className="text-center text-[13px] text-(--ink-muted) mt-6">
          Бүртгэл байхгүй юу?{" "}
          <Link href="/register" className="text-(--gold-soft) no-underline font-medium hover:text-(--gold) transition-colors">
            Бүртгүүлэх
          </Link>
        </p>
      </div>
    </div>
  );
}
