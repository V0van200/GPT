"use client";

import { useEffect } from "react";

const STARTAPP_PAYLOAD = "mobile";

const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;

  return /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(
    navigator.userAgent,
  );
};

export default function TelegramMobilePage() {
  useEffect(() => {
    const username = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;

    if (!username || !isMobileDevice()) {
      return;
    }

    const cleanUsername = username.replace(/^@/, "");
    const tgLink = `tg://resolve?domain=${cleanUsername}&startapp=${STARTAPP_PAYLOAD}`;
    const httpsLink = `https://t.me/${cleanUsername}?startapp=${STARTAPP_PAYLOAD}`;

    window.location.replace(tgLink);

    const fallbackTimer = window.setTimeout(() => {
      window.location.replace(httpsLink);
    }, 1200);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return <main className="min-h-screen bg-black" aria-label="telegram-mobile" />;
}
