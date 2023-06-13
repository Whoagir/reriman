from .base import *


DEBUG = True

ALLOWED_HOSTS = config('DJANGO_ALLOWED_HOSTS', default='127.0.0.1', cast=Csv())


CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True


INSTALLED_APPS += [
    'debug_toolbar'
]

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEBUG_TOOLBAR_CONFIG = {
    'JQUERY_URL': '',
}


TASK_WORKER_EDITOR_URL = 'http://localhost:8080/editor/'
