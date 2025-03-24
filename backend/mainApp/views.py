from rest_framework import viewsets, permissions, generics
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Expense, Category,CustomUser
from .serializers import ExpenseSerializer, CategorySerializer, UserSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from django.db.models import Sum, Count

User = get_user_model()


# Custom Token View
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# Custom Permissions
class IsAdminUser(BasePermission):
    """Allow only Admin users to access."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"


class IsOwnerOrAdmin(BasePermission):
    """Allow users to manage only their own expenses. Admins can access all."""
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.role == "admin" or obj.user == request.user


# User Views
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to register

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(email=response.data["email"])
        
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        response.data["refresh"] = str(refresh)
        response.data["access"] = str(refresh.access_token)
        
        return response

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Only Admins can view all users


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Only Admins can delete users

    def perform_destroy(self, instance):
        if instance == self.request.user:
            raise serializers.ValidationError("You cannot delete your own account.")
        instance.delete()


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user  # Users can only access their own profile


# Category Views
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):  
    """Anyone can view categories, but only admins can modify them."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]  # Anyone can view

class CategoryModifyViewSet(viewsets.ModelViewSet):
    """Only Admins can add/edit/delete categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]  

class ExpenseViewSet(viewsets.ModelViewSet):
       serializer_class = ExpenseSerializer
       permission_classes = [IsAuthenticated]

       def get_queryset(self):
           user = self.request.user
           user_email = self.request.query_params.get('user_email', None)

           if user.role == "admin" and user_email:
               return Expense.objects.filter(user__email=user_email)

           return Expense.objects.filter(user=user)  

       def perform_create(self, serializer):
           serializer.save(user=self.request.user)



class AdminExpenseListView(generics.ListAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAdminUser]  

    def get_queryset(self):
        return Expense.objects.all() 


class StatsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        """Returns summary statistics for Admins."""
        if request.user.role != "admin":
            return Response({"error": "Unauthorized"}, status=403)

        total_users = CustomUser.objects.count()
        total_expenses = Expense.objects.count()
        total_categories = Category.objects.count()
        total_spent = Expense.objects.aggregate(total_spent=Sum('amount'))['total_spent'] or 0

        return Response({
            "total_users": total_users,
            "total_expenses": total_expenses,
            "total_categories": total_categories,
            "total_spent": total_spent
        })

    def user_stats(self, request):
        """Returns user-specific statistics."""
        user_expenses = Expense.objects.filter(user=request.user).count()
        user_spent = Expense.objects.filter(user=request.user).aggregate(total_spent=Sum('amount'))['total_spent'] or 0

        return Response({
            "user_expenses": user_expenses,
            "user_spent": user_spent
        })

    def admin_trends(self, request):
        """Returns expense trends for Admins with user-wise breakdown."""
        if request.user.role != "admin":
            return Response({"error": "Unauthorized"}, status=403)

        user_expenses = Expense.objects.values('user__email', 'date').annotate(
            total_spent=Sum('amount'),
            total_expenses=Count('id')  
        ).order_by('date')

        formatted_data = {}
        for entry in user_expenses:
            email = entry['user__email']
            if email not in formatted_data:
                formatted_data[email] = {"dates": [], "amounts": [], "total_expenses": []}
            formatted_data[email]["dates"].append(entry['date'])
            formatted_data[email]["amounts"].append(entry['total_spent'])
            formatted_data[email]["total_expenses"].append(entry['total_expenses'])

        return Response(formatted_data)


    def user_trends(self, request):
        """Returns expense trends for individual users."""
        data = Expense.objects.filter(user=request.user).values('date').annotate(
            total_spent=Sum('amount'),
            total_expenses=Count('id')  
        ).order_by('date')

        return Response({
            "dates": [entry['date'] for entry in data],
            "amounts": [entry['total_spent'] for entry in data],
            "total_expenses": [entry['total_expenses'] for entry in data]  
        })
