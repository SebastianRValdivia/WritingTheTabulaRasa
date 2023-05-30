# The Software

The project is splited in parts *server side* and *client/s side*.

Back End its lead by [Python](https://www.python.org/) + [Django](https://www.djangoproject.com/) and [REST](https://www.django-rest-framework.org/) Framework.

Front end web app is made in [Vue](https://vuejs.org/) using the [Quasar](https://quasar.dev/) framework. 

And version control is lead by, yes you guess it, [Git](https://git-scm.com/).

To contribute use the standar PR of github method and please read how to write commits titles below.

## Code Review and Guide

Like any software there is a guide of how to contribute to the code. Since the code is all in one repository, its separated in parts.

Need a guide to know how things work before jumping to the code? Check the each (or all).

* [Server Guide](Backend/index.md)
* [Lite web site](Lite/index.md)
* [Client guide](Client/index.md)

### Documentation

The documentation of the code (not the software) is split in hierarchy level. Each part is contained inside the folders in a README markdown file. In this files we describe the functions of the module along each file or subfolder inside. Lets avoid long and unformatted comments. Comments are only used to describe very specific parts or steps inside a file.

## How to commit

Its a hard requirement to write commit titles with this initial words. This is used to automate an changelog.
If this condition is not met PR won't pass.

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

### Branches naming convention

The most important branches are: main (development head) and release-{number} (supported releases). All branches use hyphens as word separators.

Branches starting with different names are for work in progress. Their named like 
  
- feature-{name}
- install-{what is installed or updated?} 
- fix-{what is fixed?}
- refactor-{what is being redone?}
- test-{what for?}
- docs-{what is it about?}.

Once the work is done a pr is required to join the main branch.

## System requirements

Table of the software requirements extracted from the book

| # |  Requirement                | Book section |
| - | --------------------------- | ------------ |
| 1 | A timer for working and resting intervals | A.4.3.2      |
| 2 | Calendar to plan goals and objectives | A.4.3.3      |
| 3 | Resource collection for an investigation | B.1.2 |
| 4 | Resume of the resources in the collection | B.2.2.1 |
| 5 | Slip box note system | B.2.2 |
| 6 | Relationship between notes | B.2.2.4 |
| 7 | Practice tracker | B.3.3 |
| 8 | Study activities | B.3.4 |
| 9 | Memorization activities | B.4.1 |
| 10 | Quizzes | B.4.2.1.1 |
| 11 | Flash cards | B.4.2.1.2 |
| 12 | Projects | B.4.2.2 |
| 13 | Diagrams | C.2.1 |
| 14 | Images | C.2.2 |
| 14 | Tables | C.2.3 |
| 15 | Encyclopedia (wiki) | C.3.1 |
| 16 | Cheat sheets | C.3.2 |
| 17 | How to guides | C.3.3 |
| 18 | Essays | C.3.4 |
| 19 | Bibliography references | C.3.5 |
| 20 | Catalogs of the literary resources | C.4.1.1.2 |
| 21 | Custom metadata | C.4.3 |
| 22 | Categorization and relationships between resources | C.4.5 |

### User stories

The development of WTR is linear, however user stories are great to describe the required process of an user action. Also, they are used to define the functional tests.

The complete list of user stories can be found [here](UserStories/index.md)

### How to run development mode

#### How to run django back end

A docker-compose file is ready to go in the server folder, set to use postgres.
