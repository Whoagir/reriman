from dal import autocomplete
from django import forms

from tasks.models import Task


class TaskAdminForm(forms.ModelForm):
    disabled_fiedls = ()

    class Meta:
        model = Task
        fields = '__all__'
        widgets = {
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.disabled_fiedls:
            self.fields[field].disabled = True
