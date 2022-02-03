CREATE DATABASE IF NOT EXISTS photoshare;
USE photoshare;
DROP TABLE IF EXISTS Pictures CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Comments CASCADE;
DROP TABLE IF EXISTS Albums CASCADE;

CREATE TABLE Users (
    user_id int4  AUTO_INCREMENT,
    date_created datetime DEFAULT(getdate()),
    username varchar(255) UNIQUE,
    email varchar(255) UNIQUE,
    first_name varchar(255),
    last_name varchar(255),
    password_hash varchar(255),
  CONSTRAINT users_pk PRIMARY KEY (user_id)
);

CREATE TABLE Pictures
(
  picture_id int4  AUTO_INCREMENT,
  user_id int4,
  imgdata longblob ,
  caption VARCHAR(255),
  INDEX upid_idx (user_id),
  CONSTRAINT pictures_pk PRIMARY KEY (picture_id)
);

CREATE TABLE Comments
(
  comment_id int4  AUTO_INCREMENT,
  is_like BOOLEAN,
  date_created datetime DEFAULT(getdate()),
  content VARCHAR(255),
  CONSTRAINT comments_pk PRIMARY KEY (comment_id)
);

CREATE TABLE Albums
(
  album_id int4  AUTO_INCREMENT,
  album_name VARCHAR(255),
  album_description longblob ,
  date_created datetime DEFAULT(getdate()),
  CONSTRAINT album_pk PRIMARY KEY (album_id)
);