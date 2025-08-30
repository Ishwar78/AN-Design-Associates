export default function Marquee() {
  const items = [
    "Architecture",
    "Interiors",
    "3D Visuals",
    "Turnkey",
    "Approvals",
  ];
  return (
    <div className="relative overflow-hidden border-y bg-white">
      <div className="flex whitespace-nowrap animate-[scroll_25s_linear_infinite]" aria-hidden>
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="flex items-center">
            {items.map((i) => (
              <div key={`${i}-${idx}`} className="px-6 py-3 text-sm font-semibold text-neutral-700">
                {i}
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
