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

Branches starting with different names are for work in progress. Their named like feature-{name}, install-{what is installed or updated?}, fix-{what is fixed?}, test-{what for?} and docs-{what is it about?}.

Once the work is done a pr is required to join the main branch.

## System requirements

Table of the software requirements extracted from the book

| # | Requirement                | Book section |
| - | -------------------- | ------------ |
| 1 | A timer for working and resting intervals                | A.4.3.2      |
| 2 | Calendar to plan goals and objectives | A.4.3.3      |
| 3 | Resource collection for an investigation | B.1.2 |
| 4 | Resume of the resources in the collection | B.2.2.1 |
| 5 | Slip box note system | B.2.2 |
| 6 | Relationship between notes | B.2.2.4 |
| 7 | Practice tracker | B.3.3 |
| 8 | Study activities | B.3.4 |

