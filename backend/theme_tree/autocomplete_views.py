from dal import autocomplete

from theme_tree.models import Theme


class ThemeAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Theme.objects.none()
        qs = Theme.objects.all()
        if self.q:
            qs = qs.filter(name__icontains=self.q)
        return qs
