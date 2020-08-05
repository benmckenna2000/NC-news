const supertest = require("supertest");
const app = require("../server");
const connection = require("../db/connection");

describe('app', ()=>{
    test("GET: 200 - responds with an array of topic objects", () => {
        return supertest(app)
          .get("/api/topics")
          .expect(200)
          .then((res) => {
            res.body.topics.forEach((topic) => {
              expect(topic).toHaveProperty("slug"),
                expect(topic).toHaveProperty("description")
            })
          })
    })
})