from rest_framework.serializers import ModelSerializer

from theme_tree.models import Theme


class ThemeSerializer(ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'
