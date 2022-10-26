from django.views.generic import TemplateView

# Create your views here.
class WebappView(TemplateView):
    template_name = "webapp/index.html"
