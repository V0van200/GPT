import crypto from "crypto";

/**
 * Валидация initData из Telegram WebApp согласно официальной схеме:
 * 1) убираем hash
 * 2) сортируем пары ключ=значение
 * 3) считаем HMAC через secret key от bot token
 */
export function validateTelegramInitData(initData: string, botToken: string) {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) {
    return { ok: false as const, reason: "Missing hash" };
  }

  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const secret = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculatedHash = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");

  if (calculatedHash !== hash) {
    return { ok: false as const, reason: "Invalid hash" };
  }

  const userRaw = params.get("user");
  if (!userRaw) {
    return { ok: false as const, reason: "Missing user" };
  }

  const user = JSON.parse(userRaw) as {
    id: number;
    username?: string;
    first_name?: string;
    photo_url?: string;
  };

  return { ok: true as const, user };
}
