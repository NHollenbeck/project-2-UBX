DROP DATABASE IF EXISTS studydb;
CREATE DATABASE studydb;

-- USE studydb;

-- CREATE TABLE users
-- (
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	username varchar(255) NOT NULL,
--  password varchar(255) NOT NULL,
-- 	PRIMARY KEY (id)
-- );



-- CREATE TABLE study_group
-- (
-- 	id int NOT NULL AUTO_INCREMENT,
--  	title varchar(255) NOT NULL,
-- 	body varchar(255) NOT NULL,
--  category varchar(255) NOT NULL,
--  location varchar(255) NOT NULL,
--  time varchar(255) NOT NULL,
-- 	users_id int NOT NULL,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (users_id) REFERENCES users(id)
-- );

-- CREATE TABLE attended_events
-- (
--     id int NOT NULL AUTO_INCREMENT,
--     FOREIGN KEY (users_id) REFERENCES users(id),
--     FOREIGN KEY (event_id) REFERENCES study_group(id)
-- )