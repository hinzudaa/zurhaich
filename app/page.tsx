"use client";

import Link from "next/link";
import Image from "next/image";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import { TOPICS } from "@/lib/constants";
import { useProducts } from "@/hooks/useProducts";
import { usePageReady } from "@/components/ui/PageLoaderContext";

const steps = [
  { num: "01", title: "Мэдээлэл өгөх", desc: "Нэр, төрсөн он сар, хүйс, асуулт" },
  { num: "02", title: "Гарын зураг", desc: "Алгаа тод, гэрэлтэй газар дарж оруулна" },
  { num: "03", title: "QPay төлбөр", desc: "Бүрэн уншлага — 29,900₮" },
  { num: "04", title: "Уншлага авах", desc: "Дэлгэрэнгүй тайлан" },
];


const faqs = [
  { q: "Уншлага хэр удаан ирдэг вэ?", a: "Төлбөр амжилттай болсны дараа ихэвчлэн 1-5 минутын дотор бэлэн болдог." },
  { q: "Гарын зургийг яаж авах вэ?", a: "Алгаа дэлгэж, сайн гэрэлтэй газарт авна. Мөрүүд тод харагдах ёстой. Ямар ч тусгай тоног төхөөрөмж шаардлагагүй." },
  { q: "Хэдэн ч удаа авч болох уу?", a: "Тийм ээ. Хэд ч удаа захиалж болно. Амьдралын нөхцөл байдал өөрчлөгдөх тусам уншлага ч өөр байж болно." },
  { q: "Нууцлал хэрхэн хамгаалагддаг вэ?", a: "Таны мэдээлэл зөвхөн уншлагад ашиглагдах бөгөөд гуравдагч этгээдэд хэзээ ч дамжуулагдахгүй." },
  { q: "Буцаан олголт байдаг уу?", a: "Уншлага хүргэсний дараа буцаан олголт хийгддэггүй. Асуулт байвал бидэнтэй холбоо барина уу." },
  { q: "Ямар чиглэлүүд байдаг вэ?", a: "Хайр дурлал, карьер, мэнд эрүүл мэнд, гэр бүл, мөнгө санхүү, аялал зэрэг чиглэлүүд байдаг. Бүрэн уншлага бүх чиглэлийг хамардаг." },
];

