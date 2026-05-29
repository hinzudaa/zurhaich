"use client";

import { JSX } from "react";

interface Props {
  name: string;
  size?: number;
  className?: string;
}

// love — heart formed by two arcs with star tips
function IconLove({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="lg-love" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      {/* Heart path */}
      <path d="M12 20.5C12 20.5 3 14.5 3 8.5C3 5.46 5.46 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.54 3 23 5.46 23 8.5C23 14.5 12 20.5 12 20.5Z"
        fill="url(#lg-love)" opacity="0.25" />
      <path d="M12 20.5C12 20.5 3 14.5 3 8.5C3 5.46 5.46 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.54 3 23 5.46 23 8.5C23 14.5 12 20.5 12 20.5Z"
        stroke="var(--gold)" strokeWidth="1.2" fill="none" />
      {/* Small stars */}
      <circle cx="12" cy="10" r="1.2" fill="var(--gold)" />
      <circle cx="7.5" cy="7" r="0.7" fill="var(--gold)" opacity="0.8" />
      <circle cx="16.5" cy="7" r="0.7" fill="var(--gold)" opacity="0.8" />
      <line x1="5" y1="16" x2="6.5" y2="17.5" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
      <line x1="19" y1="16" x2="17.5" y2="17.5" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

// career — Saturn-like planet with orbital ring
function IconCareer({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="lg-career" cx="40%" cy="38%" r="55%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      {/* Planet */}
      <circle cx="12" cy="12" r="5" fill="url(#lg-career)" opacity="0.3" />
      <circle cx="12" cy="12" r="5" stroke="var(--gold)" strokeWidth="1.1" fill="none" />
      {/* Orbital ring — tilted ellipse */}
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="var(--gold)" strokeWidth="0.9" fill="none"
        strokeDasharray="3 2" transform="rotate(-20 12 12)" opacity="0.75" />
      {/* Highlight dot on planet */}
      <circle cx="10.2" cy="10.2" r="1.1" fill="var(--gold)" opacity="0.6" />
      {/* Tick marks on ring */}
      <circle cx="3.5" cy="10.2" r="0.6" fill="var(--gold)" opacity="0.6" />
      <circle cx="20.5" cy="13.8" r="0.6" fill="var(--gold)" opacity="0.6" />
    </svg>
  );
}

// money — glowing gold coin with orbit arc
function IconMoney({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="lg-money" cx="38%" cy="35%" r="55%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      {/* Coin */}
      <circle cx="12" cy="12" r="7.5" fill="url(#lg-money)" opacity="0.2" />
      <circle cx="12" cy="12" r="7.5" stroke="var(--gold)" strokeWidth="1.1" fill="none" />
      <circle cx="12" cy="12" r="5.2" stroke="var(--gold)" strokeWidth="0.5" fill="none" opacity="0.45" />
      {/* ₮ symbol */}
      <line x1="9" y1="9.5" x2="15" y2="9.5" stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="11" y1="9.5" x2="11" y2="15" stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      {/* Orbit dots */}
      <circle cx="19.5" cy="8" r="0.8" fill="var(--gold)" opacity="0.7" />
      <circle cx="4.5" cy="16" r="0.8" fill="var(--gold)" opacity="0.7" />
      <path d="M5 8 Q12 2 19 8" stroke="var(--gold)" strokeWidth="0.6" fill="none" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

// health — crescent moon with leaf vein
function IconHealth({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {/* Crescent */}
      <path d="M15 4.5C11.41 4.5 8.5 7.41 8.5 11C8.5 14.59 11.41 17.5 15 17.5C16.2 17.5 17.32 17.16 18.28 16.59C17.12 19.12 14.5 20.9 11.5 20.9C7.36 20.9 4 17.54 4 13.4C4 9.26 7.36 5.9 11.5 5.9C12.7 5.9 13.84 6.2 14.82 6.74C14.88 5.97 14.96 5.22 15 4.5Z"
        fill="var(--gold)" opacity="0.22" />
      <path d="M15 4.5C11.41 4.5 8.5 7.41 8.5 11C8.5 14.59 11.41 17.5 15 17.5C16.2 17.5 17.32 17.16 18.28 16.59C17.12 19.12 14.5 20.9 11.5 20.9C7.36 20.9 4 17.54 4 13.4C4 9.26 7.36 5.9 11.5 5.9C12.7 5.9 13.84 6.2 14.82 6.74C14.88 5.97 14.96 5.22 15 4.5Z"
        stroke="var(--gold)" strokeWidth="1.1" fill="none" />
      {/* Stars in crescent */}
      <circle cx="18" cy="7" r="0.8" fill="var(--gold)" />
      <circle cx="20" cy="11" r="0.6" fill="var(--gold)" opacity="0.7" />
      <circle cx="18.5" cy="14" r="0.5" fill="var(--gold)" opacity="0.5" />
    </svg>
  );
}

// fate — crystal orb / nebula eye
function IconFate({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="lg-fate" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="oklch(0.55 0.22 295)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      {/* Outer glow ring */}
      <circle cx="12" cy="12" r="10.5" stroke="var(--gold)" strokeWidth="0.4" fill="none" opacity="0.2" strokeDasharray="1 3" />
      {/* Main orb */}
      <circle cx="12" cy="12" r="8" fill="url(#lg-fate)" opacity="0.35" />
      <circle cx="12" cy="12" r="8" stroke="var(--gold)" strokeWidth="1.1" fill="none" />
      {/* Inner rings */}
      <circle cx="12" cy="12" r="5" stroke="var(--gold)" strokeWidth="0.5" fill="none" opacity="0.4" />
      <circle cx="12" cy="12" r="2.5" fill="var(--gold)" opacity="0.6" />
      {/* Highlight */}
      <circle cx="9.5" cy="9.5" r="1.5" fill="white" opacity="0.35" />
    </svg>
  );
}

// family — stars arranged in a house silhouette
function IconFamily({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {/* House outline in stars */}
      <path d="M12 3L21 11V21H15V15H9V21H3V11L12 3Z"
        fill="var(--gold)" opacity="0.12" stroke="var(--gold)" strokeWidth="1.1" strokeLinejoin="round" />
      {/* Constellation lines between stars */}
      <circle cx="12" cy="4.5" r="1" fill="var(--gold)" />
      <circle cx="4" cy="11.5" r="0.8" fill="var(--gold)" opacity="0.8" />
      <circle cx="20" cy="11.5" r="0.8" fill="var(--gold)" opacity="0.8" />
      {/* Window as glowing dot */}
      <rect x="10" y="14" width="4" height="4" rx="0.8" fill="var(--gold)" opacity="0.35" stroke="var(--gold)" strokeWidth="0.6" />
      {/* Star above roof */}
      <circle cx="12" cy="1.5" r="0.7" fill="var(--gold)" opacity="0.6" />
    </svg>
  );
}

// travel — shooting star / rocket trail
function IconTravel({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="lg-travel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Rocket body */}
      <path d="M15 3C15 3 20 5 20 12C20 16 17 19 14 20L10 16L15 3Z"
        fill="url(#lg-travel)" opacity="0.3" stroke="var(--gold)" strokeWidth="1" strokeLinejoin="round" />
      {/* Fins */}
      <path d="M14 20L11 22L10 16L14 20Z" stroke="var(--gold)" strokeWidth="0.9" fill="var(--gold)" opacity="0.3" />
      {/* Window */}
      <circle cx="16" cy="9" r="1.8" stroke="var(--gold)" strokeWidth="0.9" fill="var(--gold)" opacity="0.25" />
      {/* Trail stars */}
      <circle cx="7" cy="17" r="0.8" fill="var(--gold)" opacity="0.7" />
      <circle cx="5" cy="19.5" r="0.6" fill="var(--gold)" opacity="0.5" />
      <circle cx="3" cy="21.5" r="0.5" fill="var(--gold)" opacity="0.35" />
    </svg>
  );
}

// full — radiant star burst (8-point star)
function IconFull({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="lg-full" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {/* 8-point star */}
      <path d="M12 2L13.5 9.5L21 8L15.5 13L21 18L13.5 16.5L12 24L10.5 16.5L3 18L8.5 13L3 8L10.5 9.5Z"
        fill="url(#lg-full)" opacity="0.3" stroke="var(--gold)" strokeWidth="0.9" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" fill="var(--gold)" opacity="0.7" />
      <circle cx="12" cy="12" r="1.2" fill="var(--gold)" />
    </svg>
  );
}

// orb — crystal ball (for result hero)
function IconOrb({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="lg-orb" cx="38%" cy="32%" r="58%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="1" />
          <stop offset="40%" stopColor="oklch(0.55 0.22 295)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="11" r="9.5" fill="url(#lg-orb)" opacity="0.4" />
      <circle cx="12" cy="11" r="9.5" stroke="var(--gold)" strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="11" r="6" stroke="var(--gold)" strokeWidth="0.5" fill="none" opacity="0.35" />
      <circle cx="12" cy="11" r="3" fill="var(--gold)" opacity="0.5" />
      <circle cx="8.5" cy="7.5" r="2.2" fill="white" opacity="0.22" />
      {/* Base */}
      <path d="M7 20.5H17" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M9 20.5L10 22H14L15 20.5" stroke="var(--gold)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

// star — generic radiant star (for summary/highlights)
function IconStar({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
        fill="var(--gold)" opacity="0.35" stroke="var(--gold)" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.5" fill="var(--gold)" />
    </svg>
  );
}

// palm — hand for reading page / general
function IconPalm({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M8 14V6C8 5.45 8.45 5 9 5C9.55 5 10 5.45 10 6V11"
        stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10 10V4C10 3.45 10.45 3 11 3C11.55 3 12 3.45 12 4V10"
        stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M12 9V4C12 3.45 12.45 3 13 3C13.55 3 14 3.45 14 4V10"
        stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M14 9V5C14 4.45 14.45 4 15 4C15.55 4 16 4.45 16 5V13"
        stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M8 14C8 14 6 14 6 16C6 18.2 7.5 20 10 20.5C11 20.75 13 21 15 20C17 19 16 17 16 13"
        stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M9 17Q12 16 15 17" stroke="var(--gold)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// constellation — decorative star cluster
function IconConstellation({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="5" r="1.2" fill="var(--gold)" />
      <circle cx="12" cy="3" r="1" fill="var(--gold)" opacity="0.9" />
      <circle cx="19" cy="7" r="1.2" fill="var(--gold)" />
      <circle cx="9" cy="11" r="0.9" fill="var(--gold)" opacity="0.8" />
      <circle cx="15" cy="13" r="1.1" fill="var(--gold)" />
      <circle cx="6" cy="17" r="1" fill="var(--gold)" opacity="0.7" />
      <circle cx="20" cy="18" r="0.8" fill="var(--gold)" opacity="0.7" />
      <line x1="5" y1="5" x2="12" y2="3" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
      <line x1="12" y1="3" x2="19" y2="7" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
      <line x1="19" y1="7" x2="15" y2="13" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
      <line x1="5" y1="5" x2="9" y2="11" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
      <line x1="9" y1="11" x2="15" y2="13" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
      <line x1="9" y1="11" x2="6" y2="17" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
      <line x1="15" y1="13" x2="20" y2="18" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
    </svg>
  );
}

// camera / upload icon for reading form
function IconCamera({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2.5" stroke="var(--gold)" strokeWidth="1.1" fill="var(--gold)" fillOpacity="0.08" />
      <circle cx="12" cy="14" r="4" stroke="var(--gold)" strokeWidth="1.1" fill="var(--gold)" fillOpacity="0.15" />
      <circle cx="12" cy="14" r="1.8" fill="var(--gold)" opacity="0.5" />
      <path d="M9 7L10.5 4H13.5L15 7" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="18" cy="10" r="0.8" fill="var(--gold)" opacity="0.7" />
    </svg>
  );
}

// gallery / image icon
function IconGallery({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="var(--gold)" strokeWidth="1.1" fill="var(--gold)" fillOpacity="0.08" />
      <circle cx="8" cy="9" r="2" stroke="var(--gold)" strokeWidth="0.9" fill="var(--gold)" fillOpacity="0.25" />
      <path d="M2 16L7 11L11 14L15 10L22 16" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
    </svg>
  );
}

// share icon
function IconShare({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="2.5" stroke="var(--gold)" strokeWidth="1.1" fill="var(--gold)" fillOpacity="0.2" />
      <circle cx="6" cy="12" r="2.5" stroke="var(--gold)" strokeWidth="1.1" fill="var(--gold)" fillOpacity="0.2" />
      <circle cx="18" cy="19" r="2.5" stroke="var(--gold)" strokeWidth="1.1" fill="var(--gold)" fillOpacity="0.2" />
      <line x1="8.3" y1="10.8" x2="15.7" y2="6.2" stroke="var(--gold)" strokeWidth="1" opacity="0.7" />
      <line x1="8.3" y1="13.2" x2="15.7" y2="17.8" stroke="var(--gold)" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

// sparkle — 4-point decorative star (replaces ✦)
function IconSparkle({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.3 10.7L22 12L13.3 13.3L12 22L10.7 13.3L2 12L10.7 10.7Z"
        fill="var(--gold)" opacity="0.28" stroke="var(--gold)" strokeWidth="0.7" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.8" fill="var(--gold)" />
    </svg>
  );
}

// tick — bare gold checkmark for step done indicators
function IconTick({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 13L9.5 18.5L20 7" stroke="var(--gold)" strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// check — checkmark in circle, uses currentColor for contextual coloring
function IconCheck({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7.5 12.5L10.5 15.5L16.5 9" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// warning — amber triangle alert
function IconWarning({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3.5L21.5 20.5H2.5L12 3.5Z"
        fill="var(--warn)" opacity="0.18" stroke="var(--warn)" strokeWidth="1.1" strokeLinejoin="round" />
      <line x1="12" y1="9.5" x2="12" y2="14.5" stroke="var(--warn)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="0.9" fill="var(--warn)" />
    </svg>
  );
}

// spinner — animated loading arc
function IconSpinner({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      style={{ animation: "spinSlow 0.85s linear infinite", transformOrigin: "center" }}>
      <circle cx="12" cy="12" r="9" stroke="var(--gold)" strokeWidth="2"
        strokeDasharray="30 14" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

// chevron — collapsible section toggle arrow, uses currentColor
function IconChevron({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// close — X dismiss mark, uses currentColor
function IconClose({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<string, (s: number) => JSX.Element> = {
  love: (s) => <IconLove s={s} />,
  career: (s) => <IconCareer s={s} />,
  money: (s) => <IconMoney s={s} />,
  health: (s) => <IconHealth s={s} />,
  fate: (s) => <IconFate s={s} />,
  family: (s) => <IconFamily s={s} />,
  travel: (s) => <IconTravel s={s} />,
  full: (s) => <IconFull s={s} />,
  orb: (s) => <IconOrb s={s} />,
  star: (s) => <IconStar s={s} />,
  palm: (s) => <IconPalm s={s} />,
  constellation: (s) => <IconConstellation s={s} />,
  camera: (s) => <IconCamera s={s} />,
  gallery: (s) => <IconGallery s={s} />,
  share: (s) => <IconShare s={s} />,
  sparkle: (s) => <IconSparkle s={s} />,
  tick: (s) => <IconTick s={s} />,
  check: (s) => <IconCheck s={s} />,
  warning: (s) => <IconWarning s={s} />,
  spinner: (s) => <IconSpinner s={s} />,
  chevron: (s) => <IconChevron s={s} />,
  close: (s) => <IconClose s={s} />,
};

export function CosmicIcon({ name, size = 24, className }: Props) {
  const fn = ICONS[name];
  if (!fn) return null;
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size }}>
      {fn(size)}
    </span>
  );
}
