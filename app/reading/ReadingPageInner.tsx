"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChipBtn } from "@/components/ui/ChipBtn";
import { BirthDateSelect } from "@/components/ui/BirthDateSelect";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import type { PalmFormData } from "@/types";
import { TOPIC_LABELS, TOPICS } from "@/lib/constants";
import { useMe, useRegister } from "@/hooks/useAuth";
import { useCheckoutCart, useProducts } from "@/hooks/useProducts";
import { useUploadImage } from "@/hooks/useUpload";

const inputCls =
  "w-full px-4 py-3 rounded-[10px] text-[14px] outline-none bg-(--bg-soft) border border-(--hairline) text-(--ink) transition-colors duration-200 focus:border-(--gold)";

type PalmState = "idle" | "checking" | "ok" | "warn" | "not-palm";

function detectPalm(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxSize = 160;
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(true); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let skin = 0;
      const total = canvas.width * canvas.height;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const cb = -0.169 * r - 0.331 * g + 0.5 * b + 128;
        const cr = 0.5 * r - 0.419 * g - 0.081 * b + 128;
        if (cb >= 77 && cb <= 127 && cr >= 133 && cr <= 173) skin++;
      }
      resolve(skin / total >= 0.15);
    };
    img.onerror = () => resolve(true);
    img.src = dataUrl;
  });
}

