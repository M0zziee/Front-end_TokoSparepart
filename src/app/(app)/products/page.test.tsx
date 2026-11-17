import { render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import ProductsPage from "./page";

const product = {
  id: "1",
  sku: "OLI-10W40",
  name: "Oli Mesin",
  categoryId: "1",
  categoryName: "Oli",
  price: 55000,
  active: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-01-01",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

it("menampilkan produk dari API dengan harga rupiah", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => ({
      ok: true,
      status: 200,
      json: async () =>
        url.endsWith("/products") ? [product] : [{ id: "1", name: "Oli" }],
    })),
  );

  render(<ProductsPage />);

  expect(await screen.findByText("Oli Mesin")).toBeInTheDocument();
  expect(screen.getByText(/55\.000/)).toBeInTheDocument();
});

it("menampilkan pesan kosong jika belum ada produk", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [],
    })),
  );

  render(<ProductsPage />);

  expect(
    await screen.findByText(/Belum ada produk/),
  ).toBeInTheDocument();
});
