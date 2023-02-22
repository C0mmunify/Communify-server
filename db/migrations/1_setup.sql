DROP TABLE IF EXISTS users;

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

DROP TABLE IF EXISTS events;

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
    date_created timestamp NOT NULL default CURRENT_TIMESTAMP,
    date_occurring timestamp,
    date_ending timestamp,
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
    creator_id int,
    event_id int NOT NULL,
    date_created timestamp,
    FOREIGN KEY (creator_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

DROP TABLE IF EXISTS auth;

CREATE TABLE auth (
    user_id int,
    password_digest varchar(100) NOT NULL
);

DROP TABLE IF EXISTS attendees;

CREATE TABLE attendees (
    id serial PRIMARY KEY,
    user_id int,
    event_id int,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);