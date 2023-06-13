from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.routers import router
from accounts.views import RegisterUserAPIView


urlpatterns = [
    path('', include(router.urls)),
    path('register', RegisterUserAPIView.as_view()),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
