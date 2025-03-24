from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ExpenseViewSet, CategoryViewSet, UserCreateView, UserProfileView, 
    UserListView, UserDeleteView,CustomTokenObtainPairView,CategoryModifyViewSet,StatsViewSet
)

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'categories', CategoryViewSet, basename="category")
router.register(r'admin/categories', CategoryModifyViewSet, basename="admin-category")
router.register(r'stats', StatsViewSet, basename='stats')


urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('users/', UserListView.as_view(), name='user-list'), 
    path('users/<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),  
    path('', include(router.urls)),
    path("stats/user-stats/", StatsViewSet.as_view({'get': 'user_stats'}), name="user-stats"),
    path("stats/admin-trends/", StatsViewSet.as_view({'get': 'admin_trends'}), name="admin-trends"),
    path("stats/user-trends/", StatsViewSet.as_view({'get': 'user_trends'}), name="user-trends"),
    path("stats/", StatsViewSet.as_view({'get': 'list'}), name="admin-stats"), 

    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
