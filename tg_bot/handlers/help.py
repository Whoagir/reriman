from telegram import Update
from telegram.ext import CommandHandler

async def help_command(update: Update, context):
    """Команда /help — предоставление справочной информации пользователю."""
    help_text = (
        "Добро пожаловать! Вот что я умею:\n\n"
        "/start - Начать работу с ботом\n"
        "/help - Показать это сообщение\n"
        "/select_task - Выбрать задание\n"
        "/send_answer - Отправить ответ\n"
        "/check_answer - Проверить ваш ответ\n"
    )
    await update.message.reply_text(help_text)

# Экспортируем CommandHandler для использования в главном файле
help_handler = CommandHandler("help", help_command)
