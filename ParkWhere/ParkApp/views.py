from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
import requests

from .models import Choice, Question


class IndexView(generic.ListView):
    template_name = 'ParkApp/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'ParkApp/detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'ParkApp/results.html'

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'ParkApp/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('ParkApp:results', args=(question.id,)))
    
def testAPIcall(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    users = response.json()
    print(users)
    return render(request, "ParkApp/test.html", {'users': users})


def receiveURAdata(request):
    response = requests.get('http://localhost:8080/https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details',
                                headers= {
                                    'AccessKey': '2a097165-1ba0-4a44-9d9e-4a7b2586322b',
                                    'Token': '4rDjwk9-h-24VBtb42aWqf1-9KbSD0ks6Mfha7p2t4--9aKa-B045784tCb90U4CRqX9d76C2bG77D92d8--C-x@-2U4WGfZ6549',
                                }
                            )
    print(response)
    print(response.text)
    #TODO: response returned is in HTML? https://stackoverflow.com/questions/52488117/python-requests-randomly-breaks-with-jsondecodeerror
    #TODO: cannot load json content from this GET request
    URAdata = response.json()
    return render(request, "ParkApp/carparks.html", {'carparks': URAdata})