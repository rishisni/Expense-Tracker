# Generated by Django 5.1.7 on 2025-03-24 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0003_alter_customuser_options_alter_customuser_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='name',
            field=models.CharField(default='Test Name', max_length=255),
            preserve_default=False,
        ),
    ]
