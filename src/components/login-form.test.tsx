import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoginForm } from "./login-form";

describe("LoginForm", () => {
  it("menampilkan field username dan password", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("menonaktifkan tombol login selama autentikasi belum tersedia", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();
  });
});
