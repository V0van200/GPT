import { NextResponse } from "next/server";
import { createYookassaPayment } from "@/lib/yookassa";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const yookassaPayment = await createYookassaPayment({ amount: 200, userId });

    const supabase = getSupabaseAdmin();
    await supabase.from("payments").insert({
      user_id: userId,
      yookassa_payment_id: yookassaPayment.id,
      amount: 200,
      currency: "RUB",
      status: yookassaPayment.status,
      payload: yookassaPayment,
    });

    return NextResponse.json({
      confirmationUrl: yookassaPayment.confirmation?.confirmation_url,
      paymentId: yookassaPayment.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Payment creation error" }, { status: 500 });
  }
}
