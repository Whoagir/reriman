from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
import os
import random

# Хранилище для статистики пользователей
user_data = {}

# Путь к заданиям и ответам
TASK_IMG_PATH = "task_img/"
TASK_ANS_PATH = "task_ans/"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Приветствие и старт работы."""
    user_id = update.effective_chat.id
    if user_id not in user_data:
        user_data[user_id] = {"correct": 0, "total": 0}
    await update.message.reply_text(
        "Привет! Я бот для автоматической проверки заданий. Напишите /gettask, чтобы получить задание!")


async def gettask(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Позволить пользователю выбрать задание вручную."""
    try:
        # Получаем список доступных папок
        folders = os.listdir(TASK_IMG_PATH)
        folder_list = "\n".join(f"*{i + 1}.* {folder}" for i, folder in enumerate(folders))
        context.user_data["available_folders"] = folders

        # Предлагаем пользователю выбрать папку
        await update.message.reply_text(
            f"Выберите папку с заданиями, отправив её номер:\n{folder_list}"
        )

    except Exception as e:
        await update.message.reply_text("Не удалось загрузить папки. Проверьте структуру папок!")
        print(f"Ошибка: {e}")


async def check_answer(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Проверка ответа ученика."""
    user_id = update.effective_chat.id
    if "current_task" not in context.user_data:
        await update.message.reply_text("Сначала получите задание с помощью команды /gettask.")
        return

    # Получаем ответ пользователя и текущую задачу
    try:
        user_answer = int(update.message.text.split()[1])
        folder, task_number = context.user_data["current_task"]

        # Читаем правильный ответ из txt файла
        with open(f"{TASK_ANS_PATH}/{folder}/ans.txt", "r") as ans_file:
            answers = {line.split('.')[0]: int(line.split('.')[1].strip()) for line in ans_file.readlines()}

        # Сравниваем ответ
        correct_answer = answers.get(task_number)
        if correct_answer == user_answer:
            user_data[user_id]["correct"] += 1
            await update.message.reply_text("✅ Правильно! Отличная работа!")
        else:
            await update.message.reply_text(f"❌ Неправильно! Правильный ответ: {correct_answer}.")

        user_data[user_id]["total"] += 1
        context.user_data.pop("current_task")  # Удаляем данные о текущей задаче
    except ValueError:
        await update.message.reply_text("Пожалуйста, укажите ваш ответ правильно в формате: 'ответ X', где X — число.")
    except Exception as ex:
        await update.message.reply_text("Не удалось проверить ваш ответ. Проверьте правильность ввода.")
        print("Ошибка проверки ответа:", ex)


async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Вывод статистики ученика."""
    user_id = update.effective_chat.id
    if user_id in user_data:
        correct = user_data[user_id]["correct"]
        total = user_data[user_id]["total"]
        await update.message.reply_text(f"📊 Ваша статистика: {correct}/{total} (правильных/всего).")
    else:
        await update.message.reply_text("Вы ещё не решали задания!")


def main():
    """Главная функция запуска бота."""
    TOKEN = "7936087407:AAGJVQlJe8LHgrFUxNQTOqG9QRGHGdAhhzE"

    # Создание приложения

    application = ApplicationBuilder().token(TOKEN).build()

    # Обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("gettask", gettask))
    application.add_handler(CommandHandler("stats", stats))

    # Обработчик текстовых сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, check_answer))

    print("Бот запущен...")
    application.run_polling()

if __name__ == "__main__":
    main()
