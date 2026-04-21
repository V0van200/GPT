import { NextResponse } from "next/server";

export async function GET() {
  // MVP-заглушка. Здесь позже можно:
  // 1) проверить активную подписку пользователя
  // 2) создать invite link через Telegram Bot API
  // 3) выдать одноразовую ссылку и пометить её использованной
  return NextResponse.json({
    ok: true,
    message:
      "MVP placeholder: доступ подтвержден. TODO: интегрировать Telegram Bot API и одноразовые invite links.",
  });
}
