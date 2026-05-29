"use client";

const MONTHS = [
  "1-р сар", "2-р сар", "3-р сар", "4-р сар",
  "5-р сар", "6-р сар", "7-р сар", "8-р сар",
  "9-р сар", "10-р сар", "11-р сар", "12-р сар",
];

const selectCls =
  "flex-1 px-3 py-3 rounded-[10px] text-[14px] outline-none bg-(--bg-soft) border border-(--hairline) text-(--ink) transition-colors duration-200 focus:border-(--gold) appearance-none cursor-pointer";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function BirthDateSelect({ value, onChange }: Props) {
  const parts = value ? value.split("-") : ["", "", ""];
  const y = parts[0] ?? "";
  const m = parts[1] ?? "";
  const d = parts[2] ?? "";

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const daysInMonth = y && m ? new Date(Number(y), Number(m), 0).getDate() : 31;

  const update = (part: "y" | "m" | "d", val: string) => {
    const ny = part === "y" ? val : y;
    const nm = part === "m" ? val : m;
    const nd = part === "d" ? val : d;
    if (ny && nm && nd) {
      onChange(`${ny}-${nm.padStart(2, "0")}-${nd.padStart(2, "0")}`);
    } else {
      onChange(`${ny}-${nm}-${nd}`.replace(/^-+|-+$/g, ""));
    }
  };

  return (
    <div className="flex gap-2">
      <select value={y} onChange={(e) => update("y", e.target.value)} className={selectCls}>
        <option value="">Жил</option>
        {years.map((yr) => (
          <option key={yr} value={String(yr)}>{yr}</option>
        ))}
      </select>

      <select value={m} onChange={(e) => update("m", e.target.value)} className={selectCls}>
        <option value="">Сар</option>
        {MONTHS.map((label, i) => (
          <option key={i + 1} value={String(i + 1).padStart(2, "0")}>{label}</option>
        ))}
      </select>

      <select value={d} onChange={(e) => update("d", e.target.value)} className={selectCls}>
        <option value="">Өдөр</option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <option key={day} value={String(day).padStart(2, "0")}>{day}</option>
        ))}
      </select>
    </div>
  );
}
