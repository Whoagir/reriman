from decouple import config


if config('DJANGO_SETTINGS_MODE') == 'prod':
    from .production import *
else:
    from .development import *
