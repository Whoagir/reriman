from telegram.ext import Application
from handlers.start import start_handler
from handlers.tasks import select_folder_handler, select_task_handler, send_task_handler
from config import TOKEN

def main():
    # Создаем экземпляр бота с токеном
    application = Application.builder().token(TOKEN).build()

    # Регистрируем хэндлеры
    application.add_handler(start_handler)
    application.add_handler(select_folder_handler)
    application.add_handler(select_task_handler)
    application.add_handler(send_task_handler)

    # Запускаем бота
    application.run_polling()

if __name__ == "__main__":
    main()
