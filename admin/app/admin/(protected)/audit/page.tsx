import { AuditLogPanel } from "@/components/admin/AuditLogPanel";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

export default function AdminAuditPage() {
  return (
    <>
      <AdminTopBar
        title="Audit Log"
        description="Full append-only history of admin actions across CMS, media, banners, and settings."
        badge="Ops"
      />
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <AuditLogPanel limit={100} />
      </div>
    </>
  );
}