export default function ReadingPageInner() {
  const router = useRouter();

  const { data: user } = useMe();
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { trigger: checkoutCart, isMutating: isCreatingOrder, error: createError } = useCheckoutCart();
  const { trigger: uploadImage, isMutating: isUploading, error: uploadError } = useUploadImage();
  const { trigger: registerTrigger, isMutating: isRegistering, error: registerError } = useRegister();

  const [step, setStep] = useState<number>(() => {
    try { return Number(sessionStorage.getItem("_rs") || "1"); } catch { return 1; }
  });
  const [authForm, setAuthForm] = useState({ password: "", confirm: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [showAuthConfirm, setShowAuthConfirm] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(() => {
    try { const s = sessionStorage.getItem("_rp"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [form, setForm] = useState<PalmFormData>(() => {
    const def: PalmFormData = { firstName: "", name: "", birthDate: "", gender: "", phone: "", email: "", dominantHand: "", topics: [], question: "", palmImageBase64: "", plan: "үндсэн" };
    try { const s = sessionStorage.getItem("_rf"); return s ? { ...def, ...JSON.parse(s) } : def; } catch { return def; }
  });
  const [imagePreview, setImagePreview] = useState(() => {
    try { const s = sessionStorage.getItem("_rf"); if (s) { const f = JSON.parse(s); return f.palmImageBase64 || ""; } } catch { } return "";
  });
  const [palmValid, setPalmValid] = useState<PalmState>(() => {
    try { const s = sessionStorage.getItem("_rf"); if (s) { const f = JSON.parse(s); return f.palmImageBase64 ? "ok" : "idle"; } } catch { } return "idle";
  });

  useEffect(() => { try { sessionStorage.setItem("_rs", String(step)); } catch { } }, [step]);
  useEffect(() => { try { sessionStorage.setItem("_rf", JSON.stringify(form)); } catch { } }, [form]);
  useEffect(() => { try { sessionStorage.setItem("_rp", JSON.stringify(selectedProductIds)); } catch { } }, [selectedProductIds]);

  useEffect(() => { if (registerError) toast.error(registerError.message); }, [registerError]);
  useEffect(() => { if (createError) toast.error(createError.message); }, [createError]);
  useEffect(() => { if (uploadError) toast.error(uploadError.message); }, [uploadError]);

  const userPrefilledRef = useRef(false);
  useEffect(() => {
    if (!user || userPrefilledRef.current) return;
    userPrefilledRef.current = true;
    setForm((prev) => ({
      ...prev,
      firstName: user.firstName || prev.firstName,
      name: user.name || prev.name,
      phone: user.phone ? String(user.phone) : prev.phone,
      email: user.email || prev.email,
      birthDate: user.birthDate ? user.birthDate.slice(0, 10) : prev.birthDate,
      gender: user.gender || prev.gender,
    }));
  }, [user]);

  const [showCamera, setShowCamera] = useState(false);
  const [cameraErr, setCameraErr] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const products = productsData?.data ?? [];

  const update = (key: keyof PalmFormData, value: unknown) =>
    setForm((p) => ({ ...p, [key]: value }));

  const FULL_TITLE = "Бүрэн Уншилт";

  const toggleProduct = (id: string) => {
    const product = products.find((p) => p._id === id);
    const isFull = product?.title === FULL_TITLE;

    setSelectedProductIds((prev) => {
      if (isFull) {
        return prev.includes(id) ? [] : [id];
      }
      const fullId = products.find((p) => p.title === FULL_TITLE)?._id;
      const withoutFull = fullId ? prev.filter((x) => x !== fullId) : prev;
      return withoutFull.includes(id)
        ? withoutFull.filter((x) => x !== id)
        : [...withoutFull, id];
    });
  };

  const resetImage = () => {
    setImagePreview("");
    setForm((p) => ({ ...p, palmImageBase64: "" }));
    setPalmValid("idle");
  };

  const handleImage = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPalmValid("checking");

    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
    setImagePreview(dataUrl);

    const localCheck = (): Promise<PalmState> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = async () => {
          const ratio = img.width / img.height;
          if (ratio > 1.8 || img.width < 300 || img.height < 300) {
            resolve("warn");
            return;
          }
          const isPalm = await detectPalm(dataUrl);
          resolve(isPalm ? "ok" : "not-palm");
        };
        img.src = dataUrl;
      });

    const [checkResult, uploadResult] = await Promise.allSettled([
      localCheck(),
      uploadImage(file),
    ]);

    const url = uploadResult.status === "fulfilled" ? uploadResult.value?.url : null;
    if (!url) {
      setPalmValid("warn");
      return;
    }
    setForm((p) => ({ ...p, palmImageBase64: url }));
    setPalmValid(checkResult.status === "fulfilled" ? checkResult.value : "ok");
  }, [uploadImage]);

  const videoCallbackRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node && streamRef.current) {
      node.srcObject = streamRef.current;
      node.play().catch(() => { });
    }
  }, []);

  const openCamera = async () => {
    setCameraErr("");
    if (!navigator.mediaDevices?.getUserMedia) {
      fileRef.current?.click();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setShowCamera(true);
    } catch {
      setCameraErr("Камер нээх боломжгүй байна. Зөвшөөрлийг шалгана уу.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      stopCamera();
      handleImage(new File([blob], "palm-camera.jpg", { type: "image/jpeg" }));
    }, "image/jpeg", 0.92);
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setShowCamera(false);
  };

  const canProceed = useMemo(() => {
    if (step === 1) {
      const info = !!(form.firstName && form.name && form.birthDate && form.gender && form.phone);
      if (user) return info;
      return info && authForm.password.length >= 4 && authForm.password === authForm.confirm;
    }
    if (step === 2) return !!(form.dominantHand && selectedProductIds.length > 0);
    if (step === 3) return !!form.palmImageBase64 && !isUploading && (palmValid === "ok" || palmValid === "warn");
    if (step === 4) return selectedProductIds.length > 0 && !isCreatingOrder && termsAccepted;
    return true;
  }, [step, form, authForm, user, selectedProductIds, isUploading, palmValid, isCreatingOrder, termsAccepted]);

  const proceed = async () => {
    try {
      if (step === 1 && !user) {
        await registerTrigger({
          phone: form.phone,
          password: authForm.password,
          name: form.name || undefined,
          firstName: form.firstName || undefined,
          email: form.email || undefined,
          birthDate: form.birthDate || undefined,
          gender: form.gender || undefined,
        });
      }
      if (step < 4) { setStep((s) => s + 1); return; }
      if (!user) { router.push("/login"); return; }
      if (selectedProductIds.length === 0) return;

      const titleToTopic = Object.fromEntries(TOPICS.map((t) => [t.label, t.key]));
      const derivedTopics = products
        .filter((p) => selectedProductIds.includes(p._id))
        .map((p) => titleToTopic[p.title])
        .filter(Boolean) as typeof form.topics;

      const hasFull = derivedTopics.includes("full");
      const derivedPlan = hasFull || derivedTopics.length > 1 ? "бүрэн" : "үндсэн";

      const formBody = {
        ...form,
        topics: derivedTopics.length > 0 ? derivedTopics : form.topics,
        plan: derivedPlan,
      };
      sessionStorage.setItem("palmForm", JSON.stringify(formBody));

      const result = await checkoutCart(selectedProductIds);
      const { orders, qpay } = result.data;
      const firstOrder = orders[0];
      sessionStorage.setItem("pendingQpay", JSON.stringify({ orderId: firstOrder._id, qpay }));

      ["_rs", "_rf", "_rp"].forEach((k) => sessionStorage.removeItem(k));
      router.push(`/payment?id=${firstOrder._id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Алдаа гарлаа");
    }
  };

  const STEPS = [
    { n: 1, l: "Мэдээлэл" },
    { n: 2, l: "Багц" },
    { n: 3, l: "Зураг" },
    { n: 4, l: "Захиалга" },
  ];

  return (
    <>
      {/* ── Camera modal ── */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-black/80">
            <span className="text-white text-[15px] font-medium">Алгаа камерт харуул</span>
            <button
              onClick={stopCamera}
              className="text-white/70 hover:text-white cursor-pointer bg-transparent border-none p-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoCallbackRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-[32px] border-2 border-white/70"
                style={{
                  width: "min(72vw, 280px)",
                  height: "min(88vw, 340px)",
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)",
                }}
              />
            </div>
            <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-[12px] pointer-events-none">
              Алгаа дэлгэж, хүрээний дотор байрлуулна уу
            </p>
          </div>

          <div className="px-6 py-6 bg-black/80 flex justify-center">
            <button
              onClick={capturePhoto}
              className="w-[68px] h-[68px] rounded-full bg-white cursor-pointer flex items-center justify-center active:scale-95 transition-transform"
              style={{ boxShadow: "0 0 0 5px rgba(255,255,255,0.25)" }}
            >
              <div className="w-[52px] h-[52px] rounded-full bg-white border-[3px] border-gray-300" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[600px] mx-auto pt-10 px-6 pb-10">
        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-9">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] transition-all duration-200 ${step === s.n ? "step-active" : step > s.n ? "step-done" : "step-pending"}`}>
                {step > s.n ? <CosmicIcon name="tick" size={16} /> : s.n}
              </div>
              <span className={`text-[11px] ${step === s.n ? "text-(--gold)" : "text-(--ink-muted)"} hidden sm:inline`}>
                {s.l}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px ${step > s.n ? "bg-(--gold-soft)" : "bg-(--hairline)"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="card-surface fade-in rounded-[18px] p-[32px_28px]">

          {/* ── Step 1: Мэдээлэл + Бүртгэл ── */}
          {step === 1 && (
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-[24px] text-(--ink) mb-[6px]">Хувийн мэдээлэл</h2>
              <p className="text-(--ink-muted) text-[13px] mb-7">Уншлага хувийн болгохын тулд үнэн зөвөөр бөглөнө үү.</p>

              <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
                {[["firstName", "Овог", "Мөнхцэцэг"], ["name", "Нэр", "Батболд"]].map(([key, label, ph]) => (
                  <div key={key}>
                    <label className="block text-[11px] text-(--ink-muted) mb-[6px] tracking-[0.08em]">{label} *</label>
                    <input type="text" value={form[key as keyof PalmFormData] as string} placeholder={ph}
                      onChange={(e) => update(key as keyof PalmFormData, e.target.value)}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-[14px]">
                <label className="block text-[11px] text-(--ink-muted) mb-[6px] tracking-[0.08em]">Утасны дугаар *</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="8888-8888" className={inputCls} />
              </div>

              <div className="mb-[14px]">
                <label className="block text-[11px] text-(--ink-muted) mb-[6px] tracking-[0.08em]">И-мэйл <span className="normal-case">(заавал биш)</span></label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="example@mail.com" className={inputCls} />
              </div>

              <div className="mb-[14px]">
                <label className="block text-[11px] text-(--ink-muted) mb-[6px] tracking-[0.08em]">Төрсөн огноо *</label>
                <BirthDateSelect value={form.birthDate} onChange={(v) => update("birthDate", v)} />
              </div>

              <div className="mb-[14px]">
                <label className="block text-[11px] text-(--ink-muted) mb-2 tracking-[0.08em]">Хүйс *</label>
                <div className="flex gap-[10px]">
                  {[{ v: "male", l: "Эрэгтэй" }, { v: "female", l: "Эмэгтэй" }, { v: "other", l: "Бусад" }].map((g) => (
                    <ChipBtn key={g.v} active={form.gender === g.v} onClick={() => update("gender", g.v)}>{g.l}</ChipBtn>
                  ))}
                </div>
              </div>

              {!user && (
                <>
                  <div className="line-hairline my-5" />
                  <p className="text-[11px] text-(--ink-muted) mb-4 tracking-[0.06em] uppercase">Бүртгэл үүсгэх</p>
                  <div className="mb-[14px]">
                    <label className="block text-[11px] text-(--ink-muted) mb-[6px] tracking-[0.08em]">Нууц үг *</label>
                    <div className="relative">
                      <input type={showAuthPassword ? "text" : "password"} value={authForm.password} onChange={(e) => setAuthForm((p) => ({ ...p, password: e.target.value }))} placeholder="Хамгийн багадаа 4 тэмдэгт" className={`${inputCls} pr-11`} />
                      <button type="button" onClick={() => setShowAuthPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted) cursor-pointer bg-transparent border-none p-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          {showAuthPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mb-[14px]">
                    <label className="block text-[11px] text-(--ink-muted) mb-[6px] tracking-[0.08em]">Нууц үг давтах *</label>
                    <div className="relative">
                      <input
                        type={showAuthConfirm ? "text" : "password"}
                        value={authForm.confirm}
                        onChange={(e) => setAuthForm((p) => ({ ...p, confirm: e.target.value }))}
                        placeholder="Нууц үгээ дахин оруулна уу"
                        className={`${inputCls} pr-11 ${authForm.confirm.length > 0 && authForm.password !== authForm.confirm ? "border-(--error)" : authForm.confirm.length > 0 && authForm.password === authForm.confirm ? "border-(--success)" : ""}`}
                      />
                      <button type="button" onClick={() => setShowAuthConfirm((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--ink-muted) cursor-pointer bg-transparent border-none p-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          {showAuthConfirm ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                        </svg>
                      </button>
                    </div>
                    {authForm.confirm.length > 0 && authForm.password !== authForm.confirm && (
                      <p className="mt-1.5 text-[11px] text-(--error)">Нууц үг таарахгүй байна</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-[24px] text-(--ink) mb-[6px]">Багцаа сонгоно уу</h2>
              <p className="text-(--ink-muted) text-[13px] mb-7">Танд тохирох уншилгын багцыг сонгоно уу.</p>

              <div className="mb-[22px]">
                <label className="block text-[11px] text-(--ink-muted) mb-2 tracking-[0.08em]">Гол гар *</label>
                <div className="flex gap-[10px]">
                  <ChipBtn active={form.dominantHand === "right"} onClick={() => update("dominantHand", "right")}>Баруун</ChipBtn>
                  <ChipBtn active={form.dominantHand === "left"} onClick={() => update("dominantHand", "left")}>Зүүн</ChipBtn>
                </div>
              </div>

              <div className="mb-[22px]">
                <label className="block text-[11px] text-(--ink-muted) mb-2 tracking-[0.08em]">Багц *</label>
                {productsLoading ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-[80px] rounded-[12px] bg-(--bg-soft) border border-(--hairline) animate-pulse" />
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <div className="p-4 rounded-[10px] bg-(--warn-bg) border border-(--warn-border) text-(--warn) text-[13px]">
                    Багц олдсонгүй. Дараа дахин оролдоно уу.
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {products.map((p) => {
                        const active = selectedProductIds.includes(p._id);
                        return (
                          <button
                            key={p._id}
                            onClick={() => toggleProduct(p._id)}
                            className={`flex items-center gap-3 w-full text-left rounded-[12px] p-3 cursor-pointer transition-all duration-[180ms] ${active ? "bg-(--gold-8) border border-(--gold)" : "bg-(--bg-soft) border border-(--hairline) hover:border-(--gold-30)"}`}
                          >
                            {p.media[0]?.url && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={p.media[0].url}
                                alt={p.title}
                                className="w-[56px] h-[56px] rounded-[8px] object-cover shrink-0 border border-(--hairline)"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className={`text-[14px] font-semibold mb-[2px] ${active ? "text-(--gold)" : "text-(--ink)"}`}>
                                {p.title}
                              </div>
                              {p.description && (
                                <div className="text-[11px] text-(--ink-muted) leading-[1.5] line-clamp-2">{p.description}</div>
                              )}
                            </div>
                            <div className="shrink-0 text-right pl-2 flex flex-col items-end gap-1">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-[180ms] ${active ? "bg-(--gold) border-(--gold)" : "border-(--hairline) bg-transparent"}`}>
                                {active && <CosmicIcon name="tick" size={11} />}
                              </div>
                              {p.originalPrice && p.originalPrice > p.price && (
                                <div className="text-[11px] text-(--ink-muted) line-through">
                                  {p.originalPrice.toLocaleString()}₮
                                </div>
                              )}
                              <div className={`text-[16px] font-bold ${active ? "text-(--gold)" : "text-(--ink-soft)"}`}>
                                {p.price.toLocaleString()}₮
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {selectedProductIds.length > 0 && (
                      <div className="mt-3 px-4 py-3 rounded-[10px] bg-(--gold-5) border border-(--gold-20) flex justify-between items-center">
                        <span className="text-(--ink-muted) text-[13px]">{selectedProductIds.length} багц сонгогдсон</span>
                        <span className="font-bold text-(--gold) text-[15px]">
                          {products.filter((p) => selectedProductIds.includes(p._id)).reduce((s, p) => s + p.price, 0).toLocaleString()}₮
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div>
                <label className="block text-[11px] text-(--ink-muted) mb-[6px] tracking-[0.08em]">Тодорхой асуулт (заавал биш)</label>
                <textarea value={form.question} onChange={(e) => update("question", e.target.value)}
                  placeholder="Жишээ: Би энэ жил гэрлэх болох уу?" rows={3}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-[24px] text-(--ink) mb-[6px]">Гарын зураг</h2>
              <p className="text-(--ink-muted) text-[13px] mb-5">
                {form.dominantHand === "right" ? "Баруун" : "Зүүн"} гарынхаа алгыг шулуун дээрээс, тод, гэрэлтэй байдлаар зурна уу.
              </p>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
              />

              {!imagePreview && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="p-[16px_12px] rounded-xl cursor-pointer bg-(--bg-soft) border border-(--hairline) text-(--ink-soft) text-[14px] font-medium flex flex-col items-center gap-2 transition-colors duration-200 hover:border-(--gold)"
                  >
                    <CosmicIcon name="gallery" size={32} />
                    <span>Галерейгаас сонгох</span>
                    <span className="text-[11px] text-(--ink-muted)">JPG, PNG, HEIC</span>
                  </button>
                  <button
                    onClick={openCamera}
                    className="p-[16px_12px] rounded-xl cursor-pointer bg-(--gold-5) border border-(--gold-30) text-(--gold) text-[14px] font-medium flex flex-col items-center gap-2 transition-colors duration-200 hover:border-(--gold)"
                  >
                    <CosmicIcon name="camera" size={32} />
                    <span>Камераар авах</span>
                    <span className="text-[11px] text-(--gold-soft)">Шууд зурах</span>
                  </button>
                </div>
              )}

              {cameraErr && (
                <div className="p-[10px_14px] rounded-[10px] mb-3 text-[13px] bg-(--warn-bg) border border-(--warn-border) text-(--warn) flex gap-2 items-start">
                  <CosmicIcon name="warning" size={16} className="shrink-0 mt-px" />
                  <span>{cameraErr}</span>
                </div>
              )}

              <div
                onClick={() => !imagePreview && fileRef.current?.click()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("image/")) handleImage(f); }}
                onDragOver={(e) => e.preventDefault()}
                className="rounded-[14px] bg-(--bg-soft) transition-colors duration-200 mb-3 overflow-hidden"
                style={{
                  border: `2px dashed ${imagePreview
                    ? palmValid === "not-palm"
                      ? "var(--error, oklch(0.65 0.22 25))"
                      : palmValid === "warn"
                        ? "oklch(0.72 0.18 40)"
                        : "var(--gold)"
                    : "var(--hairline)"}`,
                  minHeight: imagePreview ? "auto" : 120,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: imagePreview ? "default" : "pointer",
                }}
              >
                {imagePreview
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={imagePreview} alt="palm" className="w-full max-h-[260px] object-contain rounded-xl" />
                  : <p className="text-(--ink-muted) text-[13px] p-6 text-center">эсвэл зургаа энд <strong className="text-(--gold)">чирж</strong> оруулна уу</p>
                }
              </div>

              {(isUploading || palmValid === "checking") && (
                <div className="flex items-center gap-2 mb-3 text-[13px] text-(--ink-muted)">
                  <CosmicIcon name="spinner" size={16} />
                  {isUploading ? "Зураг байршуулж байна..." : "Зураг шалгаж байна..."}
                </div>
              )}

              {palmValid === "ok" && !isUploading && (
                <div className="p-[10px_14px] rounded-[10px] mb-3 flex items-center gap-2 text-[13px] bg-(--success-bg) border border-(--success-border) text-(--success)">
                  <CosmicIcon name="check" size={16} className="shrink-0" />
                  Зураг амжилттай байршлаа
                </div>
              )}

              {palmValid === "not-palm" && !isUploading && (
                <div className="p-[10px_14px] rounded-[10px] mb-3 text-[13px] flex gap-2 items-start"
                  style={{ background: "oklch(0.97 0.02 25)", border: "1px solid oklch(0.88 0.06 25)", color: "oklch(0.52 0.2 25)" }}>
                  <CosmicIcon name="warning" size={16} className="shrink-0 mt-px" />
                  <span>
                    <strong>Алга харагдахгүй байна.</strong> Энэ зураг гарын алга биш юм шиг харагдаж байна.
                    Алгаа дэлгэж, шулуун дээрээс тодорхой зурна уу.
                    <button
                      onClick={resetImage}
                      className="ml-[10px] bg-transparent border-none cursor-pointer text-[12px] font-semibold underline"
                      style={{ color: "oklch(0.52 0.2 25)" }}
                    >
                      Дахин оролдох
                    </button>
                  </span>
                </div>
              )}

              {palmValid === "warn" && !isUploading && (
                <div className="p-[10px_14px] rounded-[10px] mb-3 text-[13px] bg-(--warn-bg) border border-(--warn-border) text-(--warn) flex gap-2 items-start">
                  <CosmicIcon name="warning" size={16} className="shrink-0 mt-px" />
                  <span>
                    Зураг тийм тод биш эсвэл алга бүрэн харагдахгүй байна. Алгаа шулуун дээрээс, гэрэлтэй байдлаар дахин авна уу.
                    <button
                      onClick={resetImage}
                      className="ml-[10px] text-(--gold) bg-transparent border-none cursor-pointer text-[12px] font-semibold"
                    >
                      Дахин авах
                    </button>
                  </span>
                </div>
              )}

              {imagePreview && palmValid !== "warn" && palmValid !== "not-palm" && !isUploading && (
                <button
                  onClick={resetImage}
                  className="btn-ghost text-[12px] border-none cursor-pointer py-1 mb-3 flex items-center gap-1.5"
                >
                  <CosmicIcon name="close" size={13} /> Зургыг солих
                </button>
              )}

              <div className="p-[14px] rounded-[10px] bg-(--gold-5) border border-(--gold-18)">
                <p className="text-(--gold-soft) text-[12px] font-semibold mb-2 flex items-center gap-1.5">
                  <CosmicIcon name="sparkle" size={11} /> Зөвлөмж
                </p>
                <ul className="text-(--ink-muted) text-[12px] leading-[1.8] pl-4 m-0">
                  <li>Алгаа бүрэн дэлгэж, хуруунууд нь тусдаа байх</li>
                  <li>Гэрэл нь тал талаас жигд тусгасан байх</li>
                  <li>Шулуун дээрээс авах — хажуу эсвэл налуу биш</li>
                  <li>Мөрүүд тодорхой харагдахуйц ойрхон авах</li>
                </ul>
              </div>
            </div>
          )}

          {/* ── Step 4 ── */}
          {step === 4 && (
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-[24px] text-(--ink) mb-[6px]">Захиалга хянах</h2>
              <p className="text-(--ink-muted) text-[13px] mb-6">Мэдээллээ хянаад багцаа сонгоод төлбөр рүү шилжинэ үү.</p>

              <div className="mb-6">
                {[
                  ["Нэр", `${form.firstName} ${form.name}`],
                  ["Огноо", form.birthDate],
                  ["Утас", form.phone],
                  ["Гол гар", form.dominantHand === "right" ? "Баруун" : "Зүүн"],
                  ["Чиглэл", products.filter((p) => selectedProductIds.includes(p._id)).map((p) => p.title).join(", ")],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between items-start py-[10px] border-b border-(--hairline)">
                    <span className="text-(--ink-muted) text-[13px]">{label}</span>
                    <span className="text-(--ink-soft) text-[13px] font-medium text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
                {form.question && (
                  <div className="py-[10px] border-b border-(--hairline)">
                    <span className="text-(--ink-muted) text-[13px]">Асуулт</span>
                    <p className="text-(--ink-soft) text-[13px] mt-1">{form.question}</p>
                  </div>
                )}
              </div>

              {imagePreview && (
                <div className="mb-5">
                  <p className="text-(--ink-muted) text-[11px] mb-2">Гарын зураг</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="palm" className="h-[88px] rounded-[10px] object-contain border border-(--hairline)" />
                </div>
              )}

              <label className="flex items-start gap-3 cursor-pointer mb-4 mt-1">
                <div className="relative mt-[2px] shrink-0">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-150 ${termsAccepted ? "bg-(--gold) border-(--gold)" : "bg-transparent border-(--hairline)"}`}>
                    {termsAccepted && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[13px] text-(--ink-muted) leading-[1.6]">
                  Би{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-(--gold-soft) no-underline hover:text-(--gold) transition-colors" onClick={(e) => e.stopPropagation()}>
                    үйлчилгээний нөхцөл
                  </a>
                  -ийг уншиж танилцсан бөгөөд зөвшөөрч байна.
                </span>
              </label>

              {(() => {
                const selected = products.filter((p) => selectedProductIds.includes(p._id));
                if (selected.length === 0) return null;
                const total = selected.reduce((s, p) => s + p.price, 0);
                return (
                  <div className="rounded-xl bg-(--gold-5) border border-(--gold-20) overflow-hidden">
                    {selected.map((p, i) => (
                      <div key={p._id} className={`flex justify-between items-center px-5 py-3 ${i < selected.length - 1 ? "border-b border-(--gold-18)" : ""}`}>
                        <span className="text-(--ink-soft) text-[13px]">{p.title}</span>
                        <span className="text-(--gold) font-semibold text-[13px]">{p.price.toLocaleString()}₮</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-5 py-4 border-t border-(--gold-30)">
                      <span className="text-(--ink-soft) font-medium text-[14px]">Нийт төлөх</span>
                      <span className="font-[family-name:var(--font-serif)] text-[28px] font-[800] text-(--gold)">
                        {total.toLocaleString()}₮
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex gap-[10px] mt-7">
            {step > 1 && (
              <button onClick={() => setStep((s) => s - 1)} className="btn-outline flex-1 p-3 rounded-[10px] text-[14px] font-semibold cursor-pointer">
                ← Өмнөх
              </button>
            )}
            <button
              onClick={proceed}
              disabled={!canProceed || isRegistering || isCreatingOrder}
              className={`flex-1 p-3 rounded-[10px] text-[14px] font-bold ${canProceed && !isRegistering && !isCreatingOrder
                ? "btn-primary cursor-pointer opacity-100"
                : "bg-(--bg-soft) text-(--ink-muted) border border-(--hairline) cursor-not-allowed opacity-40"
                }`}
            >
              {isRegistering
                ? "Үргэлжлүүлж байна..."
                : isCreatingOrder
                  ? "Захиалга үүсгэж байна..."
                  : step === 4
                    ? "Төлбөр хийх →"
                    : "Үргэлжлүүлэх →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
