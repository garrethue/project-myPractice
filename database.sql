
-- CREATES
-- ####################################################################################
CREATE DATABASE my_practice; 
CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(100) UNIQUE NOT NULL,
"password" VARCHAR(100) NOT NULL,
"first_name" VARCHAR(60) NOT NULL,
"last_name" VARCHAR(80) NOT NULL
);
------------------------------------
CREATE TABLE practices(
id SERIAL PRIMARY KEY,
practice_name VARCHAR(80),
user_id INTEGER REFERENCES "user"
);
------------------------------------
CREATE TABLE poses(
id SERIAL PRIMARY KEY,
pose_name VARCHAR(80)
);
------------------------------------ 
CREATE TABLE practices_poses (
id SERIAL PRIMARY KEY,
practice_id INTEGER NOT NULL REFERENCES practices,
pose_id INTEGER NOT NULL REFERENCES poses,
pose_time INTEGER NOT NULL,
pose_order INTEGER NOT NULL
);

-- ####################################################################################
--INSERTS
--users
INSERT INTO "user" ("username", "password", "first_name", "last_name")
VALUES ('garrethue','password','Garret', 'Larson'),
('charles_darwin123','password2','Charles', 'Darwin'),
('george123','password3','George', 'Foreman');
------------------------------------
--poses
INSERT INTO poses ("pose_name")
VALUES ('downward dog'), ('tree pose'), ('plank'), ('triangle pose');

--poses
INSERT INTO poses ("pose_name")
VALUES ('half moon pose'), ('warrior one pose'), ('warrior two pose'), ('bridge pose'), ('upward facing bow pose'), ('dolphin pose');


--poses
INSERT INTO poses ("pose_name")
VALUES ('scorpion pose'), ('corpse pose'), ('seated forward fold pose'), ('warrior three pose'), ('crow pose'), ('tripod headstand'),('extended side angle pose');

--poses
INSERT INTO poses ("pose_name")
VALUES ('bird of paradise pose');


--############################################################################################
