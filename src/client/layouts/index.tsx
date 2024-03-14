import React from "react";
import { Aside } from "@/client/layouts/aside";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex size-full max-w-7xl flex-1 items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <Aside />

        <main className="h-full flex-1">{children}</main>
      </div>
    </div>
  );
}
