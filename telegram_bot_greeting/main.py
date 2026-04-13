import os
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.types import Message
from aiogram import F
import asyncio

logging.basicConfig(level=logging.INFO)

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TOKEN:
    raise ValueError("Не найден TELEGRAM_BOT_TOKEN. Добавь токен в переменные окружения.")

bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()


@dp.message(CommandStart())
async def cmd_start(message: Message):
    user_name = message.from_user.first_name if message.from_user else "друг"
    await message.answer(
        f"👋 Привет, {user_name}!\n\nЯ простой Telegram-бот и рад тебя видеть."
    )


@dp.message(F.text)
async def echo_greeting(message: Message):
    text = (message.text or "").lower()
    if any(word in text for word in ["привет", "hello", "hi", "здравствуй"]):
        await message.answer("👋 Привет! Напиши /start, чтобы начать.")
    else:
        await message.answer("Я пока умею только здороваться 🙂")


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
