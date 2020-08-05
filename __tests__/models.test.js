const supertest = require("supertest");
const app = require("../server");
const connection = require("../db/connection");

describe('app', ()=>{
    beforeEach(()=>{
        return connection.seed.run()
    })
    afterAll(() => {
        return connection.destroy();
      });
    test("GET TOPICS: 200 - responds with an array of topic objects", () => {
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
    test('GET USERNAMES: 200 - responds with a specified username', () => {
        return supertest(app)
         .get('/api/users/grumpy19')
         .expect(200)
         .then((res)=> {
             res.body.users.forEach((user)=>{
                 expect(user).toHaveProperty('username')
                 expect(user).toHaveProperty('avatar_url')
                 expect(user).toHaveProperty('name')
             })
         })
    })
})