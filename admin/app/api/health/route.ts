import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Lightweight liveness probe for nginx / PM2 / uptime checks. */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "numforlife-admin",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
