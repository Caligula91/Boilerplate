# Boilerplate

### Prerequisites

[NodeJs](https://nodejs.org) `>= 18.12.1`

[npmjs](https://www.npmjs.com/) `>= 8.19.3`

[nodemon](https://nodemon.io/) `>= 2.0.0`

[git](https://git-scm.com/downloads) `>= 2.24.0`

[mongodb](https://www.mongodb.com) `>= 5.0`

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
mkdir $HOME/Projects
cd $HOME/Projects
git clone git@github.com:30hills/Boilerplate.git
cd Boilerplate
npm install
```

If you are unable to clone the project you might not have associated ssh keys with your github account,
to do that, click [here](https://github.com/settings/keys),
if you don't own any keys, tutorial on how to do that is[here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git checkout development
git pull origin development
git checkout -b feature/featureName
```

after finishing the task

```shell
git add -A
git commit -m 'Message here (VERSION)'
git push origin feature/featureName
```

## Versioning

`MAJOR` version when you make incompatible API changes,

`MINOR` version when you add functionality in a backwards-compatible manner, and

`PATCH` version when you make backwards-compatible bug fixes.

## Configuration

To run a project in a `development` environment run

```shell
npm start
```

Do note that `development.env` file must be present in order to run the project.

## Tests

To run API related tests run

```shell
npm test
```

Do not push code that fails to pass all the tests.

## Style guide

- use kebab-case for URLs.

- use camelCase for parameters in the query string or resource fields.

- use plural kebab-case for resource names in URLs.

- Always use a plural nouns for naming a url pointing to a collection: `/users`.

- Only use nouns in your resource URLs, avoid endpoints like /addNewUser or /updateUser . Also avoid sending resource operations as a parameter.

Explain the CRUD functionalities using HTTP methods:

_How:_
- `GET`: To retrieve a representation of a resource.
- `POST`: To create new resources and su-resources.
- `PUT`: To update existing resources.
- `PATCH`: To update existing resources. It only updates the fields that were supplied, leaving the others alone.
- `DELETE`:	To delete existing resources.


This is a natural way to make resources explorable.

_How:_
- `GET /school/2/student`, should get the list of all students from school 2.
- `GET /school/2/student/31`, should get the details of student 31, which belongs to school 2.
- `DELETE /school/2/student/31`, should delete student 31, which belongs to school 2.
- `PUT /school/2/student/31`, should update info of student 31, Use PUT on resource-URL only, not collection.
- `POST /school`, should create a new school and return the details of the new school created. Use POST on collection-URLs.

## Guidelines

- Prefer ES6 syntax
- At least 1 test per feature
- All scripts that need to be run on the server are to be placed in `/scripts` folder

## Database

- [MongoDB](https://www.mongodb.com) - version 5.0 and above
