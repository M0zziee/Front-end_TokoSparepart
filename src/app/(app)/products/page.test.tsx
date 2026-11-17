import { render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { SessionProvider } from "@/lib/session";

import ProductsPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}));

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

const admin = {
  id: "1",
  username: "admin",
  name: "Admin",
  role: "ADMIN",
};

function mockApi() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string) => {
      const url = String(input);
      const body = url.endsWith("/auth/me")
        ? admin
        : url.endsWith("/products")
          ? [product]
          : [{ id: "1", name: "Oli" }];
      return { ok: true, status: 200, json: async () => body };
    }),
  );
}

function renderPage() {
  return render(
    <SessionProvider>
      <ProductsPage />
    </SessionProvider>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

it("menampilkan produk dari API dengan harga rupiah", async () => {
  mockApi();

  renderPage();

  expect(await screen.findByText("Oli Mesin")).toBeInTheDocument();
  expect(screen.getByText(/55\.000/)).toBeInTheDocument();
});

it("admin melihat form tambah produk", async () => {
  mockApi();

  renderPage();

  expect(
    await screen.findByRole("button", { name: "Simpan produk" }),
  ).toBeInTheDocument();
});

it("menampilkan pesan kosong jika belum ada produk", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string) => ({
      ok: true,
      status: 200,
      json: async () =>
        String(input).endsWith("/auth/me") ? admin : [],
    })),
  );

  renderPage();

  expect(await screen.findByText(/Belum ada produk/)).toBeInTheDocument();
});
