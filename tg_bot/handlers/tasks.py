import os
from telegram import Update
from telegram.ext import CommandHandler, MessageHandler, filters, CallbackContext, CallbackQueryHandler
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

TASKS_DIR = "task_img"  # Папка с изображениями заданий
ANSWERS_DIR = "task_ans"  # Папка с ответами на задания


async def select_task(update: Update, context: CallbackContext):
    """Хендлер для выбора задания."""
    # Считываем все доступные задания из папок
    tasks = os.listdir(TASKS_DIR)

    # Создаем список кнопок
    keyboard = [[InlineKeyboardButton(task, callback_data=task)] for task in tasks]

    # Создаем разметку клавиатуры
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем сообщение с клавиатурой для выбора задания
    await update.message.reply_text("Выберите задание:", reply_markup=reply_markup)

# Хэндлер для обработки нажатия на кнопку
async def handle_task_selection(update: Update, context: CallbackContext):
    """Обрабатывает выбор задания."""
    query = update.callback_query
    await query.answer()  # Подтверждаем нажатие на кнопку

    # Получаем номер выбранной папки из callback_data
    selected_directory = query.data

    # Сохраняем выбранную папку в контекст пользователя
    context.user_data['selected_directory'] = selected_directory

    # Уведомляем пользователя о выбранной папке
    await query.edit_message_text(f"Вы выбрали папку: {selected_directory}!")

# Регистрируем хэндлеры
get_select_task_handler = CommandHandler("select_task", select_task)
handle_task_selection_handler = CallbackQueryHandler(handle_task_selection)


async def send_task(update: Update, context: CallbackContext):
    """Хендлер для отправки задания."""
    # Проверяем, выбрал ли пользователь задание
    selected_task = context.user_data.get('selected_task', None)

    if selected_task is None:
        await update.message.reply_text("Сначала выберите задание командой /select_task!")
        return

    # Путь к изображению выбранного задания
    task_image_path = os.path.join(TASKS_DIR, selected_task, f"1.png")  # Например, отправим 1.png

    if not os.path.exists(task_image_path):
        await update.message.reply_text("Задание не найдено.")
        return

    # Отправляем картинку задания
    with open(task_image_path, 'rb') as photo:
        await update.message.reply_photo(photo=photo, caption=f"Задание {selected_task}: \nРешите задачу!")




get_send_task_handler = CommandHandler('send_task', send_task)

async def check_answer(update: Update, context: CallbackContext):
    """Хендлер для проверки ответа."""
    # Проверяем, выбрал ли пользователь задание
    selected_task = context.user_data.get('selected_task', None)

    if selected_task is None:
        await update.message.reply_text("Сначала выберите задание командой /select_task!")
        return

    # Получаем путь к файлу с ответами
    answer_file_path = os.path.join(ANSWERS_DIR, selected_task, 'ans.txt')

    if not os.path.exists(answer_file_path):
        await update.message.reply_text("Ответы для этого задания не найдены.")
        return

    # Читаем правильный ответ из файла
    with open(answer_file_path, 'r', encoding='utf-8') as file:
        correct_answer = file.read().strip()

    # Получаем ответ пользователя
    user_answer = update.message.text.strip()

    if user_answer == correct_answer:
        await update.message.reply_text(f"Ответ на задание {selected_task} правильный!")
    else:

        await update.message.reply_text(f"Ответ на задание {selected_task} неправильный. Попробуйте снова.")

    def get_check_answer_handler():
        return CommandHandler('check_answer', check_answer)

    async def handle_text(update: Update, context: CallbackContext):
        """Хендлер для текста, отправляемого пользователем."""
        # Просто повторяем текст пользователя, если нет команды
        user_text = update.message.text.strip()
        await update.message.reply_text(f"Вы написали: {user_text}")

    def get_handle_text_handler():
        return MessageHandler(filters.text & ~filters.command, handle_text)


get_check_answer_handler = CommandHandler('check_answer', check_answer)