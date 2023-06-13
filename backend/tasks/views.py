from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.views import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

from .models import Task
from .serializers import TaskSerializer, ImageBlockSerializer
from .filters import TaskFilter
from tasks.task_worker import TaskRunner


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filterset_class = TaskFilter
    permission_classes = (AllowAny,)

    @action(detail=True, methods=['post'], serializer_class=ImageBlockSerializer, url_path='save_image_blocks')
    def post_image_blocks(self, request, pk=None):
        task = self.get_object()
        if isinstance(request.data, list):
            serializer = ImageBlockSerializer(data=request.data, many=True)
        else:
            serializer = ImageBlockSerializer(data=request.data)
        if serializer.is_valid():
            task.image_blocks.all().delete()
            serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=['get'], serializer_class=ImageBlockSerializer, url_path='image_blocks')
    def get_image_blocks(self, request, pk):
        task = self.get_object()
        image_blocks = task.image_blocks.all()
        serializer = ImageBlockSerializer(image_blocks, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='generate_data/(?P<user_pk>[^/.]+)')
    def generate_data_for_user(self, request, pk, user_pk):
        task = self.get_object()
        user = get_object_or_404(get_user_model(), pk=user_pk)
        task_runner = TaskRunner(task, user)
        return Response({'data': task_runner.get_data()})

    @action(detail=True, methods=['get'], url_path="generated_image/(?P<user_pk>[^/.]+)")
    def generate_image_for_user(self, request, pk, user_pk):
        task = self.get_object()
        user = get_object_or_404(get_user_model(), pk=user_pk)
        task_runner = TaskRunner(task, user)
        response_image = task_runner.get_image()
        response = HttpResponse(content_type='image/png')
        response_image.save(response, 'png')
        return response
