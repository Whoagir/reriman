from django.db import models
from treebeard.mp_tree import MP_Node


class Theme(MP_Node):
    node_order_by = ['name']

    name = models.CharField(
        max_length=100,
        verbose_name='Название'
    )
    theory_tags = models.ManyToManyField(
        'theory_tree.TheoryTag',
        related_name='themes',
        verbose_name='Теги теории',
        blank=True
    )
    tasks = models.ManyToManyField(
        'tasks.Task',
        related_name='themes',
        verbose_name='Задачи',
        blank=True
    )

    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'

    def __str__(self):
        return self.name
