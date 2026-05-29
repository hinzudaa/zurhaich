"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import { ChipBtn } from "@/components/ui/ChipBtn";
import { BirthDateSelect } from "@/components/ui/BirthDateSelect";
import { useRegister } from "@/hooks/useAuth";
import type { RegisterType } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { trigger, isMutating, error } = useRegister();

  const [form, setForm] = useState<RegisterType & { confirm: string }>({
    phone: "",
    password: "",
    name: "",
    firstName: "",
    email: "",
    birthDate: "",
    gender: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const passwordMatch = form.confirm.length > 0 && form.password === form.confirm;
  const passwordMismatch = form.confirm.length > 0 && form.password !== form.confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordMismatch) return;
    const { confirm: _confirm, ...body } = form;
    await trigger({
      ...body,
      name: body.name || undefined,
      firstName: body.firstName || undefined,
      email: body.email || undefined,
      birthDate: body.birthDate || undefined,
      gender: body.gender || undefined,
    });
    router.push("/");
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[440px] fade-in">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-[linear-gradient(135deg,var(--bg-soft),var(--gold-soft))] border border-(--hairline) pulse-gold">
            <CosmicIcon name="star" size={26} />
          </div>
          <h1 className="font-[family-name:var(--font-serif)] text-[28px] font-bold gold-text mb-2">
            Бүртгүүлэх
          </h1>
          <p className="text-[13px] text-(--ink-muted)">
            Нууц замналаа нээж эхлэх цаг болсон
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-surface rounded-2xl p-7 space-y-5">

          {error && (
            <div className="rounded-xl px-4 py-3 text-[13px] bg-(--warn-bg) border border-(--warn-border) text-(--warn)">
              {error.message}
            </div>
          )}

          <div className="space-y-4">


            {/* Name grid */}
            <div className="grid grid-cols-2 gap-3">
              {([["firstName", "Нэр", "Мөнхцэцэг"], ["name", "Нэр", "Батболд"]] as const).map(([key, label, ph]) => (
                <div key={key}>
                  <label className="block text-[12px] font-medium text-(--ink-soft) mb-2 tracking-[0.06em] uppercase">{label}</label>
                  <input
                    type="text"
                    value={form[key] ?? ""}
                    onChange={set(key)}
                    placeholder={ph}
                    className="w-full px-4 py-3 rounded-xl bg-(--bg-soft) border border-(--hairline) text-[14px] text-(--ink) placeholder:text-(--ink-muted) outline-none transition-all duration-200 focus:border-(--gold) focus:shadow-[0_0_0_3px_var(--gold-10)]"
                  />
                </div>
              ))}
            </div>

            {/* Phone */}
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
                  type="tel"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="99119911"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--bg-soft) border border-(--hairline) text-[14px] text-(--ink) placeholder:text-(--ink-muted) outline-none transition-all duration-200 focus:border-(--gold) focus:shadow-[0_0_0_3px_var(--gold-10)]"
                />
              </div>
            </div>

            {/* Birth date */}
            <div>
              <label className="block text-[12px] font-medium text-(--ink-soft) mb-2 tracking-[0.06em] uppercase">
                Төрсөн огноо
              </label>
              <BirthDateSelect
                value={form.birthDate ?? ""}
                onChange={(v) => setForm((p) => ({ ...p, birthDate: v }))}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[12px] font-medium text-(--ink-soft) mb-2 tracking-[0.06em] uppercase">
                Хүйс
              </label>
              <div className="flex gap-2">
                {([["male", "Эрэгтэй"], ["female", "Эмэгтэй"], ["other", "Бусад"]] as const).map(([v, l]) => (
                  <ChipBtn key={v} active={form.gender === v} onClick={() => setForm((p) => ({ ...p, gender: v }))}>{l}</ChipBtn>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-(--ink-soft) mb-2 tracking-[0.06em] uppercase">
                Имэйл хаяг <span className="text-(--ink-muted) normal-case">(заавал биш)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--bg-soft) border border-(--hairline) text-[14px] text-(--ink) placeholder:text-(--ink-muted) outline-none transition-all duration-200 focus:border-(--gold) focus:shadow-[0_0_0_3px_var(--gold-10)]"
                />
              </div>
            </div>

            {/* Password */}
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
                  placeholder="Хамгийн багадаа 4 тэмдэгт"
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
              {form.password.length > 0 && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${form.password.length >= i
                        ? form.password.length >= 4
                          ? "bg-(--success)"
                          : "bg-(--warn)"
                        : "bg-(--hairline)"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[12px] font-medium text-(--ink-soft) mb-2 tracking-[0.06em] uppercase">
                Нууц үг давтах
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={form.confirm}
                  onChange={set("confirm")}
                  placeholder="Нууц үгээ дахин оруулна уу"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-(--bg-soft) border text-[14px] text-(--ink) placeholder:text-(--ink-muted) outline-none transition-all duration-200 ${passwordMismatch
                    ? "border-(--error) focus:shadow-[0_0_0_3px_oklch(from_var(--error)_l_c_h_/_0.15)]"
                    : passwordMatch
                      ? "border-(--success) focus:shadow-[0_0_0_3px_var(--success-bg)]"
                      : "border-(--hairline) focus:border-(--gold) focus:shadow-[0_0_0_3px_var(--gold-10)]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted) hover:text-(--ink) transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  {showConfirm ? (
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
                {passwordMatch && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-(--success)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
              {passwordMismatch && (
                <p className="mt-1.5 text-[11px] text-(--error)">Нууц үг таарахгүй байна</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isMutating || passwordMismatch}
            className="btn-primary w-full py-3 rounded-xl text-[14px] font-bold cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isMutating ? "Бүртгүүлж байна..." : "Бүртгүүлэх"}
          </button>
        </form>

        <p className="text-center text-[13px] text-(--ink-muted) mt-6">
          Аль хэдийн бүртгэлтэй юу?{" "}
          <Link href="/login" className="text-(--gold-soft) no-underline font-medium hover:text-(--gold) transition-colors">
            Нэвтрэх
          </Link>
        </p>
      </div>
    </div>
  );
}
