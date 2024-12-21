import telebot
import logging
from telebot import types
from Requirements import *

bot = telebot.TeleBot(TELEGRAM_API)

admin_registration = False
pupil_registration = False

with open('bot_logs.log', 'w'):
    pass

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('bot_logs.log', mode='a', encoding='utf-8'),
    ]
)
logger = logging.getLogger(__name__)


@bot.message_handler(commands=["start"])
def handle_start(message: types.Message):
    logger.info("Получена команда /start")
    global admin_registration, pupil_registration
    admin_registration = False
    pupil_registration = False
    bot.send_message(message.chat.id,
                     "Здравствуйте! Это бот для проверки заданий по шедевропрофильной математике! Выберите роль:",
                     reply_markup=role_markup())


def role_markup() -> types.ReplyKeyboardMarkup:
    logger.debug("Создание разметки ролей")
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn_admin = types.KeyboardButton(BTN_ADMIN)
    btn_pupil = types.KeyboardButton(BTN_PUPIL)
    markup.add(btn_admin, btn_pupil)
    return markup


@bot.message_handler(func=lambda message: message.text in [BTN_ADMIN, BTN_PUPIL])
def handle_role(message: types.Message):
    logger.info(f"Выбрана роль: {message.text}")
    role = message.text
    bot.send_message(message.chat.id, PICKED_ROLE + f'{role}')

    if role == BTN_ADMIN or role == BTN_PUPIL:
        ask_login(message.chat.id)


def ask_login(chat_id: int):
    logger.info(f"Запрос логина для chat_id: {chat_id}")
    bot.send_message(chat_id, LOGIN_REQUEST, reply_markup=back_to_role_markup())
    bot.register_next_step_handler_by_chat_id(chat_id, ask_password)


def back_to_role_markup() -> types.ReplyKeyboardMarkup:
    logger.debug("Создание разметки возврата к ролям")
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn_back_to_role = types.KeyboardButton(BTN_BACK_TO_ROLE)
    markup.add(btn_back_to_role)
    return markup


def wrong_login_attempt(message: types.Message, chat_id: int, login: str):
    logger.warning(f"Неправильная попытка входа: {login}")
    bot.send_message(chat_id, INVALID_LOGIN, reply_markup=back_to_role_markup())
    ask_login(chat_id)


def ask_password(message: types.Message):
    logger.info(f"Запрос пароля для пользователя: {message.text}")
    login = message.text
    chat_id = message.chat.id
    back_to_role_markup()

    if login in admin_credentials or login in pupil_credentials:
        bot.send_message(chat_id, PASSWORD_REQUEST, reply_markup=back_to_role_markup())
        bot.register_next_step_handler_by_chat_id(chat_id, lambda message: check_credentials(message, login))
        return
    if message.text == BTN_BACK_TO_ROLE:
        handle_start(message)
        return
    else:
        wrong_login_attempt(message, chat_id, login)


def check_credentials(message: types.Message, login: str):
    logger.info(f"Проверка учетных данных для пользователя: {login}")
    chat_id = message.chat.id
    password = message.text

    if admin_credentials.get(login) == password:
        global admin_registration
        admin_registration = True
        show_options(chat_id)
        return
    if pupil_credentials.get(login) == password:
        global pupil_registration
        pupil_registration = True
        show_options(chat_id)
        return
    else:
        wrong_login_attempt(message, chat_id, login)


def show_options(chat_id: int):
    logger.info(f"Отображение опций для chat_id: {chat_id}")
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)

    btn_start = types.KeyboardButton(BTN_BACK_TO_ROLE)
    btn_choose_task = types.KeyboardButton(BTN_CHOOSE_TASK)
    buttons = [btn_start, btn_choose_task]
    distribute_options(buttons, markup)

    bot.send_message(chat_id, CHOOSE_ACTION, reply_markup=markup)


def distribute_options(buttons: list, markup: types.ReplyKeyboardMarkup):
    logger.debug("Распределение опций в зависимости от роли пользователя")
    (btn_start, btn_choose_task) = buttons
    if admin_registration:
        markup.add(btn_start, btn_choose_task)
    elif pupil_registration:
        markup.add(btn_start, btn_choose_task)
    else:
        pass


@bot.message_handler(func=lambda message: message.text in [
    BTN_BACK_TO_ROLE, BTN_CHOOSE_TASK
])
def handle_action(message: types.Message):
    logger.info(f"Обработка действия: {message.text}")
    if message.text == BTN_BACK_TO_ROLE:
        handle_start(message)

    elif message.text == BTN_CHOOSE_TASK:
        bot.send_message(message.chat.id, GET_TASK_NAME)
        bot.register_next_step_handler(message, get_task_name)


def get_task_name(message: types.Message):
    task_name = message.text
    bot.send_message(message.chat.id, TASK_REQUEST)
    bot.register_next_step_handler(message, get_task, task_name)


def get_task(message: types.Message, task_name: str):
    task = message.text
    give_task(message, task_name, task)


def give_task(message: types.Message, task_name: str, task: str):
    chat_id = message.chat.id
    # взять из базы данных задание и принтануть текст + картинку задания


@bot.message_handler(func=lambda message: True)
def handle_other(message: types.Message):
    logger.info(f"Получено необработанное сообщение: {message.text}")
    bot.send_message(message.chat.id, "Используйте кнопки")


bot.polling(none_stop=True)
