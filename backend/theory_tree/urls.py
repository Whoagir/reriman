from django.urls import path, include
from rest_framework import routers

from theory_tree.autocomplete_views import TheoryTagAutocomplete
from theory_tree.views import TheoryTagViewSet


router = routers.SimpleRouter()
router.register(r'theory_tags', TheoryTagViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('theory-autocomplete/', TheoryTagAutocomplete.as_view(), name='theory-autocomplete'),
]
