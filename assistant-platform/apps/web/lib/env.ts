export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  telegramBotUsername: process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "",
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  yookassaShopId: process.env.YOOKASSA_SHOP_ID || "",
  yookassaSecretKey: process.env.YOOKASSA_SECRET_KEY || "",
  yookassaReturnUrl: process.env.YOOKASSA_RETURN_URL || "",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
  telegramPrivateChatId: process.env.TELEGRAM_PRIVATE_CHAT_ID || "",
};

export function requireServerEnv(key: keyof typeof env) {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
}
