# Blog App

A simple blogging webapp built using NodeJS, ExpressJS and MongoDb. Authenticated and authorization functions with passport

## Functions

- SignIn - Login into existing account
- SignUp - Signup using username and password
- Add Post - Add your post with an image and text
- Remove - Remove a post
- Edit - Edit an existing post

## Checkout Hosted WebApp here

[Click here ✌](https://blog-app-jatin.herokuapp.com/)

## Routes

- GET /posts - To view all the posts
- GET /user/:username - To view specific post by a user
- POST /posts/publish - To add new post (when user is authenticated andauthorized only)
- GET /posts/:id - To get a post with specific id
- PUT /posts/:id - To update specific post with unique Id
- Delete /posts/:id - To delete specific post with unique Id

## Project Archietecture

```tree
├── app.js
├── middleware
    └── index.js
├── models
    ├── comment.js
│   ├── post.js
│   └── user.js
├── node_modules
├── package.json
├── package-lock.json
├── public

├── readme.md
├── routes
│   ├── comments.js
│   ├── index.js
│   ├── posts.js
│   └── user.js
└── views
    ├── comments
    ├── landing.hbs
    ├── login.hbs
    ├── posts
    └── register.hbs
```

# How to run

- Git clone repository
- Then run these commands in terminal/shell

```npm
    npm install
    npm start
```
