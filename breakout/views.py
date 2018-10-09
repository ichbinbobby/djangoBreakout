from django.shortcuts import render

from . import urls
from breakout.models import Players, Top10


def index(request):

    try:
        top10 = Top10.objects.all().order_by('-score')[:10]
    except:
        print("Queryset is empty")
        top10 = {}

    context = {
        'topTen': top10,
    }

    return render(request, 'breakout/index.html', context)
