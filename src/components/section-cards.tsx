import {
  PackageIcon,
  ReceiptTextIcon,
  TriangleAlertIcon,
  WalletIcon,
} from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  { title: "Penjualan Hari Ini", description: "Belum ada data", icon: WalletIcon },
  { title: "Transaksi Hari Ini", description: "Belum ada data", icon: ReceiptTextIcon },
  { title: "Produk Aktif", description: "Belum ada data", icon: PackageIcon },
  { title: "Stok Rendah", description: "Belum ada data", icon: TriangleAlertIcon },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map(({ title, description, icon: Icon }) => (
        <Card key={title} className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Icon className="size-4" />
              {title}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              —
            </CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
