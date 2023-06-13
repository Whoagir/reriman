from django.contrib import admin
from django.shortcuts import reverse
from django.http import HttpResponseRedirect
from treebeard.admin import TreeAdmin
from django.conf import settings

from tasks.models import Task, ImageBlock
from tasks.forms import TaskAdminForm


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    change_form_template = 'tasks/admin/task_changeform.html'
    search_fields = ('title__icontains',)
    form = TaskAdminForm

    def response_change(self, request, obj):
        if '_redirect_to_task_worker_editor' in request.POST:
            return HttpResponseRedirect(settings.TASK_WORKER_EDITOR_URL + str(obj.id))
        return super().response_change(request, obj)

    # def save_model(self, request, obj: Task, form, change):
    #     tag_name_set = set(form.cleaned_data['tags'])
    #     tags = Tag.objects.filter(name__in=tag_name_set)
    #     for tag in tags:
    #         for t in tag.get_ancestors():
    #             tag_name_set.add(t.name)
    #     form.cleaned_data['tags'] = list(tag_name_set)
    #     return super().save_model(request, obj, form, change)


@admin.register(ImageBlock)
class ImageBlockAdmin(admin.ModelAdmin):
    search_fields = ('task__title__icontains', 'task__pk', 'task__uuid', 'number')
