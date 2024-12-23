import telebot
from telebot import types
import os

BOT_TOKEN = '7928272085:AAEykM3TKRf14aAnHU0kQyebGK05i5SyvcU'
bot = telebot.TeleBot(BOT_TOKEN)

# tasks = {
#     1: 'tasks/task1.png',
#     2: 'tasks/task2.png',
#     3: 'tasks/task3.png',
#     # Добавьте до 12 заданий
# }
#
# answers = {
#     1: '1.10 2.12 3.14',
#     2: '1.20 2.21 3.22',
#     3: '1.30 2.32 3.34',
#     # Добавьте ответы для 12 заданий
# }


# Предположим, что задания хранятся в папках по прототипам
# Например: tasks/prototype1/task1.png, tasks/prototype1/task2.png, и т.д.
task_directory = 'tasks'

def get_prototype_tasks(prototype_number):
    # Функция для получения списка файлов в папке прототипа
    prototype_path = os.path.join(task_directory, f'prototype{prototype_number}')
    return sorted(os.listdir(prototype_path))

@bot.message_handler(commands=['start'])
def send_welcome(message):
    markup = types.ReplyKeyboardMarkup(row_width=3, resize_keyboard=True)
    for num in range(1, 13):
        markup.add(types.KeyboardButton(f"Прототип {num}"))
    bot.send_message(message.chat.id, "Выберите прототип задания:", reply_markup=markup)

@bot.message_handler(func=lambda message: "Прототип" in message.text)
def choose_prototype(message):
    try:
        prototype_num = int(message.text.split()[1])
        task_buttons = ["Ввести номер задания", "Получить список заданий"]
        markup = types.ReplyKeyboardMarkup(row_width=1, resize_keyboard=True)
        markup.add(*task_buttons)
        bot.send_message(message.chat.id, f"Вы выбрали прототип {prototype_num}. Что сделать дальше?", reply_markup=markup)
        bot.register_next_step_handler(message, handle_task_choice, prototype_num)
    except Exception as e:
        bot.send_message(message.chat.id, "Ошибка при выборе прототипа")

def handle_task_choice(message, prototype_num):
    if message.text == "Ввести номер задания":
        bot.send_message(message.chat.id, f"Введите номер задания для прототипа {prototype_num}:")
        bot.register_next_step_handler(message, send_task, prototype_num)
    elif message.text == "Получить список заданий":
        tasks = get_prototype_tasks(prototype_num)
        bot.send_message(message.chat.id, "Доступные задания:\n" + "\n".join(tasks))

def send_task(message, prototype_num):
    try:
        task_num = message.text.strip()
        task_path = os.path.join(task_directory, f'prototype{prototype_num}', f'{task_num}.png')
        bot.send_photo(message.chat.id, open(task_path, 'rb'))
    except Exception as e:
        bot.send_message(message.chat.id, "Ошибка при получении задания")

if __name__ == '__main__':
    print("Бот запущен...")
    bot.infinity_polling()