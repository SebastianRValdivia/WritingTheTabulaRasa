# Web application module

This part is created to serve the web app from build from the client directly from the django system (to avoid nesting with a web server). The urls.py uses the **webapp** route to serve the client and separate it from the lite version and the api.

On build the index.html goes into webapp/templates/webapp/index.html . The remaining files will be store in webapp/staticfiles/
