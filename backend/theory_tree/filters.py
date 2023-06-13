from django.db.models import Q
from django_filters import FilterSet, CharFilter

from theory_tree.models import TheoryTag


class TheoryTagFilter(FilterSet):
    q = CharFilter(method='q_filter', label='search')

    class Meta:
        model = TheoryTag
        fields = {
            'id': ['icontains'],
            'name': ['icontains']
        }

    def q_filter(self, queryset, name, value):
        return queryset.filter(
            Q(id__icontains=value) |
            Q(name__icontains=value)
        )
