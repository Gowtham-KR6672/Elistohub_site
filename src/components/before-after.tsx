import { useRef, useState, type PointerEvent } from "react";
import { Icon } from "@/components/icons";

function BeforeArt() {
  return (
    <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <rect width="200" height="250" fill="#EEF1EF" />
      <ellipse cx="100" cy="188" rx="36" ry="5" fill="#D9DFDC" />
      <rect x="91" y="90" width="18" height="22" rx="3" fill="#B8C4BE" />
      <ellipse cx="100" cy="146" rx="32" ry="42" fill="#B8C4BE" />
    </svg>
  );
}

function AfterArt() {
  return (
    <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <rect width="200" height="250" fill="#FFF8DC" />
      <rect x="118" y="26" width="58" height="96" rx="29" fill="#FFFFFF" />
      <circle cx="147" cy="58" r="12" fill="#F5C518" />
      <rect y="196" width="200" height="54" fill="#F5E3A3" />
      <rect x="22" y="152" width="30" height="44" rx="4" fill="#FFFFFF" />
      <ellipse cx="30" cy="140" rx="10" ry="18" fill="#16A85C" />
      <ellipse cx="45" cy="136" rx="9" ry="20" fill="#08884A" />
      <rect x="58" y="182" width="84" height="14" rx="4" fill="#0A4A30" />
      <path
        d="M100 98 V70 M100 82 Q88 70 84 60 M100 76 Q112 64 118 56"
        stroke="#16A85C"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="91" y="96" width="18" height="18" rx="3" fill="#08884A" />
      <ellipse cx="100" cy="146" rx="32" ry="36" fill="#08884A" />
    </svg>
  );
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };

  return (
    <figure className="relative">
      <div
        ref={ref}
        className="group relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-[30px] border border-line bg-[#EEF1EF] shadow-[0_40px_80px_-40px_rgba(10,74,48,0.45)] select-none"
        onPointerDown={onPointerDown}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div role="img" aria-label="AI lifestyle image of the product after editing">
          <AfterArt />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          role="img"
          aria-label="Plain product photo before editing"
        >
          <BeforeArt />
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold tracking-[0.08em] text-muted">
          BEFORE
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-brand px-3 py-1.5 text-xs font-extrabold tracking-[0.08em] text-white">
          AFTER · AI LIFESTYLE
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after images"
          className="sr-only"
        />
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(10,74,48,0.08)]"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-deep shadow-[0_10px_30px_-8px_rgba(10,74,48,0.5)] transition-transform group-active:scale-95 group-has-[input:focus-visible]:ring-4 group-has-[input:focus-visible]:ring-fresh">
            <Icon name="drag" size={20} strokeWidth={2.4} />
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-deep/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur transition-opacity group-hover:opacity-0">
          Drag to compare
        </span>
      </div>
    </figure>
  );
}
