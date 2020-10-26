
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- DROP TABLE practices_poses;
-- DROP TABLE practices;
-- DROP TABLE poses;
-- DROP TABLE users;

CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(100) UNIQUE NOT NULL,
"password" VARCHAR(100) NOT NULL,
"first_name" VARCHAR(60) NOT NULL,
"last_name" VARCHAR(80) NOT NULL
);

CREATE TABLE practices(
id SERIAL PRIMARY KEY,
name VARCHAR(80),
user_id INTEGER REFERENCES "user"
);

CREATE TABLE poses(
id SERIAL PRIMARY KEY,
pose_name VARCHAR(80)
);

CREATE TABLE practices_poses (
id SERIAL PRIMARY KEY,
practice_id INTEGER NOT NULL REFERENCES practices,
pose_id INTEGER NOT NULL REFERENCES poses,
pose_time INTEGER NOT NULL
);

-- I'll first insert into the practice table, then ill have the practice_id, USE RETURNING*!! TO GRAB THE ID
-- i'll select the pose_id from the pose table where the pose_name = 'pose name';
-- from the incoming client data, i'll use that to insert into the pose_time

--INSERTS ####################################################################################
--users
INSERT INTO users ("user_name", "user_password", "first_name", "last_name")
VALUES ('garrethue','password','Garret', 'Larson'),
('charles_darwin123','password2','Charles', 'Darwin'),
('george123','password3','George', 'Foreman');

--poses
INSERT INTO poses ("pose_name")
VALUES ('downward dog'), ('tree pose'), ('plank'), ('triangle pose');


--practices_poses junction table
INSERT INTO practices_poses ("practice_id","pose_id","pose_time")
VALUES (2, 1, 3), (2, 2, 2), (2, 4, 5);

--############################################################################################

-- SELECTS
-- all
select * from users;
select * from practices;
select * from poses;
select * from practices_poses;
---------------------------------------------

-- this should happen when user gets the details of a practice
-- all practices for a given user and given practice id
SELECT total_time, pose_name, pose_time FROM users u
JOIN practices pr ON u.id=pr.user_id
JOIN practices_poses pp ON pr.id=pp.practice_id
JOIN poses ps ON pp.pose_id=ps.id
where u.id = 1
AND pr.id = 5
ORDER BY pp.id ASC; --this ensures that the poses are in order