const supertest = require("supertest");
const app = require("../server");
const connection = require("../db/connection");

describe("app", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });
  test("GET TOPICS: /api/topics - 200 - responds with an array of topic objects", () => {
    return supertest(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        res.body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug"),
            expect(topic).toHaveProperty("description");
        });
      });
  });
  test('POST TOPIC: /api/topics - 200 - posts a new topic', () => {
    let newTopic = {
      slug: "gold",
      description: "a very shiny material",
    };
    return supertest(app)
      .post("/api/topics")
      .send(newTopic)
      .expect(200)
      .then((res) => {
        console.log(res.body)
        expect(res.body.topic).toEqual(
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          })
        );
      });
  });
  test("GET USERNAME: /api/users/:username - 200 - responds with a specified username", () => {
    return supertest(app)
      .get("/api/users/rogersop")
      .expect(200)
      .then((res) => {
        const user = res.body.user;
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("avatar_url");
        expect(user).toHaveProperty("name");
      });
  });
  test("GET ALL USERS: /api/users - 200 - responds with all usernames", () => {
    return supertest(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        res.body.users.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("avatar_url");
          expect(user).toHaveProperty("name");
        });
      });
  });
  test("GET ARTICLE: /api/articles/:articleId - 200 - responds with the correct article", () => {
    return supertest(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const article = res.body.article;
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("created_at");
      });
  });
  test("PATCH ARTICLE: /api/articles/:articleId - 200 - returns an updated vote for the given article ID", () => {
    return supertest(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: 10,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).toBe(110);
      });
  });
  test("DELETE ARTICLE: /api/articles/:articleId - 204 - delete article with the given article ID", () => {
    return supertest(app).delete("/api/articles/2").expect(204);
  });
  test("POST COMMENTS: /api/articles/:articleId/comments - 200 - posts a comment for the specified user", () => {
    let newComment = {
      body: "gold",
      username: "butter_bridge",
    };

    return supertest(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(200)
      .then((res) => {
        expect(res.body.comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            article_id: expect.any(Number),
            body: expect.any(String),
          })
        );
      });
  });
  test("POST COMMENTS: /api/articles/:articleId/comments - 404 - returns an error when client posts to a non exisiting username", () => {
    let newComment = {
      username: "Smeagle",
      body: "Golden"
    }
    return supertest(app)
      .post("/api/articles/1/comments")
      .send(
        newComment
      )
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Username not found!");
      });
  });
  test("GET COMMENTS QUERY: /api/articles/:article_id/comments?order=desc - 200 - will sort comments", () => {
    return supertest(app)
      .get("/api/articles/1/comments?order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("PATCH COMMENTS: /api/comments/:commentsId - 200 - returns an updated comment", () => {
    return supertest(app)
      .patch("/api/comments/1")
      .send({
        inc_votes: 11,
      })
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body.comment.votes).toBe(27);
      });
  });
  test("DELETE COMMENTS: /api/comments/:commentId - 200 - can delete a comment with a specified commentId", () => {
    return supertest(app).delete("/api/comments/1").expect(204);
  });
  test("GET ARTICLES QUERY: /api/articles?order=desc - 200 - will sort articles in desc order if specified through user query", () => {
    return supertest(app)
      .get("/api/articles?order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("GET ARTICLES QUERY: /api/articles?author=rogersop - 200 - will sort articles by author if specified through user query", () => {
    return supertest(app)
      .get("/api/articles?author=rogersop")
      .expect(200)
      .then((res) => {
        expect(res.body.articles.length).toBeGreaterThan(0);
        res.body.articles.forEach((article) => {
          expect(article.author).toBe("rogersop");
        });
      });
  });
  test("GET ARTICLES QUERY: /api/articles?topic=cats - 200 - will sort articles by topic if specified through user query", () => {
    return supertest(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then((res) => {
        expect(res.body.articles.length).toBeGreaterThan(0);
        res.body.articles.forEach((article) => {
          expect(article.topic).toBe("cats");
        });
      });
  });
});
