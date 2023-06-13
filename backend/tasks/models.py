import os
import logging
from uuid import uuid4

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from taggit.models import TagBase, ItemBase
from treebeard.mp_tree import MP_Node


logger = logging.getLogger(__name__)


def get_task_image_upload_path(instance: 'Task', filename):
    return os.path.join(instance.BASE_UPLOAD_DIR, str(instance.uuid), filename)


def get_task_script_upload_path(instance: 'Task', filename):
    return os.path.join(instance.SCRIPT_UPLOAD_DIR, str(instance.uuid), 'task_worker.py')


class ImageBlock(models.Model):
    number = models.PositiveSmallIntegerField(
        verbose_name='Номер блока',
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    x = models.IntegerField(
        verbose_name='x'
    )
    y = models.IntegerField(
        verbose_name='y'
    )
    width = models.IntegerField(
        verbose_name='width'
    )
    height = models.IntegerField(
        verbose_name='height'
    )
    task = models.ForeignKey(
        'tasks.Task',
        on_delete=models.CASCADE,
        verbose_name='Задача',
        related_name='image_blocks'
    )

    class Meta:
        verbose_name = 'Блок на картинке задачи'
        verbose_name_plural = 'Блоки на картинке задачи'
        ordering = ['task__pk']

    def __str__(self):
        return f'Задача: {self.task.title} -> Блок: {self.number}'


class Task(models.Model):
    BASE_UPLOAD_DIR = 'tasks_images'
    SCRIPT_UPLOAD_DIR = 'task_scripts'

    uuid = models.UUIDField(
        default=uuid4,
        editable=False
    )
    title = models.CharField(
        max_length=120,
        verbose_name="Название(номер и тд)"
    )
    image = models.ImageField(
        upload_to=get_task_image_upload_path,
        verbose_name='Картинка задачи',
        null=True,
        blank=True
    )
    verified = models.BooleanField(
        default=False,
        verbose_name='Проверено?'
    )
    script = models.FileField(
        upload_to=get_task_script_upload_path,
        verbose_name='Скрипт',
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"
        ordering = []

    def __str__(self):
        return f'{self.title}'
