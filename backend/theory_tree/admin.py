from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse
from treebeard.admin import TreeAdmin

from theory_tree.models import TheoryTag
from taggit.admin import Tag


admin.site.unregister(Tag)


@admin.register(TheoryTag)
class TheoryTagAdmin(TreeAdmin):
    change_list_template = 'tasks/admin/tag_changelist.html'
    change_form_template = 'tasks/admin/tag_changeform.html'

    def response_change(self, request, obj: TheoryTag):
        if '_add_child' in request.POST:
            child = obj.add_child(name=f'child of {obj.name} #{obj.get_children_count()+1}')
            child_url = reverse(f'admin:{child._meta.app_label}_{child._meta.model_name}_change', args=(child.id,))
            return HttpResponseRedirect(child_url)
        return super().response_change(request, obj)
