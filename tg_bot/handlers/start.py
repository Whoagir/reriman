from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import CommandHandler
from config import TASK_IMG_PATH

async def start(update: Update, context):
    """Команда /start — приветствие и меню выбора."""
    keyboard = [
        [InlineKeyboardButton("Выбрать набор", callback_data="select_folder")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Привет! Хотите выбрать задание?", reply_markup=reply_markup)

# Экспортируем хэндлер для использования в главном файле
start_handler = CommandHandler("start", start)
