# Backend

The back end is build with Django with the rest framework. It's objective is to serve as the controller of the data and serve the web app along a lite version of the site.

Each django application contains two main parts the api and the lite version. The api is build using the rest framework and gives the endpoints to manipulate the models. The lite version is build to provide the users a lightweight view, is build using the standard Model-View-Controller provided by the django web framework.

## Structure

The root structure is organized as it follows

- api/ It's the root for the management of the api urls.
- applications/ Contains the logic of the site, each module is a django app.
- config/ Index of the configuration of the back end.
- user/ Django application for specific user control.
- webapp/ App to serve the build of the client.
- manage.py Main module to run django commands.

The poetry.lock, pyproject.toml, requirements.txt are files to control the dependencies of the python virtual environment.

Refer to the README.md file in each module to learn more about it.
