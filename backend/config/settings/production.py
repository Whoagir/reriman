from .base import *


DEBUG = False

ALLOWED_HOSTS = config('DJANGO_ALLOWED_HOSTS', default='127.0.0.1', cast=Csv())


CORS_ORIGIN_ALLOW_ALL = True


# CORS_ALLOWED_ORIGINS = [
#     "http://178.21.8.81",
#     "http://localhost"
# ]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD')
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT', cast=int)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True

STATIC_ROOT = BASE_DIR / 'static'
