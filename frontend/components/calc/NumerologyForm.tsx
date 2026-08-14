"use client";

import { useState } from "react";

/**
 * Numerology input form.
 *
 * Submits as a plain GET to the result page, which means:
 *   - it works with JavaScript disabled;
 *   - the result URL is inherently shareable (PRD 8.4 "share option");
 *   - the result page is server-rendered and crawlable.
 *
 * Client-side only for the conditional fields — twin status reveals a parent
 * birth date, exactly as the current production form does.
 *
 * Validation is intentionally light here. The server validates independently in
 * `validateNumerologyInput`, because anything sent from a browser is untrusted.
 */

type TwinStatus = "none" | "elder" | "younger";

const MODES = [
  { value: "normal", label: "普通" },
  { value: "day", label: "流日" },
  { value: "month", label: "流月" },
  { value: "year", label: "流年" },
] as const;

const fieldClass =
  "focus-accent min-h-[44px] w-full rounded-xl border border-border bg-surface px-4 py-3 font-sans text-base text-fg outline-none transition-colors focus:border-accent sm:text-sm";

const labelClass = "mb-2 block font-sans text-sm font-semibold text-fg";

export function NumerologyForm({ action }: { action: string }) {
  const [twin, setTwin] = useState<TwinStatus>("none");

  return (
    <form method="get" action={action} className="space-y-6">
      <div>
        <label htmlFor="date" className={labelClass}>
          出生日期
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          max={new Date().toISOString().slice(0, 10)}
          className={fieldClass}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>是否为双胞胎</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { value: "none", label: "否" },
              { value: "elder", label: "是 · 大" },
              { value: "younger", label: "是 · 小" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={`focus-accent min-h-[44px] cursor-pointer rounded-full border px-4 py-2.5 font-sans text-sm transition-colors ${
                twin === option.value
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-fg-muted hover:border-accent/50"
              }`}
            >
              <input
                type="radio"
                name="twin"
                value={option.value}
                checked={twin === option.value}
                onChange={() => setTwin(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Production asks for the father's date for the elder twin and the
          mother's for the younger — not both. */}
      {twin === "elder" && (
        <div>
          <label htmlFor="fdate" className={labelClass}>
            父亲出生日期
          </label>
          <input id="fdate" name="fdate" type="date" required className={fieldClass} />
        </div>
      )}

      {twin === "younger" && (
        <div>
          <label htmlFor="mdate" className={labelClass}>
            母亲出生日期
          </label>
          <input id="mdate" name="mdate" type="date" required className={fieldClass} />
        </div>
      )}

      <fieldset>
        <legend className={labelClass}>测算类型</legend>
        <div className="flex flex-wrap gap-2">
          {MODES.map((mode, index) => (
            <label
              key={mode.value}
              className="focus-accent min-h-[44px] cursor-pointer rounded-full border border-border px-4 py-2.5 font-sans text-sm text-fg-muted transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-accent-fg"
            >
              <input
                type="radio"
                name="mode"
                value={mode.value}
                defaultChecked={index === 0}
                className="sr-only"
              />
              {mode.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="focus-accent min-h-[44px] w-full rounded-full bg-accent px-8 py-3.5 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
      >
        开始测算
      </button>
    </form>
  );
}
