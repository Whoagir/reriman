from rest_framework import serializers
from taggit.serializers import TaggitSerializer, TagListSerializerField
from .models import Task, ImageBlock


class ImageBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageBlock
        fields = ['number', 'x', 'y', 'width', 'height', 'task']


class TaskSerializer(TaggitSerializer, serializers.ModelSerializer):
    # image_blocks = ImageBlockSerializer()

    class Meta:
        model = Task
        fields = ['pk', 'title', 'image']
