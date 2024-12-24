from handlers.tasks import get_select_task_handler, get_send_task_handler, get_check_answer_handler, \
    handle_task_selection_handler
from config import TOKEN
from telegram.ext import Application, CommandHandler
from handlers.start import start_handler
from handlers.help import help_handler
from telegram import BotCommand


def set_commands(application):
    commands = [
        BotCommand("/start", "перезапуск"),
        BotCommand("/mode", "выбрать прототип"),
        BotCommand("/stats", "профиль пользователя"),
        BotCommand("/select_task", "выбрать задачу"),
        BotCommand("/send_task", "???"),
        BotCommand("/check_answer", "проверить ответ"),
        BotCommand("/reset", "начать заново"),
    ]
    application.bot.set_my_commands(commands)


def main():
    # Создаем экземпляр бота с токеном
    application = Application.builder().token(TOKEN).build()

    # Устанавливаем команды меню
    set_commands(application)

    # Регистрируем хэндлеры
    application.add_handler(start_handler)
    application.add_handler(help_handler)
    application.add_handler(get_select_task_handler)
    application.add_handler(handle_task_selection_handler)
    application.add_handler(get_send_task_handler)
    application.add_handler(get_check_answer_handler)

    # Запускаем бота в режиме polling (опрос серверов)
    application.run_polling()


if __name__ == "__main__":
    main()
