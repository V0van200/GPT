# Vercel deploy (web-кабинет)

## Почему так
На Android/Termux Next.js часто не стартует из-за SWC. Это нормально. Для Telegram WebApp нам всё равно нужен публичный HTTPS URL, поэтому web проще собирать на Vercel.

## Шаги

### 1) Запушь изменения из Termux
После запуска `npm run dev` у тебя могли появиться новые файлы/зависимости (например, TypeScript пакеты и tsconfig).

Сделай commit и push через Termux:
- открой корень репозитория `~/GPT`
- посмотри изменения `git status`
- добавь изменённые файлы (обычно это web/package.json, web/package-lock.json, tsconfig.json)
- сделай commit
- сделай push

### 2) Создай проект на Vercel
Vercel → Add New Project → Import Git Repository → выбери репозиторий `V0van200/GPT`.

Обязательная настройка:
- Root Directory: `assistant-platform/apps/web`

Остальное оставь по умолчанию (Framework Next.js обычно определится сам).

### 3) Переменные окружения (минимум)
Project Settings → Environment Variables:
- NEXT_PUBLIC_APP_NAME = Assistant Platform

(Позже добавим NEXT_PUBLIC_API_BASE_URL, когда появится API.)

### 4) Deploy
Нажми Deploy и забери URL вида `https://xxxx.vercel.app`.

### 5) BotFather: разреши домен
BotFather → команда для домена WebApp (set domain) → выбери бота → укажи домен `xxxx.vercel.app`.

После этого кнопку WebApp можно безопасно открывать в Telegram.
