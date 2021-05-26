
const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /my_books */

describe("POST /mybooks/add", function () {
    const newBook = {
        book_id: "b1",
        current_status: "reading",
        rating: "5.0",
        finished_date: "2021-05-05",
        progress: "15.00"
      };

  test("ok for loggedin", async function () {
    const resp = await request(app)
        .post("/mybooks/add")
        .send({...newBook},"u1")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
        book_id: "b1",
        status: "reading",
        rating: "5.0",
        finished_date: "2021-05-05",
        progress: "%1500.00"
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/mybooks/add")
        .send({
          id: "new",
          name: "neww",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/mybooks/add")
        .send({
          ...newBook,
          progress: 5,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /mybooks */

describe("GET /mybooks", function () {
  test("ok for logged in", async function () {
    const resp = await request(app)
        .get("/mybooks")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ myBook:     
        [
            {
              book_id: "b1",
              name: "B1",
              author: "A1",
              cover: "http://B1.img",
              description: "Desc1",
              categories: "C1",
              current_status:"reading",
              rating:"5.0",
              finished_date:null,
              progress:"25.00"
            }
        ]
    });
  });

});

/************************************** DELETE /mybooks/:id */

describe("DELETE /mybooks/:id", function () {
  test("works for logged in", async function () {
    const resp = await request(app)
        .delete(`/mybooks/b1`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: "b1" });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/mybooks/b1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such book", async function () {
    const resp = await request(app)
        .delete(`/mybooks/nope`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
