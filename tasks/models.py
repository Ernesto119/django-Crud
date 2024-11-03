from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=300, blank=False, null=False)
    date = models.DateField(auto_now=True)
    status = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
