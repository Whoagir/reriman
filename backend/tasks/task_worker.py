import random
from pathlib import Path
from typing import Optional

from PIL.Image import Image, open as image_open
from PIL import ImageDraw, Image, ImageFont
from django.contrib.auth.models import User
from rest_framework.exceptions import APIException

from tasks.models import Task


BG_COLOR = 'white'  # config('BG_COLOR', cast=str)
TEXT_COLOR = 'black'  # config('TEXT_COLOR', cast=str)
FONT_FILE = 'FiraCode-Medium.ttf'


def get_text_image(text: str, size: tuple[int, int]) -> Image:
    img = Image.new('RGB', size, color=BG_COLOR)
    font = ImageFont.truetype(str(Path(__file__).resolve().parent / FONT_FILE), size[1], encoding="unic")
    # font = ImageFont.truetype(FONT, size[1])
    d = ImageDraw.Draw(img)
    d.text((0, 0), text, TEXT_COLOR, font=font)
    return img


def insert_text_images(base_image: Image, inserted_images: list[Image, tuple[int, int]]) -> Image:
    res = base_image.copy()
    for img, pos in inserted_images:
        res.paste(img, pos)
    # res.save(settings.TASK_TEMP_DIR / f'{str(uuid4())}.png')
    return res


class RunnerError(APIException):
    status_code = 400
    default_detail = 'Incorrect script code.'
    default_code = 'incorrect_script_code'


class AbstractTaskWorker:
    def __init__(self, seed: int, errors: list[str] = None):
        self.vars = {}
        self.seed = seed
        self.errors = errors
        random.seed(self.seed)

    def setup(self):
        """Установка переменных, данных перед генерацией варианта задачи."""
        pass

    def data(self) -> dict:
        self.setup()
        data = dict()
        for i in range(1, 11):
            data[f'b{i}'] = self.__getattribute__(f'get_b{i}')()
        data['answer'] = self.get_answer()
        return data

    def randint(self, a: int, b: int) -> int:
        """Возвращает случайное целое число на отрезке [a, b]."""
        return random.randint(a, b)

    def randrange(self, a: int, b: int, step: int) -> int:
        """Возвращает случайно выбранное целое число из последовательности [a, b] с шагом step."""
        return random.randrange(a, b, step)

    def choice(self, lst: [list, tuple]):
        """Возвращает случайный элемент непустой последовательности."""
        return random.choice(lst)

    def random(self) -> float:
        """Возвращает случайное число от 0 до 1."""
        return random.random()

    def get_b1(self):
        """Возвращает сгенерированное или заданное значение 1 блока."""
        pass

    def get_b2(self):
        """Возвращает сгенерированное или заданное значение 2 блока."""
        pass

    def get_b3(self):
        """Возвращает сгенерированное или заданное значение 3 блока."""
        pass

    def get_b4(self):
        """Возвращает сгенерированное или заданное значение 4 блока."""
        pass

    def get_b5(self):
        """Возвращает сгенерированное или заданное значение 5 блока."""
        pass

    def get_b6(self):
        """Возвращает сгенерированное или заданное значение 6 блока."""
        pass

    def get_b7(self):
        """Возвращает сгенерированное или заданное значение 7 блока."""
        pass

    def get_b8(self):
        """Возвращает сгенерированное или заданное значение 8 блока."""
        pass

    def get_b9(self):
        """Возвращает сгенерированное или заданное значение 9 блока."""
        pass

    def get_b10(self):
        """Возвращает сгенерированное или заданное значение 10 блока."""
        pass

    def get_answer(self):
        """Возвращает сгенерированный ответ задачи."""
        pass


class TaskRunner:
    def __init__(self, task: Task, user: User):
        self.task = task
        self.user = user

        self.task_worker = None

        self.init_task_worker()

    def init_task_worker(self):
        if not self.task.script:
            raise RunnerError("Script file not found.")
        try:
            import sys
            import importlib.util
            module_name = 'task_worker'
            spec = importlib.util.spec_from_file_location(module_name, self.task.script.path)
            foo = importlib.util.module_from_spec(spec)
            sys.modules[module_name] = foo
            spec.loader.exec_module(foo)
            self.task_worker = foo.TaskWorker(self.user.pk)
        except Exception as e:
            raise RunnerError(e)

    def get_image(self) -> Image:
        if not self.task.image:
            raise RunnerError("Image file not found.")
        d = []
        self.task_worker.setup()
        for b in self.task.image_blocks.all():
            d.append(
                (get_text_image(
                    str(self.task_worker.__getattribute__(f'get_b{b.number}')()),
                    (b.width, b.height)),
                 (b.x, b.y)))
        image = insert_text_images(image_open(self.task.image), d)
        return image

    def get_data(self) -> Optional[dict]:
        self.task_worker.setup()
        data = dict()
        for i in range(1, 11):
            data[f'b{i}'] = self.task_worker.__getattribute__(f'get_b{i}')()
        data['answer'] = self.task_worker.get_answer()
        return data
