const STARS = [
  [30, 50, 1.2], [70, 20, 0.8], [200, 30, 1.4],
  [240, 60, 0.9], [20, 130, 1.0], [255, 140, 1.3],
  [45, 220, 0.7], [260, 230, 1.1], [110, 15, 1.2],
  [230, 170, 1.0], [35, 170, 0.8], [175, 10, 0.7],
];

export function PalmIcon({ className }: { className?: string }) {
  return (
    <div
      className={`relative inline-block ${className ?? ""}`}
      style={{ willChange: "transform" }}
    >
      <style>{`
        @keyframes pi-twinkle { 0%,100%{opacity:.8} 50%{opacity:.15} }
        @keyframes pi-pulse   { 0%,100%{opacity:.9} 50%{opacity:.4} }
        @keyframes pi-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pi-spinr   { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pi-orb     { 0%,100%{r:7} 50%{r:9.5} }
        .pi-stars    { animation: pi-twinkle 3s ease-in-out infinite; }
        .pi-lines    { animation: pi-pulse   3.5s ease-in-out infinite; }
        .pi-line2    { animation: pi-pulse   4.2s ease-in-out infinite; }
        .pi-line3    { animation: pi-pulse   3s ease-in-out infinite; }
        .pi-swirl    { transform-origin:140px 222px; animation: pi-spin  8s linear infinite; }
        .pi-swirl2   { transform-origin:140px 222px; animation: pi-spinr 5s linear infinite; }
        .pi-orb      { animation: pi-orb 2.2s ease-in-out infinite; }
        .pi-ring     { transform-origin:140px 210px; animation: pi-twinkle 4s ease-in-out infinite; }
      `}</style>

      <svg width="100%" height="100%" viewBox="0 0 280 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pi-galaxyCore" cx="50%" cy="70%" r="55%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#4f46e5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0f0a1e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pi-nebula" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pi-fg1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="pi-fg2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="pi-fg3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="pi-palm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e0a3c" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#2d1b69" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#0f0a2e" stopOpacity="0.92" />
          </linearGradient>
          <radialGradient id="pi-orb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#c4b5fd" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
          <filter id="pi-glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Nebula background */}
        <ellipse cx="140" cy="200" rx="120" ry="90" fill="url(#pi-galaxyCore)" />
        <ellipse cx="140" cy="190" rx="110" ry="80" fill="url(#pi-nebula)" />

        {/* Stars — single group animation */}
        <g className="pi-stars">
          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={0.8} filter="url(#pi-glow)" />
          ))}
        </g>

        {/* Fingers */}
        <path d="M62 172 Q46 140 50 108 Q53 86 70 90 Q84 95 82 128 L79 172"
          fill="url(#pi-palm)" stroke="url(#pi-fg1)" strokeWidth="2" strokeLinecap="round" filter="url(#pi-glow)" />
        <path d="M89 167 Q87 118 92 80 Q95 58 110 61 Q124 64 120 90 L116 167"
          fill="url(#pi-palm)" stroke="url(#pi-fg2)" strokeWidth="2" strokeLinecap="round" filter="url(#pi-glow)" />
        <path d="M122 165 Q120 108 125 66 Q127 44 142 46 Q157 48 154 72 L150 165"
          fill="url(#pi-palm)" stroke="url(#pi-fg3)" strokeWidth="2.5" strokeLinecap="round" filter="url(#pi-glow)" />
        <path d="M156 167 Q156 118 161 82 Q163 64 177 66 Q191 69 187 90 L184 167"
          fill="url(#pi-palm)" stroke="url(#pi-fg2)" strokeWidth="2" strokeLinecap="round" filter="url(#pi-glow)" />
        <path d="M188 174 Q190 135 193 108 Q196 92 207 95 Q218 98 214 116 L211 174"
          fill="url(#pi-palm)" stroke="url(#pi-fg1)" strokeWidth="2" strokeLinecap="round" filter="url(#pi-glow)" />

        {/* Palm base */}
        <path d="M62 172 Q56 204 67 236 Q78 256 110 264 Q140 270 168 264 Q198 256 213 232 Q223 210 218 175 L211 174 L184 167 L150 165 L116 167 L89 167 L79 172 Z"
          fill="url(#pi-palm)" stroke="url(#pi-fg1)" strokeWidth="1.5" />

        {/* Palm lines with CSS animations */}
        <path className="pi-lines" d="M82 185 Q118 175 155 180 Q178 184 202 177"
          stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#pi-glow)" />
        <path className="pi-line2" d="M79 207 Q112 200 148 204 Q173 208 196 202"
          stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#pi-glow)" />
        <path className="pi-line3" d="M102 170 Q86 205 88 238 Q90 254 101 262"
          stroke="#a78bfa" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#pi-glow)" />
        {/* Fate line */}
        <path d="M140 262 Q139 232 141 200 Q142 182 144 163"
          stroke="#c4b5fd" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75"
          strokeDasharray="5 4" filter="url(#pi-glow)" />

        {/* Galaxy swirl rings — CSS spin */}
        <ellipse className="pi-swirl" cx="140" cy="222" rx="22" ry="14"
          fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
        <ellipse className="pi-swirl2" cx="140" cy="222" rx="14" ry="8"
          fill="none" stroke="rgba(236,72,153,0.45)" strokeWidth="1" />

        {/* Center orb */}
        <circle className="pi-orb" cx="140" cy="222" r="7" fill="url(#pi-orb)" />
        <circle cx="141.5" cy="220.5" r="2" fill="white" opacity="0.8" />

        {/* Sparkle dots */}
        <g filter="url(#pi-glow)" className="pi-lines">
          <circle cx="118" cy="179" r="2.5" fill="#f472b6" />
          <circle cx="162" cy="182" r="2.5" fill="#f472b6" />
          <circle cx="115" cy="203" r="2.5" fill="#60a5fa" />
          <circle cx="159" cy="205" r="2.5" fill="#60a5fa" />
          <circle cx="92" cy="222" r="2.5" fill="#a78bfa" />
        </g>

        {/* Outer pulse ring */}
        <ellipse className="pi-ring" cx="140" cy="210" rx="105" ry="72"
          fill="none" stroke="rgba(139,92,246,0.18)" strokeWidth="1" />
      </svg>
    </div>
  );
}
