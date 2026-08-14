import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/audit-log";
import { requireAdminPermission } from "@/lib/auth/guard";
import { AuthError } from "@/lib/auth/errors";
import { deleteMediaAsset, listMediaAssets, saveMediaUpload } from "@/lib/media/repository";
import { validateMediaFile } from "@/lib/media/validate";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminPermission("cms:read");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  return NextResponse.json({ assets: listMediaAssets() });
}

export async function POST(request: Request) {
  let session;

  try {
    session = await requireAdminPermission("cms:write");
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart form data." }, { status: 400 });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "A file field is required." }, { status: 400 });
  }

  const alt = typeof formData.get("alt") === "string" ? formData.get("alt") : null;

  try {
    validateMediaFile(file);

    const asset = await saveMediaUpload({
      file,
      uploadedBy: session.email,
      alt: typeof alt === "string" ? alt : null,
    });

    writeAuditLog({
      session,
      action: "media.upload",
      module: "media",
      target: asset.url,
      after: { id: asset.id, url: asset.url, size: asset.size },
      request,
    });

    return NextResponse.json({ ok: true, asset });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}
