# Generated by Django 5.2 on 2025-04-17 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('on_going', 'On Going'), ('completed', 'Completed')], default='on_going', max_length=20),
        ),
    ]
