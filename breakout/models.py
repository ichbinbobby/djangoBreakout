from django.db import models


class Top10(models.Model):
    name = models.CharField(max_length=200)
    score = models.IntegerField(default=0)

# TODO Daten speichern
# TODO SQLite is included in Python, so you won’t need to install anything else to support your database
