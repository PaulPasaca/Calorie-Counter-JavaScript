from django.http import HttpResponse
from django.template import loader


def inicio(request):
  template = loader.get_template('inicio.html')
  return HttpResponse(template.render())