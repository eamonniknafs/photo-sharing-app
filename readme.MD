# Photo Sharing App

## Jump to Section

1. [Description](#description)
2. [Setup](#setup)
3. [Screenshots](#screenshots)
4. [Database Design](#database-design)

## Description

This app is a fully featured photo sharing app, where you can create a profile, upload photos, add friends, and like and comment on content. It uses a MySQL database, using Flask as the backend framework. For APIs, this app uses React.JS requests (which are Express requests).

## Setup

1. `cd backend && pip install -r requirements.txt`
2. `cd ../frontend && yarn install`
3. `yarn run start-api`
4. In a new terminal: `cd frontend && yarn run start`

## Screenshots

### Explore Page

![Explore Page](resources/explore.png)

### Explore Lightbox with Likes and Comments

![Explore Lightbox with Likes and Comments](resources/explore-lightbox.png)

### Login Page

![Login Page](resources/login.png)

### Register Page

![Register Page](resources/register.png)

### Profile Page (no photos)

![Profile Page (no photos)](resources/profile-empty.png)

### Profile Page (with photos)

![Profile Page (with photos)](resources/profile-photos.png)

### Friends Page

![Friends Page](resources/friends.png)

### Upload Page

![Upload Page](resources/upload.png)

## Database Design

### Assumptions

1. Each user can have none or any number of albums
2. Each user can have none or any number of friends
3. Every album can contain none or any number of photos
4. Each photo can only be in one album
5. Each photo can have none or any number of tags
6. Multiple photos can be tagged with the same tag
7. Comments can be published without being associated with a user

### ER Model

![ER Model](resources/ER.svg)
