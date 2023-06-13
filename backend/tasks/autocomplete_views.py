from dal import autocomplete

from tasks.models import Task


class TaskAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Task.objects.none()

        qs = Task.objects.all()

        if self.q:
            qs = qs.filter(name__icontains=self.q)

        return qs
