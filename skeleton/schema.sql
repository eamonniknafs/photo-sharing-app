CREATE DATABASE IF NOT EXISTS photoshare;
USE photoshare;

DROP TABLE IF EXISTS Friend_Of;
DROP TABLE IF EXISTS Tagged;
DROP TABLE IF EXISTS Album_Contents;

DROP TABLE IF EXISTS Comments CASCADE;
DROP TABLE IF EXISTS Albums CASCADE;
DROP TABLE IF EXISTS Pictures CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Tags;

CREATE TABLE Users (
  username varchar(255) PRIMARY KEY NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  dob DATE NOT NULL,
  hometown varchar(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  password_hash varchar(255) NOT NULL
);

CREATE TABLE Pictures
(
  picture_id int4 AUTO_INCREMENT PRIMARY KEY NOT NULL,
  imgdata longblob,
  caption VARCHAR(255),
  date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_created TIMESTAMP,
  last_edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  username varchar(255) NOT NULL,
  CONSTRAINT fk_photo_user FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Comments
(
  comment_id int4 AUTO_INCREMENT PRIMARY KEY NOT NULL,
  is_like BOOLEAN,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  content VARCHAR(255),
  picture_id int4 NOT NULL,
  username VARCHAR(255),
  CONSTRAINT FOREIGN KEY (picture_id) REFERENCES Pictures(picture_id),
  CONSTRAINT fk_comment_user FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Albums
(
  album_id int4 AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  description VARCHAR(255),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  username VARCHAR(255) NOT NULL,
  cover_photo_id int4,
  CONSTRAINT fk_album_user FOREIGN KEY (username) REFERENCES Users(username),
  CONSTRAINT fk_album_cover FOREIGN KEY (cover_photo_id) REFERENCES Pictures(picture_id)
);

CREATE TABLE Tags
(
  tag_name varchar(255) PRIMARY KEY NOT NULL
);

CREATE TABLE Friend_Of
(
  username VARCHAR(255) NOT NULL,
  friend_username VARCHAR(255) NOT NULL,
  CONSTRAINT fk_friend_of_user FOREIGN KEY (username) REFERENCES Users(username),
  CONSTRAINT fk_friend_of_friend FOREIGN KEY (friend_username) REFERENCES Users(username)
);

CREATE TABLE Tagged
(
  picture_id int4 NOT NULL,
  tag_name varchar(255) NOT NULL,
  CONSTRAINT fk_tagged_picture FOREIGN KEY (picture_id) REFERENCES Pictures(picture_id),
  CONSTRAINT fk_tagged_tag FOREIGN KEY (tag_name) REFERENCES Tags(tag_name)
);

CREATE TABLE Album_Contents
(
  album_id int4 NOT NULL,
  picture_id int4 NOT NULL,
  CONSTRAINT fk_album_contents_album FOREIGN KEY (album_id) REFERENCES Albums(album_id),
  CONSTRAINT fk_album_contents_picture FOREIGN KEY (picture_id) REFERENCES Pictures(picture_id)
);