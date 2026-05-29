"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import { useCheckOrderPayment, useOrder, useSubmitOrder } from "@/hooks/useProducts";
import type { QPayInvoice } from "@/types/product";

function readQpayFromStorage(orderId: string | null): QPayInvoice | null {
  if (typeof window === "undefined" || !orderId) return null;
  try {
    const raw = sessionStorage.getItem("pendingQpay");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { orderId: string; qpay: QPayInvoice };
    return parsed.orderId === orderId ? parsed.qpay : null;
  } catch {
    return null;
  }
}

function PaymentPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [qpay] = useState<QPayInvoice | null>(() => readQpayFromStorage(orderId));
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [checkError, setCheckError] = useState("");
  const [checking, setChecking] = useState(false);
  const submittingRef = useRef(false);

  const { data: orderData, mutate: refetchOrder } = useOrder(orderId);
  const { trigger: checkPayment } = useCheckOrderPayment(orderId);
  const { trigger: submitOrder } = useSubmitOrder(orderId);

  const orderStatus = orderData?.data?.status;
  const isPaid = orderStatus === "paid" || orderStatus === "processing" || orderStatus === "completed";

  useEffect(() => {
    if (orderStatus !== "paid" || submittingRef.current) return;

    submittingRef.current = true;
    setSubmitted(true);

    const raw = sessionStorage.getItem("palmForm");
    if (!raw || !orderId) {
      router.push(`/result?id=${orderId}`);
      return;
    }

    const formBody = JSON.parse(raw) as Record<string, unknown>;
    submitOrder(formBody)
      .then(() => {
        sessionStorage.removeItem("palmForm");
        sessionStorage.removeItem("pendingQpay");
        router.push(`/result?id=${orderId}`);
      })
      .catch((err: Error) => {
        submittingRef.current = false;
        setSubmitted(false);
        setSubmitError(err.message);
      });
  }, [orderStatus, orderId, router, submitOrder]);

  const onCheck = async () => {
    setCheckError("");
    setChecking(true);
    try {
      const res = await checkPayment();
      if (res.data.paid) {
        // Sync the updated order into the SWR cache so the useEffect fires
        await refetchOrder();
      } else {
        setCheckError("Төлбөр баталгаажаагүй байна. Гүйлгээ хийсэн бол хэдэн секунд хүлээгээд дахин шалгана уу.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Шалгахад алдаа гарлаа.";
      setCheckError(msg);
    } finally {
      setChecking(false);
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-(--ink-muted) mb-4">Захиалга олдсонгүй.</p>
          <button onClick={() => router.push("/reading")} className="btn-primary px-6 py-3 rounded-xl text-[14px] font-bold border-none cursor-pointer">
            Буцах
          </button>
        </div>
      </div>
    );
  }

  if (submitted || orderStatus === "processing") {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-5 flex justify-center float-y">
            <CosmicIcon name="orb" size={64} />
          </div>
          <h2 className="font-[family-name:var(--font-serif)] text-[22px] text-(--ink) mb-3">
            Боловсруулж байна...
          </h2>
          <p className="text-(--ink-muted) text-[14px]">Гарын мөрийг уншиж байна. Хэдхэн минут хүлээнэ үү.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[520px] mx-auto pt-10 px-6 pb-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-[linear-gradient(135deg,var(--bg-soft),var(--gold-soft))] border border-(--hairline) pulse-gold">
          <CosmicIcon name="orb" size={28} />
        </div>
        <h1 className="font-[family-name:var(--font-serif)] text-[26px] font-bold text-(--ink) mb-2">
          QPay төлбөр
        </h1>
        <p className="text-(--ink-muted) text-[13px]">
          Дараах QR кодыг уншуулж эсвэл банкны апп-аар төлнө үү
        </p>
      </div>

      <div className="card-surface rounded-2xl p-6 mb-4">
        {/* QR image */}
        {qpay?.qr_image ? (
          <div className="flex justify-center mb-5">
            <div className="p-3 bg-white rounded-2xl inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/png;base64,${qpay.qr_image}`}
                alt="QPay QR"
                className="w-[220px] h-[220px] object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-5">
            <div className="w-[220px] h-[220px] rounded-2xl bg-(--bg-soft) border border-(--hairline) flex items-center justify-center">
              <CosmicIcon name="spinner" size={32} />
            </div>
          </div>
        )}

        {/* Amount */}
        {orderData?.data?.qpayAmount && (
          <div className="text-center mb-5">
            <span className="font-[family-name:var(--font-serif)] text-[32px] font-[800] text-(--gold)">
              {orderData.data.qpayAmount.toLocaleString()}₮
            </span>
          </div>
        )}

        {/* Status badge */}
        <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium mb-5 mx-auto w-fit ${isPaid
            ? "bg-(--success-bg) border border-(--success-border) text-(--success)"
            : "bg-(--gold-8) border border-(--gold-20) text-(--gold-soft)"
          }`}>
          {isPaid ? (
            <><CosmicIcon name="check" size={14} /> Төлбөр баталгаажсан</>
          ) : (
            <><CosmicIcon name="spinner" size={14} /> Төлбөр хүлээж байна...</>
          )}
        </div>

        {/* Manual check button */}
        {!isPaid && (
          <button
            onClick={onCheck}
            disabled={checking}
            className="btn-primary w-full py-3 rounded-xl text-[14px] font-bold cursor-pointer mb-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed border-none"
          >
            {checking
              ? <><CosmicIcon name="spinner" size={16} /> Шалгаж байна...</>
              : <><CosmicIcon name="sparkle" size={16} /> Төлбөр шалгах</>}
          </button>
        )}

        {/* Check error */}
        {checkError && (
          <div className="mb-4 p-3 rounded-[10px] bg-(--warn-bg) border border-(--warn-border) text-(--warn) text-[13px] flex gap-2 items-start">
            <CosmicIcon name="warning" size={15} className="shrink-0 mt-px" />
            <span>{checkError}</span>
          </div>
        )}

        {submitError && (
          <div className="mb-4 p-3 rounded-[10px] bg-(--warn-bg) border border-(--warn-border) text-(--warn) text-[13px]">
            {submitError}
          </div>
        )}

        {/* Bank app deeplinks */}
        {qpay?.urls && qpay.urls.length > 0 && (
          <div>
            <p className="text-(--ink-muted) text-[11px] mb-3 text-center tracking-[0.08em]">ЭСВЭЛ БАНКНЫ АППААР ТӨЛӨХ</p>
            <div className="grid grid-cols-2 gap-2">
              {qpay.urls.map((u) => (
                <a
                  key={u.name}
                  href={u.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-[10px] rounded-xl bg-(--bg-soft) border border-(--hairline) no-underline hover:border-(--gold-30) transition-colors duration-200"
                >
                  {u.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={u.logo} alt={u.name} className="w-7 h-7 rounded-lg object-contain" />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-(--gold-8) flex items-center justify-center">
                      <CosmicIcon name="orb" size={14} />
                    </div>
                  )}
                  <span className="text-[12px] text-(--ink-soft) font-medium truncate">{u.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-surface rounded-xl p-4 mb-4">
        <p className="text-(--gold-soft) text-[12px] font-semibold mb-2 flex items-center gap-1.5">
          <CosmicIcon name="sparkle" size={11} /> Анхааралтай
        </p>
        <ul className="text-(--ink-muted) text-[12px] leading-[1.8] pl-4 m-0">
          <li>Төлбөр хийсний дараа <strong className="text-(--gold)">Төлбөр шалгах</strong> товч дарна уу</li>
          <li>Энэ хуудсыг хаахгүй байна уу</li>
          <li>Асуудал гарвал дахин төлбөр хийхийг оролдоно уу</li>
        </ul>
      </div>

      <button
        onClick={() => router.push("/reading")}
        className="btn-outline w-full py-3 rounded-xl text-[13px] font-medium cursor-pointer"
      >
        ← Буцах
      </button>
    </div>
  );
}

export default function PaymentPage() {
  return <Suspense><PaymentPageInner /></Suspense>;
}
