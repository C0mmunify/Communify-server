INSERT INTO council (area)
VALUES
    ('Sheffield'),
    ('Cardiff'),
    ('London');

INSERT INTO users (
    name, 
    username, 
    email,
    phone,
    age,
    council_id,
    admin
) 
VALUES
    ('Noah Platton', 'nplatton' ,'noah.platton@getfutureproof.co.uk', '07964170706', 24, 1, True),
    ('Tom Grainger', 'Graingertom', 'thomas.grainger@getfutureproof.co.uk', null, 24, 2, True),
    ('Franklyn Asafo', 'asafoadjeif', 'franklyn.asafo@getfutureproof.co.uk', null, 24, 3, True);

INSERT INTO events (
    title, 
    description,
    location,
    council_id,
    creator_id,
    image,
    spaces,
    date_created,
    date_occurring
) 
VALUES
    ('Example Event', 'This is an example event.', 'Noahs house', 1, 1, 'some image', 3, '2023-01-23 00:00:00', '2023-01-28 12:00:00');