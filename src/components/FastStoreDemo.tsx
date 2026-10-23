"use client";

import { useState } from "react";
import { ui } from "@/content";
import { useLang } from "@/lib/i18n";

/**
 * Interactive replica of the FastStore demo's region picker and currency switcher, with sample
 * products and prices taken from the demo store (session prices in USD).
 */
const CURRENCIES = {
  USD: { locale: "en-US", perUSD: 1 },
  BRL: { locale: "pt-BR", perUSD: 5.5 },
  COP: { locale: "es-CO", perUSD: 4100 },
  MXN: { locale: "es-MX", perUSD: 18.5 },
} as const;
type Currency = keyof typeof CURRENCIES;

const REGIONS = [
  { id: "sp", name: "São Paulo", days: 2, outOfStock: [] as string[] },
  { id: "rj", name: "Rio de Janeiro", days: 3, outOfStock: [] as string[] },
  { id: "bh", name: "Belo Horizonte", days: 4, outOfStock: ["controller"] },
  { id: "ct", name: "Curitiba", days: 5, outOfStock: ["speaker"] },
];

const PRODUCTS = [
  { id: "headphone", name: "Headphone", price: 136.62, listPrice: 200 },
  { id: "speaker", name: "Bluetooth Speaker", price: 22, listPrice: 45 },
  { id: "controller", name: "Wireless Controller", price: 60, listPrice: 60 },
];

export function FastStoreDemo() {
  const { t } = useLang();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [regionId, setRegionId] = useState("");
  const region = REGIONS.find((r) => r.id === regionId);

  const format = (usd: number) => {
    const { locale, perUSD } = CURRENCIES[currency];
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "COP" ? 0 : 2,
    }).format(usd * perUSD);
  };

  const select = "w-full border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:border-ink focus-visible:outline-none";

  return (
    <section aria-label={t(ui.demo.title)} className="border border-ink bg-bg p-4 sm:p-5">
      <p className="font-display text-xl font-medium">{t(ui.demo.title)}</p>
      <p className="mt-1 text-xs text-muted">{t(ui.demo.note)}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-xs text-muted">
          {t(ui.demo.region)}
          <select className={`mt-1 ${select}`} value={regionId} onChange={(e) => setRegionId(e.target.value)}>
            <option value="">{t(ui.demo.pickRegion)}</option>
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-muted">
          {t(ui.demo.currency)}
          <select className={`mt-1 ${select}`} value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="mt-4 border-t border-line" aria-live="polite">
        {PRODUCTS.map((p) => {
          const unavailable = region?.outOfStock.includes(p.id);
          const discount = p.listPrice > p.price ? Math.round((1 - p.price / p.listPrice) * 100) : 0;
          return (
            <li key={p.id} className={`flex items-start justify-between gap-4 border-b border-line py-3 ${unavailable ? "opacity-50" : ""}`}>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-medium">
                  {p.name}
                  {discount > 0 && !unavailable && <span className="bg-accent px-1.5 py-px text-[10px] font-bold text-white">-{discount}%</span>}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {unavailable
                    ? t(ui.demo.outOfStock)
                    : region
                      ? `${t(ui.demo.delivery)} ${region.days} ${t(ui.demo.days)} · ${region.name}`
                      : discount > 0
                        ? `${t(ui.demo.save)} ${format(p.listPrice - p.price)}`
                        : " "}
                </p>
              </div>
              {!unavailable && (
                <div className="shrink-0 text-right tabular-nums">
                  {discount > 0 && <p className="text-xs text-muted line-through">{format(p.listPrice)}</p>}
                  <p className="font-display text-lg font-medium">{format(p.price)}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
