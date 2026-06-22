import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Autotask Types — Ticket Console",
  description: "Example app exercising autotask-rest-api-types",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
