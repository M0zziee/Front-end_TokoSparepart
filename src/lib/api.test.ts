import { afterEach, describe, expect, it, vi } from "vitest";

import { api, ApiError } from "./api";

function mockResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: `HTTP ${status}`,
    json: async () => body,
  } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("api", () => {
  it("mengembalikan body JSON pada response sukses", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ status: "ok" }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(api("/health")).resolves.toEqual({ status: "ok" });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/health",
      expect.objectContaining({
        credentials: "include",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("melempar ApiError dengan pesan dari backend", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(mockResponse({ error: "Tidak ditemukan" }, 404)),
    );

    await expect(api("/products/1")).rejects.toEqual(
      new ApiError(404, "Tidak ditemukan"),
    );
  });

  it("mengembalikan undefined untuk 204", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse(null, 204)));

    await expect(api("/products/1")).resolves.toBeUndefined();
  });
});
