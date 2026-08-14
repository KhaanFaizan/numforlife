"use client";

import { useState } from "react";
import { Search, UserRound } from "lucide-react";

import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard, AdminPanelHeader } from "@/components/admin/ui/AdminCard";
import type { MemberDashboardData } from "@/lib/member/types";
import type { MemberSearchResult } from "@/lib/member/types";

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function UserSupportPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MemberSearchResult[]>([]);
  const [selected, setSelected] = useState<MemberDashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSelected(null);

    try {
      const response = await fetch(
        `/api/admin/members/search?q=${encodeURIComponent(query.trim())}`,
        { cache: "no-store" },
      );
      const body = (await response.json()) as {
        results?: MemberSearchResult[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error ?? "Search failed.");
      }

      setResults(body.results ?? []);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "Search failed.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const openMember = async (memberId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/members/${memberId}`, { cache: "no-store" });
      const body = (await response.json()) as {
        member?: MemberDashboardData;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to load member.");
      }

      setSelected(body.member ?? null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminTopBar
        title="User Support Lookup"
        description="Read-only search against app_numforlife_com. Never edits membership, credits, or credentials."
        badge="Support"
      />

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-mono text-xs text-red-700">
            {error}
          </div>
        ) : null}

        <AdminCard padding="lg" className="mb-8">
          <AdminPanelHeader
            title="Search Members"
            description="Search by member id, email, KCC user id, nickname, or mobile"
          />
          <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. 12, admin@example.com, or KCC UUID"
              className="min-h-[44px] flex-1 rounded-xl border border-black/10 px-4 py-3 font-mono text-sm"
            />
            <AdminButton type="submit" disabled={loading || !query.trim()}>
              <Search className="h-4 w-4" />
              {loading ? "Searching..." : "Search"}
            </AdminButton>
          </form>
        </AdminCard>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <AdminCard padding="lg">
            <AdminPanelHeader title="Results" description={`${results.length} match(es)`} />
            {results.length === 0 ? (
              <p className="mt-4 font-mono text-xs text-black/45">No results yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-black/[0.06]">
                {results.map((member) => (
                  <li key={member.id}>
                    <button
                      type="button"
                      onClick={() => void openMember(member.id)}
                      className="flex w-full items-start gap-3 px-1 py-4 text-left transition-colors hover:bg-black/[0.02]"
                    >
                      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.05]">
                        <UserRound className="h-4 w-4 text-black/50" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-sans text-sm font-semibold text-black">
                          {member.nickname ?? `Member #${member.id}`}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] text-black/45">
                          ID {member.id}
                          {member.email ? ` · ${member.email}` : ""}
                          {member.kccUserId ? " · KCC linked" : " · No KCC link"}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] text-black/35">
                          {member.vipLevelName ?? "No VIP"} · {member.coins} coins
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>

          <AdminCard padding="lg">
            <AdminPanelHeader
              title="Member Detail"
              description="Read-only support view — same data shape as the user dashboard"
            />
            {!selected ? (
              <p className="mt-4 font-mono text-xs text-black/45">
                Select a member to view profile, membership, records, and coin log.
              </p>
            ) : (
              <div className="mt-4 space-y-6">
                <section>
                  <h3 className="font-sans text-sm font-semibold text-black">Profile</h3>
                  <dl className="mt-3 grid gap-2 font-mono text-xs text-black/60">
                    <div>ID: {selected.profile.id}</div>
                    <div>Nickname: {selected.profile.nickname ?? "—"}</div>
                    <div>Email: {selected.profile.email ?? "—"}</div>
                    <div>Mobile: {selected.profile.mobile ?? "—"}</div>
                    <div>Birth date: {selected.profile.birthDate ?? "—"}</div>
                    <div>Coins: {selected.profile.coins}</div>
                    <div>Points: {selected.profile.points}</div>
                  </dl>
                </section>

                <section>
                  <h3 className="font-sans text-sm font-semibold text-black">Membership</h3>
                  <dl className="mt-3 grid gap-2 font-mono text-xs text-black/60">
                    <div>Level: {selected.membership.levelName}</div>
                    <div>Start: {formatDate(selected.membership.subscriptionStart)}</div>
                    <div>End: {formatDate(selected.membership.subscriptionEnd)}</div>
                    <div>
                      Shop discount:{" "}
                      {selected.membership.shopDiscountPercent !== null
                        ? `${selected.membership.shopDiscountPercent}%`
                        : "—"}
                    </div>
                  </dl>
                </section>

                <section>
                  <h3 className="font-sans text-sm font-semibold text-black">Recent Records</h3>
                  {selected.records.length === 0 ? (
                    <p className="mt-2 font-mono text-xs text-black/45">No records.</p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {selected.records.map((record) => (
                        <li
                          key={record.id}
                          className="rounded-xl bg-black/[0.03] px-3 py-2 font-mono text-[11px] text-black/60"
                        >
                          {record.label} · {formatDate(record.createdAt)}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="font-sans text-sm font-semibold text-black">Coin Log</h3>
                  {selected.coinLog.length === 0 ? (
                    <p className="mt-2 font-mono text-xs text-black/45">No coin activity.</p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {selected.coinLog.map((entry) => (
                        <li
                          key={entry.id}
                          className="rounded-xl bg-black/[0.03] px-3 py-2 font-mono text-[11px] text-black/60"
                        >
                          {entry.label}: {entry.amount > 0 ? "+" : ""}
                          {entry.amount} · {formatDate(entry.createdAt)}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            )}
          </AdminCard>
        </div>
      </div>
    </>
  );
}
