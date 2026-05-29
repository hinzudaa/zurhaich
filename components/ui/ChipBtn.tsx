"use client";

interface ChipBtnProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function ChipBtn({ active, onClick, children }: ChipBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-2 py-[10px] rounded-[10px] text-[13px] font-medium cursor-pointer transition-all duration-[180ms] text-center ${active
          ? "bg-(--gold-10) border border-(--gold) text-(--gold)"
          : "bg-(--bg-soft) border border-(--hairline) text-(--ink-muted)"
        }`}
    >
      {children}
    </button>
  );
}
