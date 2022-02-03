CREATE DATABASE IF NOT EXISTS photoshare;
USE photoshare;
DROP TABLE IF EXISTS Pictures CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Comments CASCADE;
DROP TABLE IF EXISTS Albums CASCADE;

CREATE TABLE Users (
  user_id int4,
  username varchar(255) UNIQUE,
  email varchar(255) UNIQUE,
  first_name varchar(255),
  last_name varchar(255),
  password_hash varchar(255),
  datetime_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT users_pk PRIMARY KEY (user_id)
);

CREATE TABLE Pictures
(
  picture_id int4 AUTO_INCREMENT,
  user_id int4,
  imgdata longblob,
  caption VARCHAR(255),
  INDEX upid_idx (user_id),
  CONSTRAINT picture_user_fk FOREIGN KEY (user_id) REFERENCES Users(user_id),
  datetime_created DATETIME,
  datetime_uploaded DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_edited DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT pictures_pk PRIMARY KEY (picture_id)
);

CREATE TABLE Comments
(
  comment_id int4  AUTO_INCREMENT,
  user_id int4,
  picture_id int4,
  is_like BOOLEAN,
  content VARCHAR(255),
  CONSTRAINT comment_picture_fk FOREIGN KEY (picture_id) REFERENCES Pictures(picture_id),
  CONSTRAINT comment_user_fk FOREIGN KEY (user_id) REFERENCES Users(user_id),
  datetime_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  datetime_edited DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT comments_pk PRIMARY KEY (comment_id)
);

CREATE TABLE Albums
(
  album_id int4  AUTO_INCREMENT,
  user_id int4,
  album_name VARCHAR(255),
  album_description longblob ,
  datetime_created DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT album_user_fk FOREIGN KEY (user_id) REFERENCES Users(user_id),
  CONSTRAINT album_pk PRIMARY KEY (album_id)
);