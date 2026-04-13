# Telegram Greeting Bot

Простой Telegram-бот на Python и aiogram.

## Что умеет
- отвечает на `/start`
- приветствует пользователя по имени
- реагирует на слова: `привет`, `hello`, `hi`, `здравствуй`

## Важно
Токен бота нельзя хранить в коде и публиковать в GitHub.
Если токен уже был показан кому-то или отправлен в чат, его нужно перевыпустить через BotFather.

## Быстрый запуск

### 1. Клонируй репозиторий
```bash
git clone https://github.com/V0van200/GPT.git
cd GPT/telegram_bot_greeting
```

### 2. Создай и активируй виртуальное окружение
```bash
python -m venv .venv
```

**Windows:**
```bash
.venv\Scripts\activate
```

**macOS / Linux:**
```bash
source .venv/bin/activate
```

### 3. Установи зависимости
```bash
pip install -r requirements.txt
```

### 4. Создай файл `.env`
Скопируй `.env.example` в `.env` и вставь новый токен:
```env
TELEGRAM_BOT_TOKEN=PASTE_NEW_TOKEN_HERE
```

### 5. Запусти бота
```bash
python main.py
```

## Проверка
Открой бота в Telegram, отправь `/start` или `привет`.

## Возможные ошибки
### `Не найден TELEGRAM_BOT_TOKEN`
Ты не создал `.env` или не задал переменную окружения.

### Бот не отвечает
- проверь, что токен новый и действительный
- проверь, что процесс `python main.py` запущен
- проверь, что ты написал боту первым
