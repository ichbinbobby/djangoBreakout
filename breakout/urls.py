from django.urls import path
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse


from . import views


data_entry = {
    'username': '',
    'score': None
}


@csrf_exempt
def request_handler(request):

    username = request.POST.get("username")
    score = request.POST.get("score")

    data_entry['username'] = username
    data_entry['score'] = score

    return JsonResponse({
        'username': username,
        'score': score
    })


urlpatterns = [
    path('', views.index, name='index'),
    url('server', request_handler),
]

