# Northcoders News API

## About

This is a backend project called nc_news, it is an API which has multiple endpoints that can be used to interact
with a website, it does this using Knex.js query builder for javascript.

This is the first half of the project, this API will be used for our frontend project

## Built With
    express - npm
    pg - npm
    supertest - npm
    jest - npm
    knex.js - an SQL query builder

**Author - Ben McKenna**

**Hosted on Heroku**

## Getting Started

Run npm install to install all the dependencies(listed in built with)

## Available Endpoints

**GET /api/topics**

Responds with array of topic objects, with the properties: slug & description.

**GET /api/users**

Responds with an array of user objects, with the properties: username, name and avatar_url

**GET /api/users/:username**

Responds with a user object, with the properties: username, name, and avatar_url

**GET /api/articles/:articleId**

Responds with an article object, with the properties: author, title, article_id, body, topic, created_at, votes, comment_count.

**PATCH /api/articles/:articleId**

Body accepts an object in the form `{ inc_votes: 1 }` Responds with an updated article object for the given articleId.

**DELETE /api/articles/:articleId**

Deletes an article based on the specified articleId

**POST /api/articles/:articleId/comments**

Body accepts and object in the form `{ username: "Kelly", body: "Nice work!" }` Responds with the updated comment object.

**GET /api/articles/:articleId/comments**

Responds with an array of comments for a specified articleId. Accepts queries: sort_by (default to created_at) and order (default to desc).

**GET /api/articles**

Responds with an array of article objects. Accepts queries: sort_by (default to created_at) and order (default to desc), author and topic.

**PATCH /api/comments/:commentId**

Body accepts an object in the form `{ inc_votes: 1 }` Responds with an updated comment object with votes increased by the given amount.

**DELETE /api/comments/:commentId**

Deletes a comment based on the specified commentId