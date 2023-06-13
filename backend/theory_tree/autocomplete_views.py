from dal import autocomplete

from theory_tree.models import TheoryTag


class TheoryTagAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return TheoryTag.objects.none()

        qs = TheoryTag.objects.all()

        if self.q:
            qs = qs.filter(name__icontains=self.q)

        return qs
