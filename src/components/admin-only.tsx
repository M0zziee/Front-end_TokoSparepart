"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/session";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.role !== "ADMIN") {
      router.replace("/sales");
    }
  }, [loading, user, router]);

  if (loading || user?.role !== "ADMIN") return null;

  return <>{children}</>;
}
