from typing import Dict, Any

from django.urls import path
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import time

from . import views
from breakout.models import Top10, Players

handover = {
    'username': 'Kein Eintrag',
    'score': '0 Punkte'
}
print("Uebergeben an die view:", handover)

@csrf_exempt
def request_handler(request):
    print("test request: " + str(request))

    username = request.POST.get("username")
    score = request.POST.get("score")

    handover['username'] = username
    handover['score'] = score

    time.sleep(2)
    # this.responseText
    return JsonResponse({
        'username': username,
        'score': score
    })

urlpatterns = [
    path('', views.index, name='index'),
    url('server', request_handler),
]

