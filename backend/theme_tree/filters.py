from django.db.models import Q
from django_filters import FilterSet, CharFilter

from theme_tree.models import Theme


class ThemeFilter(FilterSet):
    q = CharFilter(method='q_filter', label='search')

    class Meta:
        model = Theme
        fields = {
            'id': ['icontains'],
            'name': ['icontains']
        }

    def q_filter(self, queryset, name, value):
        return queryset.filter(
            Q(id__icontains=value) |
            Q(name__icontains=value)
        )
