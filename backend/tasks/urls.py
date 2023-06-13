from django.urls import path, include
from rest_framework import routers

from tasks.views import TaskViewSet
from tasks.autocomplete_views import TaskAutocomplete


router = routers.SimpleRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('task-autocomplete/', TaskAutocomplete.as_view(), name='task-autocomplete'),
]
