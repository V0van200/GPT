import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Assistant Platform",
  description: "Telegram assistant dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">Assistant</div>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/tasks">Tasks</a>
              <a href="/calendar">Calendar</a>
              <a href="/agents">Agents</a>
              <a href="/memory">Memory</a>
              <a href="/settings">Settings</a>
            </nav>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
