"use client";

import { useMemo, useState } from "react";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";

/**
 * Interactive replica of the booking system: pick a service, day and time and see the WhatsApp
 * message the business receives plus the automatic confirmation. Sample data; nothing is sent.
 */
const SERVICES = [
  { id: "cerquillo", name: { es: "Cerquillo", en: "Line-up" }, price: 10000, minutes: 15 },
  { id: "nino", name: { es: "Corte de niño", en: "Kids' haircut" }, price: 13000, minutes: 35 },
  { id: "sencillo", name: { es: "Corte sencillo", en: "Classic haircut" }, price: 15000, minutes: 40 },
];

const SLOTS = ["09:00", "09:40", "10:20", "11:00", "11:40", "14:00", "14:40", "15:20", "16:00", "16:40"];

/** A few slots look booked so the grid feels real; deterministic so it doesn't change between renders. */
const isTaken = (day: number, slot: number) => (day * 3 + slot * 2) % 5 === 0;

export function BookingDemo() {
  const { lang, t } = useLang();
  const locale = lang === "es" ? "es-CO" : "en-US";
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);

  // The next five days, starting tomorrow
  const days = useMemo(() => {
    const start = new Date();
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i + 1);
      return d;
    });
  }, []);

  const service = SERVICES.find((s) => s.id === serviceId);
  const price = (cop: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(cop);
  const dayLabel = (d: Date) => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(d);
  const timeLabel = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(new Date(2026, 0, 1, h, m));
  };

  const chip = (active: boolean, disabled = false) =>
    `border px-3 py-2 text-left text-sm transition-colors ${
      disabled
        ? "cursor-not-allowed border-line text-muted/60 line-through"
        : active
          ? "border-accent bg-accent text-white"
          : "border-line hover:border-ink"
    }`;

  const ready = service && day !== null && slot !== null;

  return (
    <section aria-label={t(ui.booking.title)} className="border border-ink bg-bg p-4 sm:p-5">
      <p className="font-display text-xl font-medium">{t(ui.booking.title)}</p>
      <p className="mt-1 text-xs text-muted">{t(ui.booking.note)}</p>

      <p className="mt-4 text-xs font-semibold">{t(ui.booking.service)}</p>
      <div className="mt-2 grid gap-2">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setServiceId(s.id)}
            aria-pressed={serviceId === s.id}
            className={`${chip(serviceId === s.id)} flex items-baseline justify-between gap-3`}
          >
            <span className="font-medium">{t(s.name)}</span>
            <span className="shrink-0 text-xs tabular-nums opacity-80">
              {price(s.price)} · {s.minutes} {t(ui.booking.minutes)}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs font-semibold">{t(ui.booking.day)}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {days.map((d, i) => (
          <button
            key={d.toDateString()}
            type="button"
            onClick={() => {
              setDay(i);
              setSlot(null);
            }}
            aria-pressed={day === i}
            className={chip(day === i)}
          >
            {dayLabel(d)}
          </button>
        ))}
      </div>

      {day !== null && (
        <>
          <p className="mt-4 text-xs font-semibold">{t(ui.booking.time)}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {SLOTS.map((s, i) => {
              const taken = isTaken(day, i);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={taken}
                  onClick={() => setSlot(i)}
                  aria-pressed={slot === i}
                  aria-label={taken ? `${timeLabel(s)} · ${t(ui.booking.taken)}` : timeLabel(s)}
                  className={`${chip(slot === i, taken)} px-1 text-center whitespace-nowrap tabular-nums`}
                >
                  {timeLabel(s)}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* WhatsApp conversation preview */}
      <div className="mt-5 border-t border-line pt-4" aria-live="polite">
        {ready ? (
          <div className="space-y-2 text-sm">
            <div className="ml-auto max-w-[85%] bg-[#d9fdd3] px-3 py-2 text-[#111b21] shadow-sm">
              <p>{t(ui.booking.greeting)}</p>
              <p className="mt-1 font-semibold">
                {t(service.name)} · {dayLabel(days[day])} · {timeLabel(SLOTS[slot])}
              </p>
              <p className="text-xs opacity-70">{price(service.price)}</p>
            </div>
            <div className="max-w-[85%] bg-surface px-3 py-2 shadow-sm ring-1 ring-line">{t(ui.booking.confirmed)}</div>
          </div>
        ) : (
          <p className="text-sm text-muted">{t(ui.booking.pick)}</p>
        )}
      </div>
    </section>
  );
}
