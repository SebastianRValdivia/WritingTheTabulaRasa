# The Software

The project is splited in parts *server side* and *client/s side*.

Back End its lead by [Python](https://www.python.org/) + [Django](https://www.djangoproject.com/) and [REST](https://www.django-rest-framework.org/) Framework.

Front end web app is made in [Vue](https://vuejs.org/) using the [Quasar](https://quasar.dev/) framework. 

And version control is lead by, yes you guess it, [Git](https://git-scm.com/).

To contribute use the standar PR of github method and please read how to write commits titles below.

## Code Review and Guide

Like any software there is a guide of how to contribute to the code. Since the code is all in one repostory, its splited in parts.
Need a guide to know how things work before jumping to the code. Check the guides.

* [Server Guide](Backend/index.md)
* [Lite web site](Lite/index.md)

## How to commit

Its a hard requirement to write commit titles with this initial words. This is used to automate an changelog.
If this condition is not met PR won't pass

| Word      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| Add       | addition to code, new feature, missing method, etc               |
| Fix       | fix of an bug, error or linter warning                           |
| Move      | move/cut or rename a file                                        |
| Delete    | delete useless or buggy code                                     |
| Refactor  | refactor or improve a part of code (does *not* applies to tests) |
| Change    | change or replace a functionality for something else             |
| Create    | start a new module or section                                    |
| Remove    | Delete a module                                                  |
| Test      | add or improve tests (any type)                                  |
| Install   | install or update new dependency                                 |
| Uninstall | uninstall a dependency                                           |

*Start* is reserved to start of the project or a sub-project.

> Note: you can use the comment section of the commit at will.

## System requirements

Table of the software requirements extracted from the book

| Requirement                | Book section |
| -------------------- | ------------ |
| A timer for working and resting intervals                | A.4.3.2      |
| Calendar to plan goals and objectives | A.4.3.3      |
