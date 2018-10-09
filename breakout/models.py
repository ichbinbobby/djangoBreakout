from django.db import models


class Players(models.Model):
    name = models.CharField(primary_key=True, max_length=200)

    def __str__(self):
        return self.name


class Top10(models.Model):
    player = models.ForeignKey(Players, on_delete=models.CASCADE)
    score = models.IntegerField(default=0, null=True)

    def show_score(self):
        return self.score



# TODO Daten speichern
# TODO SQLite is included in Python, so you won’t need to install anything else to support your database
