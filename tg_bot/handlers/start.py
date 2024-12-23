from telegram import Update
from telegram.ext import CommandHandler

async def start(update: Update, context):
    await update.message.reply_text(
        "Привет! Используйте кнопки меню для управления ботом.",
    )

# Экспортируем хэндлер для использования в главном файле
start_handler = CommandHandler("start", start)
