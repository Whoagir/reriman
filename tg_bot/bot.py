from handlers.tasks import get_select_prototype_handler, handle_prototype_selection_handler, get_check_answer_handler, \
    handle_task_selection_handler
from config import TOKEN
from telegram.ext import Application, CommandHandler
from handlers.start import start_handler
from handlers.help import help_handler
from telegram import BotCommand


async def set_commands(application):
    commands = [
        BotCommand("/start", "перезапуск"),
        BotCommand("/select_prototype", "выбрать прототип"),
        BotCommand("/select_task", "выбрать задачу"),
        BotCommand("/stats", "профиль пользователя"),
        BotCommand("/send_task", "???"),
        BotCommand("/check_answer", "проверить ответ"),
        BotCommand("/reset", "начать заново"),
    ]
    await application.bot.set_my_commands(commands)


async def main():
    # Создаем экземпляр бота с токеном
    application = Application.builder().token(TOKEN).build()

    # Устанавливаем команды меню
    await set_commands(application)

    # Регистрируем хэндлеры
    application.add_handler(start_handler)
    application.add_handler(help_handler)
    application.add_handler(get_select_prototype_handler)
    application.add_handler(handle_prototype_selection_handler)
    application.add_handler(handle_task_selection_handler)
    application.add_handler(get_check_answer_handler)

    # Запускаем бота в режиме polling (опрос серверов)
    await application.run_polling()


if __name__ == "__main__":
    main()
