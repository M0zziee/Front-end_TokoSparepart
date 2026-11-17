"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, ApiError } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import { useSession } from "@/lib/session";
import type { Category, Product } from "@/types";

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback;
}

export default function ProductsPage() {
  const { user } = useSession();
  const isAdmin = user?.role === "ADMIN";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [productList, categoryList] = await Promise.all([
        api<Product[]>("/products"),
        api<Category[]>("/categories"),
      ]);
      setProducts(productList);
      setCategories(categoryList);
      setError(null);
    } catch (err) {
      setError(errorMessage(err, "Gagal memuat produk"));
    }
  }, []);

  useEffect(() => {
    // Data awal dari API; setState terjadi setelah await, bukan sinkron.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh().finally(() => setLoading(false));
  }, [refresh]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api<Product>("/products", {
        method: "POST",
        body: JSON.stringify({
          sku,
          name,
          price: Number(price),
          categoryId,
        }),
      });
      setSku("");
      setName("");
      setPrice("");
      setCategoryId(null);
      await refresh();
    } catch (err) {
      setError(errorMessage(err, "Gagal menyimpan produk"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate(product: Product) {
    if (!window.confirm(`Nonaktifkan ${product.name}?`)) return;
    setError(null);
    try {
      await api(`/products/${product.id}`, { method: "DELETE" });
      await refresh();
    } catch (err) {
      setError(errorMessage(err, "Gagal menonaktifkan produk"));
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div>
        <h1 className="text-2xl font-bold">Produk</h1>
        <p className="text-muted-foreground">
          Tambah produk dan kelola daftar produk aktif.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {isAdmin && (
      <Card>
        <CardHeader>
          <CardTitle>Tambah produk</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="sku">SKU</FieldLabel>
                  <Input
                    id="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="OLI-10W40"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="name">Nama</FieldLabel>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Oli Mesin 10W-40"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="price">Harga (Rp)</FieldLabel>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="category">Kategori</FieldLabel>
                  <Select
                    items={[
                      { value: null, label: "Tanpa kategori" },
                      ...categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                      })),
                    ]}
                    value={categoryId}
                    onValueChange={(value) => setCategoryId(value)}
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>Tanpa kategori</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Menyimpan..." : "Simpan produk"}
                  </Button>
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Daftar produk</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat produk...</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada produk. Tambah produk pertama di atas.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  {isAdmin && <TableHead className="text-right">Aksi</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-xs">
                      {product.sku}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {product.categoryName ?? (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatRupiah(product.price)}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => void handleDeactivate(product)}
                        >
                          Nonaktifkan
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Produk nonaktif disembunyikan dari daftar. Riwayat stok dan penjualan
        tetap tersimpan.
      </p>
    </div>
  );
}
