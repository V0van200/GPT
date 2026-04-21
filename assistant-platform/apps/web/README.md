# EEKLERA Club MVP (Telegram WebApp + YooKassa + Supabase)

MVP-проект лендинга/мини-приложения для продажи доступа в закрытый Telegram-клуб EEKLERA.

## Что реализовано

- Красивый landing в стиле luxury dark + premium club aesthetic (Tailwind).
- Авторизация через `Telegram WebApp initData` на сервере.
- Создание пользователя в Supabase (`users`) + первичная подписка (`subscriptions`).
- Внешний checkout через YooKassa (не Telegram Stars и не Telegram Invoice).
- Webhook обработки оплаты от YooKassa.
- Обновление статуса подписки на 30 дней после успешной оплаты.
- Экран успеха оплаты `/success`.
- Заглушка `/api/access-link` для следующего этапа выдачи invite link.

## Структура проекта

```txt
app/
  api/
    auth/telegram/route.ts
    payments/create/route.ts
    payments/webhook/route.ts
    access-link/route.ts
  success/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  club-landing.tsx
lib/
  env.ts
  supabase.ts
  telegram.ts
  yookassa.ts
supabase/
  schema.sql
public/
styles/
```

## Локальный запуск

1. Установить зависимости:
   ```bash
   npm install
   ```
2. Создать `.env.local` на основе `.env.example`.
3. Поднять dev-сервер:
   ```bash
   npm run dev
   ```
4. Открыть: `http://localhost:3000`.

> Для локальной отладки без Telegram WebApp в `development` используется fallback `initData=debug=true`.

## Настройка Supabase

1. Создайте проект в Supabase (free tier).
2. Откройте SQL Editor и выполните `supabase/schema.sql`.
3. Возьмите:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Добавьте их в `.env.local` и в Vercel Environment Variables.

## Настройка YooKassa

1. Получите в личном кабинете YooKassa:
   - `YOOKASSA_SHOP_ID`
   - `YOOKASSA_SECRET_KEY`
2. Укажите `YOOKASSA_RETURN_URL` (например `https://your-app.vercel.app/success`).
3. В YooKassa настройте webhook на:
   `https://your-app.vercel.app/api/payments/webhook`
4. Отслеживайте событие `payment.succeeded`.

## Настройка Telegram WebApp auth

1. Создайте Telegram-бота через `@BotFather`.
2. Укажите в env:
   - `TELEGRAM_BOT_TOKEN`
   - `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
3. Открывайте WebApp из бота (чтобы в Mini App приходил корректный `initData`).
4. Сервер валидирует подпись `initData` в `lib/telegram.ts`.

## Деплой на Vercel (free)

1. Подключите репозиторий к Vercel.
2. Root Directory: `assistant-platform/apps/web`.
3. Добавьте все переменные из `.env.example` в Project Settings → Environment Variables.
4. Deploy.

## Как подключить Telegram-бота для выдачи доступа (следующий этап)

Вариант A (автоматически):
- Бот — админ в приватном чате/канале.
- После `payment.succeeded` бот генерирует одноразовую ссылку:
  `createChatInviteLink` с `member_limit=1` и сроком жизни.
- Ссылка сохраняется в `access_links`.
- Пользователь получает кнопку «Войти в клуб».

Вариант B (ручной/полуавтоматический):
- После оплаты ставится флаг, что доступ должен быть выдан.
- Администратор отправляет ссылку вручную (через отдельную admin-панель/скрипт).

## ENV-переменные

Список в `.env.example`:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `YOOKASSA_SHOP_ID`
- `YOOKASSA_SECRET_KEY`
- `YOOKASSA_RETURN_URL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_PRIVATE_CHAT_ID`

## TODO roadmap

1. Добавить проверку подписи webhook от YooKassa (доп. безопасность).
2. Сделать полноценную сессию пользователя (JWT/cookie) вместо передачи `userId`.
3. Реализовать выдачу access link через Telegram Bot API.
4. Добавить страницу "Мой доступ" с таймером до `paid_until`.
5. Добавить cron/job для автодеактивации просроченных подписок.
6. Подключить Sentry/логирование ошибок.
7. Добавить smoke-тесты API и e2e-тест платежного флоу.
