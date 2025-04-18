from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('on_going', 'On Going'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=255)
    created_time = models.TimeField(auto_now_add=True)   # waktu saat dibuat
    created_date = models.DateField(auto_now_add=True)   # tanggal saat dibuat
    updated_at = models.DateTimeField(auto_now=True)     # update terakhir
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='on_going')

    def __str__(self):
        return f"{self.title} - {self.status}"
