import { randomUUID } from "crypto";
import { env, requireServerEnv } from "@/lib/env";

const YOOKASSA_API = "https://api.yookassa.ru/v3/payments";

export async function createYookassaPayment({
  amount,
  userId,
}: {
  amount: number;
  userId: string;
}) {
  const shopId = requireServerEnv("yookassaShopId");
  const secretKey = requireServerEnv("yookassaSecretKey");

  const idempotenceKey = randomUUID();
  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");

  const response = await fetch(YOOKASSA_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": idempotenceKey,
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: { value: amount.toFixed(2), currency: "RUB" },
      confirmation: {
        type: "redirect",
        return_url: env.yookassaReturnUrl || `${env.appUrl}/success`,
      },
      capture: true,
      description: "EEKLERA Club: 30 days access",
      metadata: { user_id: userId, plan: "30_days" },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`YooKassa error: ${text}`);
  }

  return response.json();
}
