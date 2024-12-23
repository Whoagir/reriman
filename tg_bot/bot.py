from handlers.tasks1 import get_select_task_handler, get_send_task_handler, get_check_answer_handler
from config import TOKEN
from telegram.ext import Application  # Импортируем класс Application
from handlers.start import start_handler
from handlers.help import help_handler  # Импортируем наш новый обработчик

def main():
    # Создаем экземпляр бота с токеном
    application = Application.builder().token(TOKEN).build()

    # Регистрируем хэндлеры
    application.add_handler(start_handler)
    application.add_handler(help_handler)  # Регистрируем хендлер /help
    application.add_handler(get_select_task_handler())
    application.add_handler(get_send_task_handler())
    application.add_handler(get_check_answer_handler())

    # Запускаем бота
    application.run_polling()

if __name__ == "__main__":  # Убедись, что условие оформлено верно
    main()
