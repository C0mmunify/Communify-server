TRUNCATE users, events, auth, attendees RESTART IDENTITY;

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
    ('Test User 1', 'testuser1@email.com', '1234567890', 14, 'council 1', 'image 1', false),
    ('Test User 2', 'testuser2@email.com', '2345678901', 12, 'council 2', 'image 2', false),
    ('Test User 3', 'testuser3@email.com', '3456789012', 14, 'council 3', 'image 3', false),
    ('Test User 4', 'testuser4@email.com', '4567890123', 17, 'council 1', 'image 4', false),
    ('Test User 5', 'testuser5@email.com', '5678901234', 10, 'council 4', 'image 5', false),
    ('Test User 6', 'testuser6@email.com', '6789012345', 11, 'council 1', 'image 6', false),
    ('Test User 7', 'testuser7@email.com', '7890123456', 10, 'council 3', 'image 7', false),
    ('Test User 8', 'testuser8@email.com', '8901234567', 15, 'council 3', 'image 8', false);

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
    date_occurring,
) 
VALUES
    ('Example Event 1', 'This is an example event 1.', 'Address 1', 'council 1', 1, 'image 1', 3, 1, '2023-01-23 00:00:00', '2023-01-28 12:00:00'),
    ('Example Event 2', 'This is an example event 2.', 'Address 2', 'council 2', 2, 'image 2', 5, 5, '2023-01-23 00:00:00', '2023-01-28 12:00:00'),
    ('Example Event 3', 'This is an example event 3.', 'Address 3', 'council 3', 3, 'image 3', 3, 0, '2023-01-23 00:00:00', '2023-01-28 12:00:00'),
    ('Example Event 4', 'This is an example event 4.', 'Address 4', 'council 1', 1, 'image 4', 4, 1, '2023-01-23 00:00:00', '2023-01-28 12:00:00');

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
    ('1', '$2y$10$AcA1dC5aWuK9/RdQ/9/1I.9JU5tdQMAyieOHkSLKMnwhmyehKmIbq'),
    ('2', '$2y$10$LFY9s2O6ipYwLyG1tlkWAe1MS5VIdR1qAEPSmvmVISmyL9PDG5U62'),
    ('3', '$2y$10$5ZMr424hhUyNKqSKx8eEzemwbCH3M1KEaipqlQmagHVg6PkYSStBq'),
    ('4', '$2y$10$cAWYgHh3Yt722cXDNKM/z.8SSf7ILUgL0xSy1KFTzkBzE97FAkB0S'),
    ('5', '$2y$10$jdiUvxpMn1WMxFKRCL/nxOMTnih6hyczEaCtDPGzZlp3SK4TKBjVa'),
    ('6', '$2y$10$GPSzhhhJ1Tsv5qFJLzsCgO3nB1BdaNDf48Icy32iJC252/qx2Zjby'),
    ('7', '$2y$10$pyXXkz73Fu1Vl3L/.cNR6OTI7Ez4dHiLwLZcSfO.OGr9heDtnG72C'),
    ('8', '$2y$10$O3eVaDCdLs2vxFDmkxHhmeF7N8T2legVXwdtjUI2sMM.SFhm/bYj6');