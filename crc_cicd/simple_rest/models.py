from django.db import models


class Message(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    message = models.CharField(max_length=500)
