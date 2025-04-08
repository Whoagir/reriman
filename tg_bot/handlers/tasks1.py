import os
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import CommandHandler, CallbackContext, CallbackQueryHandler

# Путь к папке с заданиями
TASKS_DIR = "task_img"


async def select_task(update: Update, context: CallbackContext):
    """Хендлер для выбора задания."""

    # Считываем все доступные папки заданий
    tasks = os.listdir(TASKS_DIR)

    # Создаем список кнопок
    keyboard = [[InlineKeyboardButton(task, callback_data=task)] for task in tasks if
                os.path.isdir(os.path.join(TASKS_DIR, task))]

    # Создаем разметку клавиатуры
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем сообщение с клавиатурой для выбора задания
    await update.message.reply_text("Выберите задание:", reply_markup=reply_markup)


async def handle_task_selection(update: Update, context: CallbackContext):
    """Обрабатывает выбор задания."""

    query = update.callback_query
    await query.answer()  # Подтверждаем нажатие на кнопку

    # Получаем имя выбранной папки из callback_data
    selected_directory = query.data

    # Сохраняем выбранную папку в контекст пользователя
    context.user_data['selected_directory'] = selected_directory

    # Считываем все изображения в выбранной папке
    images = os.listdir(os.path.join(TASKS_DIR, selected_directory))
    images = [img for img in images if img.endswith((".png", ".jpg", ".jpeg"))]

    # Создаем список кнопок
    keyboard = [[InlineKeyboardButton(img, callback_data=img)] for img in images]

    # Создаем разметку клавиатуры
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Уведомляем пользователя о выбранной папке и предлагаем выбрать изображение
    await query.edit_message_text(f"Вы выбрали папку: {selected_directory}!\nТеперь выберите изображение:",
                                  reply_markup=reply_markup)


async def handle_image_selection(update: Update, context: CallbackContext):
    """Обрабатывает выбор изображения."""

    query = update.callback_query
    await query.answer()  # Подтверждаем нажатие на кнопку

    # Получаем название выбранного файла-изображения из callback_data
    selected_image = query.data

    # Получаем из контекста пользователя выбранную ранее папку
    selected_directory = context.user_data['selected_directory']

    # Полный путь к выбранному изображению
    image_path = os.path.join(TASKS_DIR, selected_directory, selected_image)

    # Отправляем пользователю выбранное изображение
    await query.message.reply_photo(photo=open(image_path, "rb"), caption=f"Вы выбрали изображение: {selected_image}")


# Регистрируем хендлеры
select_task_handler = CommandHandler("select_task", select_task)
handle_task_selection_handler = CallbackQueryHandler(handle_task_selection, pattern='^[^\/].*')
handle_image_selection_handler = CallbackQueryHandler(handle_image_selection, pattern='^[^\/].*')

# Не забудь добавить хэндлеры в диспетчер в основном файле (например, bot.py)
# dispatcher.add_handler(select_task_handler)
# dispatcher.add_handler(handle_task_selection_handler)
# dispatcher.add_handler(handle_image_selection_handler)
