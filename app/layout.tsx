import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StarField } from "@/components/layout/StarField";
import { PageLoader } from "@/components/ui/PageLoader";
import { PageLoaderProvider } from "@/components/ui/PageLoaderContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zurhaich.space"),
  title: "Зурхайч — Таны гарын мөрний нууц",
  description:
    "Гарын мөрний уншлагаар хайр дурлал, ажил карьер, эрүүл мэнд, ирээдүйгээ мэд. Монгол дахь анхны онлайн гарын мөрний уншлага.",
  openGraph: {
    title: "Зурхайч — Таны гарын мөрний нууц",
    description:
      "Гарын мөрний уншлагаар хайр дурлал, ажил карьер, эрүүл мэнд, ирээдүйгээ мэд. Монгол дахь анхны онлайн гарын мөрний уншлага.",
    url: "https://zurhaich.space",
    siteName: "Зурхайч",
    locale: "mn_MN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Зурхайч — Таны гарын мөрний нууц",
    description:
      "Гарын мөрний уншлагаар хайр дурлал, ажил карьер, эрүүл мэнд, ирээдүйгээ мэд. Монгол дахь анхны онлайн гарын мөрний уншлага.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "гарын мөр",
    "зурхай",
    "уншлага",
    "хайр",
    "карьер",
    "ирээдүй",
    "эрүүл мэнд",
    "монгол зурхай",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" data-scroll-behavior="smooth" className={`${geist.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <PageLoaderProvider>
          <Toaster position="top-center" toastOptions={{ style: { background: "var(--bg-card)", color: "var(--ink)", border: "1px solid var(--hairline)" } }} />
          <PageLoader />
          <StarField />
          <SiteHeader />
          <main className="pt-[60px] flex-1 relative z-2">
            {children}
          </main>
          <footer className="relative z-1 border-t border-(--hairline) py-5 px-6 flex items-center justify-center gap-6 text-[12px] text-(--ink-muted)">
            <span>© 2026 Зурхайч</span>
            <Link href="/privacy" className="no-underline hover:text-(--gold) transition-colors">Нууцлалын бодлого</Link>
            <Link href="/terms" className="no-underline hover:text-(--gold) transition-colors">Үйлчилгээний нөхцөл</Link>
          </footer>
        </PageLoaderProvider>
      </body>
    </html>
  );
}
