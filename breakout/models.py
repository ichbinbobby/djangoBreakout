from django.db import models


# class Upgrades(models.Model):
#     bigBall = models.BooleanField(default=False, null=True)
#     tripleBall = models.BooleanField(default=False, null=True)
#     bigPaddle = models.BooleanField(default=False, null=True)
#  https://docs.djangoproject.com/en/2.1/ref/models/fields/#django.db.models.BooleanField


class Players(models.Model):
    name = models.CharField(max_length=200)
    # upgrades = models.ForeignKey(Upgrades, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Top10(models.Model):
    name = models.ForeignKey(Players, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def show_score(self):
        return self.score



# TODO Daten speichern
# TODO SQLite is included in Python, so you won’t need to install anything else to support your database
