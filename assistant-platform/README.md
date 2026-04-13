# Assistant Platform (Telegram + Web)

Это **скелет** твоего проекта: Telegram-бот + web-приложение (как “личный кабинет”).

## Что внутри

- `apps/web` — Next.js web-приложение (под Vercel).
  - Страницы: Dashboard, Tasks, Calendar, Agents, Memory, Settings.
  - Под Telegram WebApp (мини-приложение внутри Telegram).

- `apps/api` — FastAPI backend (под Render/Railway/Fly/любую бесплатную платформу).
  - API: users, tasks, calendar, agents, memory.

- `apps/bot` — Telegram bot (aiogram) — вход в систему.
  - Router: главный “модератор” (dispatch) + простые команды.

- `docs` — дизайн-скелет + чек-листы + roadmap.

## Быстрый старт (локально)

### 1) Web
```bash
cd assistant-platform/apps/web
npm i
npm run dev
```

### 2) API
```bash
cd assistant-platform/apps/api
python -m venv .venv
source .venv/bin/activate  # на Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 3) Bot
```bash
cd assistant-platform/apps/bot
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m bot
```

## Переменные окружения
Скопируй `assistant-platform/.env.example` → `.env` и заполни.

## Деплой бесплатно (идея)
- Web: Vercel (бесплатный)
- API: Render / Railway / Fly (на старте бесплатно/дёшево; условия меняются)
- DB: Supabase (Postgres) или Neon (Postgres)

> Важно: бесплатные тарифы у сервисов меняются. Для MVP хватит.

## Следующий шаг
Открой `assistant-platform/docs/ui.md` — там “как это должно выглядеть” по разделам.
