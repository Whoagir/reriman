import os
from collections import defaultdict

# Словарь для хранения статистики пользователей
user_statistics = defaultdict(lambda: {"correct": 0, "incorrect": 0})

def load_answers(answers_path):
    """Загружает ответы из файла и возвращает словарь формата {'1': '10', '2': '12'}."""
    if not os.path.exists(answers_path):
        return None

    answers = {}
    with open(answers_path, "r", encoding="utf-8") as file:
        for line in file:
            if line.strip():
                task_num, answer = line.split(".")
                answers[task_num.strip()] = answer.strip()

    return answers


def save_user_statistics(user_id, folder_id, task_id, is_correct):
    """Обновляет статистику пользователя."""
    if is_correct:
        user_statistics[user_id]["correct"] += 1
    else:
        user_statistics[user_id]["incorrect"] += 1
