INSERT INTO users (
    name, 
    email,
    phone,
    age,
    council,
    profile_image,
    admin
) 
VALUES
    ('Noah Platton', 'noah.platton@getfutureproof.co.uk', '07964170706', 24, 'council 1', 'image 1', true),
    ('Tom Grainger', 'thomas.grainger@getfutureproof.co.uk', null, 24, 'council 2', 'image 2', true),
    ('Franklyn Asafo', 'franklyn.asafo@getfutureproof.co.uk', null, 24, 'council 3', 'image 3', true);

INSERT INTO events (
    title, 
    description,
    location,
    council,
    creator_id,
    image,
    spaces_total,
    spaces_remaining,
    date_created,
    date_occurring
) 
VALUES
    ('Example Event', 'This is an example event.', 'Noahs house', 'council 1', 1, null, 3, 2, '2023-01-23 00:00:00', '2023-01-28 12:00:00');
