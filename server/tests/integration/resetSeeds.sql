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
    ('Test User 1', 'testuser1@email.com', '1234567890', 14, 'council 1', 'image 1', true),
    ('Test User 2', 'testuser2@email.com', '2345678901', 12, 'council 2', 'image 2', true),
    ('Test User 3', 'testuser3@email.com', '3456789012', 14, 'council 3', 'image 3', false),
    ('Test User 4', 'testuser4@email.com', '4567890123', 17, 'council 1', 'image 4', false),
    ('Test User 5', 'testuser5@email.com', '5678901234', 10, 'council 4', 'image 5', false),
    ('Test User 6', 'testuser6@email.com', '6789012345', 11, 'council 1', 'image 6', true),
    ('Test User 7', 'testuser7@email.com', '7890123456', 10, 'council 3', 'image 7', false),
    ('Test User 8', 'testuser8@email.com', '8901234567', 15, 'council 3', 'image 8', false);

INSERT INTO auth (
    user_id,
    password_digest
)
VALUES
    (1, '$2y$10$7U0ejt5y5aiyDFP8ziTy2.56tuBMHlgXlV1Lk/WcdiBaUloCvLRWu'),
    (2, '$2y$10$mwN8u/NJ/f3C5Px12tmw1ecZ9AjzA2Pnza2HRjk0VHNWeJ5P7wqxS'),
    (3, '$2y$10$8xu3s0ulpM.aPOgie/nVYeOJOBIoeP8RJL8DQqhe1EOVOjTlkevES'),
    (4, '$2y$10$hd20VwONc3GbS44LrmoHVeWh5QicuGINGXkpViLQl/Kusk2JwhiAy'),
    (5, '$2y$10$aCElh384bDCIMDhCfYOIFOnb1IXzcW98caJ1fAD0bTzfc5V4EdmSu'),
    (6, '$2y$10$STqKpN014U3qSsSXDNGw4.groAzeS5hgfS7a/QIVrfZPBnHSYYDOG'),
    (7, '$2y$10$gw/QmcKVFvwe6N.vOE/0c.E5TuhhpKYC7gwzJweovjQbkbqqXcKay'),
    (8, '$2y$10$wfEijv8s1dGp4QvNLfoGXu/05/0UKj0F0BtyiVAhtGr1zM4hnMr8O');

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
    ('Example Event 1', 'This is an example event 1.', 'Address 1', 'council 1', 1, 3, 1, '2023-01-23T00:00:00.000Z', '2023-01-24T12:00:00.000Z', '2023-01-24T14:00:00.000Z'),
    ('Example Event 2', 'This is an example event 2.', 'Address 2', 'council 2', 2, 5, 5, '2023-01-23T00:00:00.000Z', '2023-01-25T13:30:00.000Z', '2023-01-25T17:00:00.000Z'),
    ('Example Event 3', 'This is an example event 3.', 'Address 3', 'council 3', 3, 3, 0, '2023-01-23T00:00:00.000Z', '2023-01-28T09:00:00.000Z', '2023-01-28T13:00:00.000Z'),
    ('Example Event 4', 'This is an example event 4.', 'Address 4', 'council 1', 1, 4, 1, '2023-01-23T00:00:00.000Z', '2023-01-28T11:00:00.000Z', '2023-01-28T14:15:00.000Z');

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