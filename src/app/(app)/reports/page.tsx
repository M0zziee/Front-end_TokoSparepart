import { AdminOnly } from "@/components/admin-only";

export default function ReportsPage() {
  return (
    <AdminOnly>
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold">Laporan</h1>
        <p className="text-muted-foreground">Modul ini segera hadir.</p>
      </div>
    </AdminOnly>
  );
}
