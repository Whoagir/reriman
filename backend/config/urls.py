from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


def index_view(request):
    return redirect('swagger-ui')


urlpatterns = [
    path('api/', index_view),
    path('api/', include('tasks.urls')),
    path('api/', include('theory_tree.urls')),
    path('api/', include('theme_tree.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]


if settings.DEBUG:
    urlpatterns += [path('__debug__/', include('debug_toolbar.urls'))]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

