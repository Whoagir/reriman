from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse
from treebeard.admin import TreeAdmin

from theme_tree.forms import ThemeForm
from theme_tree.models import Theme


@admin.register(Theme)
class ThemeAdmin(TreeAdmin):
    form = ThemeForm
    change_list_template = 'tasks/admin/tag_changelist.html'
    change_form_template = 'tasks/admin/tag_changeform.html'

    def response_change(self, request, obj: Theme):
        if '_add_child' in request.POST:
            child = obj.add_child(name=f'child of {obj.name} #{obj.get_children_count() + 1}')
            child_url = reverse(f'admin:{child._meta.app_label}_{child._meta.model_name}_change', args=(child.id,))
            return HttpResponseRedirect(child_url)
        if '_add_bro' in request.POST:
            parent = obj.get_parent()
            child = parent.add_child(name=f'child of {parent.name} #{parent.get_children_count() + 1}')
            child_url = reverse(f'admin:{child._meta.app_label}_{child._meta.model_name}_change', args=(child.id,))
            return HttpResponseRedirect(child_url)
        return super().response_change(request, obj)
