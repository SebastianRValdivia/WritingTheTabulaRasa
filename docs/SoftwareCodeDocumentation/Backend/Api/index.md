# Django API
Its the part of the django project that builds the api.

## Applications
Django applications for tabula rasa are under the applications/ module (not from the root).

Each application got his own api views and urls wich are subgregated from the api/ module (wich is itself an app too).

## The api app
This its more like an layer for creating the urls for the api. Instead of being created in each app they are all include from urls.py of this app.

## Testing
Each app is tests are organizated from its models to have a more clear structure.

