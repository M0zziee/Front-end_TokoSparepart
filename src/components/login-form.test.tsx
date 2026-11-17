import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginForm } from "./login-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}));

describe("LoginForm", () => {
  it("menampilkan field username dan password", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("tombol login aktif", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: "Login" })).toBeEnabled();
  });
});
