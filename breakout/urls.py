from django.urls import path
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse


from . import views
from breakout.models import Players, Top10


@csrf_exempt
def request_handler(request):

    # get ablehnen und post annehmen, request.method
    # post request direkt abschicken zum testen
    # poster extension in chrome

    username = request.POST.get("username")
    score = request.POST.get("score")

    if player_exists(username):
        # check if he improved his score
        user = Players.objects.get(name=username)
        player = Top10.objects.get(player=user)
        if player.score < int(score):
            player.score = score
            player.save()
    else:
        new_player = Players(name=username)
        new_player.save()
        new_entry = Top10.objects.create(
            player=new_player,
            score=score
        )
        new_entry.save()

    return JsonResponse({
        'username': username,
        'score': score
    })


urlpatterns = [
    path('', views.index, name='index'),
    url('server', request_handler),
]


def player_exists(name):

    # Returns True if the QuerySet contains any results
    # with objects.all() queryset is evaluated and exists

    total = Players.objects.count()  # returns 1, because of the empty data_entry

    if total > 0:
        players = Players.objects.all()
        if players.filter(name=name).exists():  # this is true
            return True

    return False

