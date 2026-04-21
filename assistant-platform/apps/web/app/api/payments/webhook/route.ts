import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  // YooKassa шлет событие вида payment.succeeded / payment.canceled.
  const event = body?.event;
  const paymentObject = body?.object;
  if (!event || !paymentObject?.id) {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Идемпотентность: не обрабатываем payment.succeeded повторно.
  const { data: existingPayment } = await supabase
    .from("payments")
    .select("id, status, user_id")
    .eq("yookassa_payment_id", paymentObject.id)
    .maybeSingle();

  if (!existingPayment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  if (event === "payment.succeeded" && existingPayment.status !== "succeeded") {
    const now = new Date();
    const paidUntil = new Date(now);
    paidUntil.setDate(now.getDate() + 30);

    await supabase
      .from("payments")
      .update({ status: "succeeded", payload: paymentObject })
      .eq("id", existingPayment.id);

    await supabase
      .from("subscriptions")
      .update({
        status: "active",
        paid_until: paidUntil.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", existingPayment.user_id);
  }

  if (event === "payment.canceled") {
    await supabase
      .from("payments")
      .update({ status: "canceled", payload: paymentObject })
      .eq("id", existingPayment.id);
  }

  return NextResponse.json({ ok: true });
}
