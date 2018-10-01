from django.shortcuts import render

from . import urls


def index(request):

    print("##### VIEW #####")
    print("Request: " + str(request))

    #username = request.POST.get("username")
    #score = request.POST.get("score")

    username = urls.handover['username']
    score = urls.handover['score']

    print(username)
    print(score)

    #new_player = Top10.objects.get(name=username)
    #if new_player.name is None:
    #    new_player.name = username
    #    new_player.score = score
    #   new_player.save()

    # top_ten = Top10.objects.values('name', 'score').order_by('score')

    topTen = {
        'name': username,
        'score': score
    }

    print(topTen)

    context = {
        'topTen': topTen,
        'username': "bla",
        'score': "blub",
    }


    return render(request, 'breakout/index.html', context)
