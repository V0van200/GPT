import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EEKLERA Club | Telegram Premium Access",
  description: "Luxury landing for paid Telegram club with YooKassa checkout",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
