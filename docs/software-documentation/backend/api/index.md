# Django API
It's the part of the django project that builds the RESTfull API (generally called just api).

## Applications
Django applications for tabula rasa are under the applications/ module (not from the root). Each application got his own api views and urls wich are segregated from the api/ module (which is itself an app too).

The models are serialized in serializers.py to create different types of views. Some are more complete others are more lightweight, to fulfill the use case in the most efficient way. With them we create the views or view sets and list them in api_urls.py (not in urls.py), so it can be imported from the api app.

## The api app
This its more like an layer for creating the urls for the api.

Instead of creating in each app the api urls and lite urls leading to a complex urls.py, we just use this module so they are all include from the urls.py of this app and not locally.

## Testing
Each app tests are organized from it's models to have a more clear structure. The tests secure the basic functionality of the app, also they check the urls are correct and follow the standards.

