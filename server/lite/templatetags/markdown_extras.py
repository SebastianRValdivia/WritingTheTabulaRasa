from django import template
from django.template.defaultfilters import stringfilter
import markdown as render

register = template.Library()

@register.filter()
@stringfilter
def render_markdown(value):
    return render.markdown(value, extensions=['markdown.extensions.fenced_code'])
