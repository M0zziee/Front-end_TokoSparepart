import { SectionCards } from "@/components/section-cards";

export default function DashboardPage() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          Grafik penjualan tersedia setelah integrasi API.
        </div>
      </div>
    </>
  );
}
