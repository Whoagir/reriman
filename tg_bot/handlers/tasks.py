import os
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import CallbackQueryHandler, CommandHandler, MessageHandler, filters
from handlers.utils import load_answers, save_user_statistics
from config import TASK_IMG_PATH, TASK_ANS_PATH

# Словарь для хранения состояния каждого пользователя
user_states = {}

async def select_folder(update: Update, context):
    """Отправляет пользователю список доступных папок с заданиями."""
    folders = os.listdir(TASK_IMG_PATH)
    folders = [folder for folder in folders if os.path.isdir(os.path.join(TASK_IMG_PATH, folder))]

    keyboard = [
        [InlineKeyboardButton(f"Набор {folder}", callback_data=f"select_folder_{folder}")]
        for folder in folders
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Выберите набор заданий:", reply_markup=reply_markup)


async def select_task(update: Update, context):
    """Отправляет пользователю список доступных заданий в выбранной папке."""
    query = update.callback_query
    folder_id = query.data.split("_")[2]

    folder_path = os.path.join(TASK_IMG_PATH, folder_id)
    tasks = os.listdir(folder_path)
    tasks = [task for task in tasks if task.endswith(".png")]

    keyboard = [
        [InlineKeyboardButton(f"Задание {task.split('.')[0]}", callback_data=f"select_task_{folder_id}_{task.split('.')[0]}")]
        for task in tasks
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await query.edit_message_text(f"Вы выбрали набор {folder_id}. Теперь выберите задание:", reply_markup=reply_markup)


async def send_task(update: Update, context):
    """Отправляет пользователю картинку с заданием и просит ввести ответ."""
    query = update.callback_query
    _, folder_id, task_id = query.data.split("_")

    task_path = os.path.join(TASK_IMG_PATH, folder_id, f"{task_id}.png")

    if os.path.exists(task_path):
        # Сохраняем текущий контекст задания в словаре user_states
        user_states[query.from_user.id] = {
            "folder_id": folder_id,
            "task_id": task_id
        }

        with open(task_path, "rb") as task_file:
            await query.message.reply_photo(
                photo=task_file,
                caption=f"Это задание {task_id} из набора {folder_id}. "
                        f"Введите ваш ответ в формате:\n*ответ Х*, где Х — ваш ответ."
            )
    else:
        await query.message.reply_text("Произошла ошибка, задание не найдено!")


async def check_answer(update: Update, context):
    """Проверяет ответ пользователя и обновляет статистику."""
    user_id = update.message.from_user.id

    if user_id not in user_states:
        await update.message.reply_text("Вы ещё не выбрали задание. Используйте команду /start для начала.")
        return

    # Получаем данные о последнем задании пользователя
    folder_id = user_states[user_id]["folder_id"]
    task_id = user_states[user_id]["task_id"]

    # Загружаем ответы из соответствующего файла
    answers_path = os.path.join(TASK_ANS_PATH, folder_id, "ans.txt")
    answers = load_answers(answers_path)

    if not answers:
        await update.message.reply_text("К сожалению, правильные ответы отсутствуют для этого задания.")
        return

    user_answer = update.message.text.lower().replace("ответ", "").strip()

    # Проверяем ответ
    correct_answer = answers.get(task_id)
    if correct_answer is None:
        await update.message.reply_text("К сожалению, это задание не имеет правильного ответа в базе.")
        return

    if user_answer == correct_answer:
        await update.message.reply_text("Правильно! Вы молодец 👏")
        save_user_statistics(user_id, folder_id, task_id, True)
    else:

        await update.message.reply_text(f"Неправильно. Правильный ответ: {correct_answer}")
        save_user_statistics(user_id, folder_id, task_id, False)

        # Сбрасываем состояние пользователя после проверки ответа
    user_states.pop(user_id, None)

    # Хэндлеры для задач
    select_folder_handler = CommandHandler("start", select_folder)
    select_task_handler = CallbackQueryHandler(select_task, pattern=r"^select_folder_\d+$")
    send_task_handler = CallbackQueryHandler(send_task, pattern=r"^select_task_\d+_\d+$")
    check_answer_handler = MessageHandler(filters.TEXT & ~filters.COMMAND, check_answer)

