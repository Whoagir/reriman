from django_filters import FilterSet, CharFilter
from django.db.models import Q
from .models import Task


class TaskFilter(FilterSet):
    q = CharFilter(method="q_filter", label="Search")

    class Meta:
        model = Task
        fields = {
            'id': ['icontains'],
            'title': ['icontains']
        }

    def q_filter(self, queryset, name, value):
        return queryset.filter(
            Q(id__icontains=value) |
            Q(title__icontains=value)
        )[:5]
