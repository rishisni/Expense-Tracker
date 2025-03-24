from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Expense, Category, CustomUser

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["role"] = self.user.role  
        return data

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "email", "phone_number", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            phone_number=validated_data.get("phone_number", ""),
            role=validated_data.get("role", "user"),
        )
        return user

class ExpenseSerializer(serializers.ModelSerializer):
    category = serializers.CharField()  

    class Meta:
        model = Expense
        fields = ['id', 'name', 'category', 'amount', 'description', 'date']  # Added name field

    def validate_category(self, value):
        """Convert category name to category ID"""
        try:
            category = Category.objects.get(name=value)
            return category
        except Category.DoesNotExist:
            raise serializers.ValidationError("Category not found. Please provide a valid category name.")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


