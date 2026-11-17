# Frontend Toko Sparepart

Web app POS dan manajemen stok toko sparepart. Repo terpisah dari backend ([`Back-end_TokoSparepart`](https://github.com/M0zziee/Back-end_TokoSparepart)).

## Tech Stack

| Bagian    | Teknologi                                  |
| --------- | ------------------------------------------ |
| Framework | Next.js 16 (App Router), React 19          |
| Styling   | Tailwind CSS 4, komponen shadcn/base-ui    |
| Test      | Vitest + Testing Library + jsdom           |

## Prasyarat

- Node.js 24
- Backend berjalan (default `http://localhost:3001`)

## Setup

```bash
npm install
```

Salin `.env.example` menjadi `.env.local`, lalu isi URL backend untuk rewrite:

```env
API_URL=http://localhost:3001
```

Browser memanggil `/api/*` di origin frontend; Next mem-proxy ke backend. Cookie sesi jadi first-party, tidak perlu CORS di jalur ini. `NEXT_PUBLIC_API_URL` hanya dipakai jika ingin memanggil backend langsung tanpa proxy.

```bash
npm run dev
```

Frontend berjalan di `http://localhost:3000`. Backend memakai `PORT=3001` agar tidak bentrok. Backend hanya mengizinkan origin yang sama dengan `FRONTEND_ORIGIN`; jika port frontend berubah, ubah juga nilai itu di `backend-toko/.env`.

| Script               | Fungsi                       |
| -------------------- | ---------------------------- |
| `npm run dev`        | dev server Next.js           |
| `npm run build`      | build produksi               |
| `npm start`          | jalankan hasil build         |
| `npm run lint`       | ESLint                       |
| `npm test`           | Vitest (sekali jalan)        |
| `npm run test:watch` | Vitest watch                 |

## Struktur

```
src/
├── app/
│   ├── (app)/          # halaman dengan sidebar: dashboard, produk, stok, sales, laporan
│   └── login/
├── components/         # UI + komponen aplikasi
├── lib/                # api client + util
└── types/
```

Panggilan API lewat `src/lib/api.ts` (`api()`), bukan `fetch` langsung. Halaman Produk sudah memakai API (daftar, tambah, nonaktifkan). Halaman lain masih placeholder sampai modul backend terkait selesai.

## Auth & Role

- Login lewat `/login`; sesi dibaca `SessionProvider` (`src/lib/session.tsx`) dari `GET /auth/me`.
- `ADMIN`: semua menu. `KASIR`: dashboard, produk (baca), stok (baca), penjualan. Menu Laporan disembunyikan dan `/reports` diarahkan ke `/sales`.
- Form tambah produk dan tombol nonaktifkan hanya muncul untuk `ADMIN`. Backend tetap menolak request kasir (403), UI bukan pengaman.
- Logout ada di footer sidebar.

## Deployment (Vercel)

Repo ini satu project Vercel.

1. Import repo ini ke Vercel.
2. Environment variables:
   ```env
   API_URL=https://<domain-backend-vercel>
   ```
3. Deploy. Pastikan `FRONTEND_ORIGIN` di project backend sudah berisi domain Vercel ini.

## Workflow

1. Satu fitur = satu branch.
2. Sebelum commit: `npm run lint && npm test`.
3. Jangan commit `.env*` (kecuali `.env.example`), `node_modules`, atau `.next`.
