-- SELECTS
------------------------------------
select * from "user";
select * from practices;
select * from poses;
select * from practices_poses;
------------------------------------
-- this should happen when user gets the !DETAILS! of a practice
-- all poses and times for a given user and given practice id
SELECT pr.id as practice_id, ps.pose_name, pp.pose_time FROM "user" u
JOIN practices pr ON u.id=pr.user_id
JOIN practices_poses pp ON pr.id=pp.practice_id
JOIN poses ps ON pp.pose_id=ps.id
WHERE u.id = 6
AND pr.id = 2
ORDER BY pp.id ASC; --this ensures that the poses are in order
------------------------------------
-- EDIT a Practice Query
SELECT * FROM practices pr
JOIN practices_poses pp ON pr.id=pp.practice_id
WHERE pr.id = 7 -- have this
ORDER BY pp.id ASC; --this ensures that the poses are in order
--
select *
from practices_poses
where practice_id = 7;

----
UPDATE practices_poses pp
SET pp.pose_id = 3,
pp.pose_time = 30,
WHERE 

-- 
DELETE FROM practices_poses pp
WHERE practice_id = 7;

INSERT INTO practices_poses (practice_id, pose_id, pose_time) VALUES (7,2,4) RETURNING *;

------------------------------------
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;
---

-- get practice_id and practice_name for a given user
SELECT * FROM "user" u JOIN practices pr ON u.id=pr.user_id WHERE u.id=6 ORDER BY pr.id;
-- ####################################################################################

-- DELETES
-- ####################################################################################
-- DROP TABLE practices_poses;
------------------------------------
-- DROP TABLE practices;
------------------------------------
-- DROP TABLE poses;
------------------------------------
-- DROP TABLE users;
------------------------------------
-- ####################################################################################

-- CREATES
-- ####################################################################################
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
pose_time INTEGER NOT NULL
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


select * from poses;
------------------------------------
--practices_poses junction table
INSERT INTO practices_poses ("practice_id","pose_id","pose_time")
VALUES (1, 1, 3), (1, 2, 2), (1, 4, 5);

--############################################################################################
