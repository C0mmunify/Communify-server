INSERT INTO council (id, area)
VALUES
    (1, 'Sheffield'),
    (2, 'Cardiff'),
    (3, 'London');

INSERT INTO users (
    id,
    name, 
    username, 
    email,
    phone,
    age,
    council_id,
    admin
) 
VALUES
    (1, 'Noah Platton', 'nplatton' ,'noah.platton@getfutureproof.co.uk', 07964170706, 24, 1, True),
    (2, 'Tom Grainger', 'Graingertom', 'thomas.grainger@getfutureproof.co.uk', null, 24, 2, True),
    (3, 'Franklyn Asafo', 'asafoadjeif', 'franjly.asafo@getfutureproof.co.uk', null, 24, 3, True);

INSERT INTO events (
    id, 
    title, 
    description,
    location,
    council_id,
    creator_id,
    image,
    spaces,
    attendees,
    date_created,
    date_occurring,
) 
VALUES
    (1, 'Example Event', 'This is an example event.', 'Noahs house', 1, 1, 'some image', 3, 2, TIMESTAMP("2023-01-10",  "13:10:00"), TIMESTAMP("2023-01-23",  "18:00:00"));