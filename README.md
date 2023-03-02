# Communify Server

<!-- badges -->

[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/mit-license.php)
[![GitHub latest commit](https://img.shields.io/github/last-commit/C0mmunify/Communify-server.svg)](https://github.com/C0mmunify/Communify-server)
[![GitHub contributors](https://img.shields.io/github/contributors/C0mmunify/Communify-server.svg)](https://github.com/C0mmunify/Communify-server)

Welcome to the server repository for the Communify App!

## Table of Contents

-   [Installation & Usage](#installation--usage)
-   [Technologies](#technologies)
-   [Database Schema](#database-schema)
-   [Routes](#routes)

# Installation

-   Clone the repo
-   Navigate to the `/Communify-server/server` folder
-   Run `npm i` to install dependencies
-   Navigate back to the `/Communify-server` folder to run bash scripts

# Local Usage

### Setting up the Environment

Before running any scripts you must create a `.env` file within the `server` directory.

In this file you must store the following:

-   `HMAC_SECRET=<Set to any value you want>`
-   `DEV_DB_CONNECTION_STRING=postgres://<username>:<password>@ep-proud-block-401871.eu-central-1.aws.neon.tech/neondb`

**Note:** To get DB credentials, please contact a collaborator.

### Running the Server

Set the environment variable `ENVIRONMENT=dev`.

`cd server && npm start`

-   Host the server locally on port 3000.

### Running Test Suites

Set the environment variable `ENVIRONMENT=test`.

`bash _scripts/test.sh`

-   Starts api & db services
-   Runs db migrations
-   Attaches to api container and triggers full test run
-   No ports mapped to local host

`bash _scripts/coverage.sh`

-   Starts api & db services
-   Runs db migrations
-   Attaches to api container and triggers full test coverage run
-   No ports mapped to local host

`bash _scripts/stop.sh`

-   Stops all running services

`bash _scripts/teardown.sh`

-   Stops all running services
-   Removes containers
-   Removes volumes

**Note:** Press `Ctrl` + `C` to terminate a docker container.

# Deployment

The server is hosted on Render. We have instances configured for each environment to enable our continous development.

Dev domain: `communify-server-dev.onrender.com`

Prod domain: `communify-server.onrender.com`

We are hosting a postgresql database on Neon. We have two databases, one development instance and one production instance.

Dev DB: `postgres://<user>:<pswd>@ep-proud-block-401871.eu-central-1.aws.neon.tech/neondb`

Prod DB: `postgres://<user>:<pswd>n@ep-divine-rain-338764.eu-central-1.aws.neon.tech/neondb`

### Technologies Used

-   [Node.js 🔗](https://nodejs.org/)
-   [Express 🔗](https://expressjs.com/)
-   [Docker 🔗](https://docker.com/)
-   [Jest 🔗](https://jestjs.io/)
-   [PostgreSQL 🔗](https://www.postgresql.org/)
-   [Render 🔗](https://render.com/)
-   [Neon 🔗](https://neon.tech/)

# Routes

## Auth Routes

| **URL**                 | **HTTP Verb** | **Action**     |
| ----------------------- | ------------- | -------------- |
| /auth/register          | POST          | authentication |
| /auth/login             | POST          | authentication |
| /auth/password/:user_id | PATCH         | update         |

#### POST /auth/register

Example request:

```json
{
    "name": "Jeremy Lycnh",
    "email": "swaz_tekkers@email.com",
    "age": 16,
    "council": "My council",
    "admin": false,
    "password": "AbsoluteTopBinz123"
}
```

Example response:

```json
{
    "id": 1,
    "name": "Jeremy Lycnh",
    "email": "swaz_tekkers@email.com",
    "phone": 1234567890,
    "age": 16,
    "council": "My council",
    "profile_image": "<file>",
    "admin": false
}
```

#### POST /auth/login

Example request:

```json
{
    "email": "swaz_tekkers@email.com",
    "password": "AbsoluteTopBinz123"
}
```

Example response:

```json
{
    "success": true,
    "Bearer": "<JWT access token>"
}
```

#### PATCH /auth/password/:user_id

Example request:

```json
{
    "old_password": "AbsoluteTopBinz123",
    "new_password": "CrossbarFirstTime456",
    "confirm_password": "CrossbarFirstTime456"
}
```

Example response:

```json
{
    "message": "Password updated."
}
```

## User Routes

| **URL**                                      | **HTTP Verb** | **Action** |
| -------------------------------------------- | ------------- | ---------- |
| /users/                                      | GET           | index      |
| /users/:user_id                              | GET           | show       |
| /users/user_name/:user_name                  | GET           | show       |
| /users/:user_id/events/created               | GET           | show       |
| /users/user_name/:user_name/events/attending | GET           | show       |
| /users/:user_id                              | PATCH         | update     |
| /users/:user_id                              | DELETE        | destroy    |

#### GET /users/

```json
[
    {
        "id": 1,
        "name": "Jeremy Lycnh",
        "email": "swaz_tekkers@email.com",
        "phone": 1234567890,
        "age": 16,
        "council": "My council",
        "profile_image": "<file>",
        "admin": false
    },
    ...
]
```

#### GET /users/:user_id or /users/user_name/:user_name

```json
{
    "id": 1,
    "name": "Jeremy Lycnh",
    "email": "swaz_tekkers@email.com",
    "phone": 1234567890,
    "age": 16,
    "council": "My council",
    "profile_image": "<file>",
    "admin": false
}
```

#### /users/:user_id/events/created

```json
[
    {
        "id": 1,
        "title": "Bash at my gaff",
        "description": "This is an invite to a bash at my gaff!",
        "location": "My house",
        "council": "My council",
        "creator_id": 1,
        "spaces_total": 4,
        "spaces_remaining": 2,
        "date_created": "2023-02-22T18:00:00.000Z",
        "date_occuring": "2023-03-14T11:00:00.000Z",
        "date_ending": "2023-03-14T14:30:00.000Z"
    },
    ...
]
```

#### GET /users/user_name/:user_name/events/attending

```json
[
    {
        "id": 1,
        "title": "Bash at my gaff",
        "description": "This is an invite to a bash at my gaff!",
        "location": "My house",
        "council": "My council",
        "creator_id": 1,
        "spaces_total": 4,
        "spaces_remaining": 2,
        "date_created": "2023-02-22T18:00:00.000Z",
        "date_occuring": "2023-03-14T11:00:00.000Z",
        "date_ending": "2023-03-14T14:30:00.000Z"
    },
    ...
]
```

#### PATCH /users/:user_id

Example request:

```json
{
    "name": "Jeremy Lynch"
}
```

Example response:

```json
{
    "id": 1,
    "name": "Jeremy Lynch",
    "email": "swaz_tekkers@email.com",
    "phone": 1234567890,
    "age": 16,
    "council": "My council",
    "profile_image": "<file>",
    "admin": true
}
```

## Event Routes

| **URL**                              | **HTTP Verb** | **Action**     |
| ------------------------------------ | ------------- | -------------- |
| /events/                             | GET           | index          |
| /events/:event_id                    | GET           | show           |
| /events/event_title/:event_title     | GET           | show           |
| /events/                             | POST          | create         |
| /events/:event_id                    | PATCH         | update         |
| /events/:event_id                    | DELETE        | destroy        |
| /events/:event_id/attendees          | GET           | show           |
| /events/:event_id/attendees          | POST/PATCH    | edit/update    |
| /events/:event_id/attendees/:user_id | PATCH/DELETE  | update/destroy |

#### GET /events/

```json
[
    {
        "id": 1,
        "title": "Bash at my gaff",
        "description": "This is an invite to a bash at my gaff!",
        "location": "My house",
        "council": "My council",
        "creator_id": 1,
        "spaces_total": 4,
        "spaces_remaining": 2,
        "date_created": "2023-02-22T18:00:00.000Z",
        "date_occuring": "2023-03-14T11:00:00.000Z",
        "date_ending": "2023-03-14T14:30:00.000Z"
    },
    ...
]
```

#### GET /events/:event_id or /events/event_title/:event_title

```json
{
    "id": 1,
    "title": "Bash at my gaff",
    "description": "This is an invite to a bash at my gaff!",
    "location": "My house",
    "council": "My council",
    "creator_id": 1,
    "spaces_total": 4,
    "spaces_remaining": 2,
    "date_created": "2023-02-22T18:00:00.000Z",
    "date_occuring": "2023-03-14T11:00:00.000Z",
    "date_ending": "2023-03-14T14:30:00.000Z"
}
```

#### POST /events/

Example request:

```json
{
    "title": "Bash at my gaff",
    "description": "This is an invite to a bash at my gaff!",
    "location": "My house",
    "council": "My council",
    "creator_id": 1,
    "spaces_total": 4,
    "spaces_remaining": 2,
    "date_occuring": "2023-03-14T11:00:00.000Z",
    "date_ending": "2023-03-14T14:30:00.000Z"
}
```

Example Response:

```json
{
    "id": 1,
    "title": "Bash at my gaff",
    "description": "This is an invite to a bash at my gaff!",
    "location": "My house",
    "council": "My council",
    "creator_id": 1,
    "spaces_total": 4,
    "spaces_remaining": 2,
    "date_created": "2023-02-22T18:00:00.000Z",
    "date_occuring": "2023-03-14T11:00:00.000Z",
    "date_ending": "2023-03-14T14:30:00.000Z"
}
```

#### PATCH /events/:event_id

Example request:

```json
{
    "title": "Change of plans. We're going to the park instead."
}
```

Example response:

```json
{
    "id": 1,
    "title": "Bash at my gaff",
    "description": "Change of plans. We're going to the park instead.",
    "location": "My house",
    "council": "My council",
    "creator_id": 1,
    "spaces_total": 4,
    "spaces_remaining": 2,
    "date_created": "2023-02-22T18:00:00.000Z",
    "date_occuring": "2023-03-14T11:00:00.000Z",
    "date_ending": "2023-03-14T14:30:00.000Z"
}
```

#### GET /events/:event_id/attendees

```json
{
    "id": 1,
    "title": "Bash at my gaff",
    "description": "Change of plans. We're going to the park instead.",
    "location": "My house",
    "council": "My council",
    "creator_id": 1,
    "spaces_total": 4,
    "spaces_remaining": 2,
    "date_created": "2023-02-22T18:00:00.000Z",
    "date_occuring": "2023-03-14T11:00:00.000Z",
    "date_ending": "2023-03-14T14:30:00.000Z",
    "attendees": [
        {
            "id": 1,
            "name": "Jeremy Lynch",
            "email": "swaz_tekkers@email.com",
            "phone": 1234567890,
            "age": 16,
            "council": "My council",
            "profile_image": "<file>",
            "admin": true
        },
        {
            "id": 4,
            "name": "Billy Wingrove",
            "email": "veryhigh_fade@email.com",
            "phone": null,
            "age": 23,
            "council": "My council",
            "profile_image": null,
            "admin": true
        }
    ]
}
```

#### POST /events/:event_id/attendees

Example request:

```json
{
    "user_id": 2
}
```

# Database Schema

## Users

```sql
CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(50),
    phone varchar(50),
    age int NOT NULL,
    council varchar(100),
    profile_image varchar(1000),
    admin boolean
);

CREATE TABLE auth (
    user_id int,
    password_digest varchar(100) NOT NULL
);
```

##### Users table example

```json
{
    "id": 1,
    "name": "Jeremy Lynch",
    "email": "swaz_tekkers@email.com",
    "phone": 1234567890,
    "age": 16,
    "council": "My council",
    "profile_image": "<file>",
    "admin": false
}
```

##### Auth table example

```json
{
    "user_id": 1,
    "password_digest": "$2y$10$HpbmHhw4N8GbeOGZtE8Kz.O3EIqtAJ0AAYBTXXndZbn4DhXLwiqzK"
}
```

## Events

```sql
CREATE TABLE events (
    id serial PRIMARY KEY,
    title varchar(50) NOT NULL,
    description varchar(1000),
    location varchar(255),
    council varchar(100),
    creator_id int,
    image varchar(1000),
    spaces_total int,
    spaces_remaining int,
    date_created timestamp,
    date_occurring timestamp,
    date_ending timestamp,
);

CREATE TABLE event_comments (
    id serial PRIMARY KEY,
    content varchar(255) NOT NULL,
    event_id int NOT NULL,
    date_created timestamp,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE attendees (
    id serial PRIMARY KEY,
    user_id int,
    event_id int,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);
```

**Note:** Dates are stored in [ISO 8601 format](https://tc39.es/ecma262/#sec-date-time-string-format).

##### Events table example:

```json
{
    "id": 1,
    "title": "Bash at my gaff",
    "description": "This is an invite to a bash at my gaff!",
    "location": "My house",
    "council": "My council",
    "creator_id": 1,
    "spaces_total": 4,
    "spaces_remaining": 2,
    "date_created": "2023-02-22T18:00:00.000Z",
    "date_occuring": "2023-03-14T11:00:00.000Z",
    "date_ending": "2023-03-14T14:30:00.000Z"
}
```

##### Comments table example

```json
{
    "id": 1,
    "content": "Oi oi, I'll bring a footy.",
    "creator_id": 2,
    "event_id": 1,
    "date_created": "2023-02-22T18:04:34.000Z"
}
```

##### Attendees table example

```json
{
    "id": 1,
    "user_id": 2,
    "event_id": 1
}
```
