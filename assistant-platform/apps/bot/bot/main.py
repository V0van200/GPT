import os
import asyncio
from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
if not TOKEN:
    raise RuntimeError("Set TELEGRAM_BOT_TOKEN in environment")

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: Message):
    await message.answer(
        "Привет! Это MVP-скелет ассистента.\n"
        "Дальше тут будет: router → агенты → память → задачи/календарь."
    )

@dp.message()
async def echo(message: Message):
    await message.answer("Понял ✅ (пока заглушка).")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
