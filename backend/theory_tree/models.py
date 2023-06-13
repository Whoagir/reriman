from taggit.models import TagBase
from treebeard.mp_tree import MP_Node


class TheoryTag(TagBase, MP_Node):
    node_order_by = ['name']

    class Meta:
        verbose_name = 'Тег теории'
        verbose_name_plural = 'Теги теории'
