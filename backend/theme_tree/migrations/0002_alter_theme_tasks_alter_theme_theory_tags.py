# Generated by Django 4.1.7 on 2023-06-05 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_delete_tag'),
        ('theory_tree', '0001_initial'),
        ('theme_tree', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='theme',
            name='tasks',
            field=models.ManyToManyField(blank=True, related_name='themes', to='tasks.task', verbose_name='Задачи'),
        ),
        migrations.AlterField(
            model_name='theme',
            name='theory_tags',
            field=models.ManyToManyField(blank=True, related_name='themes', to='theory_tree.theorytag', verbose_name='Теги теории'),
        ),
    ]