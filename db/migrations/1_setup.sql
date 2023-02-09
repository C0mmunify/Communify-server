DROP TABLE IF EXISTS council;

CREATE TABLE council (
    id serial PRIMARY KEY,
    area varchar(50) NOT NULL
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(50),
    phone varchar(50),
    age int NOT NULL,
    council_id int,
    admin boolean
);

DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id serial PRIMARY KEY,
    title varchar(50) NOT NULL,
    description varchar(1000),
    location varchar(255),
    council_id int,
    creator_id int,
    image varchar(1000),
    spaces int,
    attendees int,
    attendee_id varchar FOREIGN KEY REFERENCES attendees(id)   
    date_created timestamp NOT NULL default CURRENT_TIMESTAMP,
    date_occurring timestamp
);

DROP TABLE IF EXISTS forum_posts;

CREATE TABLE forum_posts (
    id serial PRIMARY KEY,
    title varchar(50) NOT NULL,
    content varchar(1000) NOT NULL,
    creator_id int NOT NULL,
    date_created timestamp
);

DROP TABLE IF EXISTS forum_comments;

CREATE TABLE forum_comments (
    id serial PRIMARY KEY,
    content varchar(255) NOT NULL,
    forum_id int NOT NULL,
    date_created timestamp
);

DROP TABLE IF EXISTS event_comments;

CREATE TABLE event_comments (
    id serial PRIMARY KEY,
    content varchar(255) NOT NULL,
    event_id int NOT NULL,
    date_created timestamp
);

DROP TABLE IF EXISTS auth;

CREATE TABLE auth (
    user_id int,
    password_digest varchar(100) NOT NULL
);

DROP TABLE IF EXISTS attendees;

CREATE TABLE attendees (
    user_id varchar FOREIGN KEY REFERENCES users(id),
    event_id varchar FOREIGN KEY REFERENCES events(id),
)