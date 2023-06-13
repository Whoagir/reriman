from django.urls import path, include
from rest_framework import routers

from theme_tree.autocomplete_views import ThemeAutocomplete
from theme_tree.views import ThemeViewSet


router = routers.SimpleRouter()
router.register(r'themes', ThemeViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('theme-autocomplete', ThemeAutocomplete.as_view(), name='theme-autocomplete')
]
