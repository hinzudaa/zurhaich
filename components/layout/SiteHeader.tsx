"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CosmicIcon } from "@/components/ui/CosmicIcon";
import { useLogout, useMe } from "@/hooks/useAuth";

const NAV = [
  { href: "/#features", label: "Хэрхэн ажилдаг вэ?" },
  { href: "/#plans", label: "Үнэ" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const path = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { data: user } = useMe();
  const { trigger: triggerLogout } = useLogout();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.slice(2);
      if (path === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    }
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    setProfileOpen(false);
    await triggerLogout();
    router.push("/");
  };

  const isHome = path === "/";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-(--hairline) bg-(--bg-deep-94) backdrop-blur-[20px]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-7 flex items-center h-[60px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px] no-underline shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/palm.png" alt="Зурхайч" style={{ height: 36, width: "auto" }} />
            <span className="gold-text font-[family-name:var(--font-serif)] text-[17px] tracking-[0.05em] whitespace-nowrap">
              Zurhaich
            </span>
          </Link>

          {/* Desktop nav links (home only) */}
          {isHome && (
            <>
              <div className="hidden md:block w-px h-5 bg-(--hairline) mx-6 shrink-0" />
              <nav className="hidden md:flex items-center gap-[2px] flex-1">
                {NAV.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    className="px-[14px] py-2 rounded-md text-[12px] tracking-[0.1em] uppercase no-underline font-normal text-(--ink-muted) whitespace-nowrap transition-all duration-[180ms] hover:text-(--gold) hover:bg-(--gold-7)"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </>
          )}

          {!isHome && <div className="flex-1" />}

          {/* Right side */}
          <div className="flex items-center gap-[10px] shrink-0 ml-auto">

            {/* Desktop: profile dropdown or login button */}
            {user ? (
              <div ref={profileRef} className="relative hidden md:block">
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  title={user.name || String(user.phone)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 transition-opacity duration-200 hover:opacity-80 bg-[linear-gradient(135deg,var(--gold),var(--gold-soft))] text-(--bg-deep) cursor-pointer border-none"
                >
                  {(user.name || String(user.phone)).charAt(0).toUpperCase()}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-[160px] rounded-[12px] border border-(--hairline) bg-(--bg-deep-94) backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-[101]">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-[11px] text-[13px] text-(--ink-muted) no-underline hover:text-(--gold) hover:bg-(--gold-7) transition-colors duration-[150ms]"
                    >
                      <CosmicIcon name="user" size={14} />
                      Профайл
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-[11px] text-[13px] text-(--ink-muted) hover:text-(--gold) hover:bg-(--gold-7) transition-colors duration-[150ms] bg-transparent border-none cursor-pointer text-left"
                    >
                      Гарах
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex px-[14px] sm:px-[18px] py-2 rounded-lg text-[13px] font-bold no-underline whitespace-nowrap text-(--bg-deep) transition-opacity duration-200 hover:opacity-85 bg-[linear-gradient(135deg,var(--gold),var(--gold-soft))]"
              >
                Нэвтрэх
              </Link>
            )}

            {/* Mobile: hamburger only, visible on every page */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] cursor-pointer bg-transparent border-none"
              aria-label="Цэс"
            >
              <span className={`block w-5 h-[1.5px] bg-(--ink-muted) transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-(--ink-muted) transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-(--ink-muted) transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer — all pages */}
        {menuOpen && (
          <div className="md:hidden border-t border-(--hairline) bg-(--bg-deep-94) backdrop-blur-[20px] px-5 py-3 flex flex-col">
            {isHome && NAV.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNav(e, href)}
                className="py-[11px] text-[13px] tracking-[0.08em] uppercase no-underline text-(--ink-muted) border-b border-(--hairline) hover:text-(--gold) transition-colors duration-[150ms]"
              >
                {label}
              </a>
            ))}
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="py-[11px] text-[13px] tracking-[0.08em] uppercase no-underline text-(--ink-muted) border-b border-(--hairline) hover:text-(--gold) transition-colors duration-[150ms]"
                >
                  Профайл
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-[11px] text-[13px] tracking-[0.08em] uppercase text-left text-(--ink-muted) bg-transparent border-none cursor-pointer hover:text-(--gold) transition-colors duration-[150ms]"
                >
                  Гарах
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="py-[11px] text-[13px] tracking-[0.08em] uppercase no-underline text-(--ink-muted) hover:text-(--gold) transition-colors duration-[150ms]"
              >
                Нэвтрэх
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Backdrop: closes mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
