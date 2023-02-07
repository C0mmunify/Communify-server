INSERT INTO users (
    name, 
    email,
    phone,
    age,
    council,
    admin
) 
VALUES
    ('Noah Platton', 'noah.platton@getfutureproof.co.uk', '07964170706', 24, 'council 1', True),
    ('Tom Grainger', 'thomas.grainger@getfutureproof.co.uk', null, 24, 'council 2', True),
    ('Franklyn Asafo', 'franklyn.asafo@getfutureproof.co.uk', null, 24, 'council 3', True);

INSERT INTO events (
    title, 
    description,
    location,
    council,
    creator_id,
    spaces_total,
    spaces_remaining,
    date_created,
    date_occurring
) 
VALUES
    ('Example Event', 'This is an example event.', 'Noahs house', 'council 1', 1, 3, 2, '2023-01-23 00:00:00', '2023-01-28 12:00:00');

