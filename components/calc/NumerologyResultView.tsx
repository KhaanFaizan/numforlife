import type { NumerologyResult } from "@/lib/calculators/types";
import { PreviewNotice } from "./PreviewNotice";

/**
 * Renders a numerology result.
 *
 * Gating follows the REAL entitlement matrix from production (`yzn_vip_purview`),
 * not invented rules:
 *   - 主性格 (personality) and 五行总览 (five elements) are unlimited on every
 *     tier, so they render in full for anonymous visitors;
 *   - 81组数字 / detailed groups are capped at the first ten for the base tier,
 *     so the website preview shows a subset and points at the app for the rest.
 *
 * This is a server component: the result is already computed upstream and none
 * of this needs interactivity.
 */

/** Base-tier entitlement: 首十个 (first ten). */
const PREVIEW_GROUP_LIMIT = 10;

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-border bg-surface p-6 md:p-8 ${className ?? ""}`}
    >
      <h2 className="font-sans text-lg font-semibold text-fg md:text-xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function NumerologyResultView({ result }: { result: NumerologyResult }) {
  const visibleGroups = result.groups.slice(0, PREVIEW_GROUP_LIMIT);
  const hiddenGroupCount = Math.max(0, result.groups.length - visibleGroups.length);

  return (
    <div className="space-y-6">
      <Panel title="主性格">
        <div className="flex items-baseline gap-3">
          <span className="font-sans text-5xl font-bold text-accent md:text-6xl">
            {result.personalityNumber}
          </span>
          <span className="font-sans text-xl text-fg-muted">号人</span>
        </div>
        {result.dateParts.length > 0 && (
          <p className="mt-4 font-mono text-xs text-fg-subtle">
            出生日期分解：{result.dateParts.join(" · ")}
          </p>
        )}
      </Panel>

      {result.elementTable && (
        <Panel title="五行总览">
          {/* The element order rotates per birth date, so columns are rendered
              in the order production returned them rather than a fixed
              木火土金水 sequence. */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-center">
              <thead>
                <tr>
                  {result.elementTable.categories.map((category) => (
                    <th
                      key={category}
                      scope="col"
                      className="border-b border-border px-2 py-3 font-sans text-xs font-semibold text-fg-muted"
                    >
                      {category}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {result.elementTable.elements.map((element, index) => (
                    <td
                      key={`${element}-${index}`}
                      className="px-2 py-3 font-sans text-lg font-semibold text-accent"
                    >
                      {element}
                    </td>
                  ))}
                </tr>
                <tr>
                  {result.elementTable.values.map((value, index) => (
                    <td
                      key={`value-${index}`}
                      className="px-2 py-3 font-mono text-base text-fg"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {result.pyramidDigits.length > 0 && (
        <Panel title="数字排列图">
          <div className="flex flex-wrap gap-2">
            {result.pyramidDigits.map((digit, index) => (
              <span
                key={`${digit}-${index}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-sunken font-mono text-sm text-fg"
              >
                {digit}
              </span>
            ))}
          </div>
          {result.starCount > 0 && (
            <p className="mt-4 font-mono text-xs text-fg-subtle">
              星标：{"★".repeat(result.starCount)}
            </p>
          )}
        </Panel>
      )}

      {visibleGroups.length > 0 && (
        <Panel title="组合解析">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGroups.map((group) => (
              <li
                key={`${group.label}-${group.value}`}
                className="flex items-center justify-between rounded-xl border border-border bg-surface-sunken px-4 py-3"
              >
                <span className="font-sans text-sm text-fg-muted">{group.label}</span>
                <span className="font-mono text-base font-semibold text-fg">
                  {group.value}
                </span>
              </li>
            ))}
          </ul>

          {hiddenGroupCount > 0 && (
            <p className="mt-4 font-mono text-xs text-fg-subtle">
              另有 {hiddenGroupCount} 组解析可在 App 中查看。
            </p>
          )}
        </Panel>
      )}

      <PreviewNotice />
    </div>
  );
}
