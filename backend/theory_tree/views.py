from rest_framework.viewsets import ModelViewSet

from theory_tree.models import TheoryTag
from theory_tree.serializers import TheoryTagSerializer
from theory_tree.filters import TheoryTagFilter


class TheoryTagViewSet(ModelViewSet):
    queryset = TheoryTag.objects.all()
    serializer_class = TheoryTagSerializer
    filterset_class = TheoryTagFilter
