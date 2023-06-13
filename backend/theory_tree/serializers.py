from rest_framework import serializers

from theory_tree.models import TheoryTag


class TheoryTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TheoryTag
        fields = '__all__'
