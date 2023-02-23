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
    spaces_total,
    spaces_remaining,
    date_created,
    date_occurring,
    date_ending
) 
VALUES
    ('Example Event', 'This is an example event.', 'Noahs house', 'council 1', 1, 3, 2, '2023-01-23T00:00:00.000Z', '2023-01-28T12:00:00.000Z', '2023-01-28T13:00:00.000Z');

INSERT INTO auth (
    user_id,
    password_digest
)
VALUES
    (1, '$2y$10$ysF82Dmv0BrX1PNJthwm3OJLeMEAY.gOdXco3TfL2ZuMSb0jWauV.'),
    (2, '$2y$10$ysF82Dmv0BrX1PNJthwm3OJLeMEAY.gOdXco3TfL2ZuMSb0jWauV.'),
    (3, '$2y$10$ysF82Dmv0BrX1PNJthwm3OJLeMEAY.gOdXco3TfL2ZuMSb0jWauV.');