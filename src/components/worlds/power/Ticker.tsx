const ITEMS = [
  "245 Wh → 3.6 kWh",
  "X-Stream 1-hour recharge",
  "LFP · 3,000–4,000 cycles",
  "UPS < 10 ms",
  "30 dB whisper quiet",
  "Solar ready",
  "App control",
  "Up to 5-year warranty",
  "Pan-India service",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line bg-accent py-3 text-accent-fg">
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-[13px] tracking-tight">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
          </span>
        ))}
      </div>
    </div>
  );
}
