from rest_framework.viewsets import ModelViewSet

from theme_tree.models import Theme
from theme_tree.serializers import ThemeSerializer
from theme_tree.filters import ThemeFilter


class ThemeViewSet(ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    filterset_class = ThemeFilter
