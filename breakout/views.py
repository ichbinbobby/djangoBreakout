from django.shortcuts import render

from . import urls
from breakout.models import Players, Top10


def index(request):  # view wird beim laden rerendert

    username = urls.data_entry['username']
    score = urls.data_entry['score']

    if player_exists(username):  # why is this true
        # check if he improved his score
        user = Players.objects.get(name=username)
        player = Top10.objects.get(player=user)  # matching query does not exist
        if player.score < score:
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

    top10 = Top10.objects.all()

    # can't output top10 when there is no data

    context = {
        'topTen': top10,
    }

    return render(request, 'breakout/index.html', context)


# get_or_create()
def player_exists(name):

    # Returns True if the QuerySet contains any results
    # with objects.all() queryset is evaluated and exists

    total = Players.objects.count()  # returns 1

    if total > 1:
        players = Players.objects.all()
        if players.filter(name=name).exists():  # this is true
            return True

    return False
