from telegram import Update
from telegram.ext import CommandHandler, CallbackContext

async def select_task(update: Update, context: CallbackContext):
    """Хендлер для выбора задания."""
    await update.message.reply_text("Вы выбрали задание!")

def get_select_task_handler():
    return CommandHandler('select_task', select_task)

async def send_task(update: Update, context: CallbackContext):
    """Хендлер для отправки задания."""
    await update.message.reply_text("Отправляю задание...")

def get_send_task_handler():
    return CommandHandler('send_task', send_task)

async def check_answer(update: Update, context: CallbackContext):
    """Хендлер для проверки ответа."""
    await update.message.reply_text("Проверяю ваш ответ...")

def get_check_answer_handler():
    return CommandHandler('check_answer', check_answer)
