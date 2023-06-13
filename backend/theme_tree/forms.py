from django import forms
from dal import autocomplete

from theme_tree.models import Theme


class ThemeForm(forms.ModelForm):
    class Meta:
        model = Theme
        fields = '__all__'
        widgets = {
            'theory_tags': autocomplete.Select2Multiple(url='theory-autocomplete'),
            'tasks': autocomplete.Select2Multiple(url='task-autocomplete')
        }
