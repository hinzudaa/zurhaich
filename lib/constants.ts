import type { ReadingTopic } from "@/types";

export const TOPICS: {
  key: ReadingTopic;
  icon: string;
  label: string;
  kicker: string;
  desc: string;
  premium?: boolean;
  free?: boolean;
}[] = [
    { key: "love", icon: "/love.png", label: "Хайр & Харилцаа", kicker: "I — Үнэн", free: true, desc: "Хамтрагч, гэрлэлт, харилцааны ирээдүй — зүрхний шугам юу хэлэх вэ?" },
    { key: "career", icon: "/career.png", label: "Карьер & Уриалга", kicker: "II — Зам", free: true, desc: "Карьерын зам, амжилтын боломж, санхүүгийн өсөлтийн чиглэл." },
    { key: "money", icon: "/money.png", label: "Мөнгө & Элбэг", kicker: "III — Урсгал", desc: "Санхүүгийн урсгал, баялаг, хүчирхэг боломжийн үе — хэзээ ирэх вэ?" },
    { key: "health", icon: "/health.png", label: "Эрүүл мэнд", kicker: "IV — Тэнцвэр", desc: "Биеийн болон сэтгэцийн тэнцвэр, анхааруулах дохио, сэргэлтийн үе." },
    { key: "fate", icon: "/destiny.png", label: "Хувь тавилан", kicker: "V — Дохио", desc: "Амьдралын гол эргэлтүүд, тавилангийн шугам, шийдвэрлэх гол цаг." },
    { key: "family", icon: "/family.png", label: "Гэр бүл", kicker: "VI — Үндэс", desc: "Гэр бүлийн холбоо, үр хүүхэд, дотно харилцааны хэлбэр." },
    { key: "travel", icon: "/aylal.png", label: "Аялал & Шилжилт", kicker: "VII — Хөдөлгөөн", desc: "Газар нутгийн шилжилт, гадаад боломж, шинэ эхлэлийн дохио." },
    { key: "full", icon: "/bagts.png", label: "Бүрэн Уншилт", kicker: "VIII — Дэлгэрэнгүй", premium: true, desc: "Бүх чиглэлийг хамарсан гүнзгий premium тайлан — амьдралын бүрэн зураглал." },
  ];

export const TOPIC_LABELS: Record<ReadingTopic, string> = Object.fromEntries(
  TOPICS.map(({ key, label }) => [key, label])
) as Record<ReadingTopic, string>;