export default function Home() {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const products = productsData?.data ?? [];

  usePageReady(!productsLoading);

  return (
    <div className="relative overflow-x-hidden">

      <section className="min-h-screen flex items-center justify-center text-center px-6 pt-20 pb-[60px] relative">
        <div className="max-w-[780px] mx-auto relative z-[1]">
          <div className="inline-flex items-center gap-2 px-4 py-[7px] rounded-full mb-8 bg-(--gold-8) border border-(--gold-30) text-[13px] text-(--gold-soft)">
            <CosmicIcon name="star" size={14} /> 10,000+ хүн итгэж ашигласан
          </div>

          <h1 className="font-[family-name:var(--font-serif)] font-bold leading-[1.1] mb-6 text-(--ink) text-[clamp(40px,8vw,80px)]">
            Алгад тань{" "}
            <em className="italic text-(--gold)">бичигдсэн</em>
            <br />зурвас
          </h1>

          <p className="text-(--ink-muted) max-w-[560px] mx-auto mb-10 leading-[1.7] text-[clamp(16px,2vw,20px)]">
            Мянган жилийн уламжлалт ухаан болон орчин үеийн мэдлэгийг хослуулан таны гарын мөрнөөс хайр, карьер, ирээдүйн нууцыг тайлна.
          </p>

          <div className="flex gap-3 justify-center flex-wrap mb-16">
            <Link href="/reading" className="btn-primary px-8 py-[14px] rounded-lg text-[16px] no-underline inline-flex items-center gap-2">
              <CosmicIcon name="orb" size={20} /> Уншлага авах
            </Link>
            <a href="#how" className="btn-outline px-7 py-[14px] rounded-lg text-[15px] no-underline">
              Хэрхэн ажилдаг →
            </a>
          </div>

          <div className="float-y flex justify-center">
            <Image src="/palm.png" alt="Palm" width={320} height={320} className="object-contain" />
          </div>
        </div>
      </section>

      <section id="features" className="pb-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-serif)] text-(--ink) mb-3 text-[clamp(28px,4vw,40px)]">
              Юуг <span className="gold-text">мэдэж авах</span> вэ?
            </h2>
            <p className="text-(--ink-muted) text-[16px]">Таны гарын мөр амьдралынхаа бүх талын нууцыг агуулдаг</p>
          </div>
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-stretch">
            {TOPICS.map((f) => (
              <div key={f.key} className="card-surface rounded-2xl p-[28px_24px] flex flex-col">
                <div className="h-10 mb-4 flex items-center">
                  <Image src={f.icon} alt={f.label} width={40} height={40} className="object-contain" />
                </div>
                <h3 className="text-(--gold) text-[17px] font-semibold mb-3 min-h-[48px] flex items-start">{f.label}</h3>
                <p className="text-(--ink-muted) text-[14px] leading-[1.65]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-20 px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-serif)] text-(--ink) mb-3 text-[clamp(28px,4vw,40px)]">
              Хэрхэн <span className="gold-text">ажилдаг</span> вэ?
            </h2>
            <p className="text-(--ink-muted) text-[16px]">Дөрвөн энгийн алхам</p>
          </div>
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {steps.map((s) => (
              <div key={s.num} className="card-surface rounded-2xl p-[28px_24px] text-center">
                <div className="gold-text text-[32px] font-[family-name:var(--font-serif)] font-bold mb-3">{s.num}</div>
                <h3 className="text-(--ink) text-[16px] font-semibold mb-2">{s.title}</h3>
                <p className="text-(--ink-muted) text-[13px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-20 px-6">
        <div className="max-w-[1060px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-serif)] text-(--ink) mb-3 text-[clamp(28px,4vw,40px)]">
              Үнэ <span className="gold-text">тарифф</span>
            </h2>
            <p className="text-(--ink-muted) text-[16px]">Сонирхсон чиглэлээ сонгон уншлага авна уу</p>
          </div>

          {productsLoading ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-(--bg-card) border border-(--hairline) h-[280px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => {
                const original = p.originalPrice ?? p.price * 2;
                const isFull = p.title === "Бүрэн Уншилт";
                const imgUrl = p.media[0]?.url;
                return (
                  <div
                    key={p._id}
                    className={`relative rounded-2xl overflow-hidden bg-(--bg-card) flex flex-col transition-transform duration-200 hover:-translate-y-1 ${isFull ? "pulse-gold border border-(--gold)" : "border border-(--hairline)"}`}
                  >
                    {/* Product image */}
                    <div className="relative w-full aspect-square overflow-hidden bg-(--bg-soft)">
                      {imgUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imgUrl} alt={p.title} className="w-full h-full object-cover" />
                      )}
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-[8px] py-[3px] rounded-full shadow-md">
                        -50%
                      </span>
                      {isFull && (
                        <span className="absolute top-2 left-2 btn-primary text-[10px] font-bold px-[8px] py-[3px] rounded-full">
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-(--ink) font-semibold text-[13px] leading-snug mb-3">{p.title}</div>
                      <div className="mt-auto">
                        <div className="text-(--ink-muted) text-[12px] line-through leading-none mb-[3px]">
                          {original.toLocaleString()}₮
                        </div>
                        <div className="gold-text text-[22px] font-bold font-serif leading-none">
                          {p.price.toLocaleString()}₮
                        </div>
                      </div>
                      <Link
                        href="/reading"
                        className={`block text-center py-[9px] rounded-lg text-[12px] font-semibold no-underline mt-3 transition-opacity hover:opacity-85 ${isFull ? "btn-primary" : "border border-(--gold) text-(--gold) hover:bg-(--gold-7)"}`}
                      >
                        Эхлэх
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="faq" className="py-20 px-6 bg-(--bg-soft-50)">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-serif)] text-(--ink) mb-3 text-[clamp(28px,4vw,40px)]">
              Түгээмэл <span className="gold-text">асуултууд</span>
            </h2>
            <p className="text-(--ink-muted) text-[16px]">Таны асуулт энд байж магадгүй</p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div key={i} className="card-surface rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <CosmicIcon name="sparkle" size={16} className="shrink-0 mt-[3px]" />
                  <div>
                    <div className="font-semibold text-(--ink) text-[15px] mb-2">{f.q}</div>
                    <p className="text-(--ink-muted) text-[13px] leading-[1.65]">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <div className="mb-5 flex justify-center float-y">
            <CosmicIcon name="orb" size={64} />
          </div>
          <h2 className="font-[family-name:var(--font-serif)] text-(--ink) mb-4 text-[clamp(26px,4vw,38px)]">
            Таны ирээдүй <span className="gold-text">таны гарт</span>
          </h2>
          <p className="text-(--ink-muted) text-[16px] mb-8">
            Одоо эхэлж, гарын мөрнийхөө нууцыг нээгээрэй. Зөвхөн бүрэн уншлага 29,999₮.
          </p>
          <Link href="/reading" className="btn-primary px-10 py-4 rounded-[10px] text-[17px] no-underline inline-flex items-center gap-2">
            <CosmicIcon name="orb" size={22} /> Уншлага  авах
          </Link>
        </div>
      </section>
    </div>
  );
}
