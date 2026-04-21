import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { env, requireServerEnv } from "@/lib/env";
import { validateTelegramInitData } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const { initData } = await request.json();
    if (!initData) {
      return NextResponse.json({ error: "initData is required" }, { status: 400 });
    }

    const botToken = requireServerEnv("telegramBotToken");
    let userData:
      | {
          id: number;
          username?: string;
          first_name?: string;
          photo_url?: string;
        }
      | undefined;

    // Dev fallback, чтобы MVP удобно тестировался локально без Telegram WebApp.
    if (initData === "debug=true" && process.env.NODE_ENV !== "production") {
      userData = {
        id: 123456789,
        username: "debug_user",
        first_name: "Debug",
      };
    } else {
      const result = validateTelegramInitData(initData, botToken);
      if (!result.ok) {
        return NextResponse.json({ error: `Telegram auth failed: ${result.reason}` }, { status: 401 });
      }
      userData = result.user;
    }

    const supabase = getSupabaseAdmin();

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("telegram_id", userData.id)
      .maybeSingle();

    let userId = existingUser?.id;
    if (userId) {
      await supabase
        .from("users")
        .update({
          username: userData.username || null,
          first_name: userData.first_name || null,
          photo_url: userData.photo_url || null,
          last_login_at: new Date().toISOString(),
        })
        .eq("id", userId);
    } else {
      const { data: createdUser, error: createErr } = await supabase
        .from("users")
        .insert({
          telegram_id: userData.id,
          username: userData.username || null,
          first_name: userData.first_name || null,
          photo_url: userData.photo_url || null,
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (createErr || !createdUser) {
        return NextResponse.json({ error: createErr?.message || "Unable to create user" }, { status: 500 });
      }

      userId = createdUser.id;
      await supabase.from("subscriptions").insert({
        user_id: userId,
        status: "inactive",
        paid_until: null,
      });
    }

    return NextResponse.json({
      ok: true,
      botUsername: env.telegramBotUsername,
      user: { id: userId, telegramId: userData.id },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
