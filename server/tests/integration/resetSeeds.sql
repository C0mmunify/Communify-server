TRUNCATE users, events, auth, attendees RESTART IDENTITY;

INSERT INTO users (
    name, 
    email,
    phone,
    age,
    council,
    admin
) 
VALUES
    ('Test User 1', 'testuser1@email.com', '1234567890', 14, "council 1", false),
    ('Test User 2', 'testuser2@email.com', '2345678901', 12, "council 2", false),
    ('Test User 3', 'testuser3@email.com', '3456789012', 14, "council 3", false),
    ('Test User 4', 'testuser4@email.com', '4567890123', 17, "council 1", false),
    ('Test User 5', 'testuser5@email.com', '5678901234', 10, "council 4", false),
    ('Test User 6', 'testuser6@email.com', '6789012345', 11, "council 1", false),
    ('Test User 7', 'testuser7@email.com', '7890123456', 10, "council 3", false),
    ('Test User 8', 'testuser8@email.com', '8901234567', 15, "council 3", false);

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
) 
VALUES
    ('Example Event 1', 'This is an example event 1.', 'Address 1', "council 1", 1, 3, 1, '2023-01-23 00:00:00', '2023-01-28 12:00:00'),
    ('Example Event 2', 'This is an example event 2.', 'Address 2', "council 2", 2, 5, 5, '2023-01-23 00:00:00', '2023-01-28 12:00:00'),
    ('Example Event 3', 'This is an example event 3.', 'Address 3', "council 3", 3, 3, 0, '2023-01-23 00:00:00', '2023-01-28 12:00:00'),
    ('Example Event 4', 'This is an example event 4.', 'Address 4', "council 1", 1, 4, 1, '2023-01-23 00:00:00', '2023-01-28 12:00:00');

INSERT INTO attendees (
    user_id,
    event_id
)
VALUES
    ('1', '1'),
    ('4', '1'),
    ('3', '3'),
    ('7', '3'),
    ('8', '3'),
    ('1', '4'),
    ('4', '4'),
    ('6', '4');

INSERT INTO auth (
    user_id,
    password_digest
)
VALUES
    ('1', '$2y$10$HNjSrS1kPZkiX3hA9K6QSOO2PdBb8DTqhFHs/opy8eH3eOEdZiooG'),
    ('2', '$2y$10$55J4Ma28F6W4rQgbVwBh9ugovgzmGhNcsKrotIk6XOF2qwmZQJz.O'),
    ('3', '$2y$10$ZwI10iOMnWjIwg9RcoJyKeBo.cASJSS0RGsdYNTXM4112HAG6g.cS'),
    ('4', '$2y$10$vQrI8YHdDNNFUM5AeIfpz.H6XcZK.YvmNIE/ouIMXivQf1qRPrtgu'),
    ('5', '$2y$10$QYBV9KzLizutj5Xp5tTIIuLw6JAZcsmM2Ce5lFpIfJEamzOwISfc2'),
    ('6', '$2y$10$IGDlNBfOIBNtTx5G9vt6vOUDAENQPDgjGbfwy.0bQ8jq3FTbYyRT6'),
    ('7', '$2y$10$.JtUEbXMADgVmi6ojNy/NeC5QIWCGg6ah/Qlb4He/jozYIOwQUocC'),
    ('8', '$2y$10$4kS0CknOUuBHVjSrvwK4r.YYJvb5bw3xDkrjMNCKeEkcK6KzmnJCq');